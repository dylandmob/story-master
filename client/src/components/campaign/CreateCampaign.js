import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import CampaignContext from '../../context/campaign';
import FormComponent from './edit/FormComponent';

const CreateCampaign = ({ history }) => {
  const campaignContext = useContext(CampaignContext);
  const { createCampaign } = campaignContext;

  const onCreate = (campaignData) =>
    createCampaign(campaignData).then((id) => {
      toast.success(
        'Wow! A whole new story to tell. This is really exciting! Oh sorry, I should just tell you that your campaign was created.',
        {
          onClose: () =>
            toast('You can add your lore by clicking the handy pencil icon!'),
        }
      );
      history.push(`/campaign/${id}`);
    });

  return (
    <FormComponent
      type="campaign"
      explanation="A campaign can also be thought of as your own story or world. Your new campaign will be where you can manage all of your lore!"
      hasImage
      onSave={onCreate}
    />
  );
};

export default CreateCampaign;
