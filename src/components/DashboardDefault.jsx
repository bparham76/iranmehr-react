import React from 'react'
import PageAnimatable from './shared/PageAnimatable'

export default function DashboardDefault() {
  return (
    <PageAnimatable>
      <div className='opacity-40 w-full h-screen flex flex-col p-0 m-0 justify-center items-center'>
        <h1 className='font-bold text-2xl'>کلینیک دامپزشکی ایران مهر</h1>
        <p>صفحه اصلی پنل کاربران</p>
      </div>
    </PageAnimatable>
  )
}
