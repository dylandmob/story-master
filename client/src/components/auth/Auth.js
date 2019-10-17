import React, { useEffect, useContext } from 'react';
import { Container, Row, Col } from 'shards-react';
import AuthContext from '../../context/auth/authContext';
import AuthCard from './AuthCard';

const Auth = props => {
  const { signIn, authStatus } = useContext(AuthContext);

  useEffect(() => {
    console.log('Props', props);
    console.log('Match', props.location);

    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Row>
        <Col sm='12' md='6' lg='6'>
          <div style={{ position: 'fixed', top: '50%' }}>
            <h2>Welcome to Story Master</h2>
            <h4 style={{ color: 'gray' }}>Plan your story</h4>
            <p>A work in progress :)</p>
          </div>
        </Col>
        <Col sm='12' md='6' lg='6'>
          <AuthCard cardStyle={{ top: '30vh' }} />
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
