import PageAnimatable from '../shared/PageAnimatable'
import ChildPage from '../shared/ChildPage'
import PageSection from '../shared/PageSection'
import NewPatient from './NewPatient'
import PatientsList from './PatientsList'
import AnimalsManager from './AnimalsManager'
import { useState, createContext } from 'react'

export const PatientsContext = createContext()

export default function Patients() {
  const [refresh, setRefresh] = useState(true)
  const [ownerData, setOwnerData] = useState({})
  const [ownerState, setOwnerState] = useState(false)
  const [isOwnerNew, setIsOwnerNew] = useState(0)

  return (
    <ChildPage>
      <div className='m-0 p-2'>
        <PatientsContext.Provider
          value={{
            refresh,
            setRefresh,
            ownerData,
            setOwnerData,
            ownerState,
            setOwnerState,
            isOwnerNew,
            setIsOwnerNew,
          }}
        >
          <h1 className='m-0 my-5 text-3xl font-bold text-center md:text-right'>
            مدیریت بیماران
          </h1>
          <PageSection>
            <h1 className='mx-5 my-2 text-2xl font-bold text-center md:text-right'>
              افزودن بیمار جدید
            </h1>
            <NewPatient />
          </PageSection>
          <PageSection>
            <h1 className='mx-5 my-2 text-2xl font-bold text-center md:text-right'>
              افزودن نژاد و نوع حیوانات
            </h1>
            <AnimalsManager />
          </PageSection>
          <PageSection>
            <h1 className='mx-5 my-2 text-2xl font-bold text-center md:text-right'>
              فهرست بیماران
            </h1>
            <PatientsList />
          </PageSection>
        </PatientsContext.Provider>
      </div>
    </ChildPage>
  )
}
