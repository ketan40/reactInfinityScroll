import  {useState, useEffect, useRef, useCallback} from 'react';

import * as cardApis from '../apis/cardApi';


export default function useCardEffect (pageSize, loadMore) {
    const [loading, setLoading] = useState(true);
    const [cardError, setCardError] = useState(false);
    const [cards, setCards] = useState([]);

    const  getCards = async ()  => {
     const result =   await  cardApis.getCards({pageSize});
     return result;
    }

    useEffect(() => {
        setLoading(true);
        setCardError(false);
     try {
       getCards().then(result => {
       console.log(result);
       setCards(prevCards => {
         return [...prevCards, ...result.data && result.data.cards];
         })
        setLoading(false);
       });
     } catch (error) {
        setCardError(true);
     }

    },[pageSize])

    useEffect(() => {
    if(loadMore) {
     try {
        getCards().then(result => {
            console.log(result);
            setCards(prevCards => {
              return [...prevCards, ...result.data && result.data.cards];
        })
        })
     } catch (error) {
         
     }
    }
    },[loadMore])

    return {loading, cardError, cards}
}