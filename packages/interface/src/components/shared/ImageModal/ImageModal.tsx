import { ReactElement } from 'react'
import styles from './ImageModal.module.css'

interface Props {
  imageUrl: string | undefined
  show: boolean
  alt: string | undefined
  toggle: () => void
}

function ImageModal({
  imageUrl,
  show,
  alt,
  toggle,
}: Props): ReactElement | null {
  if (show)
    return (
      <div className={styles['Modal']} onClick={toggle}>
        <img src={imageUrl} alt={alt} className={styles['Image']} />
      </div>
    )
  return null
}

export default ImageModal
