import React from 'react'
const Buttons = ({onGetDataClick}) => {
  return (
        <button id="get-data-button" onClick={onGetDataClick} className="buttons">Get Data</button>
  )
}

export const PostButton = ({updateData}) => {
  return (
        <button type="submit" id="callbutton" onClick={updateData} className="buttons">Pridaj</button>
  )
}

export const OdhlasitButton = ({odhlasit})=>{
  return (
    <button id ="odhlasitButton" onClick={odhlasit} className="buttons">Odhlasit</button>
  )
}

export const OutputButton =({handleChange})=>{
  return(
    <div>
      <select onChange={handleChange}>
        <option value= '0'> Iba moje</option>
        <option value= '1'> Všetko</option>
      </select>
    </div>
  )
} 


export default Buttons;
