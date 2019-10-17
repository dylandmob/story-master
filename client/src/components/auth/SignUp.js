import React, { Fragment, useState } from 'react';
import {
  CardTitle,
  CardSubtitle,
  Form,
  FormGroup,
  FormInput,
  Button
} from 'shards-react';

const SignUp = ({ onSignUp }) => {
  const [name, setName] = useState('');

  return (
    <Fragment>
      <CardTitle>Sign Up</CardTitle>
      <CardSubtitle>No account was found with your email</CardSubtitle>
      <Form className='my-3'>
        <FormGroup>
          <label htmlFor='name'>Name</label>
          <FormInput
            name='name'
            placeholder='John Doe'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormGroup>
        <Button type='button' block onClick={() => onSignUp(name)}>
          Sign Up
        </Button>
      </Form>
    </Fragment>
  );
};

export default SignUp;
