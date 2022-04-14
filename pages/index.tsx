import type { NextPage } from 'next'
import Head from 'next/head'

import LinkButton from '@/components/LinkButton'
import PageLayout from '@/components/PageLayout'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Moni | Argentina</title>
      </Head>

      <PageLayout>
        <main className="container mx-auto p-5 grow flex justify-center items-center">
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-slate-300 text-lg text-center font-semibold tracking-tight lg:text-xl">
              Préstamos online
            </h2>
            <h1 className="text-primary text-3xl text-center font-black uppercase tracking-tighter max-w-xl m-auto lg:text-4xl">
              ¡Recibí plata en tu cuenta en un toque!
            </h1>

            <LinkButton to="/prestamos" variant="primary">
              Quiero un préstamo
            </LinkButton>

            <LinkButton to="/solicitudes" variant="secondary">
              Ver solicitudes
            </LinkButton>
          </div>
        </main>
      </PageLayout>
    </>
  )
}

export default Home
