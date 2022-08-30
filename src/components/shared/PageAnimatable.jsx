import { motion } from 'framer-motion'

export default function PageAnimatable({ children }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delay: 0.2, duration: 0.3 },
    },
  }

  return (
    <motion.div
      className='w-full m-0 p-0'
      variants={container}
      initial='hidden'
      animate='show'
    >
      {children}
    </motion.div>
  )
}
