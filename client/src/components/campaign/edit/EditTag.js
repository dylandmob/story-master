import React, { useContext, useState, useEffect } from 'react';
import CampaignContext from '../../../context/campaign';
import { useHistory, useRouteMatch } from 'react-router-dom';
import FormComponent from './FormComponent';

const EditTag = () => {
  const [tag, setTag] = useState();
  const campaignContext = useContext(CampaignContext);
  const { campaign, getTags, editTag } = campaignContext;
  let history = useHistory();
  let { params } = useRouteMatch();

  useEffect(() => {
    if (params.tagId && !campaign.tags) {
      getTags();
    } else {
      let foundTag = campaign.tags.find(t => t._id === params.tagId);
      setTag(foundTag);
    }
    // eslint-disable-next-line
  }, []);

  const onEdit = tagData => {
    editTag(campaign._id, tag._id, tagData).then(id => {
      console.log('Id', id);

      history.push(`/campaign/${campaign._id}/edit/tag/${id}`);
    });
  };

  return (
    <FormComponent
      defaultValue={tag}
      type="tag"
      hasImage
      onSave={onEdit}
      edit
    ></FormComponent>
  );
};

export default EditTag;
