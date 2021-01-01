import aesjs from 'aes-js'

const utf8 = aesjs.utils.utf8
const hex = aesjs.utils.hex
const AesCfb = aesjs.ModeOfOperation.cfb

const textRightAppend = (text: string, mode: string) => {
  const segmentByteSize = mode === 'utf8' ? 16 : 32
  if (text.length % segmentByteSize === 0) {
    return text
  }

  const appendLength = segmentByteSize - (text.length % segmentByteSize)
  let i = 0
  while (i++ < appendLength) {
    text += '0'
  }
  return text
}

const encrypt = (text: string, key: string, iv: string) => {
  const textLength = text.length
  text = textRightAppend(text, 'utf8')

  const keyBytes = utf8.toBytes(key)
  const ivBytes = utf8.toBytes(iv)
  const textBytes = utf8.toBytes(text)

  const aesCfb = new AesCfb(keyBytes, ivBytes, 16)
  const encryptBytes = aesCfb.encrypt(textBytes)

  return (
    hex.fromBytes(ivBytes) +
    hex.fromBytes(encryptBytes).slice(0, textLength * 2)
  )
}

// eslint-disable-next-line
const decrypt = (text: string, key: string) => {
  const textLength = (text.length - 32) / 2
  text = textRightAppend(text, 'hex')

  const keyBytes = utf8.toBytes(key)
  const ivBytes = hex.toBytes(text.slice(0, 32))
  const textBytes = hex.toBytes(text.slice(32))

  const aesCfb = new AesCfb(keyBytes, ivBytes, 16)
  const decryptBytes = aesCfb.decrypt(textBytes)

  return utf8.fromBytes(decryptBytes).slice(0, textLength)
}

const encryptUrl = (url: string) => {
  let port = ''
  let segments = []
  let protocol = 'http'
  const knownProto = ['http', 'https', 'ssh', 'vnc', 'telnet']

  for (const proto of knownProto) {
    const protoLength = proto.length + 3
    if (url.substring(0, protoLength).toLowerCase() === proto + '://') {
      protocol = proto
      url = url.substr(protoLength)
      break
    }
  }

  let v6 = ''
  const match = /\[[0-9a-fA-F:]+?\]/.exec(url)
  if (match) {
    v6 = match[0]
    url = url.slice(match[0].length)
  }

  segments = url.split('?')[0].split(':')
  if (segments.length > 1) {
    port = segments[1].split('/')[0]
    url =
      url.substr(0, segments[0].length) +
      url.substr(segments[0].length + port.length + 1)
  }

  const i = url.indexOf('/')
  if (i === -1) {
    if (v6 !== '') {
      url = v6
    }
    url = encrypt(url, 'wrdvpnisthebest!', 'wrdvpnisthebest!')
  } else {
    let host = url.slice(0, i)
    const path = url.slice(i)
    if (v6 !== '') {
      host = v6
    }
    url = encrypt(host, 'wrdvpnisthebest!', 'wrdvpnisthebest!') + path
  }

  if (port !== '') {
    url = '/' + protocol + '-' + port + '/' + url
  } else {
    url = '/' + protocol + '/' + url
  }

  return url
}

export const convert = (value: string) => {
  return encryptUrl(value)
}
