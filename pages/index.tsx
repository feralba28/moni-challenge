import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="min-h-full bg-neutral">
      <Head>
        <title>Préstamos en efectivo | Moni | Argentina</title>
        <meta
          name="description"
          content="Préstamos en efectivo. Pedime hasta $130.000 pesos y te deposito en el momento. Fácil y rápido."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Image
          src="/moni-logo-primary.svg"
          alt="Moni Logo"
          width={80}
          height={30}
        />
      </header>

      <main>
        <h1 className="text-primary text-4xl font-black uppercase tracking-tighter">
          ¡Recibí plata en tu cuenta en un toque!
        </h1>
      </main>

      <footer className="bg-primary-dark">
        <Image
          src="/moni-logo-secondary.svg"
          alt="Moni Logo"
          width={80}
          height={30}
        />
      </footer>
    </div>
  )
}

export default Home
