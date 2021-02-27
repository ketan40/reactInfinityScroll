import React, {useState, useEffect, useRef, useCallback} from 'react';
import useCardApi from '../hooks/useCardApis';
import styled from 'styled-components';
import Card from './Card';
import useCardEffect from '../hooks/useCardEffect';

const CardsComponent = styled.div`
.container {
}
.cards-container{
    display: grid;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 1fr;
    column-gap: 2.5em;
    row-gap:2.5em
}
     
`;

export const Cards = props => {

    const {state: cardState} = useCardApi();
    const [cardResult, setCardResult] = useState([]);
    const [pageSize, setPageSize] = useState(20);
    const observer = useRef();
    const [loadMore, setLoadMore] = useState(0);

    const {loading, cardError, cards} = useCardEffect(pageSize, loadMore)

    const lastCardRef = useCallback(node => {
        if(loading) return;
        if(observer && observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting) {
                setLoadMore(prev => {
                    return prev + 1;
                });
            }
        })
        if(node) observer.current.observe(node)
    },[loading])

    return (
        <div>
            {
              loading ?  
              <div> 
                  Loading ....
              </div> : 
            <CardsComponent>
              <div className="cards-container">
                   {
                       cards.length > 0 && cards.map((card, index) => {
                         if(cards.length === index + 1) {
                             return (<div key={index} ref={lastCardRef}><Card cardObj={card}  /></div>)
                         } else {
                             return <Card cardObj={card} key={index}/>;
                         }
                       })
                   }
                   {loadMore && <div>
                                    load more....
                   </div>}
             </div>
            </CardsComponent>
            }
        </div>
    )


}

export default Cards;