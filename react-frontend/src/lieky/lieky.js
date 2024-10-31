import React,{useState} from 'react'
import Table from './components/table'
import {useNavigate } from 'react-router-dom';

const Lieky = () => {
    const navigate = useNavigate()
    const [searchResult, setSearchResult] = useState([])   
    const opravnenaOsoba = sessionStorage.getItem('klinika') || sessionStorage.getItem('rola') === 'admin' 
    
    if (opravnenaOsoba === false) {
      alert('na toto nemate opravnenie');
      setTimeout(() => {
        navigate('/');
      }, 0);
    }
    const vratLieky = async(e) =>{
        e.preventDefault(); 
        const condition = e.target.value
        const apiUrl = `http://192.168.0.170:5000/api/lieky?search=${condition}`; 
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error('Failed to fetch items');
          }
          const data = await response.json();
          console.log(data)
          setSearchResult(data)
          return data
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    const vratLiekyknex = async(e) =>{
        e.preventDefault(); 
        const condition = e.target.value
        const apiUrl = `http://192.168.0.170:5000/api/lieky/postgres?search=${condition}`; 
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error('Failed to fetch items');
          }
          const data = await response.json();
          console.log(data)
          setSearchResult(data)
          return data
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
  return (
    <div>
        {opravnenaOsoba && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <input id='search' style={{ textAlign: 'center' }}  placeholder='liekElastic' onChange={vratLieky}></input>
            <input id='searchknex' style={{ textAlign: 'center' }}  placeholder='liekPg' onChange={vratLiekyknex}></input>
        </div>}
        {opravnenaOsoba && <div>
        <Table data = {searchResult}/>
        </div>}
    </div> 
  )
}

export default Lieky
