import React from 'react';
import {useState, useEffect} from 'react'
import SubmitButton from './components/Buttons';
import { postDataFunction, getPolohyKlinikyFunction, getNazvyKlinikyFunction } from './components/fetch';
import { useNavigate } from 'react-router-dom';
import { VyberKliniky } from './components/Buttons';
import '../hlavna-stranka/index.css'
const Lekari = () => {
  const [meno, setMeno] = useState('')
  const [priezvisko, setPriezvisko] = useState('')
  const [email, setEmail] = useState('')
  const [rola, setRola] = useState('')
  const [heslo, setHeslo] = useState('')
  const [potvrdenieHesla, setPotrvdeniehesla] = useState('')
  const [selectedOption, setSelectedOption] = useState(null);
  const [kliniky, setKliniky] = useState('')
  const [loading, setLoading] = useState(false);
  const [nazovKliniky, setNazovKliniky] = useState([])
  const [idMesta, setIdMesta] = useState(null);
  const [selectedKlinikaId, setSelectedKlinikaId] = useState(null);

  useEffect(() => {
    const getClinics = async () => {
      try {
        const data = await getPolohyKlinikyFunction(); // Call the fetch function
        setKliniky(data); // Set the clinics data
      } catch (error) {
        console.error('Error fetching clinics:', error);
      } finally {
        setLoading(true); // Set loading to false when done
      }
    };

    getClinics();
  }, []);


  const handleKlinikaChange = (value) => {
    setSelectedKlinikaId(value); 
    console.log('Selected Klinika ID:', value); 
  };

  const navigate = useNavigate()
  const updateData = (async (e)=>{
    e.preventDefault()
    if(heslo === potvrdenieHesla){
    const data ={
      meno:meno,
      priezvisko:priezvisko,
      email:email,
      rola: rola,
      heslo:heslo,
      mesto_kliniky:idMesta,
      klinika: selectedKlinikaId
    }
    console.log(data)
    await postDataFunction(e,data)
    navigate('/prihlasenie/doktor')
  }else{
    alert('hesla sa nezhoduju!!!!!')
    setHeslo(''); 
    setPotrvdeniehesla('');  
  }
  })
  const handleOptionChange = async (option) => {
    console.log(option)
    setSelectedOption(option);
    const selectedMesto = kliniky.find((mesto) => mesto.mesta === option);
    console.log('Selected Option:', option);
    console.log('Selected Klinik ID:', selectedMesto ? selectedMesto.id : 'No ID found')
    setIdMesta(selectedMesto.id)
    const id = selectedMesto.id
    const vysledok = await getNazvyKlinikyFunction(id)
    console.log(vysledok)
    setNazovKliniky(vysledok)
    console.log(nazovKliniky)
  }
  useEffect(() => {
    console.log('Vysledok state updated:', nazovKliniky[0]?.nazov_kliniky );
    console.log(idMesta)
    console.log(nazovKliniky)
  }, [nazovKliniky,idMesta]);
  return (
    <div>
      <div className="options-container">
      {loading && [ `${kliniky[0].mesta}`,`${kliniky[1].mesta}`, `${kliniky[2].mesta}`, `${kliniky[3].mesta}`,`${kliniky[4].mesta}`].map((option) => (
        <button
          key={option}
          onClick={(e) => handleOptionChange(option)}
          className={`option-button ${selectedOption === option ? 'selected' : ''}`} 
        >
          {option}
        </button>
      ))}
    </div>
      <VyberKliniky nazovKliniky={nazovKliniky} onKlinikaChange={handleKlinikaChange}/>
      <div className = "vytvaranie-form">
      <form id="vytvaranie-form" className="form">
        <input type="text" id="meno" placeholder="Firstname: "  value={meno} onChange={(e) => setMeno(e.target.value)}></input>
        <input type="text" id="priezvisko" placeholder="Lastname: "  value={priezvisko} onChange={(e) => setPriezvisko(e.target.value)}></input>
        <input type="text" id="email" placeholder="Email: "  value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <input type="text" id="rola" placeholder= "Odbor lekarstva:"  value={rola} onChange={(e) => setRola(e.target.value)}></input>
        <input type="password" id="heslo" placeholder="Password: " value={heslo} onChange={(e) => setHeslo(e.target.value)}></input>
        <input type="password" id="potvrdenieHesla" placeholder="Retype password: " value={potvrdenieHesla} onChange={(e) => setPotrvdeniehesla(e.target.value)}></input>
        <div id="response"></div>
        <SubmitButton updateData = {updateData}/>
      </form>
      </div>
    </div>
  );
};

export default React.memo(Lekari);
