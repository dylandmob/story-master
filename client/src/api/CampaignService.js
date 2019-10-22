import api from './api';

// Get user's campaigns
const getMyCampaigns = () =>
  api({
    url: '/campaigns?category=me',
    method: 'GET'
  });

// Get a campaign by id
const getCampaignForId = id =>
  api({
    url: `/campaigns/${id}`,
    method: 'GET'
  });

// Create a new campaign
const createCampaign = data =>
  api({
    url: '/campaigns',
    method: 'POST',
    data
  });

// Edit a campaign
const editCampaign = (id, data) =>
  api({
    url: `/campaigns/${id}`,
    method: 'PATCH',
    data
  });

// Delete user
const deleteCampaign = id =>
  api({
    url: `/campaigns/${id}`,
    method: 'DELETE'
  });

export default {
  getMyCampaigns,
  getCampaignForId,
  createCampaign,
  editCampaign,
  deleteCampaign
};
