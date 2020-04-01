import React, { useContext, useState } from 'react';
import CampaignContext from '../../../context/campaign';
import { Container, FormCheckbox, Button } from 'shards-react';
import FormComponent from './FormComponent';
import WikiTabs from './WikiTabs';

const EditCampaign = () => {
  const [hidden, setHidden] = useState(false);
  const [tabs, setTabs] = useState([]);
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
        {/* <FormCheckbox checked={hidden} onChange={() => setHidden(!hidden)}>
          Hidden
        </FormCheckbox> */}
        <WikiTabs />
      </FormComponent>
      <Button
        className="mt-4"
        block
        theme="danger"
        type="button"
        onClick={onDelete}
        style={{ width: 500, margin: 'auto', marginBottom: '100px' }}
      >
        Delete campaign
      </Button>
    </Container>
  );
};

export default EditCampaign;
