import { ReactNode } from 'react'

interface Props {
  isModal: boolean
  children: ReactNode
}

function Modal(props: Props): JSX.Element {
  const { children, isModal } = props

  if (!isModal) return <></>

  return (
    <>
      <div className="bg-black/60 fixed inset-0 z-50 h-screen flex justify-center items-center p-4">
        <div className="max-h-[90vh] w-full max-w-md bg-white rounded-lg shadow overflow-y-auto lg:max-w-lg scrollbar-none">
          {children}
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 1024px) {
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

export default Modal
