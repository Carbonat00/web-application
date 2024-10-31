//import Header from './components/header';
import Form from './components/Form';
import Table from './components/Table';
import React,{ useState, useCallback, useEffect} from 'react';
import getDataFunction, {deleteDataFunction} from './components/fetch';
import './index.css'
import Popis from './components/popis'
function App() {
  let prihlaseny = false
  const [tableData, setTableData] = useState([]);
  const [inputValue, setInputValue]= useState({})
  const [loggedUser, setLoggedUser] = useState({}) 
  
  const handleGetDataClick = useCallback((e, filter) => {    
    const realFilter = filter || '0';        
    const user =  sessionStorage.getItem('user_id');
    const user_id = user ? JSON.parse(user) : {}    
    const condition =  realFilter === '0' ? user_id.id : null    
    getDataFunction(e, condition).then(result => {
      setTableData(result)})

  },[]);
  const handleDeleteClick = useCallback(async (e,id) => {
    //console.log(e,id)
    await deleteDataFunction(e,id)
    getDataFunction(e).then(result => {
      setTableData(result)})

  },[]);
  const handleEditClick = useCallback(async (e,item) => {
    console.log(item)
    setInputValue(item)
    //await editDataFunction(e,id)    
  },[]);
  useEffect(()=>{
    const value = sessionStorage.getItem('user_id'); // Get the value
    setLoggedUser(value ? JSON.parse(value) : {});
  },[])

  if(sessionStorage.getItem('user_id')){
    prihlaseny = (true)
  }

  return (
    <div className='appBody'>
      {/*<Header />*/}
      <h1 style={{textAlign:'center', color:'b', fontSize:'50px'}}>Vitalith</h1>,
      <h2 style={{textAlign:'center'}}>Prihlaseny Uzivatel: {loggedUser.meno} {loggedUser.priezvisko}</h2>,
      {prihlaseny ?<Form onGetDataClick = {handleGetDataClick} poslanieValue = {inputValue} loggedUser={loggedUser} /> : <Popis />}
      {prihlaseny && <Table data={tableData} onDelete = {handleDeleteClick} onEdit={handleEditClick}  />}
    </div>
  );
}

export default React.memo(App);