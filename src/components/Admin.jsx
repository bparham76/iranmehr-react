import './styles/Admin.css'
import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../App'
import { toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Admin() {
	const navigate = useNavigate()
	const [authState, setAuthState] = useState(true)

	const dashPatients = () => navigate('/dashboard/patients')
	const dashUsers = () => navigate('/dashboard/users')
	const dashVisits = () => navigate('/dashboard/visits')
	const dashSearchVisits = () => navigate('/dashboard/visits-search')
	const dashSettings = () => navigate('/dashboard/settings')
	const dashBlogSettings = () => navigate('/dashboard/blog-settings')

	const logoutProcess = async () => {
		try {
			const token = localStorage.getItem('token')
			const response = await axios.post(BASE_URL + 'user/logout', '', {
				headers: {
					accapt: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.status < 400) {
				localStorage.clear()
				setAuthState(false)
				toast('با موفقیت خارج شدید.', { type: 'success' })
			} else {
				toast('خطایی رخ داده است.', { type: 'error' })
			}
		} catch (error) {
			toast('خطایی رخ داده است.', { type: 'error' })
		}
	}

	if (!authState) return <Navigate to='/sign-in' />

	return (
		<div
			id='admin-panel'
			className='w-full my-5 p-5 shadow-sky-300 shadow-xl rounded-xl'
		>
			<h1 className='text-center w-full font-bold text-3xl my-5'>
				دسترسی سریع
			</h1>
			<button
				onClick={dashSearchVisits}
				className='my-1 btn btn-block btn-primary'
			>
				جستجو در مراجعات
			</button>
			<button
				onClick={dashVisits}
				className='my-1 btn btn-block btn-primary'
			>
				مدیریت مراجعات
			</button>
			<button
				onClick={dashPatients}
				className='my-1 btn btn-block btn-primary'
			>
				مدیریت بیماران
			</button>
			<button
				onClick={dashUsers}
				className='my-1 btn btn-block btn-primary'
			>
				مدیریت کاربران
			</button>
			<button
				onClick={logoutProcess}
				className='my-1 btn btn-block btn-primary'
			>
				خروج از سیستم
			</button>
		</div>
	)
}
