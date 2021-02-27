const axios = require('axios');


const baseUrl = 'https://api.elderscrollslegends.io/v1';


export const getCards = ({pageSize}) => {

    let url = baseUrl + `/cards?pageSize=${pageSize}`;
    return axios.get(url);

}