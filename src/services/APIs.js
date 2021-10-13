import axios from 'axios'
axios.defaults.timeout = 10000

export default  API = "https://api.themoviedb.org/3/"






export const getToprated = (callBack) => {
    axios.get(API + "movie/top_rated", {
        api_key:"4f298a53e552283bee957836a529baec"

    }).then((response) => {
        return callBack({ data: response.data })
    }).catch((e) => {
        return callBack({ error: e })
    })
}

export const getupcome = (callBack) => {
    axios.get("https://api.themoviedb.org/3/movie/upcoming", {
        api_key:"4f298a53e552283bee957836a529baec"

    }).then((response) => {
console.log(response);  
  }).catch((e) => {
        return callBack({ error: e })
    })
}
