import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { ReactComponent as NotFoundLogo } from '../resource/notFound.svg'
import PageAnimatable from '../components/shared/PageAnimatable'

export default function NotFound() {
  return (
    <PageAnimatable>
      <div className='py-[30vh] w-full flex flex-col gap-5 items-center content-center min-h-[200px] p-5'>
        <div>
          <div className='flex justify-center'>
            <NotFoundLogo className='w-20 h-20 my-5' />
          </div>
          <h1 className='w-full text-2xl font-bold text-center'>
            متاسفانه صفحه مورد نظر پیدا نشد...
          </h1>
        </div>
        <div>
          <Link to='/' className='flex flex-row align-baseline'>
            <FiArrowRight />
            <p> بازگشت به خانه...</p>
          </Link>
        </div>
      </div>
    </PageAnimatable>
  )
}
