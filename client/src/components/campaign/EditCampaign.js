import React, { useContext, useState, useEffect } from 'react';
import CampaignContext from '../../context/campaign';
import { Container, FormCheckbox, Button } from 'shards-react';
import FormComponent from './FormComponent';

const EditCampaign = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://place-hold.it/200x200');
  const [hidden, setHidden] = useState(false);
  const campaignContext = useContext(CampaignContext);
  const { editCampaign, deleteCampaign, campaign } = campaignContext;

  useEffect(() => {
    if (campaign) {
      setName(campaign.name);
      setDescription(campaign.description);
      setImageUrl(campaign.imageUrl);
    } else {
      // Fetch campaign data
    }
    // eslint-disable-next-line
  }, [campaign._id]);

  const onEdit = formData => editCampaign(campaign._id, formData);

  const onDelete = () => {
    deleteCampaign(campaign._id);
  };

  return (
    <Container>
      <FormComponent
        defaultValue={campaign}
        type="campaign"
        hasImage
        onSave={onEdit}
        edit
      >
        <FormCheckbox checked={hidden} onChange={() => setHidden(!hidden)}>
          Hidden
        </FormCheckbox>
      </FormComponent>
      <Button
        className="mt-4"
        block
        theme="danger"
        type="button"
        onClick={onDelete}
        style={{ width: 500, margin: 'auto' }}
      >
        Delete campaign
      </Button>
    </Container>
  );
};

export default EditCampaign;
