import { ReactNode } from 'react'

const Table = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg p-4 shadow-md lg:max-w-6xl lg:p-8">
      <h1 className="text-center text-primary-dark text-xl font-bold mb-4 lg:text-2xl">
        {title}
      </h1>
      <table className="w-full border-collapse block lg:table">{children}</table>
    </div>
  )
}

export default Table
