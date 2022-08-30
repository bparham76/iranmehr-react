import axios from 'axios'
import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { BASE_URL } from '../../App'
import PageAnimatable from './PageAnimatable'

function ProtectedRoute() {
  const [isLoading, setIsLoading] = useState(true)
  const [auth, setAuth] = useState(false)

  const user_id = localStorage.getItem('user_id')
  const token = localStorage.getItem('token')

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const authCheck = await axios.post(
          BASE_URL + 'user/data',
          { user_id: user_id },
          {
            headers: {
              Accept: 'application/json',
              'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (authCheck.status < 400) {
          setAuth(true)
          setIsLoading(false)
        } else {
          localStorage.clear()
          setAuth(false)
          setIsLoading(false)
        }
      } catch (error) {
        setAuth(false)
        setIsLoading(false)
        localStorage.clear()
      }
    }

    checkAuthState()
  }, [])

  if (isLoading)
    return (
      <PageAnimatable>
        <h3>در حال بارگذاری...</h3>
      </PageAnimatable>
    )

  return auth ? (
    <PageAnimatable>
      <Outlet />
    </PageAnimatable>
  ) : (
    <Navigate to='/sign-in' />
  )
}

export default ProtectedRoute
