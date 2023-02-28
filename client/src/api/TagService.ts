import api from './api';

// Get tags for a campaign
const getTags = (campaignId: number): Promise<Tag[]> =>
  api({ url: `/api/campaigns/${campaignId}/tags`, method: 'GET' });

// Create a new tag
const createTag = (campaignId: number, data: Partial<Tag>): Promise<Tag> =>
  api({ url: `/api/campaigns/${campaignId}/tags`, method: 'POST', data });

// Edit a card
const editTag = (
  campaignId: number,
  tagId: number,
  data: Partial<Tag>
): Promise<Tag> =>
  api({
    url: `/api/campaigns/${campaignId}/tags/${tagId}`,
    method: 'PATCH',
    data,
  });

// Delete a tag
const deleteTag = (campaignId: number, tagId: number): Promise<void> =>
  api({ url: `/api/campaigns/${campaignId}/tags/${tagId}`, method: 'DELETE' });

const TagService = {
  getTags,
  createTag,
  editTag,
  deleteTag,
};

export default TagService;
