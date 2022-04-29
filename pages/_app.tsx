import '../styles/globals.css'
import "@fontsource/nanum-pen-script"

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
