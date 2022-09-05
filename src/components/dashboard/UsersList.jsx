import { useEffect, useState, useContext } from 'react'
import LoadingBackdrop from '../shared/LoadingBackdrop'
import axios from 'axios'
import { BASE_URL } from '../../App'
import { UsersContext } from './Users'

export default function UsersList() {
	const [isLoading, setIsLoading] = useState(true)
	const [allUserData, setAllUserData] = useState([])
	const { refresh, setRefresh } = useContext(UsersContext)

	useEffect(() => {
		if (!refresh) return
		const getAllUserData = async () => {
			const token = localStorage.getItem('token')
			const response = await axios.post(BASE_URL + 'user/get-all', null, {
				headers: {
					Accept: 'application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: `Bearer ${token}`,
				},
			})

			setIsLoading(false)
			if (response.status < 400) {
				setAllUserData(response.data.all_users)
				setRefresh(false)
			}
		}
		getAllUserData()
	}, [refresh])

	const editUser = async id => {}

	const deleteUser = async (id, index) => {
		// alert(id)
		if (
			!window.confirm(
				`آیا مایل به حذف کاربر ${allUserData[index].first_name} ${allUserData[index].last_name} هستید؟`,
			)
		)
			return

		setRefresh(true)
		const token = localStorage.getItem('token')
		const response = await axios.post(
			BASE_URL + 'user/delete',
			{ id: id },
			{
				headers: {
					accept: 'application/json',
					authorization: 'Bearer ' + token,
				},
			},
		)
		setRefresh(false)
	}

	return (
		<div
			id='current-users'
			className='overflow-x-scroll relative m-0'
		>
			{isLoading && <LoadingBackdrop />}
			<div className='w-[200%] md:w-[150%] lg:w-full p-5'>
				<table className='w-full'>
					<thead>
						<tr className='grid grid-cols-6 p-3 border-black border-b-2'>
							<th>ردیف</th>
							<th>نام</th>
							<th>نام خانوادگی</th>
							<th>نقش</th>
							<th>تلفن همراه</th>
							<th>نام کاربری</th>
						</tr>
					</thead>
					<tbody className='text-center'>
						{!isLoading &&
							allUserData.length > 0 &&
							allUserData.map((user, index) => (
								<tr
									key={index}
									className='grid grid-cols-6 p-3'
								>
									<td>{index + 1}</td>
									<td>{user.first_name}</td>
									<td>{user.last_name}</td>
									<td>{user.role == 0 ? 'مدیر' : 'کاربر'}</td>
									<td>{user.phone}</td>
									<td>{user.username}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
