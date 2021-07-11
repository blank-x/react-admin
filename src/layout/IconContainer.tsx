import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  url?: string;
}

const IconContainer = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  background-size: 100% 100%;
  vertical-align: text-top;
  background-image: ${(props: IProps) => `url(${props.url})`};
`;


export default IconContainer;
