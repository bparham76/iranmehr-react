import '../styles/Form-input.css'
import { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import LoadingBackdrop from '../shared/LoadingBackdrop'
import axios from 'axios'
import { BASE_URL } from '../../App'
import { UsersContext } from './Users'
import toEnDigit from '../../helpers/toEnDigit'

export default function () {
  const { setRefresh } = useContext(UsersContext)
  const [isLoading, setIsLoading] = useState(false)
  const [reqSuccess, setReqSuccess] = useState(false)
  const [btnTrigger, setBtnTrigger] = useState(false)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password_confirmation: '',
    role: -1,
    email: '',
    phone: '',
    first_name: '',
    last_name: '',
  })

  const clearFormBtnHandler = () => {
    setFormData({
      username: '',
      password: '',
      password_confirmation: '',
      role: -1,
      email: '',
      phone: '',
      first_name: '',
      last_name: '',
    })
  }

  const newUserRegisterBtnHandler = async () => {
    setBtnTrigger(true)

    if (formData.first_name.trim().length == 0) {
      toast('نام نمی تواند خالی باشد', { type: 'error' })
      return
    } else if (formData.last_name.trim().length == 0) {
      toast('نام خانوادگی نمی تواند خالی باشد', { type: 'error' })
      return
    } else if (formData.role < 0) {
      toast('نقش کاربر را انتخاب کنید.', { type: 'error' })
      return
    } else if (formData.username.trim().length == 0) {
      toast('نام کاربری نمی تواند خالی باشد', { type: 'error' })
      return
    } else if (formData.password.trim().length == 0) {
      toast('رمز عبور نمی تواند خالی باشد', { type: 'error' })
      return
    } else if (formData.password_confirmation.trim().length == 0) {
      toast('تایید رمز عبور نمی تواند خالی باشد', { type: 'error' })
      return
    } else {
      if (formData.password != formData.password_confirmation) {
        toast('رمز عبور و تایید آن باید مطابقت داشته باشند', { type: 'error' })
        return
      } else if (formData.password.trim().length < 6) {
        toast('رمز عبور باید حداقل ۶ کاراکتر باشد', { type: 'error' })
        return
      } else {
        setIsLoading(true)
      }
    }

    try {
      const response = await axios.post(BASE_URL + 'user/register', formData, {
        headers: {
          accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })

      if (response.status < 400) {
        setIsLoading(false)
        setReqSuccess(true)
        setRefresh(true)
      } else {
        setIsLoading(false)
        setReqSuccess(false)
      }
    } catch (error) {
      setIsLoading(false)
      setReqSuccess(false)
    }
  }

  useEffect(() => {
    if (!btnTrigger || isLoading) return

    setBtnTrigger(false)

    if (reqSuccess) {
      toast('کاربر جدید با موفقیت ثبت شد', { type: 'success' })
      clearFormBtnHandler()
      setReqSuccess(false)
    } else {
      toast('مشکلی در ثبت کاربر جدید پیش آمد', { type: 'error' })
    }
  }, [isLoading])

  return (
    <>
      <div
        id='new-user'
        className='w-full relative grid grid-cols-1 md:grid-cols-2 gap-2 p-5'
      >
        {isLoading && <LoadingBackdrop />}
        <div className='flex flex-col col-span-1'>
          <label className='text-red-700'>نام</label>
          <input
            type='text'
            placeholder='نام'
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
          <label className='text-red-700'>نام خانوادگی</label>
          <input
            type='text'
            placeholder='نام خانوادگی'
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />
          <label>تلفن همراه</label>
          <input
            type='text'
            placeholder='تلفن همراه'
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: toEnDigit(e.target.value) })
            }
          />
          <label className='text-red-700'>نقش کاربر</label>
          <select
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            defaultValue={-1}
          >
            <option value={-1}>انتخاب کنید</option>
            <option value={0}>مدیر</option>
            <option value={1}>کاربر</option>
          </select>
        </div>
        <div className='flex flex-col col-span-1'>
          <label className='text-red-700'>نام کاربری</label>
          <input
            type='text'
            placeholder='نام کاربری'
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <label className='text-red-700'>رمز عبور</label>
          <input
            type='password'
            placeholder='رمز عبور'
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <label className='text-red-700'>تایید رمز عبور</label>
          <input
            type='password'
            placeholder='تایید رمز عبور'
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
          />
          <label>پست الکترونیک</label>
          <input
            type='email'
            placeholder='پست الکترونیک'
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <input
          type='button'
          value='ثبت کاربر جدید'
          className='btn btn-md btn-primary'
          onClick={newUserRegisterBtnHandler}
        />
        <input
          type='button'
          value='خالی کردن فرم'
          className='btn btn-md btn-outline'
          onClick={clearFormBtnHandler}
        />
      </div>
    </>
  )
}
