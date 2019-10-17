import React, { Fragment, useState } from 'react';
import { CardTitle, Form, FormGroup, FormInput, Button } from 'shards-react';

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const onSubmit = e => {
    e.preventDefault();

    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(email).toLowerCase());

    isValid ? onSignIn(email) : setIsEmailValid(false);
  };

  return (
    <Fragment>
      <CardTitle style={{ marginTop: 10, width: '100%' }}>Sign In</CardTitle>
      <Form className='my-3' onSubmit={onSubmit}>
        <FormGroup>
          <label htmlFor='email'>Email</label>
          <FormInput
            name='email'
            type='email'
            placeholder='john@gmail.com'
            value={email}
            invalid={!isEmailValid}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <Button theme='success' type='submit' block>
          Next
        </Button>
      </Form>
    </Fragment>
  );
};

export default SignIn;
