import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import App from './hlavna-stranka/ap';
import MojaKlinika from './moja-klinika/mojaKlinika'
import Vytvaranie from './vytvaranie-uctu/vytvaranie';
import Prihlasenie from './prihlasovanie/prihlasenie'
import Header from './hlavna-stranka/components/header';
import Lieky from './lieky/lieky'
import Lieky2 from './lieky-naraz/lieky' 
import Lekari from './vytvaranie-uctu-lekar/lekari';
import PrihlasenieDoktor from './prihlasovanie – doktor/prihlasenie'

const Spustanie = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/moja-klinika" element={<MojaKlinika />}/>
          <Route path="/lieky" element={<Lieky/>}/>
          <Route path="/vytvorenie-lekara" element={<Lekari/>}/>
          <Route path="/lieky/naraz" element={<Lieky2/>}/>
          <Route path="/vytvorenie-uctu" element={<Vytvaranie />} />
          <Route path="/prihlasenie" element={<Prihlasenie />} />
          <Route path="/prihlasenie/doktor" element={<PrihlasenieDoktor />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default Spustanie;