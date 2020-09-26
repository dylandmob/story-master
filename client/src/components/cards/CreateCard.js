import React, { useContext, useState, useEffect } from 'react';
import CampaignContext from '../../context/campaign';
import CardContext from '../../context/cards';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dropdown, Checkbox } from 'semantic-ui-react';
import FormComponent from '../campaign/edit/FormComponent';

const CreateCard = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [hidden, setHidden] = useState(false);
  const campaignContext = useContext(CampaignContext);
  const cardContext = useContext(CardContext);
  const { campaign } = campaignContext;
  const { createCard } = cardContext;
  let history = useHistory();

  useEffect(() => {
    if (campaign) {
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
    }
    // eslint-disable-next-line
  }, [campaign]);

  const onCreate = (card) => {
    card.tags = selectedTags.map((tag) => tag._id);
    card.hidden = hidden;
    createCard(campaign._id, card).then((id) => {
      toast.success('Your card was created successfully!');
      history.push(`/campaign/${campaign._id}/card/${id}`);
    });
  };

  const handleChange = (e, { value }) => setSelectedTags(value);

  return (
    <FormComponent
      type="card"
      explanation="A card is a piece of your lore. It can be anything from a character to a magical item! Make sure you add a name and at least one tag."
      hasImage
      onSave={onCreate}
    >
      <h4 style={{ marginTop: '20px' }}>Add Tags - minimum 1</h4>
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

export default CreateCard;
