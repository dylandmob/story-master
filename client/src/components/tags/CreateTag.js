import React, { useContext } from 'react';
import CampaignContext from '../../context/campaign';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormComponent from '../campaign/edit/FormComponent';

const CreateTag = () => {
  const campaignContext = useContext(CampaignContext);
  const { campaign, createTag } = campaignContext;
  let history = useHistory();

  const onCreate = (tag) => {
    createTag(campaign._id, tag).then((id) => {
      toast.success('Yes! Tag was created and ready to go.');
      history.push(`/campaign/${campaign._id}/edit/tag/${id}`);
    });
  };

  return (
    <FormComponent
      type="tag"
      explanation="A tag is how you sort your data. They are applied to your cards to help you organize them!"
      hasImage
      onSave={onCreate}
    />
  );
};

export default CreateTag;
