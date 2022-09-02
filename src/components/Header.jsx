import React from 'react'

function Header() {
	return (
		<div
			className='w-full p-2 m-0 text-center text-white md:text-right shadow-md shadow-sky-600'
			style={{ backgroundColor: 'var(--theme-color-1)' }}
		>
			<div className='px-12 py-4'>
				<h1 className='font-bold text-xl md:text-3xl'>
					کلینیک دامپزشکی ایران مهر
				</h1>
				<p>سیستم آنلاین مدیریت پرونده بیماران</p>
			</div>
		</div>
	)
}

export default Header
