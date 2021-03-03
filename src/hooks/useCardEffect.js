import  {useState, useEffect, useRef, useCallback} from 'react';

import * as cardApis from '../apis/cardApi';


export default function useCardEffect (pageSize, loadMore, searchTerm) {
    const [loading, setLoading] = useState(true);
    const [cardError, setCardError] = useState(false);
    const [cards, setCards] = useState([]);

    const  getCards = async ({loadMore, searchTerm})  => {
     const result =   await  cardApis.getCards({pageSize, loadMore, searchTerm});
     return result;
    }

    useEffect(() => {
        if(searchTerm) {
            setCards([]);
        }
    },[searchTerm])

    useEffect(() => {
        setLoading(true);
        setCardError(false);
     try {
       getCards({searchTerm}).then(result => {
       setCards(prevCards => {
         return [...prevCards, ...result.data && result.data.cards];
         })
        setLoading(false);
       });
     } catch (error) {
        setLoading(false);
        setCardError(true);
     }

    },[pageSize, searchTerm])

    useEffect(() => {
    if(loadMore > 1) {
     try {
        getCards({loadMore, searchTerm}).then(result => {
            setCards(prevCards => {
              return [...prevCards, ...result.data && result.data.cards];
        })
        })
     } catch (error) {
         
     }
    }
    },[loadMore])

    return {loading, cardError, cards, searchTerm}
}
