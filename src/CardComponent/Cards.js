import React, {useState, useEffect, useRef, useCallback} from 'react';
import useCardApi from '../hooks/useCardApis';
import styled from 'styled-components';
import Card from './Card';
import useCardEffect from '../hooks/useCardEffect';
import useDebounce from '../hooks/useDebounceEffect';

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

    const [pageSize, setPageSize] = useState(20);
    const observer = useRef();
    const [loadMore, setLoadMore] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);


    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const {loading, cardError, cards} = useCardEffect(pageSize, loadMore, debouncedSearchTerm)

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
    },[loading]);



  // Here's where the API call happens
  // We use useEffect since this is an asynchronous action
  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm.length > 0) {
          setLoadMore(1);
        setSearchTerm(debouncedSearchTerm)
      }
    },[debouncedSearchTerm]);

    return (
        <div>
            {
              loading ?  
              <div> 
                  Loading ....
              </div> :
              
            <CardsComponent>
                <input
                 value={searchTerm}
                    placeholder="Search Card By Names"
                    onChange={e => setSearchTerm(e.target.value)}
                />
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
                                    loading more....
                   </div>}
             </div>
            </CardsComponent>
            }
        </div>
    )


}

export default Cards;