import Footer from './Footer'
import Navbar from './Navbar'

const Layout = ({ children }: { children: JSX.Element }) => (
  <div className="flex flex-col h-full min-h-screen dark:text-white dark:bg-zinc-900">
    <Navbar />
    <main className="flex-1 flex w-full justify-center items-center p-4">{children}</main>
    <Footer />
  </div>
)

export default Layout
