import { useRef, useEffect } from 'react'

export const ShowVisitInfo = ({ setShow, patient }) => {
	const Div = useRef()

	const handleClose = () => {
		Div.current.classList.remove('show')
		setTimeout(() => {
			if (typeof setShow == 'function') setShow(false)
		}, 600)
	}

	useEffect(() => {
		setTimeout(() => {
			Div.current.classList.add('show')
		}, 10)
	}, [])

	return (
		<div
			ref={Div}
			className='alert-box fixed top-0 left-0 w-full bg-white m-0 p-0 flex flex-col gap-4 items-center justify-center z-[1000] '
		>
			<h1 className='font-bold text-3xl'>مشاهده جزئیات مراجعه</h1>
			<div className='h-3/5 w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 overflow-y-scroll'>
				<div className='p-4 text-right'>
					<table className='w-full'>
						<tr>
							<th>تاریخ</th>
							<td>{patient.date}</td>
						</tr>
						<tr>
							<th>نام</th>
							<td>{patient.name}</td>
						</tr>
						<tr>
							<th>صاحب</th>
							<td>{patient.owner}</td>
						</tr>
						<tr>
							<th>جنسیت</th>
							<td>{patient.gender}</td>
						</tr>
						<tr>
							<th>سن</th>
							<td>{patient.age}</td>
						</tr>
						<tr>
							<th>نوع</th>
							<td>{patient.type}</td>
						</tr>
						<tr>
							<th>نژاد</th>
							<td>{patient.race}</td>
						</tr>
					</table>
				</div>
				<div className='p-4 text-right'>
					<table className='w-full whitespace-normal'>
						<tr>
							<th className='py-5'>نشانه ها</th>
							<td>{patient.sympthoms}</td>
						</tr>
						<tr>
							<th className='py-5'>تشخیص</th>
							<td>{patient.diagnosis}</td>
						</tr>
						<tr>
							<th className='py-5'>تجویز</th>
							<td>{patient.treatment}</td>
						</tr>
					</table>
				</div>
			</div>
			<input
				type='button'
				className='btn btn-wide btn-ghost'
				value='بستن'
				onClick={handleClose}
			/>
		</div>
	)
}
