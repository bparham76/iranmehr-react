import './styles/SignIn.css'
import PageAnimatable from '../components/shared/PageAnimatable'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { BASE_URL } from '../App'

function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [authSuccess, setAuthSuccess] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const loginBtnHandler = async () => {
    if (username.trim().length == 0) {
      toast('نام کاربری نمیتواند خالی باشد', { type: 'error' })
      return
    } else if (password.trim().length == 0) {
      toast('رمز عبور نمیتواند خالی باشد', { type: 'error' })
      return
    }

    try {
      const authCheck = await axios.post(
        BASE_URL + 'user/login',
        { username: username, password: password },
        {
          accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      )

      if (authCheck.status < 400) {
        setAuthSuccess(true)
        localStorage.setItem('user_id', authCheck.data.user_data.id)
        localStorage.setItem('token', authCheck.data.token)
      } else {
        toast('نام کاربری و یا رمز عبور وارد شده معتبر نیست.', {
          type: 'error',
        })
      }
    } catch (error) {
      if (error.response.status == 401)
        toast('نام کاربری و یا رمز عبور وارد شده معتبر نیست.', {
          type: 'error',
        })
      else
        toast('خطایی در برقراری ارتباط با سرور صورت پذیرفت.', { type: 'error' })
    }
  }

  useEffect(() => {
    const user_id = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')
    const checkAuthState = async () => {
      try {
        const token = localStorage.getItem('token')
        const user_id = localStorage.getItem('user_id')
        const response = await axios.post(
          BASE_URL + 'user/data',
          { user_id: user_id },
          {
            headers: {
              accept: 'application/json',
              'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setIsLoading(false)
        if (response.status < 400) {
          setAuthSuccess(true)
          setRedirect(true)
        }
      } catch (error) {
        setIsLoading(false)
        setAuthSuccess(false)
        localStorage.clear()
      }
    }

    if (token == null && user_id == null) return
    else if (!authSuccess && isLoading) checkAuthState()
  }, [])

  useEffect(() => {
    if (authSuccess) {
      if (!redirect)
        toast('اعتبارسنجی با موفقیت صورت پذیرفت.', { type: 'success' })
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }, [authSuccess])

  if (!isLoading && authSuccess) return <Navigate to='/dashboard' />
  return (
    <PageAnimatable>
      <div className='flex flex-col p-0 my-5 py-20 w-full'>
        <div className='mx-auto w-[280px] sm:w-[300px] md:w-[350px] lg:w-[400px] sm:justify-center sm:items-center'>
          <h1 className='w-full text-bold text-2xl text-center my-10'>
            ورود به سیستم
          </h1>
          <div className='input-group'>
            <label>نام کاربری</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type='text'
              placeholder='نام کاربری'
            />
          </div>
          <div className='input-group'>
            <label>رمز عبور</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='رمز عبور'
            />
          </div>
          <div className='input-group'>
            <button
              className='btn btn-block btn-primary'
              onClick={loginBtnHandler}
            >
              ورود
            </button>
          </div>
        </div>
      </div>
    </PageAnimatable>
  )
}

export default SignIn
