import { ReactElement, ReactNode } from 'react'
import Layout from './components/Layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './components/Home/Home'
import GalleryPage from './components/Gallery/GalleryContainer'
import EventDetailPage from './components/EventDetails/EventDetailsContainer'
import UserCollectionPage from './components/UserCollection/UserCollectionsContainer'
import CreateEvent from './components/CreateEvent/CreateEventContainer'

function withLayout(El: ReactNode, dark?: boolean) {
  return <Layout dark={dark}>{El}</Layout>
}

function App(): ReactElement {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={withLayout(<HomePage />)} />
          <Route path="/gallery" element={withLayout(<GalleryPage />)} />
          <Route
            path="/event"
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
