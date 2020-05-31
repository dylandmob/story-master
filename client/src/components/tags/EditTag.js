import React, { useContext, useState, useEffect } from 'react';
import CampaignContext from '../../context/campaign';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormComponent from '../campaign/edit/FormComponent';

const EditTag = () => {
  const [tag, setTag] = useState();
  const campaignContext = useContext(CampaignContext);
  const { campaign, getTags, editTag, deleteTag } = campaignContext;
  let history = useHistory();
  let { params } = useRouteMatch();

  useEffect(() => {
    if (params.tagId && !campaign.tags) {
      getTags();
    } else {
      let foundTag = campaign.tags.find((t) => t._id === params.tagId);
      setTag(foundTag);
    }
    // eslint-disable-next-line
  }, []);

  const onEdit = (tagData) => {
    editTag(campaign._id, tag._id, tagData).then((id) => {
      toast.success('Changes saved!');
      history.push(`/campaign/${campaign._id}/edit/tag/${id}`);
    });
  };

  const onDelete = () => {
    deleteTag(campaign._id, tag._id).then(() => {
      toast('Done! That tag was deleted.');
      history.push(`/campaign/${campaign._id}/edit`);
    });
  };

  return (
    <FormComponent
      defaultValue={tag}
      type="tag"
      hasImage
      edit
      onSave={onEdit}
      onDelete={onDelete}
    />
  );
};

export default EditTag;
