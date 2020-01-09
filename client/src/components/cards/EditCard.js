import React, { useContext, useEffect, useState } from 'react';
import CampaignContext from '../../context/campaign';
import CardContext from '../../context/cards';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { FormCheckbox } from 'shards-react';
import FormComponent from '../campaign/FormComponent';

const EditCard = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const cardContext = useContext(CardContext);
  const campaignContext = useContext(CampaignContext);
  const { card, getCardForId, editCard } = cardContext;
  const { campaign, getTags } = campaignContext;
  let history = useHistory();
  let { params } = useRouteMatch();

  useEffect(() => {
    if (params.cardId) {
      getCardForId(params.id, params.cardId);
      if (!campaign.tags) {
        getTags();
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (campaign && card) {
      setSelectedTags(selectedTags.concat(card.tags));
    }
    // eslint-disable-next-line
  }, [campaign, card]);

  const onEdit = cardData => {
    cardData.tags = selectedTags;
    editCard(campaign._id, card._id, cardData).then(id => {
      history.push(`/campaign/${campaign._id}/card/${id}`);
    });
  };

  const handleChange = (e, tagId) => {
    let isSelected = selectedTags.includes(tagId);
    if (isSelected) {
      // Remove tag id from array
      setSelectedTags(selectedTags.filter(t => t !== tagId));
    } else {
      // Add tag to array
      setSelectedTags(selectedTags.concat(tagId));
    }
  };

  return (
    <FormComponent
      defaultValue={card}
      type="card"
      hasImage
      onSave={onEdit}
      edit
    >
      <h4>Add tags - minimum 1</h4>
      {campaign &&
        campaign.tags.map(tag => (
          <FormCheckbox
            key={tag._id}
            checked={selectedTags.includes(tag._id)}
            onChange={e => handleChange(e, tag._id)}
          >
            {tag.name}
          </FormCheckbox>
        ))}
    </FormComponent>
  );
};

export default EditCard;
