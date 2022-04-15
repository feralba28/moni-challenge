import { ReactNode } from 'react'

function Body({ children }: { children: ReactNode }): JSX.Element {
  return (
    <tbody className="block lg:table-row-group">
      {children}
    </tbody>
  )
}

export default Body
