const Footer = () => (
  <footer className="bg-zinc-500/10 p-4 text-center text-gray-400 text-sm">
    Created with love at BIT
    <br />
    <a
      href="https://spencerwoo.com"
      target="_blank"
      rel="noopener noreferrer"
      className="underline opacity-80 hover:opacity-100 transition-all duration-150"
    >
      Spencer Woo
    </a>{' '}
    @ {new Date().getFullYear()}
  </footer>
)
export default Footer
