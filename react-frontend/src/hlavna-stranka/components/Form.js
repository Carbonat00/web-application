import React,{useState, useEffect}  from 'react';
import Buttons, {PostButton, OutputButton} from './Buttons'
import {postDataFunction, putDataFunction} from './fetch';
import {FaCheck} from 'react-icons/fa'
const Form = ({onGetDataClick,  poslanieValue, loggedUser}) => {
    console.log('renderujem button')
    const [meno, setMeno]= useState('')
    const [vek, setVek]= useState('')
    const [id, setId] =useState({})
    const [editMode, setEditMode] =useState(false)
    const [filter,setFilter ] =useState('')
    useEffect(() => {
      console.log(filter)
      if (poslanieValue?.name) {
        setMeno(poslanieValue.name || ''); // Fallback to empty string if poslanieValue.meno is undefined
        setVek(poslanieValue.age || '');   // Same for vek
        setId(poslanieValue.id ||'');
        setEditMode(true)
      }
    }, [poslanieValue,filter]); // Only run when poslanieValue changes

    const updateData = (async (e)=>{
      const data ={
        name:meno,
        age:vek,
        user_id:loggedUser.id
      }
      if(editMode){
        await putDataFunction(e,id,data)
        setEditMode(false)
      }else{
        await postDataFunction(e, data)
      }
      onGetDataClick(e,filter)
    })
    const getData = (async (e)=>{      
      onGetDataClick(e, filter)
    })
    const getSort = (async (e)=>{
      const newValue = (e.target.value)
      await setFilter(newValue)      
    })
  return (
    <div>
        <form>
            <div id="api-form" className="inputy">
                <input type="text" id="name" placeholder="Name" value={meno} onChange={(e) => setMeno(e.target.value)}/>
                <input type="text" id="age" placeholder="Age" value={vek} onChange={(e) => setVek(e.target.value)}/>
                {editMode && <FaCheck style={{color:'green', cursor:'pointer', marginLeft: '10px'}} onClick={updateData}/>}
                
            </div>
            <div className='buttons'>
              <Buttons onGetDataClick = {getData}/>
              <PostButton updateData = {updateData}/>
              <OutputButton handleChange={getSort}/>
            </div>
        </form>
    </div>
  )
}

export default React.memo(Form)
