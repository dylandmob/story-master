import React, { useEffect, useContext } from 'react';
import queryString from 'query-string';
import { Container, Row, Col } from 'shards-react';
import AuthContext from '../../context/auth';
import AuthCard from './AuthCard';

const Auth = ({ location, history }) => {
  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    let params = queryString.parse(location.search);
    if (params.token && params.refreshToken) {
      signIn(params.token, params.refreshToken);
      history.push('/');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Row>
        <Col sm="12" md="6" lg="6">
          <div style={{ position: 'fixed', top: '50%' }}>
            <h2>Welcome to Story Master</h2>
            <h4 style={{ color: 'gray' }}>Plan your story</h4>
            <p>A work in progress :)</p>
          </div>
        </Col>
        <Col sm="12" md="6" lg="6">
          <AuthCard cardStyle={{ top: '50%' }} />
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
