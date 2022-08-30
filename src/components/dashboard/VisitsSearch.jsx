import ChildPage from '../shared/ChildPage'
import MobileContainer from '../shared/MobileContainer'
import PageSection from '../shared/PageSection'
import { useState } from 'react'
import { useEffect } from 'react'
import PageAnimatable from '../shared/PageAnimatable'
import LoadingBackdrop from '../shared/LoadingBackdrop'
import axios from 'axios'
import { BASE_URL } from '../../App'

export default function VisitsSearch() {
  const [searchMethod, setSearchMethod] = useState(0)
  const [searchByOwnerName, setSearchByOwnerName] = useState('')
  const [searchByPatientName, setSearchByPatientName] = useState('')
  const [searchByVisitDate, setSearchByVisitDate] = useState({
    day: 0,
    month: 0,
    year: 0,
  })
  const [searchResult, setSearchResult] = useState([
    {
      name: '',
      owner: '',
      gender: '',
      age: '',
      date: '',
    },
    {
      name: '',
      owner: '',
      gender: '',
      age: '',
      date: '',
    },
  ])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setSearchByOwnerName('')
    setSearchByPatientName('')
    setSearchByVisitDate({
      day: 0,
      month: 0,
      year: 0,
    })
    setSearchResult([])
  }, [searchMethod])

  const searchMethod1 = (
    <PageAnimatable>
      <label>جستجو بر اساس نام صاحب</label>
      <input
        type='text'
        placeholder='نام صاحب را وارد کنید'
        value={searchByOwnerName}
        onChange={(e) => {
          setSearchByOwnerName(e.target.value)
          setTimeout(() => {
            fetchDataByOwnerName()
          }, 500)
        }}
      />
    </PageAnimatable>
  )

  const searchMethod2 = (
    <PageAnimatable>
      <label>جستجو بر اساس نام بیمار</label>
      <input
        type='text'
        placeholder='نام بیمار را وارد کنید'
        value={searchByPatientName}
        onChange={(e) => {
          setSearchByPatientName(e.target.value)
          setTimeout(() => {
            fetchDataByPatientName()
          }, 500)
        }}
      />
    </PageAnimatable>
  )

  let days = [],
    months = [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ],
    years = []

  for (let i = 1; i < 32; i++) days[i] = i
  for (let i = 1400; i < 1450; i++) years[i] = i

  const searchMethod3 = (
    <PageAnimatable>
      <label>تاریخ مورد نظر را انتخاب کنید</label>
      <div className='normal w-full flex'>
        <select
          className='w-[28%]'
          defaultValue={-1}
          onChange={(e) => {
            setSearchByVisitDate({ ...searchByVisitDate, day: e.target.value })
            setTimeout(() => {
              fetchDataByDate()
            }, 500)
          }}
        >
          <option value={-1}>روز</option>
          {days.map((d) => (
            <option value={d} key={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          className='w-[28%]'
          defaultValue={-1}
          onChange={(e) =>
            setSearchByVisitDate({
              ...searchByVisitDate,
              month: e.target.value,
            })
          }
        >
          <option value={-1}>ماه</option>
          {months.map((d, i) => (
            <option value={i + 1} key={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          className='w-[28%]'
          defaultValue={-1}
          onChange={(e) =>
            setSearchByVisitDate({ ...searchByVisitDate, year: e.target.value })
          }
        >
          <option value={-1}>سال</option>
          {years.map((d) => (
            <option value={d} key={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <input
        type='button'
        value='جستجو'
        className='btn btn-block btn-primary'
      />
    </PageAnimatable>
  )

  const changeSearchMethod = () => {
    document.querySelectorAll('input[name="search-method"]').forEach((c) => {
      if (c.checked) setSearchMethod(c.id)
    })
  }

  const fetchDataByOwnerName = async () => {
    if (searchMethod != 1 || searchByOwnerName.trim().length == 0) return
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.get(
        BASE_URL + 'checkups/find/owner?name=' + searchByOwnerName,
        {
          headers: {
            accept: 'application/json',
            authorization: 'Bearer ' + token,
          },
        }
      )
      if (response.status < 400) setSearchResult(response.data)
      setLoading(false)
    } catch (error) {}
  }

  const fetchDataByPatientName = async () => {
    if (searchMethod != 2 || searchByPatientName.trim().length == 0) return
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.get(
        BASE_URL + 'checkups/find/patient?name=' + searchByPatientName,
        {
          headers: {
            accept: 'application/json',
            authorization: 'Bearer ' + token,
          },
        }
      )
      if (response.status < 400) setSearchResult(response.data)
      setLoading(false)
    } catch (error) {}
  }

  const fetchDataByDate = async () => {
    if (searchMethod != 3 || searchByVisitDate.trim().length == 0) return
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.get(
        BASE_URL +
          'checkups/find/date?year=' +
          searchByVisitDate.year +
          '&month=' +
          searchByVisitDate.month +
          '&day =' +
          searchByVisitDate.day,
        {
          headers: {
            accept: 'application/json',
            authorization: 'Bearer ' + token,
          },
        }
      )
      if (response.status < 400) setSearchResult(response.data)
      setLoading(false)
    } catch (error) {}
  }

  return (
    <ChildPage>
      <div className='m-0 p-2'>
        <h1 className='text-3xl font-bold my-5 text-center md:text-right'>
          جستجو در مراجعات
        </h1>
        <PageSection>
          <h1 className='text-2xl font-bold mx-5 my-2 text-center md:text-right'>
            جستجو...
          </h1>
          <MobileContainer>
            <PageSection border={false}>
              <label>جستجو بر اساس...</label>
              <label>
                <input
                  id='1'
                  type='radio'
                  name='search-method'
                  className='ml-5'
                  onClick={changeSearchMethod}
                />
                نام صاحب
              </label>
              <label>
                <input
                  id='2'
                  type='radio'
                  name='search-method'
                  className='ml-5'
                  onClick={changeSearchMethod}
                />
                نام بیمار
              </label>
              <label>
                <input
                  id='3'
                  type='radio'
                  name='search-method'
                  className='ml-5'
                  onClick={changeSearchMethod}
                />
                تاریخ مراجعه
              </label>
            </PageSection>
            <PageSection border={false}>
              {searchMethod == 1 && searchMethod1}
              {searchMethod == 2 && searchMethod2}
              {searchMethod == 3 && searchMethod3}
            </PageSection>
          </MobileContainer>
        </PageSection>
        <PageSection>
          <div className='relative w-full'>
            {loading && <LoadingBackdrop />}
            <table className='w-full'>
              <thead className='border-b-2 border-black'>
                <tr className='grid grid-cols-7 p-3'>
                  <th>ردیف</th>
                  <th>کنترل</th>
                  <th>نام صاحب</th>
                  <th>نام</th>
                  <th>جنسیت</th>
                  <th>سن</th>
                  <th>تاریخ رجوع</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {!loading &&
                  typeof searchResult != null &&
                  searchResult.length > 0 &&
                  searchResult.map((item, index) => (
                    <tr className='grid grid-cols-7 p-3'>
                      <td>{index + 1}</td>
                      <td>نمایش</td>
                      <td>{item.owner}</td>
                      <td>{item.name}</td>
                      <td>{item.gender}</td>
                      <td>{item.age}</td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </PageSection>
      </div>
    </ChildPage>
  )
}
