import { ReactElement, ReactNode, useEffect } from 'react'
import Layout from './components/Layout/Layout'
import { Route, Routes } from 'react-router-dom'

import HomePage from './components/Home/Home'
import GalleryPage from './components/Gallery/GalleryContainer'
import EventDetailPage from './components/EventDetails/EventDetailsContainer'
import UserCollectionPage from './components/UserCollection/UserCollectionsContainer'
import CreateEvent from './components/CreateEvent/CreateEventContainer'
import { ToastContainer, Theme } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './toasts.css'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'

function withLayout(El: ReactNode, dark?: boolean) {
  return <Layout dark={dark}>{El}</Layout>
}

const ToastConfig = {
  autoClose: 6000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  hideProgressBar: true,
  theme: 'dark' as Theme,
}

function App(): ReactElement {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Helmet>
        <title>Home | Sway</title>
      </Helmet>
      <ToastContainer {...ToastConfig} />
      <Routes>
        <Route path="/" element={withLayout(<HomePage />)} />
        <Route path="/gallery" element={withLayout(<GalleryPage />)} />
        <Route
          path="/event/:id"
          element={withLayout(<EventDetailPage />, true)}
        />
        <Route
          path="/event/create"
          element={withLayout(<CreateEvent />, true)}
        />
        <Route
          path="/account"
          element={withLayout(<UserCollectionPage />, true)}
        />
        <Route
          path="/account/:address"
          element={withLayout(<UserCollectionPage />, true)}
        />
      </Routes>
    </>
  )
}

export default App
