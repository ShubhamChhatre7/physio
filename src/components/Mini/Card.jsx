import React from 'react';
import styled from 'styled-components';
import { UserRound, Clock, HeartPulse } from 'lucide-react';

const Card = (props) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="service-card">
        <Clock className="medical-icon" />
        <h3>{props.h3}</h3>
        <p>{props.p}</p></div>
      
      </div>
              
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 325px;
    height: 300px;
    border-radius: 50px;
    background: #ACE1AF;
    box-shadow: 15px 15px 30px #B0EBB4,
               -15px -15px 30px #ffffff;
  }
   
  
  .service-card {
    padding: 2rem;
    min-height:100%;
    background-color: inherit;
}


  
   .medical-services h3 {
    padding-top: 1rem;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
   .p {
    font-size: 1rem;
    opacity: 0.9;
    line-height: 1.6;
  }`;

export default Card;
