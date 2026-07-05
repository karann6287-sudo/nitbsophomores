import React from 'react'

const Footer = ({ theme }) => {
  const isDark =
    theme === 'dark' ||
    (typeof window !== 'undefined' && !theme && localStorage.getItem('theme') === 'dark')

  return (
    <footer className={`text-white mt-12 ${isDark ? 'bg-slate-950' : 'bg-gray-800'}`}>
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        <div>© {new Date().getFullYear()} NITB Sophomores Electrical Engineering</div>
        <div className={`mt-3 md:mt-0 text-sm ${isDark ? 'text-slate-300' : 'text-gray-300'}`}>
           Made with ❤️ by Karan Verma(NITB'29).
        </div>
      </div>
    </footer>
  )
}

export default Footer