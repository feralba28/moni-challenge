import { ReactNode } from 'react'

const Row = ({ children }: { children: ReactNode }) => {
  return (
    <tr className="bg-white p-2 border border-grey-500 rounded mb-4 lg:mb-0 lg:border-none block lg:table-row">
      {children}
    </tr>
  )
}

export default Row
