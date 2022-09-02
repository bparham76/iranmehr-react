import ChildPage from '../shared/ChildPage'
import PageSection from '../shared/PageSection'
import NewVisit from './NewVisit'
import VisitsList from './VisitsList'
import { useState, createContext } from 'react'

export const visitContext = createContext()

export default function Visits() {
	const [refresh, setRefresh] = useState(false)
	const [patientId, setPatientId] = useState(-1)

	return (
		<ChildPage>
			<visitContext.Provider
				value={{
					refresh,
					setRefresh,
					patientId,
					setPatientId,
				}}
			>
				<div className='m-0 p-2'>
					<h1 className='m-0 my-5 text-3xl font-bold text-center md:text-right'>
						مدیریت مراجعات
					</h1>
					<PageSection>
						<h1 className='mx-5 my-2 text-2xl font-bold text-center md:text-right'>
							افزودن مراجعه جدید
						</h1>
						<NewVisit />
					</PageSection>
					<PageSection>
						<h1 className='mx-5 my-2 text-2xl font-bold text-center md:text-right'>
							فهرست مراجعات
						</h1>
						<VisitsList />
					</PageSection>
				</div>
			</visitContext.Provider>
		</ChildPage>
	)
}
