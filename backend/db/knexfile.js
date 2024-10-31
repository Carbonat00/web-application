const development = {
  client: 'postgresql',
  connection: {
    database: 'NameDB',
    user:     'postgres',
    password: 'postgres'
  },
  pool: {
    min: 2,
    max: 10
  },
}
module.exports.development = development 
