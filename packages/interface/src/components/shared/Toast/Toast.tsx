import { useState } from 'react'
import styles from './Toast.module.css'
// import cross from '../../assets/icons/cross.svg'
import { CSSTransition } from 'react-transition-group'

interface ToastProps {
  remove: () => void
  toast: ToastInterface
}

interface ToastInterface {
  message: string
  code: string
}

interface ToastWrapperInterface {
  toasts: ToastInterface[]
  removeToast: (i: Number) => void
}

const Toast = (props: ToastProps) => {
  let [show, setShow] = useState(true)
  return (
    <CSSTransition
      appear
      unmountOnExit
      in={show}
      timeout={200}
      onEntered={() => setTimeout(() => setShow(false), 10000)}
      onExited={props.remove}
      classNames={{
        enterActive: styles['ToastEnterActive'],
        enter: styles['ToastEnter'],
        exitActive: styles['ToastExitActive'],
        exit: styles['ToastExit'],
        appear: styles['ToastEnter'],
        appearActive: styles['ToastEnterActive'],
      }}
    >
      <div className={styles['Toast']}>
        <span>{props.toast.message}</span>
        <button onClick={() => setShow(false)} className={styles['CrossBtn']}>
          <img className={styles['Cross']} />
        </button>
      </div>
    </CSSTransition>
  )
}

const ToastsWrapper = (props: ToastWrapperInterface) => {
  return (
    <div className={styles['ToastContainer']}>
      {props.toasts.map((toast, i) => (
        <Toast key={i} toast={toast} remove={() => props.removeToast(i)} />
      ))}
    </div>
  )
}

export default ToastsWrapper
