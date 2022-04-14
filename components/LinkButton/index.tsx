import Link from 'next/link'
import { ReactNode } from 'react'
import Button from '../Button'

interface Props {
  to: string
  variant: 'primary' | 'secondary'
  children: ReactNode
}

function LinkButton(props: Props): JSX.Element {
  const { to, variant, children } = props

  return (
    <Link href={to}>
      <a>
        <Button variant={variant}>
          {children}
        </Button>
      </a>
    </Link>
  )
}

export default LinkButton
