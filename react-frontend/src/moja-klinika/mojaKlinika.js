import React,{useEffect,useState} from 'react'
import Table from './components/table'
import { getDataFunction, getStavSpravyFunction } from './components/fetch'
const MojaKlinika = (e) => {
  const klinikaPihlaseneho = JSON.parse(sessionStorage.getItem('klinika'))
  const prihlasenehoUdaje = JSON.parse(sessionStorage.getItem('user_id'))
  
  const [data, setData] = useState(null);
  const [nacitaneData, setNacitaneData] = useState(false)

  const alertPodlaStavu = async () =>{
    const stavSparvy = await (getStavSpravyFunction(e, prihlasenehoUdaje.id))
    if(await stavSparvy[0]?.stav ==='neprecitane'){
      alert(`mas neprecitane spravy od ${stavSparvy[0].meno}`)
    }
  }
  useEffect(()=>{
    alertPodlaStavu()
    console.log('ahoj')
  },[])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getDataFunction(null, klinikaPihlaseneho);
        setData(fetchedData);
        setNacitaneData(true) // Nastavte dáta do stavu
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [klinikaPihlaseneho]);
  
  return (
    <div>
      <h1 style={{textAlign:'center'}}>Prihlaseny ste ako :  {prihlasenehoUdaje.meno} {prihlasenehoUdaje.priezvisko}</h1>
      <h1 style={{textAlign:'center'}}>Vitajte v {prihlasenehoUdaje.klinika_nazov}</h1>
      {nacitaneData && data ?<Table data={ data}/> : <p>nacitavaju sa </p>}
    </div>
  )
}

export default React.memo(MojaKlinika)

