import { useState, useEffect, useContext } from 'react'
import LoadingBackdrop from '../shared/LoadingBackdrop'
import axios from 'axios'
import { BASE_URL } from '../../App'
import { PatientsContext } from './Patients'
import { toast } from 'react-toastify'

export default function PatientsList() {
	const [isLoading, setIsLoading] = useState(false)
	const [allPatienData, setAllPatientData] = useState([])
	const { refresh } = useContext(PatientsContext)

	useEffect(() => {
		fetchPatientData()
	}, [refresh])

	const fetchPatientData = async () => {
		try {
			setIsLoading(true)
			const token = localStorage.getItem('token')
			const response = await axios.get(BASE_URL + 'patients/all', {
				headers: {
					accept: 'application/json',
					authorization: 'Bearer ' + token,
				},
			})

			if (response.status < 400) {
				setAllPatientData(response.data.patients)
			} else {
				toast('درخواست دریافت اطلاعات توسط سرور رد شد', { type: 'error' })
				setAllPatientData([])
			}
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			setAllPatientData([])
			toast('خطا در برقراری ارتباط با سرور', { type: 'error' })
		}
	}

	return (
		<div
			id='current-patients'
			className='overflow-x-scroll relative m-0'
		>
			{isLoading && <LoadingBackdrop />}
			<div className='w-[250vw] md:w-[150vw] lg:w-full p-5'>
				<table className='w-full'>
					<thead>
						<tr className='grid grid-cols-7 p-3 my-3 border-black border-b-2'>
							<th>ردیف</th>
							<th>نام صاحب</th>
							<th>نام</th>
							<th>سن</th>
							<th>جنسیت</th>
							<th>نوع</th>
							<th>نژاد</th>
						</tr>
					</thead>
					<tbody className='text-center'>
						{!isLoading &&
							allPatienData.length > 0 &&
							allPatienData.map((patient, index) => (
								<tr
									key={index}
									className='grid grid-cols-7 p-3'
								>
									<td>{index + 1}</td>
									<td>
										{patient.owner.firstName + ' ' + patient.owner.lastName}
									</td>
									<td>{patient.name}</td>
									<td>{patient.age}</td>
									<td>{patient.gender == 0 ? 'مذکر' : 'مونث'}</td>
									<td>{patient.type}</td>
									<td>{patient.race}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
