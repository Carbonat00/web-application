const knex = require('knex')
const { development } = require('./knexfile')
const { Client } = require('@elastic/elasticsearch');
const { Pool } = require('pg');
const { join } = require('path');

// Setup Elasticsearch client
const esClient = new Client({ node: 'http://192.168.0.170:9200' });


const getDbConnect = () => {
    const db = knex(development)
    return db
}


async function indexData() {
    const db = getDbConnect();
  
    try {
      // Fetch data from PostgreSQL
      const rows = await db.select('id_kart', 'typ', 'rzl', 'kod', 'nazov', 'balenie', 'vyr', 'atc').from('public.s_karty');
  
      // Prepare data for bulk indexing
      const body = rows.flatMap(doc => [
        { index: { _index: 'lieky_index', _id: doc.id_kart } },
        {
          id_kart: doc.id_kart,
          typ: doc.typ,
          rzl: doc.rzl,
          kod: doc.kod,
          nazov: doc.nazov,
          balenie: doc.balenie,
          vyr: doc.vyr,
          atc: doc.atc
        },
      ]);
  
      // Bulk index data into Elasticsearch
      const bulkResponse = await esClient.bulk({ refresh: true, body });
  
      if (bulkResponse.errors) {
        console.log('Indexing errors occurred:', bulkResponse.items);
      } else {
        console.log('Data indexed successfully');
      }
    } catch (error) {
      console.error('Error indexing data:', error);
    } finally {
      // Ensure to destroy the knex connection
      await db.destroy();
    }
  }
  
//indexData().catch(console.error);



const postLudia = async(body) => {
    const conn = getDbConnect()
    const prikaz = conn('public.ludia').insert(
      body
    )
    await prikaz
}
const getLudia = async(idUzivatela) => {
    console.log(idUzivatela)
    const conn = getDbConnect()
    const prikaz = conn('public.ludia').select(
        '*'
    )
    if (idUzivatela){
        prikaz.where({ user_id: idUzivatela });
    }
    return await prikaz
}
const deleteLudia = async(id) => {
    const conn = getDbConnect();
    try {
        const prikaz = conn('public.ludia')
            .where({ id: id })  
            .del();             

        await prikaz 
    } catch (error) {
        console.error('Error deleting record:', error)
        throw error
    }
};
const putLudia = async(id,name, age) => {
    const conn = getDbConnect()
    try{
        const prikaz = conn('public.ludia')
            .where({ id: id })
            .update({
                "name": name,
                "age": +age
            });
        console.log(prikaz)
        await prikaz
    } catch (error) {
        console.error('Error updating record:', error)
        throw error
    }
}
const vytvorenieUctu = async(meno, priezvisko, email, heslo, rola) => {
    const conn = getDbConnect()
    const prikaz = conn('public.prihlasovanie').insert(
        {
            "meno" : meno,
            "priezvisko" : priezvisko,
            "email": email,
            "heslo": heslo,
            "rola": rola
        }
    )
    await prikaz
}
const prihlasenie = async(email, heslo) =>{
    const conn = getDbConnect()
    const prikaz = conn('public.prihlasovanie').select(
        'meno',
        'priezvisko',
        'email',
        'id',
        'rola')
        .where({email:email, heslo:heslo})
    
    const vysledok = await prikaz
    console.log(vysledok)
    if(vysledok){
        return vysledok[0]
    }else{
        throw new Error('Invalid email or password')
    }
}

const prihlasenieDoktor = async({email, heslo,id}) =>{
    const conn = getDbConnect()
    const prikaz = conn('public.lekari').select(
        'lekari.meno',
        'lekari.priezvisko',
        'lekari.email',
        'lekari.id',
        'lekari.rola',
        'polohy_klinik.mesta AS poloha_nazov',
        'kliniky.nazov_kliniky AS klinika_nazov',
        'polohy_klinik.id AS poloha_klinik_id'
        )
        .leftJoin('public.polohy_klinik', 'lekari.poloha_kliniky', 'polohy_klinik.id')
        .leftJoin('public.kliniky', 'lekari.nazov_kliniky', 'kliniky.id')
    if(id){
        prikaz.where('lekari.nazov_kliniky', id)
    }else{
        prikaz.where({email:email, heslo:heslo})
    }

    const vysledok = await prikaz
    console.log(vysledok)
    if(vysledok){
        return id ? vysledok : vysledok[0]
    }else{
        throw new Error('Invalid email or password')
    }
}


const vytvorenieLekara = async(meno, priezvisko, email, heslo, rola, mesto_kliniky, klinika) => {
    const conn = getDbConnect()
    const prikaz = conn('public.lekari').insert(
        {
            "meno" : meno,
            "priezvisko" : priezvisko,
            "email": email,
            "rola": rola,
            "heslo": heslo,
            "poloha_kliniky":mesto_kliniky,
            "nazov_kliniky": klinika
        }
    )
    await prikaz
}


const getPolohaKliniky = async() => {
    const conn = getDbConnect()
    const prikaz = conn('public.polohy_klinik').select(
        '*'
    )
    return await prikaz
}


const getNazovKliniky = async(poloha_id) => {
    const conn = getDbConnect()
    const prikaz = conn('public.kliniky').select(
        'nazov_kliniky'
    )
    .where({poloha_id : poloha_id})

    return await prikaz
}

const getSpravy = async(id_odosielatelaSpravy, id_primatelaSpravy) => {
    const conn = getDbConnect()
    const prikaz = conn('public.spravy').select(
        'sprava'
    )
    .where({id_odosielatelaSpravy : id_primatelaSpravy})
    .andWhere({id_primatelaSpravy: id_odosielatelaSpravy})

    console.log(prikaz.toString())
    return await prikaz
}

const getStavSpravy = async(id_prihlasenehoId) => {
    const conn = getDbConnect()
    const prikaz = conn('public.spravy').select(
        'lekari.meno AS meno',
        'stav'
    )
    .leftJoin('public.lekari', 'spravy.id_odosielatelaSpravy', 'lekari.id')
    .where({id_primatelaSpravy : id_prihlasenehoId})
    

    return await prikaz
}



const postSpravy = async(sprava, id_odosielatelaSpravy, id_primatelaSpravy, stav) => {
    const conn = getDbConnect()
    const prikaz = conn('public.spravy').insert(
        {
            "sprava" : sprava,
            "id_odosielatelaSpravy" : id_odosielatelaSpravy,
            "id_primatelaSpravy": id_primatelaSpravy,
            'stav': stav
        }
    )
    await prikaz
}


module.exports.getDbConnect = getDbConnect
module.exports.postLudia = postLudia
module.exports.getLudia = getLudia
module.exports.deleteLudia = deleteLudia
module.exports.putLudia = putLudia
module.exports.vytvorenieUctu = vytvorenieUctu
module.exports.prihlasenie = prihlasenie
module.exports.prihlasenieDoktor = prihlasenieDoktor
module.exports.vytvorenieLekara = vytvorenieLekara
module.exports.getPolohaKliniky = getPolohaKliniky
module.exports.getNazovKliniky = getNazovKliniky
module.exports.getSpravy = getSpravy
module.exports.postSpravy = postSpravy
module.exports.getStavSpravy = getStavSpravy