import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../App'
import LoadingBackdrop from '../shared/LoadingBackdrop'
import PageAnimatable from '../shared/PageAnimatable'
import { visitContext } from './Visits'

export default function FindOwnerOrPatient() {
  const { refresh, setRefresh, patientId, setPatientId } =
    useContext(visitContext)
  const [searchMethod, setSearchMethod] = useState(-1)
  const [searchData, setSearchData] = useState('')
  const [searchResult, setSearchResult] = useState({})

  useEffect(() => {
    if (searchData.trim().length == 0) return
    handleSearch()
  }, [searchData])

  const handleSearch = async () => {
    if (searchMethod < 0) {
      toast('نوع جستجو را انتخاب کنید.', { type: 'error' })
      return
    }
    setRefresh(true)
    const token = localStorage.getItem('token')
    const response = await axios.get(
      BASE_URL + `patients/search?type=${searchMethod}&search=${searchData}`,
      {
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + token,
        },
      }
    )
    setRefresh(false)
    if (response.status < 400) setSearchResult(response.data)
  }

  const choosePatient = () => {
    const choices = document.querySelectorAll('input[name=patient_id_selector]')
    let p_id = -1
    choices.forEach((c) => {
      if (c.checked) {
        p_id = c.id
      }
    })
    if (p_id < 0) toast('بیماری انتخاب نشده است', { type: 'error' })
    else setPatientId(p_id)
  }

  return (
    <PageAnimatable>
      <label>انتخاب بیمار، جستجو بر اساس</label>
      <select
        onChange={(e) => setSearchMethod(e.target.value)}
        defaultValue={-1}
      >
        <option value={-1}>انتخاب کنید</option>
        <option value={0}>نام صاحب</option>
        <option value={1}>نام بیمار</option>
      </select>
      <input
        onChange={(e) => setSearchData(e.target.value)}
        value={searchData}
        type='text'
        placeholder='عبارت مورد نظر برای جستجو...'
      />
      <div className='w-full relative min-h-[100px] max-h-[500px] overflow-scroll'>
        {refresh && <LoadingBackdrop />}
        <table className='w-full text-center'>
          <thead>
            <tr>
              <th>انتخاب</th>
              <th>نام صاحب</th>
              <th>نام بیمار</th>
            </tr>
          </thead>
          <tbody>
            {!refresh &&
              searchResult.length > 0 &&
              searchResult.map((res, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type='radio'
                      name='patient_id_selector'
                      id={res.id}
                    />
                  </td>
                  <td>
                    {typeof res.owner_name != 'undefined' && res.owner_name}
                  </td>
                  <td>{res.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <input
        type='button'
        onClick={choosePatient}
        className='btn btn-ghost'
        value='انتخاب'
      />
    </PageAnimatable>
  )
}
