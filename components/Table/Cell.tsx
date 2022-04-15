import { ReactNode } from 'react'

const Cell = ({ children }: { children: ReactNode }) => {
  return (
    <td className="px-2 py-1 lg:py-2 lg:border lg:border-grey-500 text-left block lg:table-cell">
      {children}
    </td>
  )
}

export default Cell
