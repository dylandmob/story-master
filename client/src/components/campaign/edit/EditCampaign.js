import React, { useContext, useState } from 'react';
import CampaignContext from '../../../context/campaign';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, FormCheckbox, Button } from 'shards-react';
import FormComponent from './FormComponent';
import WikiTabs from './WikiTabs';

const EditCampaign = () => {
  const [hidden, setHidden] = useState(false);
  const [newTabs, setTabs] = useState([]);
  const history = useHistory();
  const campaignContext = useContext(CampaignContext);
  const { editCampaign, deleteCampaign, campaign } = campaignContext;

  const onEdit = (formData) => {
    formData.hidden = hidden;
    formData.wiki = newTabs;
    editCampaign(campaign._id, formData).then(() => {
      toast.success(
        'Those were some nice changes. They are saved now by the way.'
      );
      history.push(`/campaign/${campaign._id}`);
    });
  };

  const onDelete = () => {
    deleteCampaign(campaign._id).then(() => {
      toast('Goodbye my old friend... The campaign was deleted.');
      history.push('/');
    });
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
        {campaign.tags && campaign.wiki && (
          <WikiTabs
            tagsList={campaign.tags}
            tabsList={campaign.wiki}
            onTabsChange={(tabs) => setTabs(tabs)}
          />
        )}
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
