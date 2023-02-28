import api from './api';

// Get user's campaigns
const getCampaigns = (): Promise<Campaign[]> =>
  api({
    url: '/api/campaigns',
    method: 'GET',
  });

// Get user's campaigns
const getMyCampaigns = (): Promise<Campaign[]> =>
  api({
    url: '/api/campaigns?category=me',
    method: 'GET',
  });

// Get a campaign by id
const getCampaignForId = (id: number): Promise<Campaign> =>
  api({
    url: `/api/campaigns/${id}`,
    method: 'GET',
  });

// Create a new campaign
const createCampaign = (data: Partial<Campaign>): Promise<Campaign> =>
  api({
    url: '/api/campaigns',
    method: 'POST',
    data,
  });

// Edit a campaign
const editCampaign = (id: number, data: Partial<Campaign>): Promise<Campaign> =>
  api({
    url: `/api/campaigns/${id}`,
    method: 'PATCH',
    data,
  });

// Delete user
const deleteCampaign = (id: number): Promise<void> =>
  api({
    url: `/api/campaigns/${id}`,
    method: 'DELETE',
  });

const CampaignService = {
  getCampaigns,
  getMyCampaigns,
  getCampaignForId,
  createCampaign,
  editCampaign,
  deleteCampaign,
};
export default CampaignService;
