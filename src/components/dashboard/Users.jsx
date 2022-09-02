import { createContext, useEffect, useState } from 'react'
import UsersList from './UsersList'
import NewUser from './NewUser'
import ChildPage from '../shared/ChildPage'
import PageAnimatable from '../shared/PageAnimatable'
import PageSection from '../shared/PageSection'

export const UsersContext = createContext()

export default function Users() {
	const [refresh, setRefresh] = useState(true)

	return (
		<ChildPage>
			<div className='m-0 p-2'>
				<UsersContext.Provider value={{ refresh, setRefresh }}>
					<h1 className='m-0 my-5 text-3xl font-bold text-center md:text-right'>
						مدیریت کاربران
					</h1>
					<PageSection>
						<h1 className='mx-5 my-2 text-2xl font-bold text-center md:text-right'>
							افزودن کاربر جدید
						</h1>
						<p className='mx-5 text-justify'>
							برای تغییر در دسترسی کاربران با پشتیبانی تماس بگیرید.
						</p>
						<NewUser />
					</PageSection>
					<PageSection>
						<h1 className='mx-5 my-2 text-2xl font-bold text-center md:text-right'>
							فهرست کاربران
						</h1>
						<UsersList />
					</PageSection>
				</UsersContext.Provider>
			</div>
		</ChildPage>
	)
}
