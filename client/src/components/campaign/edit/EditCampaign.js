import React, { useContext, useState, useEffect } from 'react';
import CampaignContext from '../../../context/campaign';
import { Container, FormCheckbox, Button } from 'shards-react';
import FormComponent from './FormComponent';

const EditCampaign = () => {
  const [hidden, setHidden] = useState(false);
  const campaignContext = useContext(CampaignContext);
  const { editCampaign, deleteCampaign, campaign } = campaignContext;

  const onEdit = formData => {
    formData.hidden = hidden;
    editCampaign(campaign._id, formData);
  };

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
