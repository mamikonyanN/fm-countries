import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  const [isDarkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('isDarkMode') || 'false'))

  useEffect(() => {
    document.body.dataset.isDarkMode = !isDarkMode
    localStorage.setItem('isDarkMode', isDarkMode)
  }, [isDarkMode])

  const handleClick = () => setDarkMode(!isDarkMode)

  return (
    <header className="header">
      <Link className="header__logo" to="/">
        Where is the world?
      </Link>
      <button className="header__theme-btn" onClick={handleClick}>
        <i className={`fa-${isDarkMode ? 'regular' : 'solid'} fa-moon`}></i>
        Dark Mode
      </button>
    </header>
  )
}
