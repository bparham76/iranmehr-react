import { useState, useContext, useEffect } from 'react'
import { PatientsContext } from './Patients'
import { toast } from 'react-toastify'
import LoadingBackdrop from '../shared/LoadingBackdrop'
import axios from 'axios'
import { BASE_URL } from '../../App'
import PageAnimatable from '../shared/PageAnimatable'
import toEnDigit from '../../helpers/toEnDigit'

export default function NewOwner() {
  const [loading, setLoading] = useState(false)
  const { ownerData, setOwnerData, setOwnerState } = useContext(PatientsContext)
  const [_ownerData, _setOwnerData] = useState({
    firstName: '',
    lastName: '',
    gender: -1,
    phone: '',
  })

  const createNewOwner = async () => {
    if (_ownerData.firstName.trim().length == 0) {
      toast('نام صاحب نمی تواند خالی باشد', { type: 'error' })
      return
    } else if (_ownerData.lastName.trim().length == 0) {
      toast('نام خانوادگی صاحب نمی تواند خالی باشد', { type: 'error' })
      return
    }
    if (_ownerData.gender == -1) {
      toast('جنسیت صاحب را انتخاب کنید', { type: 'error' })
      return
    }
    if (_ownerData.phone.length != 11) {
      toast('شماره تلفن صاحب را بصورت صحیح وارد کنید', { type: 'error' })
      return
    }

    setOwnerData(_ownerData)

    setLoading(true)

    const token = localStorage.getItem('token')
    try {
      const response = await axios.post(BASE_URL + 'owner/create', _ownerData, {
        headers: {
          accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          authorization: 'Bearer ' + token,
        },
      })

      if (response.status < 400) {
        setOwnerData({ ..._ownerData, id: response.data.owner_data.id })
        setOwnerState(true)
        setLoading(false)
      } else {
        setOwnerState(false)
        toast('خطا در ثبت مشخصات صاحب جدید', { type: 'error' })
      }
    } catch (error) {
      setLoading(false)
      setOwnerState(false)
      toast('خطا در برقراری ارتباط با سرور', { type: 'error' })
    }
  }

  return (
    <PageAnimatable className='relative'>
      {loading && <LoadingBackdrop />}
      <label>نام</label>
      <input
        type='text'
        placeholder='نام'
        value={_ownerData.firstName}
        onChange={(e) =>
          _setOwnerData({ ..._ownerData, firstName: e.target.value })
        }
      />
      <label>نام خانوادگی</label>
      <input
        type='text'
        placeholder='نام خانوادگی'
        value={_ownerData.lastName}
        onChange={(e) =>
          _setOwnerData({ ..._ownerData, lastName: e.target.value })
        }
      />
      <label>جنسیت</label>
      <select
        onChange={(e) =>
          _setOwnerData({ ..._ownerData, gender: e.target.value })
        }
        defaultValue={-1}
      >
        <option value={-1}>انتخاب کنید</option>
        <option value={0}>آقا</option>
        <option value={1}>خانم</option>
      </select>
      <label>تلفن تماس</label>
      <input
        type='number'
        placeholder='تلفن تماس'
        value={_ownerData.phone}
        onChange={(e) =>
          _setOwnerData({ ..._ownerData, phone: toEnDigit(e.target.value) })
        }
      />
      <input
        type='button'
        className='btn btn-md btn-ghost'
        value='ثبت و انتخاب صاحب جدید'
        onClick={createNewOwner}
      />
    </PageAnimatable>
  )
}
