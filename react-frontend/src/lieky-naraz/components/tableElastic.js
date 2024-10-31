import React from 'react'
const Tableelastic = ({data}) => {
  return (
    <div>
        <table id="data-table">
            <thead>
            <tr>
                <th id="name-result">Nazov</th>
                <th id="age-result">Balenie</th>
            </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                <tr>                     
                    <td>{item._source.nazov}</td>
                    <td>{item._source.balenie}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}

export default Tableelastic