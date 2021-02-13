import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const AlertsContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  & > * + * {
    margin-top: 1rem;
  }
`;
AlertsContainer.displayName = 'alerts-container';

export const Alert = styled.div`
  background: ${props => (props.variant === 'SUCCESS' ? '#6dd029' : 'red')};
  padding: 0.5rem;
  border: 1px solid #a1a1a1;
  color: #fff;
`;
Alert.displayName = 'alert';

const Alerts = () => {
  const alerts = useSelector(state => state.alerts);

  return (
    <AlertsContainer>
      {alerts.map(alert => (
        <Alert key={alert.msg} variant={alert.type}>
          {alert.msg}
        </Alert>
      ))}
    </AlertsContainer>
  );
};

export default Alerts;
