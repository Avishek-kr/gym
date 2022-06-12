export const exerciseOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'efca432c8dmsh026037fbb51ff9bp1fe0adjsnd721e0257d39',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

export const youtubeOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'efca432c8dmsh026037fbb51ff9bp1fe0adjsnd721e0257d39',
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }  
}    

export const fetchData = async (url, options) =>{
    const response = await fetch(url, options);
    const data = await response.json()

    return data;
}