import '../styles/Mobile-Container.css'

export default function MobileContainer({ children, border = false }) {
  let borderClass = 'border border-solid border-sky-900 rounded-lg'
  return (
    <div className='_mc w-full m-0 md:p-2 grid md:gap-2 grid-cols-1 md:grid-cols-2'>
      {children.map((child, index) => (
        <div
          key={index}
          className={`m-0 md:p-2 col-span-1 ${border && borderClass}`}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
