import React,{useState} from 'react'
import Button from './components/button'
import { postDataFunction } from './components/fetch'
import {useNavigate } from 'react-router-dom';
import '../hlavna-stranka/index.css'
const PrihlasenieDoktor = () => {
  
    const [email, setEmail] =useState('')
    const [heslo, setHeslo] =useState('')

    const navigate = useNavigate()
    const updateData = (async (e)=>{
      const data ={
        email:email,
        heslo:heslo
      }
      console.log(data)
      const vysledok = await postDataFunction(e,data)
      console.log(vysledok)
      sessionStorage.setItem('user_id',JSON.stringify(vysledok))
      sessionStorage.setItem('klinika', JSON.stringify(vysledok.poloha_klinik_id))
      sessionStorage.setItem('rola', JSON.stringify(vysledok.rola))
      navigate('/moja-klinika')

    })
  return (
    <div className="prihlasenie-form">
      <form id="prihlasenie-form" className ="form">
        <input type="text" id="email" placeholder="Email: " value={email}  onChange={(e) => setEmail(e.target.value)}></input>
        <input type="password" id="heslo" placeholder="Password: " value={heslo}  onChange={(e) => setHeslo(e.target.value)}></input>
        <Button updateData={updateData}/>
      </form>
    </div>
  )
}

export default PrihlasenieDoktor
