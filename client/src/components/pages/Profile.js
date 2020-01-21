import React, { useEffect, useContext, useState } from 'react';
import UserContext from '../../context/user';
import AuthContext from '../../context/auth';
import { Container, Form, FormGroup, FormInput, Button } from 'shards-react';
import { Image } from 'semantic-ui-react';

const Profile = ({ history }) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
  const { user, getMe, editMe } = userContext;
  const { signOut } = authContext;

  useEffect(() => {
    getMe();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setImageUrl(user.imageUrl);
    }
  }, [user]);

  const onSave = e => {
    e.preventDefault();
    console.log('Name', name);
    console.log('ImageUrl', imageUrl);

    editMe(name, imageUrl);
  };

  const onSignOut = () => {
    signOut();
    history.push('/sign-in');
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      {user && (
        <Form className="mt-5" style={{ width: 500 }} onSubmit={onSave}>
          <Image
            src={imageUrl}
            centered
            circular
            style={{ maxHeight: 200, maxWidth: 200 }}
          />
          <FormGroup className="mt-5">
            <label htmlFor="#image">Image Url</label>
            <FormInput
              id="#image"
              placeholder="Your image url aka link ex-https://place-hold.it/200x200"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="#name">Name</label>
            <FormInput
              id="#name"
              placeholder="Your name please"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="#email">Email</label>
            <FormInput type="email" id="#email" disabled value={user.email} />
          </FormGroup>
          <Button className="mt-4" block theme="success" type="submit">
            Save
          </Button>
          <Button
            className="mt-4"
            block
            theme="danger"
            type="button"
            onClick={onSignOut}
          >
            Sign Out
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default Profile;
