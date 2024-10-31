const { Client } = require('@elastic/elasticsearch');


const esClient = new Client({
    node: 'http://192.168.0.123:9200',
});

// Test the connection
const testConnection = async () => {
    try {
        const health = await esClient.cluster.health();
        console.log('Elasticsearch cluster health:', health);
    } catch (error) {
        console.error('Error connecting to Elasticsearch:', error);
    }
};

testConnection();