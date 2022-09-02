import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { BASE_URL } from '../../App'
import { toast } from 'react-toastify'
import PageAnimatable from '../shared/PageAnimatable'

export default function ChildPage({ children }) {
	const [isLoading, setIsLoading] = useState(true)
	const [auth, setAuth] = useState(false)

	useEffect(() => {
		const checkAuthState = async () => {
			try {
				const token = localStorage.getItem('token')
				const user_id = localStorage.getItem('user_id')
				const response = await axios.post(
					BASE_URL + 'user/data',
					{ user_id: user_id },
					{
						headers: {
							accept: 'application/json',
							'Access-Control-Allow-Origin': '*',
							Authorization: `Bearer ${token}`,
						},
					},
				)

				setIsLoading(false)
				if (response.status > 400) {
					setAuth(false)
					localStorage.clear()
				} else setAuth(true)
			} catch (error) {
				setIsLoading(false)
				setAuth(false)
				localStorage.clear()
			}
		}

		checkAuthState()
	}, [])

	if (isLoading) {
		return (
			<div className='w-full flex justify-center content-center p-10'>
				<h1>در حال بارگذاری...</h1>
			</div>
		)
	} else if (!isLoading && !auth) {
		toast('خطا در اعتبارسنجی، لطفا دوباره وارد شوید.', { type: 'error' })
		return <Navigate to='/sign-in' />
	}

	return (
		<div className='w-full m-0 p-0'>
			<PageAnimatable>{children}</PageAnimatable>
		</div>
	)
}
