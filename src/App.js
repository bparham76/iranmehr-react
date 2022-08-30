// import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from './components/Footer'

import SignIn from './pages/SignIn'
import NotFound from './pages/NotFound'
// import Default from './pages/Default'
// import Blog from './pages/Blog'
// import About from './pages/About'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ProtectedRoute from './components/shared/ProtectedRoute'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'

export const BASE_URL = 'http://127.0.0.1:8000/api/'

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Header />
        <AnimatePresence>
          <div className='container mx-auto w-full min-h-screen'>
            <Routes>
              {/* <Route index element={<Default />} />
              <Route path='sign-in' element={<SignIn />} />
              <Route path='blog' element={<Blog />} />
              <Route path='about' element={<About />} /> */}
              <Route path='sign-in' element={<SignIn />} />
              <Route index element={<SignIn />} />
              <Route path='dashboard' element={<ProtectedRoute />}>
                <Route index element={<Dashboard />} />
                <Route path=':stage' element={<Dashboard />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </AnimatePresence>
        <Footer />
      </BrowserRouter>
      <ToastContainer
        style={{ zIndex: 20000 }}
        rtl
        position='top-right'
        autoClose={2000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        closeOnClick={false}
      />
    </>
  )
}

export default App
