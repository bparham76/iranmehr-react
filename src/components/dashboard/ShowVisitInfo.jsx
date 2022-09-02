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
			className='alert-box fixed top-0 left-0 w-full bg-white m-0 p-0 flex flex-col items-center justify-center z-[1000]'
		>
			<p>{patient.name}</p>
			<p>{patient.sympthoms}</p>
			<input
				type='button'
				className='btn btn-wide btn-ghost'
				value='بستن'
				onClick={handleClose}
			/>
		</div>
	)
}
