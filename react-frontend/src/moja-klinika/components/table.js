import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import ModalneOkno from './modalneOkno';
import { getSpravyFunction } from './fetch';

const Table = ({ data }) => {
    const [modal, setModal] = useState(false);
    const [sprava, setSprava] = useState([]);
    const [id_primatelaSpravy, setId_primatelaSpravy] = useState(null);
    const id_prihlaseneho = JSON.parse(sessionStorage.getItem('user_id')).id; 

    const toggleModal = async (e, itemID) => {
        setModal(!modal);
        setId_primatelaSpravy(itemID);
        const fetchSpravy = await getSpravyFunction(e, id_prihlaseneho, itemID);
        setSprava(fetchSpravy ? fetchSpravy : []);
    };
    const zmenaModalu = ()=>{
        setModal(!modal);
    }
    return (
        <div>
            <table id="data-table">
                <thead>
                    <tr>
                        <th id="name-result">Meno</th>
                        <th id="age-result">Priezvisko</th>
                        <th id="id-result">Email</th>
                        <th id="id-result">Specializacia</th>
                    </tr>
                </thead>
                <tbody className='tableBody'>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.meno}</td>
                            <td>{item.priezvisko}</td>
                            <td>{item.email}</td>
                            <td>{item.rola}</td>
                            <td>
                                <FaPaperPlane
                                    style={{ color: 'blue', cursor: 'pointer', marginLeft: '50px' }}
                                    onClick={(e) => toggleModal(e, item.id)} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modal && <ModalneOkno spravy={sprava} id_primatelaSpravy={id_primatelaSpravy} id_prihlaseneho={id_prihlaseneho} zmenaModalu={zmenaModalu}/>}
        </div>
    );
};

export default React.memo(Table);
