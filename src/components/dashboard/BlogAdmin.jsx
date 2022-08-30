import React from 'react'
import PageAnimatable from '../shared/PageAnimatable'
import ChildPage from '../shared/ChildPage'
import PageSection from '../shared/PageSection'

export default function BlogAdmin() {
  return (
    <ChildPage>
      <div className='m-0 p-2'>
        <h1 className='m-0 my-5 text-3xl font-bold text-center md:text-right'>
          مدیریت و تنظیمات بلاگ
        </h1>
        <PageSection>
          <div>Blog Admin</div>
        </PageSection>
        <PageSection></PageSection>
        <PageSection></PageSection>
        <PageSection></PageSection>
      </div>
    </ChildPage>
  )
}
