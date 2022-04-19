import { ReactNode } from 'react'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

function PageLayout(props: { children: ReactNode }): JSX.Element {
  const { children } = props

  return (
    <div className="min-h-screen bg-neutral flex flex-col">
      <Navbar />

      {children}

      <Footer />
    </div>
  )
}

export default PageLayout
