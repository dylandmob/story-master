import React, { useContext, useState } from 'react';
import CampaignContext from '../../context/campaign';
import { Container, Form, FormGroup, FormInput, Button } from 'shards-react';
import { Image } from 'semantic-ui-react';

const NewCampaign = ({ history }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://place-hold.it/200x200');
  const campaignContext = useContext(CampaignContext);
  const { createCampaign } = campaignContext;

  const onCreate = e => {
    e.preventDefault();

    createCampaign(name, description, imageUrl)
      .then(response => {
        history.push(`/campaign/${response._id}`);
      })
      .catch(e => {});
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <Form className='mt-5' style={{ width: 500 }} onSubmit={onCreate}>
        <h2 className='text-center mb-5'>Create a new campaign</h2>
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
        <FormGroup>
          <label htmlFor='#name'>Name</label>
          <FormInput
            id='#name'
            placeholder='Your new campaign name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor='#description'>Description</label>
          <FormInput
            id='#description'
            placeholder='Your new campaign description'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </FormGroup>
        <Button className='mt-4' block theme='success' type='submit'>
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default NewCampaign;
