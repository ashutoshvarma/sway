import React, { ReactElement, useState, useEffect } from 'react'
import styles from './ImageInput.module.css'
import { useField, FieldHookConfig } from 'formik'
import attachmentIcon from '../../assets/icons/attachment.svg'
import ImageModal from '../shared/ImageModal/ImageModal'
import cross from '../../assets/icons/cross.svg'

interface Props {
  label?: string
}

const ImageInput = ({
  label,
  ...props
}: FieldHookConfig<any> & Props): ReactElement => {
  const [field, meta, helpers] = useField(props)
  const { onChange, value, ...fieldProps } = field
  const [imageUrl, setImageUrl] = useState<string | undefined>()
  const [showThumb, setShowThumb] = useState<boolean>(false)

  useEffect(() => {
    console.log(value)
    if (value && value.length > 0) setImageUrl(URL.createObjectURL(value[0]))
    else setImageUrl(undefined)

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl)
    }
  }, [value])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(e.target.files)
    helpers.setTouched(true)
  }

  const onClickThumb = () => {
    if (imageUrl) setShowThumb((state) => !state)
  }

  const clearImage: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    helpers.setValue('')
  }

  const start_and_end = (str: string) => {
    if (str.length > 25) {
      return str.substr(0, 15) + '...' + str.substr(str.length - 10, str.length)
    }
    return str
  }

  return (
    <div className={[styles['Container'], props.className].join(' ')}>
      <label className={styles['Label']}>
        {label}
        <input
          className={styles['Input']}
          {...fieldProps}
          onChange={changeHandler}
          type="file"
          accept="image/*"
        />
        <div>
          <div className={styles['Button']}>
            <img src={attachmentIcon} alt="attachment icon" />
            Click to add attachement
          </div>
          {value && value.length > 0 && (
            <div className={styles['FileName']}>
              {start_and_end(value[0].name)}
              <button onClick={clearImage}>
                <img src={cross} alt="" />
              </button>
            </div>
          )}
        </div>
      </label>
      <div>
        <ImageModal
          show={showThumb}
          imageUrl={imageUrl}
          alt="Event Thumbnail"
          toggle={onClickThumb}
        />
        <div className={[styles['Preview'], imageUrl && styles['Active']].join(' ')}>
          <img onClick={onClickThumb} src={imageUrl} alt="" />
        </div>
      </div>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

export default ImageInput
