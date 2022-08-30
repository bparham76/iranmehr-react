import { useState, useEffect } from 'react'
import PageAnimatable from '../shared/PageAnimatable'
import axios from 'axios'
import { BASE_URL } from '../../App'
import LoadingBackdrop from '../shared/LoadingBackdrop'
import { toast } from 'react-toastify'
import { PatientsContext } from './Patients'
import { useContext } from 'react'

export default function FindOwner() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchData, setSearchData] = useState('')
  const [response, setResponse] = useState([])
  const { setOwnerData, setOwnerState } = useContext(PatientsContext)

  useEffect(() => {
    searchServer()
  }, [])

  const searchServer = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get(
        BASE_URL + 'owner/search?search=' + searchData,
        {
          headers: {
            accept: 'application/json',
            authorization: 'Bearer ' + token,
          },
        }
      )
      if (res.status < 400) {
        setResponse(res.data.search_data)
      } else {
        toast('خطا در برقراری ارتباط با سرور', { type: 'error' })
        setResponse([])
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setResponse([])
    }
  }

  const onTextChange = (t) => {
    setSearchData(t)
    if (searchData.trim().length > 0)
      setTimeout(() => {
        searchServer()
      }, 1000)
  }

  const chooseOwner = () => {
    const owners = document.querySelectorAll('input[name="owner"]')
    let ownerID = -1
    owners.forEach((item) => {
      if (item.checked) ownerID = item.id
    })
    if (ownerID < 0) {
      toast('یک مورد از لیست صاحبان را انتخاب کنید', { type: 'error' })
      return
    }
    response.forEach((owner) => {
      if (owner.id == ownerID) {
        setOwnerData(owner)
        setOwnerState(true)
      }
    })
  }

  return (
    <PageAnimatable>
      <label>انتخاب صاحب</label>
      <input
        type='text'
        placeholder='جستجوی بر اساس نام یا تلفن'
        value={searchData}
        onChange={(e) => onTextChange(e.target.value)}
      />
      <div className='w-full max-h-[400px] relative overflow-y-scroll'>
        {isLoading && <LoadingBackdrop />}
        <table className='my-5 p-2 w-full text-center'>
          <thead className='border-b-2 border-sky-900'>
            <tr>
              <th>گزینش</th>
              <th>نام</th>
              <th>نام خانوادگی</th>
              <th>جنسیت</th>
              <th>تلفن تماس</th>
            </tr>
          </thead>
          <tbody>
            {response != null &&
              response.length > 0 &&
              response.map((owner, index) => (
                <tr key={index}>
                  <td>
                    <input type='radio' name='owner' id={owner.id} />
                  </td>
                  <td>{owner.firstName}</td>
                  <td>{owner.lastName}</td>
                  <td>{owner.gender == 0 ? 'آقا' : 'خانم'}</td>
                  <td>{owner.phone}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <input
        type='button'
        value='انتخاب صاحب'
        className='btn btn-md btn-ghost'
        onClick={chooseOwner}
      />
    </PageAnimatable>
  )
}
