import type { NextPage } from 'next'
import Head from 'next/head'

import ShootingStars from '../components/ShootingStars'
import ConverterCard from '../components/ConverterCard'
import Footer from '../components/Footer'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-full min-h-screen text-white bg-zinc-900">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Web VPN converter</title>
      </Head>

      <main className="flex-1 flex flex-col justify-center items-center space-y-4 p-4 mx-auto">
        <ShootingStars />

        <div className="relative">
          <h1 className="font-black text-3xl md:text-5xl text-center leading-tight bg-clip-text text-transparent bg-gradient-to-tr from-orange-100 via-orange-200 to-gray-50">
            Web VPN Converter.
          </h1>
          <div className="absolute -rotate-12 -top-10 right-0 md:-right-10 text-4xl font-nanum">for BIT</div>
        </div>

        <p className="text-center leading-2 py-4 lg:leading-6 text-gray-400">
          <span className="hidden md:block">
            Convert BIT local network URLs into Web VPN URLs. <br />
          </span>
          <span>Connect to your local networks in BIT from anywhere in the world.</span>
        </p>

        <ConverterCard />
      </main>

      <Footer />
    </div>
  )
}

export default Home
