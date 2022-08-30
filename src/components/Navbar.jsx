import './styles/Navbar.css'
import { FaBars } from 'react-icons/fa'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const navMenuRef = useRef()
  const navBDRef = useRef()

  const navToggler = () => {
    navMenuRef.current.classList.toggle('show')
    navBDRef.current.classList.toggle('show')
    navMenuRef.current.classList.toggle('delay-me')
    navBDRef.current.classList.toggle('delay-me')
  }

  const closeMenu = () => {
    navMenuRef.current.classList.remove('show')
    navBDRef.current.classList.remove('show')
  }

  const menu_items = [
    { name: 'صفحه اصلی', href: '/' },
    { name: 'داشبورد', href: 'dashboard' },
    { name: 'بلاگ', href: 'blog' },
    { name: 'درباره ما', href: 'about' },
  ]

  return (
    <>
      <div
        id='nav-bd'
        className='delay-me'
        style={{ zIndex: 10000 }}
        ref={navBDRef}
      ></div>
      <div id='mobile-nav' style={{ zIndex: 10001 }} className='w-full'>
        <div id='navbar' className='w-full p-0 m-0 grid grid-cols-9 gap-2'>
          <button type='button' className='nav-toggle' onClick={navToggler}>
            <FaBars />
          </button>
          <h1 className='absolute left-0 mx-5 my-2'>
            کلینیک دامپزشکی ایران مهر
          </h1>
        </div>
        <div ref={navMenuRef} className='nav-menu'>
          {menu_items.map((item, index) => (
            <Link key={index} to={item.href} onClick={closeMenu}>
              {item.name}
            </Link>
          ))}
        </div>

        <div id='nav-full' className='w-full p-0 top-0 col-span-7'>
          {menu_items.map((item, index) => (
            <Link key={index} to={item.href} onClick={closeMenu}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navbar
