import { useState, forwardRef, useImperativeHandle } from 'react'
import { Check, XCircle, X } from './Icons'

export interface AlertHandle {
  show: () => void
}

export interface AlertProps {
  message: string
  variant: 'success' | 'danger'
}

const variants = {
  success: {
    bg: 'bg-success-200',
    light: 'text-success-600',
    dark: 'text-success-800',
    icon: <Check className="text-success-600" width={20} height={20} />,
  },
  danger: {
    bg: 'bg-danger-200',
    light: 'text-danger-600',
    dark: 'text-danger-800',
    icon: <XCircle className="text-danger-600" width={20} height={20} />,
  },
}

const Alert = forwardRef<AlertHandle, AlertProps>((props, ref) => {
  const { message, variant } = props
  const [showAlert, setShowAlert] = useState(false)

  const handleClose = () => {
    setShowAlert(false)
  }

  useImperativeHandle(ref, () => ({
    show() {
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
    },
  }))

  if (!showAlert) return <></>

  return (
    <div className="w-full max-w-lg mx-auto fixed top-12 right-0 left-0 z-10 px-[10px] lg:top-16 lg:max-w-3xl">
      <div
        className={`p-3 shadow-lg rounded-sm ${variants[variant].bg} flex items-center justify-between`}
      >
        <div className="flex items-center gap-2 lg:gap-3">
          {variants[variant].icon}
          <p className={`text-sm font-semibold ${variants[variant].dark}`}>
            {message}
          </p>
        </div>
        <button onClick={handleClose}>
          <X className={`${variants[variant].light}`} width={20} height={20} />
        </button>
      </div>
    </div>
  )
})

Alert.displayName = 'Alert'

export default Alert
