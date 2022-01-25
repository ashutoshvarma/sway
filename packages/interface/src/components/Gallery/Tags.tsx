import { ReactElement, useEffect, useRef } from 'react'
import styles from './Tags.module.css'

interface TagsProps {
  tags: string[]
  loading?: boolean
}

function Tags({ tags, loading }: TagsProps): ReactElement {
  useEffect(() => {
    removeExtraTags()
  }, [tags])

  useEffect(() => {
    window.addEventListener('resize', () => {
      removeExtraTags()
    })
    return () => {
      window.removeEventListener('resize', removeExtraTags)
    }
  })

  const tagsElementRef = useRef<HTMLDivElement | null>(null)
  const extraCountRef = useRef<HTMLSpanElement | null>(null)

  const removeExtraTags = (): void => {
    if (tagsElementRef.current == null) return
    let element = tagsElementRef.current
    let bottom = element.getBoundingClientRect().bottom
    let hiddenCount = 0
    let lastVisibleChild: Element | undefined
    Array.from(element.children).forEach((child) => {
      child.setAttribute('style', '')
    })
    Array.from(element.children).forEach((child) => {
      if (child.getBoundingClientRect().top > bottom) {
        child.setAttribute('style', 'display:none')
        hiddenCount++
      } else lastVisibleChild = child
    })

    if (!extraCountRef.current) return

    if (hiddenCount) {
      extraCountRef.current.setAttribute('style', '')
      extraCountRef.current.innerText = '+' + hiddenCount
    } else extraCountRef.current.setAttribute('style', 'display:none')

    if (extraCountRef.current.getBoundingClientRect().top > bottom) {
      lastVisibleChild?.setAttribute('style', 'display:none')
    }
  }

  let classes = [styles['Tags']]
  if (loading) classes.push(styles['Loading'])
  return (
    <div className={classes.join(' ')} ref={tagsElementRef}>
      {tags.map((tag, i) => (
        <span key={i}>{tag}</span>
      ))}
      <span ref={extraCountRef}></span>
    </div>
  )
}

export default Tags
