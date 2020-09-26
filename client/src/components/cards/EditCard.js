import React, { useContext, useEffect, useState } from 'react';
import CampaignContext from '../../context/campaign';
import CardContext from '../../context/cards';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dropdown, Checkbox } from 'semantic-ui-react';
import FormComponent from '../campaign/edit/FormComponent';

const EditCard = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [hidden, setHidden] = useState(false);
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
      setHidden(card.hidden);
      const options = campaign.tags
        .sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
        .map((tag) => {
          return { key: tag._id, text: tag.name, value: tag };
        });
      setTagOptions(options);
      const selected = options
        .filter((tag) => card.tags.includes(tag.key))
        .map((tag) => tag.value);
      setSelectedTags(selected);
    }
    // eslint-disable-next-line
  }, [campaign, card]);

  const onEdit = (cardData) => {
    cardData.tags = selectedTags.map((tag) => tag._id);
    cardData.hidden = hidden;
    console.log('Card Data', cardData);
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

  const handleChange = (e, { value }) => setSelectedTags(value);

  return (
    <FormComponent
      defaultValue={card}
      type="card"
      hasImage
      edit
      onSave={onEdit}
      onDelete={onDelete}
    >
      <h4 style={{ marginTop: '20px' }}>Tags - minimum 1</h4>
      {campaign && (
        <Dropdown
          value={selectedTags}
          onChange={handleChange}
          placeholder="Select Tags"
          fluid
          multiple
          search
          selection
          options={tagOptions}
          renderLabel={(label) => ({
            color: 'blue',
            content: label.text,
          })}
        />
      )}
      <Checkbox
        label="Hide this card? Only you will be able to see it."
        checked={hidden}
        onChange={(e) => setHidden(!hidden)}
        style={{ marginTop: '20px' }}
      />
    </FormComponent>
  );
};

export default EditCard;
