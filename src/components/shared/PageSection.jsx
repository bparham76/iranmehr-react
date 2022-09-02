import React from 'react'

export default function PageSection({ children, border = true }) {
	// let classes = 'border border-solid border-sky-900 rounded-lg'
	let classes = 'shadow-sky-300 shadow-xl rounded-lg'
	return (
		<div className={`w-full p-2 my-2 mt-10 ${border && classes}`}>
			{children}
		</div>
	)
}
