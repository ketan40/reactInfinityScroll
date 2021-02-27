import React from 'react';
import styled from 'styled-components';


const CardComponent = styled.div`
.card-container{
       box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
       transition: 0.3s;
       border-radius: 5px;
       height: 100%
 }
   .card-container:hover {
       box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
   }
   img-container {
       border-radius: 5px 5px 0 0;
   }
   details-container{

   }
     
`;

export const Card = props => {

 console.log(props.cardObj);

    return (
        <React.Fragment>
            <CardComponent>
            <div className="card-container"> 
                      <div className="img-container"><img src={props.cardObj && props.cardObj.imageUrl} alt="Avatar" style={{width: "100%"}}/></div>
                      <div className="details-container">
                      <h4><b>{props.cardObj.name}</b></h4> 
                      <p>{props.cardObj.text}</p> 
                      <p>{props.cardObj.set.name}</p> 
                      <p>{props.cardObj.type}</p> 
                      </div>
            </div> 
            </CardComponent>
        </React.Fragment>
    )
}

export default Card;