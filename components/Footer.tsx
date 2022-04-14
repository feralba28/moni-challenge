import Image from 'next/image'

function Footer(): JSX.Element {
  return (
    <footer className="bg-primary-dark">
      <div className="container mx-auto p-5 flex items-center justify-between gap-4">
        <p className="text-primary text-lg font-semibold lg:text-xl">
          Todas tus finanzas, más fácil.
        </p>
        <div className="w-[80px] lg:w-[100px]">
          <Image
            src="/moni-logo-secondary.svg"
            alt="Moni Logo"
            width={80}
            height={30}
            layout="responsive"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
