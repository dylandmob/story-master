import React, { Fragment, useContext } from 'react';
import { Card, CardImg, CardBody } from 'shards-react';
import { animated, useTransition } from 'react-spring';
import AuthContext from '../../context/auth/authContext';
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
        src='https://i.imgur.com/BvtUCMb.jpg'
        style={{ height: 300, objectFit: 'cover' }}
      />
      <CardBody
        style={{
          height: '250px',
          width: '100%',
          paddingLeft: 25,
          paddingRight: 25
        }}
      >
        {transitions.map(({ item, key, props }) => (
          <Fragment key={key}>
            {item === SIGN_IN && (
              <animated.div
                style={{
                  ...props,
                  width: 'calc(100% - 50px)'
                }}
              >
                <SignIn onSignIn={onSignIn} />
              </animated.div>
            )}
            {item === SIGN_UP_REQ && (
              <animated.div style={{ ...props, width: 'calc(100% - 50px)' }}>
                <SignUp onSignUp={onSignUp} />
              </animated.div>
            )}
            {item === EMAIL_SENT && (
              <animated.div style={{ ...props, width: 'calc(100% - 50px)' }}>
                <EmailSent />
              </animated.div>
            )}
          </Fragment>
        ))}
      </CardBody>
    </Card>
  );
};

export default AuthCard;
