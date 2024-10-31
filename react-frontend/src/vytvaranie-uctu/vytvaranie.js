import React from 'react';
import {useState} from 'react'
import SubmitButton from './components/Buttons';
import {Link} from 'react-router-dom';
import { postDataFunction } from './components/fetch';
import { useNavigate } from 'react-router-dom';
import '../hlavna-stranka/index.css'
const Vytvaranie = () => {
  const [meno, setMeno] = useState('')
  const [priezvisko, setPriezvisko] = useState('')
  const [email, setEmail] = useState('')
  const [heslo, setHeslo] = useState('')
  const [potvrdenieHesla, setPotrvdeniehesla] = useState('')

  const navigate = useNavigate()
  const updateData = (async (e)=>{
    e.preventDefault()
    if(heslo === potvrdenieHesla){
    const data ={
      meno:meno,
      priezvisko:priezvisko,
      email:email,
      heslo:heslo,
      rola: 'user'
    }
    console.log(data)
    await postDataFunction(e,data)
    navigate('/prihlasenie')
  }else{
    alert('hesla sa nezhoduju!!!!!')
    setHeslo(''); 
    setPotrvdeniehesla('');  
    }
    
  })
  return (
    <div className = "vytvaranie-form">
      <form id="vytvaranie-form" className="form">
        <input type="text" id="meno" placeholder="Firstname: "  value={meno} onChange={(e) => setMeno(e.target.value)}></input>
        <input type="text" id="priezvisko" placeholder="Lastname: "  value={priezvisko} onChange={(e) => setPriezvisko(e.target.value)}></input>
        <input type="text" id="email" placeholder="Email: "  value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <input type="password" id="heslo" placeholder="Password: " value={heslo} onChange={(e) => setHeslo(e.target.value)}></input>
        <input type="password" id="potvrdenieHesla" placeholder="Retype password: " value={potvrdenieHesla} onChange={(e) => setPotrvdeniehesla(e.target.value)}></input>
        <Link to="/vytvorenie-lekara">vytvorit si ucet ako doktor</Link>
        <SubmitButton updateData = {updateData}/>
      </form>
    </div>
  );
};

export default Vytvaranie;
