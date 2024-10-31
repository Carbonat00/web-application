const { getLieky } = require('./skusobnypostgres'); 
const { searchData } = require('./elasticaccess'); 

const searchBoth = async (searchValue) => {
    try {
        const [postgresResults, elasticsearchResults] = await Promise.all([
            getLieky(searchValue),      // Knex-Postgres search
            searchData(searchValue)     // Elasticsearch search
        ]);

        return {
            postgres: postgresResults,
            elasticsearch: elasticsearchResults
        };
    } catch (error) {
        console.error('Error during simultaneous search:', error);
        throw error; 
    }
}
module.exports.searchBoth = searchBoth
