import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {OdhlasitButton} from './Buttons'
const Header = () => {
  const navigate = useNavigate()
  const logged = sessionStorage.getItem('user_id')
  const overenieRola = sessionStorage.getItem('rola')
  const overenieKliniky= JSON.parse(sessionStorage.getItem('klinika'))
  const isAdmin = (overenieRola === 'admin')
  const isDoktor = (overenieKliniky)
  //console.log(isAdmin, overenieRoly)
  const odhlasit = async()=>{
    sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('rola')
    sessionStorage.removeItem('klinika')
    navigate('/')
    navigate(0)
  }
  return (
    <body>
      <header>
        <nav id="presmerovanie">
          {isDoktor || isAdmin ?<Link to="/lieky/naraz">Lieky 2</Link>:<Link to="/vytvorenie-uctu">Vytvorit si ucet</Link>}
          {isDoktor || isAdmin ?<Link to="/moja-klinika">Moja Klinika</Link> :<Link to="/">Hlavna Stranka</Link>}
          {(isDoktor || isAdmin) &&<Link to="/lieky">Lieky</Link>}
          {isAdmin && <Link to="/lieky">Lieky</Link>}
          {isAdmin && <Link to="/lieky/naraz">Lieky 2</Link>}
          {logged? <OdhlasitButton odhlasit={odhlasit}/> : <Link to="/prihlasenie">Prihlasit sa do uctu</Link>}
        </nav>
      </header>
    </body>
  )
}

export default Header
