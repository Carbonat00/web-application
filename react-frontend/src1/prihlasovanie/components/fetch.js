export const postDataFunction = async (e,data)=>{
    e.preventDefault()
    const apiUrl = 'http://192.168.0.170:5000/api/prihlasenie' 
    try {
        const response = await fetch(apiUrl, {
            method: 'POST', // HTTP method
            headers: {
              'Content-Type': 'application/json',  // Specify the content type
            },
            body: JSON.stringify(data),  // Send the data as JSON
          });
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }

}