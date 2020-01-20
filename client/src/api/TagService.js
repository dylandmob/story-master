import api from './api';

// Get tags for a campaign
const getTags = campaignId =>
  api({ url: `/api/campaigns/${campaignId}/tags`, method: 'GET' });

// Create a new tag
const createTag = (campaignId, data) =>
  api({ url: `/api/campaigns/${campaignId}/tags`, method: 'POST', data });

// Edit a card
const editTag = (campaignId, tagId, data) =>
  api({
    url: `/api/campaigns/${campaignId}/tags/${tagId}`,
    method: 'PATCH',
    data
  });

// Delete a tag
const deleteTag = (campaignId, tagId) =>
  api({ url: `/api/campaigns/${campaignId}/tags/${tagId}`, method: 'DELETE' });

export default {
  getTags,
  createTag,
  editTag,
  deleteTag
};
