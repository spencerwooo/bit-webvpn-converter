import { useState } from 'react'
import useClipboard from 'react-use-clipboard'
import { useDebouncedCallback } from 'use-debounce'
import {
  RiArrowDownLine,
  RiCheckLine,
  RiClipboardLine,
  RiExternalLinkLine,
  RiLoaderLine,
  RiSubtractLine,
} from 'react-icons/ri'

import { convert } from '../lib/convert'

const prefix = { web: 'https://webvpn.bit.edu.cn', lib: 'https://libvpn.bit.edu.cn' }

const ConverterCard = () => {
  const [enteredUrl, setEnteredUrl] = useState('')
  const [urlPrefix, setUrlPrefix] = useState(prefix.web)
  const [userEntering, setUserEntering] = useState(false)
  const [convertedUrl, setConvertedUrl] = useState('')
  const [isCopied, setCopied] = useClipboard(convertedUrl, { successDuration: 2000 })

  // debounced callback so that the converter function doesn't get called on every keystroke
  const encryptUrl = (url: string, prefix: string) => setConvertedUrl(url === '' ? '' : prefix + convert(url))
  const debounced = useDebouncedCallback((url: string, prefix: string) => {
    // set loading state to false after user stopped entering
    setUserEntering(false)
    // set converted url to the encrypted result
    encryptUrl(url, prefix)
  }, 500)

  return (
    <div className="border border-zinc-400/30 p-4 rounded-lg w-full">
      <label className="block mb-2 text-xs font-medium uppercase tracking-wider text-gray-300">Original URL</label>
      <input
        type="url"
        onChange={e => {
          setUserEntering(true)
          setEnteredUrl(e.target.value)
          debounced(e.target.value, urlPrefix)
        }}
        className="bg-zinc-800 border border-zinc-700 text-zinc-300 rounded focus:outline-none focus:ring-orange-200 focus:border-orange-200 block w-full p-2 transition-all duration-150"
        required
        autoFocus
      />

      <RiSubtractLine className="w-full mt-4 h-5 rotate-90" />
      <div className="p-1 font-nanum text-xl w-full rounded bg-zinc-700 grid grid-cols-2">
        <button
          className={`rounded opacity-80 hover:opacity-100 transition-all duration-150 ${
            urlPrefix === prefix.web ? 'bg-zinc-900' : 'bg-zinc-700'
          }`}
          onClick={() => {
            setUrlPrefix(prefix.web)
            encryptUrl(enteredUrl, prefix.web)
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
            encryptUrl(enteredUrl, prefix.lib)
          }}
        >
          Library VPN
        </button>
      </div>
      <RiArrowDownLine className="w-full mb-2 h-5" />

      <label className="block mb-2 text-xs font-medium uppercase tracking-wider text-orange-50">Converted URL</label>
      <div className="flex items-center relative">
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
          className="cursor-not-allowed bg-zinc-800 border border-zinc-700 text-orange-100 rounded focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2"
          disabled
          readOnly
        />

        <button
          onClick={setCopied}
          className="flex items-center pl-3 pr-2 hover:opacity-80 transition-all duration-150 disabled:opacity-60"
          disabled={userEntering}
        >
          {isCopied ? <RiCheckLine /> : <RiClipboardLine />}{' '}
          <span className="uppercase tracking-wider ml-1 text-sm">copy</span>
        </button>
        <a
          href={convertedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center pl-1 hover:opacity-80 transition-all duration-150 ${
            userEntering && 'opacity-60 cursor-not-allowed pointer-events-none'
          }`}
        >
          <RiExternalLinkLine className="inline-block" />
          <span className="uppercase tracking-wider ml-1 text-sm">open</span>
        </a>
      </div>
    </div>
  )
}

export default ConverterCard
