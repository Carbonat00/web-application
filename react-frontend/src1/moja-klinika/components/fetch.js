export const getDataFunction = async(e, id) =>{
    if (e?.preventDefault) e.preventDefault();
    const apiUrl = `http://192.168.0.170:5000/api/vypisanie/doktorov`; 
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


export const getSpravyFunction = async(e, id_odosielatelaSpravy, id_primatelaSpravy) =>{
  if (e?.preventDefault) e.preventDefault();
  const apiUrl = `http://192.168.0.170:5000/api/spravy`; 
  const primatel = id_primatelaSpravy
  try {
    const response = await fetch(`${apiUrl}/${id_odosielatelaSpravy}?primatel=${primatel}`);
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

export const postSpravyFunction = async (e,data)=>{
  e.preventDefault()
  const apiUrl = 'http://192.168.0.170:5000/api/post-spravy' 
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