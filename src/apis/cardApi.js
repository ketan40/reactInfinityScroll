const axios = require('axios');


const baseUrl = 'https://api.elderscrollslegends.io/v1';


export const getCards = ({pageSize, loadMore, searchTerm}) => {
    const search = searchTerm && searchTerm.length ? `&name=${searchTerm}` : ``;
    const page = loadMore && loadMore > 1 ? `&page=${loadMore}` : ``;
    let url = baseUrl + `/cards?pageSize=${pageSize}${page}${search}`;
    return axios.get(url);

}