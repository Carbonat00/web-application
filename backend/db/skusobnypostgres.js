const knex = require('knex')
const { development } = require('./knexfile')

const getDbConnect = () => {
    const db = knex(development)
    return db
}

const getLieky = async(searchValue) => {
    console.log(searchValue)
    const conn = getDbConnect()
    const prikaz = conn('public.s_karty').select(
        'id_kart',
        'typ',
        'rzl',
        'kod',
        'nazov',
        'balenie',
        'vyr',
        'atc')
        .where(function() {
            this.where('nazov', 'ILIKE', `%${searchValue}%`) // First condition
              .orWhere('balenie', 'ILIKE', `%${searchValue}%`); // Second condition
          })
          .orderByRaw('nazov asc, balenie asc')
          .limit(100);
    const results = await prikaz
    console.log(results);
    conn.destroy()
    return results
    
}
module.exports.getLieky = getLieky