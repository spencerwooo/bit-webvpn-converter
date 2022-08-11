import { useState } from 'react'
import useClipboard from 'react-use-clipboard'
import { useDebouncedCallback } from 'use-debounce'
import {
  RiArrowDownLine,
  RiCheckLine,
  RiClipboardLine,
  RiDeleteBin2Line,
  RiExternalLinkLine,
  RiLoaderLine,
  RiSubtractLine,
} from 'react-icons/ri'

import { decryptUrl, encryptUrl } from '../lib/convert'
import { useLocalStorageObject } from 'react-use-window-localstorage'

const prefix = {
  web: 'https://webvpn.bit.edu.cn',
  lib: 'https://libvpn.bit.edu.cn',
}

const ConverterCard = ({ reverse = false }: { reverse?: boolean }) => {
  const [enteredUrl, setEnteredUrl] = useState('')
  const [urlPrefix, setUrlPrefix] = useState(prefix.web)
  const [userEntering, setUserEntering] = useState(false)
  const [decryptionError, setDecryptionError] = useState(false)
  const [convertedUrl, setConvertedUrl] = useState('')
  const [isCopied, setCopied] = useClipboard(convertedUrl, {
    successDuration: 2000,
  })

  // history only stored for converter (not retrevnoc)
  const [history, setHistory] = useLocalStorageObject('history', [])

  // debounced callback so that the converter function doesn't get called on every keystroke
  const encrypt = (url: string, prefix: string) =>
    setConvertedUrl(url === '' ? '' : prefix + encryptUrl(url))
  const decrypt = (url: string) => {
    const { url: decryptedUrl, error } = decryptUrl(url)
    if (error) {
      setDecryptionError(true)
      setConvertedUrl(error)
    } else {
      setDecryptionError(false)
      setConvertedUrl(decryptedUrl)
    }
  }
  const debounced = useDebouncedCallback((url: string, prefix: string) => {
    // set loading state to false after user stopped entering
    setUserEntering(false)
    // set converted url to the encrypted result
    reverse ? decrypt(url) : encrypt(url, prefix)
  }, 500)

  return (
    <>
      <div className="border border-zinc-400/30 p-4 rounded-lg">
        <label className="text-xs font-medium uppercase tracking-wider text-gray-300">
          Original URL
        </label>
        <input
          type="url"
          placeholder={
            reverse
              ? 'https://webvpn.bit.edu.cn/...'
              : 'https | ssh | vnc | telnet | rdp://...'
          }
          value={enteredUrl}
          onChange={e => {
            setUserEntering(true)
            setEnteredUrl(e.target.value)
            debounced(e.target.value, urlPrefix)
          }}
          className={`bg-zinc-800 border border-zinc-700 text-zinc-300 rounded focus:outline-none block w-full my-2 p-2 transition-all duration-150 ${
            reverse
              ? 'focus:ring-purple-200 focus:border-purple-200'
              : 'focus:ring-orange-200 focus:border-orange-200'
          }`}
          required
          autoFocus
        />

        <div className="my-2">
          <RiSubtractLine className="h-5 rotate-90 mx-auto" />
          {reverse ? (
            <div className="text-center">
              <span className="px-2 py-1 font-nanum text-xl rounded bg-zinc-800">
                decrypt
              </span>
            </div>
          ) : (
            <div className="p-1 font-nanum text-xl rounded bg-zinc-700 grid grid-cols-2">
              <button
                className={`rounded opacity-80 hover:opacity-100 transition-all duration-150 ${
                  urlPrefix === prefix.web ? 'bg-zinc-900' : 'bg-zinc-700'
                }`}
                onClick={() => {
                  setUrlPrefix(prefix.web)
                  encrypt(enteredUrl, prefix.web)
                }}
              >
                Web VPN
              </button>
              <button
                className={`rounded opacity-80 hover:opacity-100 transition-all duration-150 ${
                  urlPrefix === prefix.lib ? 'bg-zinc-900' : 'bg-zinc-700'
                }`}
                onClick={() => {
                  setUrlPrefix(prefix.lib)
                  encrypt(enteredUrl, prefix.lib)
                }}
              >
                Library VPN
              </button>
            </div>
          )}
          <RiArrowDownLine className="h-5 mx-auto" />
        </div>

        <label className="text-xs font-medium uppercase tracking-wider">
          Converted URL
        </label>
        <div className="mt-2 flex items-center relative">
          <span
            className={`absolute top-0 bottom-0 left-0 right-0 bg-zinc-900/60 flex items-center justify-center transition-all duration-150 ${
              userEntering ? 'opacity-100' : 'opacity-0 -z-10'
            }`}
          >
            <RiLoaderLine className="animate-spin" />
          </span>

          <input
            type="url"
            value={convertedUrl}
            className={`cursor-not-allowed bg-zinc-800 border border-zinc-700 rounded block w-full p-2 ${
              decryptionError && 'text-red-400'
            } ${
              reverse
                ? 'text-purple-100 focus:ring-purple-500 focus:border-purple-500'
                : 'text-orange-100 focus:ring-yellow-500 focus:border-yellow-500'
            }`}
            disabled
            readOnly
          />

          <button
            onClick={() => {
              if (enteredUrl !== '') {
                setCopied()
                // remove duplicates
                setHistory(Array.from(new Set([...history, enteredUrl])))
              }
            }}
            className="flex items-center pl-3 pr-2 hover:opacity-80 transition-all duration-150 disabled:opacity-60"
            disabled={userEntering || decryptionError}
          >
            {isCopied ? <RiCheckLine /> : <RiClipboardLine />}{' '}
            <span className="uppercase tracking-wider ml-1 text-sm">copy</span>
          </button>
          <button
            onClick={() => {
              if (enteredUrl !== '') {
                window.open(convertedUrl, '_blank')
                setHistory(Array.from(new Set([...history, enteredUrl])))
              }
            }}
            className="flex items-center pl-1 pr-2 hover:opacity-80 transition-all duration-150 disabled:opacity-60"
            disabled={userEntering || decryptionError}
          >
            <RiExternalLinkLine className="inline-block" />
            <span className="uppercase tracking-wider ml-1 text-sm">open</span>
          </button>
        </div>
      </div>

      {history.length > 0 && !reverse && (
        <div className="my-4 text-sm">
          <label className="font-medium uppercase tracking-wider text-gray-300">
            History
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {history.map((url: string, index: number) => (
              <div
                key={index}
                className="flex items-center bg-zinc-800 border border-zinc-700 text-zinc-300 rounded focus:outline-none hover:opacity-80 transition-all duration-150"
              >
                <button
                  className="tracking-wider p-2 text-left break-all"
                  onClick={() => {
                    setEnteredUrl(url)
                    setUserEntering(true)
                    debounced(url, urlPrefix)
                  }}
                >
                  {url}
                </button>

                <button
                  className="p-1 h-full group rounded bg-orange-300/20 hover:bg-orange-300 transition-all duration-150"
                  onClick={() => {
                    setHistory(
                      history.filter((_: string, i: number) => i !== index)
                    )
                  }}
                >
                  <RiDeleteBin2Line className="group-hover:text-zinc-900" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default ConverterCard
