import Image from 'next/image'
import Link from 'next/link'

function Navbar(): JSX.Element {
  return (
    <header className="bg-neutral shadow-md">
      <nav className="container mx-auto p-5">
        <Link href="/">
          <a>
            <div className="w-[80px] lg:w-[123px]">
              <Image
                src="/moni-logo-primary.svg"
                alt="Moni Logo"
                width={80}
                height={30}
                layout="responsive"
                priority={true}
              />
            </div>
          </a>
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
