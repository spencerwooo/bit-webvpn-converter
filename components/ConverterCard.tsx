import { useState } from 'react'
import { RiArrowDownLine, RiCheckLine, RiClipboardLine, RiExternalLinkLine, RiSubtractLine } from 'react-icons/ri'
import useClipboard from 'react-use-clipboard'
import { useDebounce } from 'use-debounce'

import { convert } from '../lib/convert'

const prefix = { web: 'https://webvpn.bit.edu.cn', lib: 'https://libvpn.bit.edu.cn' }

const ConverterCard = () => {
  const [originalUrl, setOriginalUrl] = useState('')
  const [urlPrefix, setUrlPrefix] = useState(prefix.web)
  const [debouncedUrl] = useDebounce(originalUrl, 1000)

  const convertedUrl = urlPrefix + (debouncedUrl === '' ? debouncedUrl : convert(debouncedUrl))
  const [isCopied, setCopied] = useClipboard(convertedUrl, { successDuration: 1500 })

  return (
    <div className="border border-zinc-400/30 w-full max-w-xl lg:max-w-3xl p-4 rounded-lg">
      <label className="block mb-2 text-xs font-medium uppercase tracking-wider text-gray-300">Original URL</label>
      <input
        type="url"
        onChange={e => setOriginalUrl(e.target.value)}
        className="bg-zinc-800 border border-zinc-700 text-zinc-300 rounded focus:outline-none focus:ring-orange-200 focus:border-orange-200 block w-full p-2 transition-all duration-150"
        required
      />

      <RiSubtractLine className="w-full mt-4 h-5 rotate-90" />
      <div className="p-1 font-nanum text-xl w-full rounded bg-zinc-700 grid grid-cols-2">
        <button
          className={`rounded opacity-80 hover:opacity-100 transition-all duration-150 ${
            urlPrefix === prefix.web ? 'bg-zinc-900' : 'bg-zinc-700'
          }`}
          onClick={() => setUrlPrefix(prefix.web)}
        >
          Web VPN
        </button>
        <button
          className={`rounded opacity-80 hover:opacity-100 transition-all duration-150 ${
            urlPrefix === prefix.lib ? 'bg-zinc-900' : 'bg-zinc-700'
          }`}
          onClick={() => setUrlPrefix(prefix.lib)}
        >
          Library VPN
        </button>
      </div>
      <RiArrowDownLine className="w-full mb-2 h-5" />

      <label className="block mb-2 text-xs font-medium uppercase tracking-wider text-orange-50">Converted URL</label>
      <div className="flex items-center">
        <input
          type="url"
          value={convertedUrl}
          className="cursor-not-allowed bg-zinc-800 border border-zinc-700 text-orange-100 rounded focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2"
          disabled
          readOnly
        />

        <button onClick={setCopied} className="flex items-center px-2 hover:opacity-80 transition-all duration-150">
          {isCopied ? <RiCheckLine /> : <RiClipboardLine />}{' '}
          <span className="uppercase tracking-wider ml-1 text-sm">copy</span>
        </button>
        <a
          href={convertedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center pl-1 hover:opacity-80 transition-all duration-150"
        >
          <RiExternalLinkLine className="inline-block" />
          <span className="uppercase tracking-wider ml-1 text-sm">open</span>
        </a>
      </div>
    </div>
  )
}

export default ConverterCard
