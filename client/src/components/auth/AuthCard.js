import React, { Fragment, useContext } from 'react';
import { Card, CardImg, CardBody, Button } from 'shards-react';
import { animated, useTransition } from 'react-spring';
import AuthContext from '../../context/auth';
import { SIGN_IN, SIGN_UP_REQ, EMAIL_SENT } from '../../context/types';
import SignIn from './SignIn';
import SignUp from './SignUp';
import EmailSent from './EmailSent';

const AuthCard = props => {
  const { signUp, sendMagicLink, user, authStatus } = useContext(AuthContext);

  const transitions = useTransition(authStatus, null, {
    from: {
      transform: 'translate3d(-100%,0,0)',
      opacity: 0,
      position: 'absolute'
    },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(100%, 0,0)', opacity: 0 }
  });

  const onSignIn = email => sendMagicLink(email);

  const onSignUp = name => signUp(user.email, name);

  return (
    <Card
      style={{
        overflow: 'hidden',
        maxWidth: '90%',
        ...props.cardStyle
      }}
    >
      <CardImg
        src="https://i.imgur.com/BvtUCMb.jpg"
        style={{ height: 300, objectFit: 'cover' }}
      />
      <CardBody
        style={{
          height: '80px',
          width: '100%',
          paddingLeft: 25,
          paddingRight: 25
        }}
      >
        {transitions.map(({ item, key, props }) => (
          <animated.div
            key={key}
            style={{ width: 'calc(100% - 50px)', ...props }}
          >
            <Button href="/auth/google" theme="primary" block>
              Sign In with Google
            </Button>
          </animated.div>
        ))}
      </CardBody>
    </Card>
  );
};

export default AuthCard;
