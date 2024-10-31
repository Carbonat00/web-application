const { Client } = require('@elastic/elasticsearch');
const esClient = new Client({ node: 'http://192.168.0.123:9200' });

async function searchData(searchValue) {
    try {
        // Construct the search query with conditions
        const searchQuery = {
            index: 'lieky_index',
            body: {
                query: {
                    bool: {
                        should: [
                            {
                                wildcard: {
                                    "nazov.keyword": `*${searchValue.toUpperCase()}*` // Adjust the wildcard as needed
                                }
                            },
                            {
                                wildcard: {
                                    "balenie.keyword": `*${searchValue.toUpperCase()}*` // Adjust the wildcard as needed
                                }
                            }
                        ]
                    }
                },
                sort: [
                    { "nazov.keyword": { "order": "asc" } },
                    { "balenie.keyword": { "order": "asc" } } // Change "asc" to "desc" for descending order
                ],
                size: 100 // Adjust the size as needed
            }
        };
  
      // Perform the search request
      const response = await esClient.search(searchQuery);
  
      // Log the results
      console.log('Search Results:', response.hits.hits);
  
      return response.hits.hits;
    } catch (error) {
      console.error('Elasticsearch search error:', error);
    }
  }

module.exports.searchData = searchData;
