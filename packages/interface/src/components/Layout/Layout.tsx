import React, { ReactElement } from 'react'
import Header from './Header'
import Footer from './Footer'

interface Props {
  children: React.ReactNode
  dark?: boolean
}

function Layout({ children, dark }: Props): ReactElement {
  return (
    <>
      <Header dark={dark} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
