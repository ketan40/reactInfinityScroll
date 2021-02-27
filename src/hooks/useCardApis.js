import {useState} from 'react';
import * as cardApis from '../apis/cardApi';


const useCardApi = () => {
    
    const [cards, setCards] = useState([]);
    const [isFetchingCards , setIsFectchingCards] = useState(false);
    const [fetchingCardsApiError, setFetchingCardsApiError] = useState(false);

    const getCards = async ({pageSize}) => {

        try {
          setIsFectchingCards(true);
          const result = await cardApis.getCards({pageSize});
          setCards(result.data && result.data.cards.length ? result.data.cards: []);  
        } catch (error) {
            setFetchingCardsApiError(true);
        }
        setIsFectchingCards(false);
    }

    return {
        state: {
            getCards,
            cards,
            isFetchingCards,
            fetchingCardsApiError
        }
    }

}

export default useCardApi;