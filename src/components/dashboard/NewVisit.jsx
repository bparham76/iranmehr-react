import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../App'
import MobileContainer from '../shared/MobileContainer'
import FindOwnerOrPatient from './FindOwnerOrPatient'
import PatientInfo from './PatientInfo'
import { visitContext } from './Visits'

export default function NewVisit() {
  const { patientId, setPatientId, setRefresh } = useContext(visitContext)

  let days = [],
    months = [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ],
    years = []

  for (let i = 1; i < 32; i++) days[i] = i
  for (let i = 1400; i < 1450; i++) years[i] = i

  useEffect(() => {
    setVisitData({ ...visitData, patient_id: patientId })
  }, [patientId])

  const [visitData, setVisitData] = useState({
    patient_id: -1,
    day: 0,
    month: 0,
    year: 0,
    sympthoms: '',
    diagnosis: '',
    treatment: '',
  })

  const clearFormData = () => {
    document.getElementById('s-day').value = -1
    document.getElementById('s-month').value = -1
    document.getElementById('s-year').value = -1
    setPatientId(-1)
    setVisitData({
      patient_id: -1,
      day: 0,
      month: 0,
      year: 0,
      sympthoms: '',
      diagnosis: '',
      treatment: '',
    })
  }

  const sendFormData = async () => {
    if (visitData.patientId < 0) {
      toast('بیمار انتحاب نشده است', { type: 'error' })
      return
    } else if (visitData.day == 0) {
      toast('روز انتخاب نشده است', { type: 'error' })
      return
    } else if (visitData.month == 0) {
      toast('ماه انتخاب نشده است', { type: 'error' })
      return
    } else if (visitData.year == 0) {
      toast('سال انتخاب نشده است', { type: 'error' })
      return
    } else if (visitData.sympthoms.trim().length == 0) {
      toast('نشانه های بیماری نمی تواند خالی باشد', { type: 'error' })
      return
    } else if (visitData.diagnosis.trim().length == 0) {
      toast('تشخیص نمی تواند خالی باشد', { type: 'error' })
      return
    } else if (visitData.treatment.trim().length == 0) {
      toast('تجویز نمی تواند خالی باشد', { type: 'error' })
      return
    }
    try {
      setRefresh(true)
      const token = localStorage.getItem('token')
      const response = await axios.post(BASE_URL + 'checkups/add', visitData, {
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + token,
        },
      })
      setRefresh(false)
      toast('پرونده مراجعه با موفقیت ثبت شد', { type: 'success' })
      clearFormData()
    } catch (error) {
      setRefresh(false)
      toast('خطایی در ثبت پرونده مراجعه جدید پیش آمده است', { type: 'error' })
    }
  }

  return (
    <MobileContainer>
      <div>{patientId < 0 ? <FindOwnerOrPatient /> : <PatientInfo />}</div>
      <div>
        <label>تاریخ مراجعه</label>
        <div className='normal w-full'>
          <select
            id='s-day'
            className='w-[28%]'
            defaultValue={-1}
            onChange={(e) =>
              setVisitData({ ...visitData, day: e.target.value })
            }
          >
            <option value={-1}>روز</option>
            {days.map((d) => (
              <option value={d} key={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            id='s-month'
            className='w-[28%]'
            defaultValue={-1}
            onChange={(e) =>
              setVisitData({ ...visitData, month: e.target.value })
            }
          >
            <option value={-1}>ماه</option>
            {months.map((d, i) => (
              <option value={i + 1} key={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            id='s-year'
            className='w-[28%]'
            defaultValue={-1}
            onChange={(e) =>
              setVisitData({ ...visitData, year: e.target.value })
            }
          >
            <option value={-1}>سال</option>
            {years.map((d) => (
              <option value={d} key={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>نشانه های بیماری</label>
          <textarea
            value={visitData.sympthoms}
            cols='30'
            rows='5'
            placeholder='نشانه های بیماری'
            onChange={(e) =>
              setVisitData({ ...visitData, sympthoms: e.target.value })
            }
          ></textarea>
          <label>تشخیص</label>
          <textarea
            value={visitData.diagnosis}
            cols='30'
            rows='5'
            placeholder='تشخیص'
            onChange={(e) =>
              setVisitData({ ...visitData, diagnosis: e.target.value })
            }
          ></textarea>
          <label>تجویز</label>
          <textarea
            value={visitData.treatment}
            cols='30'
            rows='5'
            placeholder='تجویز'
            onChange={(e) =>
              setVisitData({ ...visitData, treatment: e.target.value })
            }
          ></textarea>
        </div>
      </div>
      <div>
        <input
          type='button'
          value='خالی کردن فرم'
          className='btn btn-ghost'
          onClick={clearFormData}
        />
      </div>
      <div>
        <input
          type='button'
          value='ثبت'
          className='btn btn-primary'
          onClick={sendFormData}
        />
      </div>
    </MobileContainer>
  )
}
