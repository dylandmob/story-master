import React, { useContext, useEffect, useState } from 'react';
import CampaignContext from '../../context/campaign';
import CardContext from '../../context/cards';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormCheckbox, Button } from 'shards-react';
import FormComponent from '../campaign/edit/FormComponent';

const EditCard = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const cardContext = useContext(CardContext);
  const campaignContext = useContext(CampaignContext);
  const { card, getCardForId, editCard, deleteCard } = cardContext;
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

  const onEdit = (cardData) => {
    cardData.tags = selectedTags;
    editCard(campaign._id, card._id, cardData).then((id) => {
      toast.success('Saved!');
      history.push(`/campaign/${campaign._id}/edit/card/${id}`);
    });
  };

  const onDelete = () => {
    deleteCard(campaign._id, card._id).then(() => {
      toast('Banished! That card was deleted.');
      history.push(`/campaign/${campaign._id}/edit`);
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
    <>
      <FormComponent
        defaultValue={card}
        type="card"
        hasImage
        onSave={onEdit}
        edit
      >
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
      </FormComponent>
      <Button
        className="mt-3"
        block
        theme="danger"
        type="button"
        onClick={onDelete}
        style={{ width: 500, margin: 'auto', marginBottom: '100px' }}
      >
        Delete
      </Button>
    </>
  );
};

export default EditCard;
