import { useContext } from 'react'
import PageAnimatable from '../shared/PageAnimatable'
import { PatientsContext } from './Patients'

export default function OwnerInfo() {
  const { ownerData, setOwnerState, setOwnerData, setIsOwnerNew } =
    useContext(PatientsContext)

  const chooseAnother = () => {
    setOwnerData({})
    setOwnerState(false)
    setIsOwnerNew(0)
  }

  return (
    <PageAnimatable>
      <table className='w-full text-right m-5 text-lg'>
        <tbody>
          <tr>
            <th>نام</th>
            <td>{ownerData.firstName}</td>
          </tr>
          <tr>
            <th>نام خانوادگی</th>
            <td>{ownerData.lastName}</td>
          </tr>
          <tr>
            <th>جنسیت</th>
            <td>{ownerData.gender == 0 ? 'آقا' : 'خانم'}</td>
          </tr>
          <tr>
            <th>تلفن تماس</th>
            <td>{ownerData.phone}</td>
          </tr>
        </tbody>
      </table>
      <input
        type='button'
        value='تغییر صاحب'
        className='btn btn-md btn-ghost'
        onClick={chooseAnother}
      />
    </PageAnimatable>
  )
}
