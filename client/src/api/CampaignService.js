import api from './api';

// Get user's campaigns
const getMyCampaigns = () =>
  api({
    url: '/api/campaigns?category=me',
    method: 'GET'
  });

// Get a campaign by id
const getCampaignForId = id =>
  api({
    url: `/api/campaigns/${id}`,
    method: 'GET'
  });

// Create a new campaign
const createCampaign = data =>
  api({
    url: '/api/campaigns',
    method: 'POST',
    data
  });

// Edit a campaign
const editCampaign = (id, data) =>
  api({
    url: `/api/campaigns/${id}`,
    method: 'PATCH',
    data
  });

// Delete user
const deleteCampaign = id =>
  api({
    url: `/api/campaigns/${id}`,
    method: 'DELETE'
  });

export default {
  getMyCampaigns,
  getCampaignForId,
  createCampaign,
  editCampaign,
  deleteCampaign
};
