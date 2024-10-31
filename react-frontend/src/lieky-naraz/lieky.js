import React, { useState } from 'react';
import Tablepg from './components/tablePg';
import Tableelastic from './components/tableElastic';
import {useNavigate } from 'react-router-dom';

const Lieky2 = () => {
    const navigate = useNavigate()
    const [searchResultPg, setSearchResultPg] = useState([]);      
    const [searchResultElastic, setSearchResultElastic] = useState([]);  
    const opravnenaOsoba = sessionStorage.getItem('klinika') || sessionStorage.getItem('rola') === 'admin' 
    
    if (opravnenaOsoba === false) {
      alert('na toto nemate opravnenie');
      setTimeout(() => {
        navigate('/');
      }, 0);
    }

    const fetchPgData = async (condition) => {
      const apiUrl = `http://192.168.0.170:5000/api/lieky/postgres?search=${condition}`;  // PostgreSQL API
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch PG items');
        }
        const data = await response.json();
        setSearchResultPg(data);  // Update PostgreSQL data
      } catch (error) {
        console.error('Postgres fetch error:', error);
      }
    };
  
    const fetchElasticData = async (condition) => {
      const apiUrl = `http://192.168.0.170:5000/api/lieky?search=${condition}`;  // Elasticsearch API
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch Elastic items');
        }
        const data = await response.json();
        setSearchResultElastic(data);  // Update Elasticsearch data
      } catch (error) {
        console.error('Elasticsearch fetch error:', error);
      }
    };
  
    const handleInputChange = (e) => {
      const condition = e.target.value;
      fetchPgData(condition);  // Fetch PostgreSQL data
      fetchElasticData(condition);  // Fetch Elasticsearch data
    };

    return (
        <div>
            {opravnenaOsoba && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <input id='search' style={{ textAlign: 'center',padding: '20px', marginBottom: '20px', border: '1px solid #ccc',borderRadius: '5px',fontSize: '17px', }} placeholder='Hladaj Liek' onChange={handleInputChange}></input>
            </div>}
            {opravnenaOsoba && <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <div style={{ width: '65%', textAlign:'center' }}>
                    <h3>postgres</h3>
                    <Tablepg data1={searchResultPg} />
                </div>
                <div style={{ width: '65%', textAlign:'center' }}>
                    <h3>elasticsearch</h3>
                    <Tableelastic data={searchResultElastic} />
                </div>
            </div>}
        </div>
    );
};

export default React.memo(Lieky2);
