import React, { useState } from 'react';
import { Container, Form, FormGroup, FormInput, Button } from 'shards-react';
import { Image } from 'semantic-ui-react';

const CreateForm = ({ onCreate, hasImage, type, children }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [privateDescription, setPrivateDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(
    hasImage ? 'https://place-hold.it/200x200' : null
  );

  const onSubmit = e => {
    e.preventDefault();
    onCreate({ name, description, privateDescription, imageUrl });
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <Form className='mt-5' style={{ width: 500 }} onSubmit={onSubmit}>
        <h2 className='text-center mb-5'>Create a new {type}</h2>
        {type === 'tag' && (
          <p>Tags are applied to your cards to help you organize them!</p>
        )}
        {hasImage && (
          <React.Fragment>
            <Image
              src={imageUrl}
              centered
              circular
              style={{ maxHeight: 200, maxWidth: 200 }}
            />
            <FormGroup className='mt-5'>
              <label htmlFor='#image'>Image Url</label>
              <FormInput
                id='#image'
                placeholder='Your image url aka link ex-https://place-hold.it/200x200'
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
              />
            </FormGroup>
          </React.Fragment>
        )}
        <FormGroup>
          <label htmlFor='#name'>Name</label>
          <FormInput
            id='#name'
            placeholder={`Your new ${type} name`}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor='#description'>Description</label>
          <FormInput
            id='#description'
            placeholder={`Your new ${type} description`}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor='#privatedescription'>Private Description</label>
          <FormInput
            id='#privatedescription'
            placeholder={`Your ${type} description only to be seen by you and other admins`}
            value={privateDescription}
            onChange={e => setPrivateDescription(e.target.value)}
          />
        </FormGroup>
        {type === 'card' && <FormGroup>{children}</FormGroup>}
        <Button className='mt-4' block theme='success' type='submit'>
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default CreateForm;
