const { Client } = require('@elastic/elasticsearch');
const { Client: PgClient } = require('pg');
const knex = require('knex')
const { development } = require('./knexfile')

const getDbConnect = () => {
    const db = knex(development)
    return db
}

const esConfig = {
  node: 'http://localhost:9200', // your Elasticsearch host
};

const pgClient = new PgClient(pgConfig);
const esClient = new Client(esConfig);

async function migrateData() {
  try {
    // Connect to PostgreSQL
    await getDbConnect();
    console.log('Connected to PostgreSQL.');

    // Fetch data from PostgreSQL
    const res = await pgClient.query('SELECT * FROM your_table'); // Replace with your actual query
    const records = res.rows;

    // Index data into Elasticsearch
    for (const record of records) {
      const esResponse = await esClient.index({
        index: 'your_index_name', // Replace with your actual index name
        id: record.id, // Assuming your_table has an 'id' field
        document: {
          // Map your PostgreSQL fields here
          field1: record.field1, // Replace with your actual field names
          field2: record.field2,
          // Add other fields as necessary
        },
      });
      console.log(`Indexed document ${record.id}:`, esResponse.body);
    }

    console.log('Data migration completed.');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    // Close connections
    await pgClient.end();
    await esClient.close();
    console.log('Connections closed.');
  }
}

// Run the migration
migrateData();
