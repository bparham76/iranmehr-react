import { useState, useEffect, useContext } from 'react'
import MobileContainer from '../shared/MobileContainer'
import PageSection from '../shared/PageSection'
import '../styles/Form-input.css'
import NewOwner from './NewOwner'
import FindOwner from './FindOwner'
import { PatientsContext } from './Patients'
import OwnerInfo from './OwnerInfo'
import axios from 'axios'
import { BASE_URL } from '../../App'
import { toast } from 'react-toastify'
import toEnDigit from '../../helpers/toEnDigit'

export default function NewPatient() {
  const {
    ownerState,
    setOwnerState,
    isOwnerNew,
    setIsOwnerNew,
    ownerData,
    setOwnerData,
    refresh,
    setRefresh,
  } = useContext(PatientsContext)

  const [animalNames, setAnimalNames] = useState({})
  const [animalRaces, setAnimalRaces] = useState({})

  const [_patientData, _setPatientData] = useState({
    name: '',
    age: 0,
    gender: -1,
    type: -1,
    race: -1,
    owner_id: -1,
  })

  useEffect(() => {
    getAnimalNames()
  }, [])

  const getAnimalNames = async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get(BASE_URL + 'animals/all', {
      headers: {
        accept: 'application/json',
        authorization: 'Bearer ' + token,
      },
    })
    if (response.status < 400) setAnimalNames(response.data)
  }

  const getAnimalRaces = async (animal_id) => {
    const token = localStorage.getItem('token')
    const response = await axios.get(
      BASE_URL + 'animals/races?id=' + animal_id,
      {
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + token,
        },
      }
    )
    if (response.status < 400) setAnimalRaces(response.data)
  }

  const ownerFormChange = () => {
    const oldForm = document.getElementById('old-form')
    if (oldForm.checked) setIsOwnerNew(-1)
    else setIsOwnerNew(1)
  }

  const regNewPatient = async () => {
    setRefresh(true)
    try {
      if (!ownerData || !ownerData.id) {
        toast('صاحب انتخاب نشده است', { type: 'error' })
        return
      } else if (_patientData.name.trim().length == 0) {
        toast('نام بیمار را وارد کنید', { type: 'error' })
        return
      } else if (_patientData.age == 0) {
        toast('سن بیمار را وارد کنید', { type: 'error' })
        return
      } else if (_patientData.gender < 0) {
        toast('جنسیت را انتخاب کنید', { type: 'error' })
        return
      } else if (_patientData.type < 0) {
        toast('نوع را انتخاب کنید', { type: 'error' })
        return
      } else if (_patientData.race < 0) {
        toast('نژاد را انتخاب کنید', { type: 'error' })
        return
      }

      const token = localStorage.getItem('token')
      const response = await axios.post(
        BASE_URL + 'patients/add',
        { ..._patientData, owner_id: ownerData.id },
        {
          headers: {
            accept: 'application/json',
            authorization: 'Bearer ' + token,
          },
        }
      )

      if (response.status < 400) {
        toast('بیمار جدید با موفقیت ثبت شد.', { type: 'success' })
        setOwnerState(false)
        setOwnerData({})
        setIsOwnerNew(0)
        _setPatientData({
          name: '',
          age: '',
          gender: -1,
          type: -1,
          race: -1,
          owner_id: -1,
        })
      } else toast('مشکلی در ثبت بیمار جدید پیش آمد', { type: 'error' })

      setRefresh(false)
    } catch (error) {
      setRefresh(false)
      toast('خطا در برقراری ارتباط با سرور', { type: 'error' })
    }
  }

  return (
    <MobileContainer>
      <PageSection border={false}>
        <div className='my-2'>
          <h3 className='font-bold text-xl pb-5'>مشخصات صاحب</h3>
          {ownerState ? (
            <OwnerInfo />
          ) : (
            <>
              <label>
                <input
                  className='ml-5'
                  type='radio'
                  name='ownerType'
                  id='old-form'
                  onClick={ownerFormChange}
                />
                انتخاب مشخصات قبلی
              </label>
              <label className='pb-5'>
                <input
                  className='ml-5'
                  type='radio'
                  name='ownerType'
                  onClick={ownerFormChange}
                />
                ثبت مشخصات جدید
              </label>
              {isOwnerNew == 1 && <NewOwner />}
              {isOwnerNew == -1 && <FindOwner />}
            </>
          )}
        </div>
      </PageSection>
      <PageSection border={false}>
        <div className='my-2'>
          <h3 className='font-bold text-xl pb-5'>مشخصات حیوان</h3>
          <label>نام</label>
          <input
            type='text'
            placeholder='نام'
            value={_patientData.name}
            onChange={(e) =>
              _setPatientData({ ..._patientData, name: e.target.value })
            }
          />
          <label>سن</label>
          <input
            type='text'
            placeholder='سن'
            value={_patientData.age}
            onChange={(e) =>
              _setPatientData({
                ..._patientData,
                age: toEnDigit(e.target.value),
              })
            }
          />
          <label>جنسیت</label>
          <select
            onChange={(e) =>
              _setPatientData({ ..._patientData, gender: e.target.value })
            }
            defaultValue={-1}
          >
            <option value={-1}>انتخاب کنید</option>
            <option value={0}>نر</option>
            <option value={1}>ماده</option>
          </select>
          <label>نوع</label>
          <select
            onChange={(e) => {
              _setPatientData({
                ..._patientData,
                type: e.target.value,
                race: -1,
              })
              document.getElementById('race').value = -1
              if (e.target.value > 0) getAnimalRaces(e.target.value)
            }}
            defaultValue={-1}
          >
            <option value={-1}>انتخاب کنید</option>
            {typeof animalNames != null &&
              animalNames.length > 0 &&
              animalNames.map((animal, index) => (
                <option key={index} value={animal.id}>
                  {animal.name}
                </option>
              ))}
          </select>
          <label>نژاد</label>
          <select
            id='race'
            onChange={(e) =>
              _setPatientData({ ..._patientData, race: e.target.value })
            }
            defaultValue={-1}
          >
            <option value={-1}>انتخاب کنید</option>
            {typeof animalRaces != null &&
              animalRaces.length > 0 &&
              animalRaces.map((race, index) => (
                <option key={index} value={race.id}>
                  {race.name}
                </option>
              ))}
          </select>
          <input
            type='button'
            className='btn btn-md btn-primary'
            value='ثبت بیمار جدید'
            onClick={regNewPatient}
          />
        </div>
      </PageSection>
    </MobileContainer>
  )
}
