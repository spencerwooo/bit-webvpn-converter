import Link from 'next/link'
import { RiGithubLine } from 'react-icons/ri'

const NavLink = ({
  href,
  children,
  isExternal = false,
}: {
  href: string
  children: string | JSX.Element
  isExternal?: boolean
}) => {
  const options = isExternal
    ? {
        href,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {}
  const elem = (
    <a
      className="p-2 text-center text-sm font-medium uppercase tracking-wider rounded text-orange-50 hover:bg-orange-200 hover:text-gray-800 transition-all duration-150"
      {...options}
    >
      {children}
    </a>
  )
  return isExternal ? elem : <Link href={href}>{elem}</Link>
}

const Navbar = () => {
  return (
    <nav className="flex justify-end items-center py-2">
      <NavLink href="/">Converter</NavLink>
      {/* <NavLink href="/retrevnoc">Retrevnoc</NavLink> */}
      <NavLink href="https://github.com/spencerwooo/bit-webvpn-converter" isExternal>
        <div className="flex items-center">
          GitHub <RiGithubLine className="ml-1 w-4 h-4" />
        </div>
      </NavLink>
    </nav>
  )
}

export default Navbar
