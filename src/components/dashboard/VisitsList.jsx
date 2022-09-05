import { BASE_URL } from '../../App'
import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import { visitContext } from './Visits'
import LoadingBackdrop from '../shared/LoadingBackdrop'

export default function VisitsList() {
	const { refresh } = useContext(visitContext)
	const [allVisitData, setAllVisitData] = useState([])
	const [loading, setLoading] = useState(true)

	const fetchAllVisitData = async () => {
		const token = localStorage.getItem('token')
		setLoading(true)
		const response = await axios.get(BASE_URL + 'checkups/all', {
			headers: {
				accept: 'application/json',
				authorization: 'Bearer ' + token,
			},
		})
		if (response.status < 400) {
			setAllVisitData(response.data)
		}
		setLoading(false)
	}

	useEffect(() => {
		fetchAllVisitData()
	}, [refresh])

	if (refresh || loading)
		return (
			<div className='w-full h-[100px] relative'>
				<LoadingBackdrop />
			</div>
		)
	return (
		<div className='overflow-x-scroll'>
			<div className='w-[200%] md:w-[150%] lg:w-full p-4'>
				<table className='w-full'>
					<thead className='border-b-2 border-black'>
						<tr className='grid grid-cols-7 p-3'>
							<th>ردیف</th>
							<th>افزوده شده توسط</th>
							<th>نام صاحب</th>
							<th>نام</th>
							<th>جنسیت</th>
							<th>سن</th>
							<th>تاریخ رجوع</th>
						</tr>
					</thead>
					<tbody className='text-center'>
						{!loading &&
							!refresh &&
							allVisitData.map((v, i) => (
								<tr
									key={i}
									className='grid grid-cols-7 p-3'
								>
									<td>{i + 1}</td>
									<td>{v.added_by}</td>
									<td>{v.owner_name}</td>
									<td>{v.patient_name}</td>
									<td>{v.patient_gender}</td>
									<td>{v.patient_age}</td>
									<td>{v.year + '/' + v.month + '/' + v.day}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
