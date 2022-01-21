import { ReactElement, ReactNode } from 'react'
import Layout from './components/Layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './components/Home/Home'
import GalleryPage from './components/Gallery/GalleryContainer'
import EventDetailPage from './components/EventDetails/EventDetailsContainer'
import UserCollectionPage from './components/UserCollection/UserCollectionsContainer'
import CreateEvent from './components/CreateEvent/CreateEventContainer'
import { ToastContainer, ToastPosition } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function withLayout(El: ReactNode, dark?: boolean) {
  return <Layout dark={dark}>{El}</Layout>
}

const ToastConfig = {
  position: 'bottom-right' as ToastPosition,
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

function App(): ReactElement {

  return (
    <>
      <ToastContainer {...ToastConfig} />
      <BrowserRouter>
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
            path="/user_collection"
            element={withLayout(<UserCollectionPage />, true)}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
