const express = require('express')
const path = require('path')
const cors = require('cors')
const { postLudia, getLudia, deleteLudia, getPolohaKliniky, postSpravy } = require('./db/dbaccess.js')
const { putLudia, vytvorenieUctu, prihlasenie, vytvorenieLekara, prihlasenieDoktor, getNazovKliniky, getSpravy, getStavSpravy } = require('./db/dbaccess.js')
const {searchData} = require('./db/elasticaccess.js')
const {getLieky} = require('./db/skusobnypostgres.js')
const { searchBoth } = require('./db/elasticknex.js')
const app = express()


app.use(express.json())
app.use(cors())


//app.use(express.static(path.join(__dirname, 'frontend')))

app.post('/api/pridavanie',(req,res) =>{
    const body = req.body
    
    postLudia(body)
    res.send(true)
})
app.get('/api/nacitanie',(req,res) =>{
    const user_id = req.query.id_uzivatela;    
    getLudia(user_id).then(result =>{
        console.log(result)
    res.send(result)
    })
    
})
app.delete('/api/clovek/:id',async(req, res)=>{
    const id = req.params.id
    console.log(`Delete request received for ID: ${id}`);
    deleteLudia(id)
    res.send(true)
})
app.put('/api/clovek/:id',async(req, res) => {
    console.log('helo')
    const id = req.params.id
    const { name, age } = req.body;
    console.log(name,age)
    console.log(`Update request received for ID: ${id}, Name: ${name}, Age: ${age}`);
    await putLudia(id,name, age)
    res.send(true)
})
app.post('/api/vytvaranie-uctu', (req, res) => {
    const body = req.body
    console.log(body)
    vytvorenieUctu(body.meno, body.priezvisko, body.email, body.heslo, body.rola)
    res.send(true)
})

app.post('/api/prihlasenie',(req, res) =>{
    const body = req.body
    prihlasenie(body.email, body.heslo).then(result =>{
        console.log(result)

    res.send(result)
    })
    
})
app.post('/api/prihlasenie/doktor',(req, res) =>{
    const body = req.body
    prihlasenieDoktor({email:body.email, heslo:body.heslo, id:body.id}).then(result =>{
        console.log(result)

    res.send(result)
    })
    
})

app.get('/api/vypisanie/doktorov/:id',(req, res) =>{
    const body = req.body
    const id = req.params.id
    prihlasenieDoktor({email:body.email, heslo:body.heslo, id}).then(result =>{
        console.log(result)

    res.send(result)
    })
    
})


app.get('/api/lieky', async (req, res)=>{
    const searchValue = req.query.search
    console.log(searchValue)
    const vysledok = await searchData(searchValue)
    res.send(vysledok)


})

app.get('/api/lieky/postgres', async (req, res)=>{
    const searchValue = req.query.search
    console.log(searchValue)
    const vysledok = await getLieky(searchValue)
    res.send(vysledok)
})

app.get('/api/lieky/naraz', async (req, res)=>{
    const searchValue = req.query.search
    console.log(searchValue)
    const vysledok = await searchBoth(searchValue)
    res.send(vysledok)
})

app.post('/api/lekar/vytvaranie-uctu', (req, res) => {
    const body = req.body
    console.log(body)
    vytvorenieLekara(body.meno, body.priezvisko, body.email, body.rola, body.heslo, body.mesto_kliniky, body.klinika)
    res.send(true)
})

app.get('/api/polohy_klinik',async (req,res) =>{    
    vysledok = await getPolohaKliniky()
    console.log(vysledok)
    res.send(vysledok)
})



app.get('/api/nazvy_klinik/:id',async (req,res) =>{ 
    const poloha_id = req.params.id 
    console.log(poloha_id) 
    vysledok = await getNazovKliniky(poloha_id)
    res.send(vysledok)
})

app.get('/api/spravy/:id',async (req,res) =>{ 
    const id_primatelaSpravy = req.params.id 
    const id_odosielatelaSpravy = req.query.primatel
    console.log(id_primatelaSpravy) 
    vysledok = await getSpravy(id_primatelaSpravy, id_odosielatelaSpravy)
    res.send(vysledok)
})


app.get('/api/stav/spravy/:id',async (req,res) =>{ 
    const id_prihlasenehoId = req.params.id 
    console.log(id_prihlasenehoId) 
    vysledok = await getStavSpravy(id_prihlasenehoId)
    res.send(vysledok)
})


app.post('/api/post-spravy', (req, res) => {
    const body = req.body
    console.log(body)
    postSpravy(body.sprava, body.id_odosielatelaSpravy, body.id_primatelaSpravy)
    res.send(true)
})



const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server bezi na porte : ${PORT}`) ) 