import React from 'react'
import '../../hlavna-stranka/index.css'
const button = ({updateData}) => {
  return (
    <div>
      <button type="submit" id="prihlasit-sa" className="button" onClick={updateData}> Prihlasit sa </button>
    </div>
  )
}

export default button
