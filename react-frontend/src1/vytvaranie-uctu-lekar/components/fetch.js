export const postDataFunction = async (e,data)=>{
    e.preventDefault()
    const apiUrl = 'http://192.168.0.170:5000/api/lekar/vytvaranie-uctu' 
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

export const getPolohyKlinikyFunction = async(e) =>{
  const apiUrl = `http://192.168.0.170:5000/api/polohy_klinik`; 
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    const data = await response.json();
    console.log(data)
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



export const getNazvyKlinikyFunction = async(id) =>{
  const apiUrl = `http://192.168.0.170:5000/api/nazvy_klinik`; 
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    const data = await response.json();
    console.log(data)
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};