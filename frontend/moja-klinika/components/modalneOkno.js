import React, { useState, useCallback } from 'react';
import './../../hlavna-stranka/index.css';
import { postSpravyFunction } from './fetch';
import { FaTimes} from 'react-icons/fa';

export const ModalneOkno = ({ spravy = [], id_primatelaSpravy, id_prihlaseneho, zmenaModalu }) => {
    const [sprava, setSprava] = useState('');

    const handlePostSpravy = useCallback(async (e) => {
        const stav = 'neprecitane'
        e.preventDefault();
        const data = {
            sprava: sprava,
            id_odosielatelaSpravy: id_prihlaseneho,
            id_primatelaSpravy: id_primatelaSpravy,
            stav : stav
    
        };
        await postSpravyFunction(e, data);
        setSprava('')
    }, [id_prihlaseneho, id_primatelaSpravy, sprava]);

    return (
        <div>
            <div className='modal'>
                <div className='overlay'></div>
                <div className='modal-content'>
                    <h2>Tvoje Spravy:</h2>
                    <div className='spravy'>
                        {spravy && spravy.length > 0 ? (
                            spravy.map((message, index) => <h1 key={index}>{message.sprava}</h1>)
                        ) : (
                            <h1>No messages yet</h1>
                        )}
                        <FaTimes className='close-modal'cursor={'pointer'} onClick={zmenaModalu} />
                    </div>
                    <input type="text" id='sprava' placeholder="Napis spravu: " value={sprava} onChange={(e) => setSprava(e.target.value)} />
                    <button type='submit' id='odoslanie-spravy' onClick={handlePostSpravy}>Odoslat</button>
                </div>
            </div>
        </div>
    );
};

export default ModalneOkno;


