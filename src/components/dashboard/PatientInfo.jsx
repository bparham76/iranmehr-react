import { useEffect, useState, useContext } from 'react'
import { visitContext } from './Visits'
import { BASE_URL } from '../../App'
import axios from 'axios'
import LoadingBackdrop from '../shared/LoadingBackdrop'
import PageAnimatable from '../shared/PageAnimatable'

export default function PatientInfo() {
  const { patientId, setPatientId } = useContext(visitContext)
  const [patientData, setPatientData] = useState(null)
  const [loading, setLoading] = useState(true)

  const getPatientData = async () => {
    if (!loading) return
    const token = localStorage.getItem('token')
    const response = await axios.get(
      BASE_URL + 'patients/find?id=' + patientId,
      {
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + token,
        },
      }
    )
    if (response.status < 400) setPatientData(response.data)
  }

  useEffect(() => {
    getPatientData()
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [patientId])

  const changePatient = () => {
    setPatientId(-1)
  }

  if (loading)
    return (
      <div className='w-full relative p-5'>
        <PageAnimatable>
          <LoadingBackdrop />
        </PageAnimatable>
      </div>
    )

  return (
    <PageAnimatable>
      <div className='w-full flex justify-center items-center p-2'>
        <h1 className='text-xl font-bold'>مشخصات بیمار</h1>
        <table className='w-1/2 my-10'>
          <tr>
            <th className='text-right'>نام</th>
            <td>{patientData.name}</td>
          </tr>
          <tr>
            <th className='text-right'>سن</th>
            <td>{patientData.age}</td>
          </tr>
          <tr>
            <th className='text-right'>جنسیت</th>
            <td>{patientData.gender}</td>
          </tr>
          <tr>
            <th className='text-right'>نوع</th>
            <td>{patientData.type}</td>
          </tr>
          <tr>
            <th className='text-right'>نژاد</th>
            <td>{patientData.race}</td>
          </tr>
        </table>

        <input
          type='button'
          value='تغییر بیمار'
          className='btn btn-block btn-ghost'
          onClick={changePatient}
        />
      </div>
    </PageAnimatable>
  )
}
