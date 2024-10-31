import React from 'react'


const SubmitButton = ({updateData}) => {
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

export default SubmitButton
