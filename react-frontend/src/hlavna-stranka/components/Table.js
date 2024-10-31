import React from 'react'
import {FaTrash, FaEdit} from 'react-icons/fa'
const Table = ({data, onDelete, onEdit}) => {
  return (
    <div>
        <table id="data-table">
            <thead>
            <tr>
                <th id="name-result">Name</th>
                <th id="age-result">Age</th>
                <th id="id-result">Id</th>
            </tr>
            </thead>
            <tbody className='tableBody'>
                {data.map((item) => (
                <tr key={item.id}> 
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.id} 
                        <FaEdit style={{color:'red', cursor:'pointer', marginLeft: '50px'}} onClick={(e)=> onEdit(e,item)}/>
                        <FaTrash style={{color:'red', cursor:'pointer', marginLeft: '50px'}} onClick={(e)=> onDelete(e,item.id)}/>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}

export default Table
