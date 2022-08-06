import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';

function Loader({ query }) {
  return (
    <Wrapp>
      <MyNotification>search {query}</MyNotification>;
      <TailSpin
        height="80"
        width="80"
        radius="9"
        color="black"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
      ;
    </Wrapp>
  );
}

const Wrapp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyNotification = styled.h2`
  font-size: 40px;
  text-align: center;
  margin-top: 20px;
`;

export default Loader;
