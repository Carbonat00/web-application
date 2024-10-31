import React from 'react'
const klinikyButton = ({updateData}) => {
    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      };
  return (
    <div>
      <button type="submit" id="createAcc" style={buttonStyle} onClick={updateData}>Create Account</button>
    </div>
  )
}

export const VyberKliniky = ({nazovKliniky, onKlinikaChange}) => {
return (
  <select id="klinika" name="klinika" style={{margin:'0 auto', display:'block', width: 'fit-content'}} onChange={(e) => onKlinikaChange(e.target.value)}>
  {nazovKliniky.map((klinika, index) => (
    <option key={index} value={klinika.id}>
      {klinika.nazov_kliniky}
    </option>
  ))}
</select>
)
}


export default klinikyButton
