import './styles/Footer.css'
import { IoChevronUpCircle } from 'react-icons/io5'

function Footer() {
  return (
    <div className='footer w-full m-0 p-0 text-white text-center flex flex-col gap-0'>
      <div className='w-full flex m-0 p-5 justify-center items-center'>
        <div className='w-full grid md:grid-cols-3 gap-4 p-0 my-5'>
          <div className='p-2 md:p-5 lg:p-10'>first</div>
          <div className='p-2 md:p-5 lg:p-10'>second</div>
          <div className='p-2 md:p-5 lg:p-10'>third</div>
        </div>
      </div>
      <div className='w-full m-0 p-0'>
        <button onClick={() => window.scrollTo(0, 0)}>
          <IoChevronUpCircle />
        </button>
      </div>
      <div className='w-full flex justify-center items-center p-10 my-5'>
        <h3>
          کلیه حقوق این وبسایت برای کلینیک دامپزشکی ایران مهر محفوظ است. &copy;
          1401 - 2022
        </h3>
      </div>
    </div>
  )
}

export default Footer
