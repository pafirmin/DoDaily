import styled from 'styled-components';

export const SlideOut = styled.div`
  background: #fff;
  padding: 1.5rem;
  box-shadow: 3px 3px 12px #c3c3c3;
  position: fixed;
  right: ${props => (props.show ? '0' : '-500px')};
  transition: right 0.3s;
  top: ${props => props.theme.headerHeight};
  height: 100%;
  width: 350px;
  z-index: 1000;
`;
