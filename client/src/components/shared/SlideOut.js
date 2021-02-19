import styled from 'styled-components';

export const SlideOut = styled.div`
  background: #fff;
  padding: 1.5rem;
  box-shadow: 3px 3px 12px #c3c3c3;
  position: fixed;
  padding-bottom: 8rem;
  right: ${props => (props.show ? '0' : '-100%')};
  transition: right 0.3s;
  top: ${props => props.theme.headerHeight};
  height: ${props => `calc(100vh - ${props.theme.headerHeight})`};
  overflow-y: auto;
  width: 350px;
  z-index: 1000;

  @media (max-width: 600px) {
    width: 100%;
  }
`;
