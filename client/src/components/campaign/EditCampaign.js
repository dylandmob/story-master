import React, { useContext, useState, useEffect } from 'react';
import CampaignContext from '../../context/campaign';
import { Container, Form, FormGroup, FormInput, Button } from 'shards-react';
import { Image } from 'semantic-ui-react';

const EditCampaign = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://place-hold.it/200x200');
  const campaignContext = useContext(CampaignContext);
  const { editCampaign, deleteCampaign, campaign } = campaignContext;

  useEffect(() => {
    if (campaign) {
      setName(campaign.name);
      setDescription(campaign.description);
      setImageUrl(campaign.imageUrl);
    }
    // eslint-disable-next-line
  }, [campaign._id]);

  const onEdit = e => {
    e.preventDefault();
    editCampaign(campaign._id, name, description, imageUrl);
  };

  const onDelete = () => {
    deleteCampaign(campaign._id);
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <Form className='mt-5' style={{ width: 500 }} onSubmit={onEdit}>
        <h2 className='text-center mb-5'>Edit campaign</h2>
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
            placeholder='Your campaign name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor='#description'>Description</label>
          <FormInput
            id='#description'
            placeholder='Your campaign description'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </FormGroup>
        <Button className='mt-4' block theme='success' type='submit'>
          Save changes
        </Button>
        <Button
          className='mt-4'
          block
          theme='danger'
          type='button'
          onClick={onDelete}
        >
          Delete campaign
        </Button>
      </Form>
    </Container>
  );
};

export default EditCampaign;
