import { ReactElement, ReactNode } from 'react'
import Layout from './components/Layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './components/Home/Home'
import GalleryPage from './components/Gallery/GalleryContainer'
import EventDetailPage from './components/EventDetails/EventDetailsContainer'
import UserCollectionPage from './components/UserCollection/UserCollectionsContainer'
import CreateEvent from './components/CreateEvent/CreateEventContainer'
import { ToastContainer, Theme } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './toasts.css'

function withLayout(El: ReactNode, dark?: boolean) {
  return <Layout dark={dark}>{El}</Layout>
}

const ToastConfig = {
  autoClose: 100000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  hideProgressBar: true,
  theme: "dark" as Theme
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
