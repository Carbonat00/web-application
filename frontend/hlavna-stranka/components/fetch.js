const getDataFunction = async(e, token) =>{
    e.preventDefault(); 
    const condition = token ? encodeURIComponent(token) : ''
    const apiUrl = `http://192.168.0.170:5000/api/nacitanie?id_uzivatela=${condition}`; 
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
export const postDataFunction = async (e,data)=>{
    e.preventDefault()
    const apiUrl = 'http://192.168.0.170:5000/api/pridavanie' 
    try {
        console.log('ahoj')
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

export const deleteDataFunction = async (e,id)=>{
    e.preventDefault()
    const apiUrl = 'http://192.168.0.170:5000/api/clovek';
    try {
        console.log(e, id)
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }

}

export const putDataFunction = async (e,id,data)=>{
  e.preventDefault()
  const apiUrl = 'http://192.168.0.170:5000/api/clovek';
  try {
      console.log(e, id)
      const response = await fetch(`${apiUrl}/${id}`, {
          method: 'PUT', 
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }

}
export default getDataFunction