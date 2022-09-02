import './styles/Footer.css'
import { IoChevronUpCircle } from 'react-icons/io5'

function Footer() {
	return (
		<div className='footer w-full m-0 p-0 mt-10 text-white text-center flex flex-col gap-0'>
			<div className='w-full m-0 p-0 pt-10'>
				<button onClick={() => window.scrollTo(0, 0)}>
					<IoChevronUpCircle />
				</button>
			</div>
			<div className='w-full flex justify-center items-center p-10 my-5 flex-col gap-0'>
				<h3 className='m-0 p-0'>
					کلیه حقوق این وبسایت برای کلینیک دامپزشکی ایران مهر محفوظ است. &copy;
					1401 - 2022
				</h3>
				<br />
				<p className='m-0 p-0 underline'>
					<a
						href='https://wa.me/989117186757'
						target='_blank'
					>
						طراحی و توسعه
					</a>
				</p>
			</div>
		</div>
	)
}

export default Footer
