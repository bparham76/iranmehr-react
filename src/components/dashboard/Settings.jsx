import React from 'react'
import ChildPage from '../shared/ChildPage'
import PageSection from '../shared/PageSection'
import MobileContainer from '../shared/MobileContainer'

export default function Settings() {
	return (
		<ChildPage>
			<div className='m-0 p-2'>
				<h1 className='m-0 my-5 text-3xl font-bold text-center md:text-right'>
					تنظیمات کلی وبسایت
				</h1>
				<PageSection>
					<div>Settings</div>
					<MobileContainer border={true}>
						<div>hello</div>
						<div>hello</div>
						<div>hello</div>
						<div>hello</div>
						<div>hello</div>
						<div>hello</div>
					</MobileContainer>
				</PageSection>
				<PageSection></PageSection>
				<PageSection></PageSection>
				<PageSection></PageSection>
			</div>
		</ChildPage>
	)
}
