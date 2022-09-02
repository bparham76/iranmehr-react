import PageAnimatable from '../components/shared/PageAnimatable'
import Admin from '../components/Admin'
import { useParams } from 'react-router-dom'

import Users from '../components/dashboard/Users'
import Patients from '../components/dashboard/Patients'
import Visits from '../components/dashboard/Visits'
import DashboardDefault from '../components/DashboardDefault'
import Settings from '../components/dashboard/Settings'
import BlogAdmin from '../components/dashboard/BlogAdmin'
import VisitsSearch from '../components/dashboard/VisitsSearch'

function Dashboard() {
	const { stage } = useParams()

	let currentPage = null

	switch (stage) {
		case 'users':
			currentPage = <Users />
			break
		case 'patients':
			currentPage = <Patients />
			break
		case 'visits':
			currentPage = <Visits />
			break
		case 'visits-search':
			currentPage = <VisitsSearch />
			break
		// case 'settings':
		//   currentPage = <Settings />
		//   break
		case 'blog-settings':
			currentPage = <BlogAdmin />
			break
		default:
			break
	}

	return (
		<PageAnimatable>
			<div className='w-full p-0 m-0 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
				<div className='col-span-1 m-0 p-2'>
					<Admin />
				</div>
				<div className='col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 m-0 p-2'>
					{currentPage ? currentPage : <DashboardDefault />}
				</div>
			</div>
		</PageAnimatable>
	)
}

export default Dashboard
