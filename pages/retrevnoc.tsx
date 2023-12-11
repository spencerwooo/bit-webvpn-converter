import Head from 'next/head'
// import ShootingStars from '../components/ShootingStars'
import ConverterCard from '../components/ConverterCard'

const Retrevnoc = () => {
  return (
    <div className="w-full max-w-3xl space-y-4">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Web VPN - retrevnoc</title>
      </Head>

      {/* <ShootingStars reverse /> */}

      <div className="relative">
        <h1 className="font-black text-3xl md:text-5xl text-center leading-tight bg-clip-text text-transparent bg-gradient-to-tr from-purple-200 via-purple-400 to-gray-50">
          NPV bew Retrevnoc.
        </h1>
        <div className="absolute -rotate-12 -top-10 right-0 md:right-10 text-4xl font-nanum">TIB rof</div>
      </div>

      <p className="text-center leading-2 py-4 lg:leading-6 text-gray-700 dark:text-gray-400">
        <span className="hidden md:block">
          Reverse lol. <br />
        </span>
        Decrypt Web VPN URLs.
      </p>

      <ConverterCard reverse />
    </div>
  )
}
export default Retrevnoc
