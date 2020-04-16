import React, { useContext, useState, useEffect } from 'react';
import CampaignContext from '../../../context/campaign';
import { useHistory, useRouteMatch } from 'react-router-dom';
import FormComponent from './FormComponent';
import { Button } from 'shards-react';

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
      console.log('Id', id);

      history.push(`/campaign/${campaign._id}/edit/tag/${id}`);
    });
  };

  const onDelete = () => {
    deleteTag(campaign._id, tag._id).then(() =>
      history.push(`/campaign/${campaign._id}/edit`)
    );
  };

  return (
    <>
      <FormComponent
        defaultValue={tag}
        type="tag"
        hasImage
        onSave={onEdit}
        edit
      />
      <Button
        className="mt-4"
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

export default EditTag;
