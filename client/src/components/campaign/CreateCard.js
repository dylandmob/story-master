import React, { useContext, useState } from 'react';
import CampaignContext from '../../context/campaign';
import CardContext from '../../context/cards';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormCheckbox } from 'shards-react';
import CreateForm from './CreateForm';

const CreateCard = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const campaignContext = useContext(CampaignContext);
  const cardContext = useContext(CardContext);
  const { campaign } = campaignContext;
  const { createCard } = cardContext;
  let history = useHistory();

  const onCreate = (card) => {
    card.tags = selectedTags;
    createCard(campaign._id, card).then((id) => {
      toast.success('Your card was created successfully!');
      history.push(`/campaign/${campaign._id}/card/${id}`);
    });
  };

  const handleChange = (e, tagId) => {
    let isSelected = selectedTags.includes(tagId);
    if (isSelected) {
      // Remove tag id from array
      setSelectedTags(selectedTags.filter((t) => t !== tagId));
    } else {
      // Add tag to array
      setSelectedTags(selectedTags.concat(tagId));
    }
  };

  return (
    <CreateForm type="card" hasImage onCreate={onCreate}>
      <h4>Add tags - minimum 1</h4>
      {campaign &&
        campaign.tags.map((tag) => (
          <FormCheckbox
            key={tag._id}
            checked={selectedTags.includes(tag._id)}
            onChange={(e) => handleChange(e, tag._id)}
          >
            {tag.name}
          </FormCheckbox>
        ))}
    </CreateForm>
  );
};

export default CreateCard;
