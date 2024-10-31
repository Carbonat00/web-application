import React from 'react'
const Table = ({data}) => {
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
                    <td>{item._source ? item._source.nazov : item.nazov}</td>
                    <td>{item._source ? item._source.balenie : item.balenie }</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}

export default Table
