import React from 'react'
const Tablepg = ({data1}) => {
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
                {data1.map((item) => (
                <tr>                     
                    <td>{item.nazov}</td>
                    <td>{item.balenie }</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}

export default React.memo(Tablepg)