import React, { useReducer } from 'react';
import CampaignContext from './index';
import campaignReducer, {
  CampaignState as CampaignStateType,
} from './campaignReducer';

import api from '../../api/CampaignService';
import tagApi from '../../api/TagService';

import {
  CAMPAIGN_ERROR,
  GET_CURRENT_CAMPAIGN,
  GET_MY_CAMPAIGNS,
  CREATE_CAMPAIGN,
  EDIT_CAMPAIGN,
  DELETE_CAMPAIGN,
  CREATE_TAG,
  DELETE_TAG,
  EDIT_TAG,
  GET_TAGS,
  GET_CAMPAIGNS,
} from '../types';

const CAMPAIGN = 'campaign';
const TAG = 'tag';

const CampaignState = ({ children }: { children: React.ReactNode }) => {
  const initialState: CampaignStateType = {
    campaign: null,
    campaigns: [],
    myCampaigns: [],
    campaignError: null,
  };

  const [state, dispatch] = useReducer(campaignReducer, initialState);

  // Get a campaign by id
  const getCampaignForId = async (id: number) => {
    try {
      const response = await api.getCampaignForId(id);
      dispatch({ type: GET_CURRENT_CAMPAIGN, payload: response });
    } catch (err) {
      handleError('Error getting a campaign', err);
    }
  };

  // Get the tags of a campaign
  const getTags = async (campaignId: number) => {
    try {
      const response = await tagApi.getTags(campaignId);
      dispatch({ type: GET_TAGS, payload: response });
    } catch (err) {
      handleError('Error getting tags', err);
    }
  };

  // Get all of the user's campaigns
  const getMyCampaigns = async () => {
    try {
      const response = await api.getMyCampaigns();
      dispatch({ type: GET_MY_CAMPAIGNS, payload: response });
    } catch (err) {
      handleError('Error getting my campaigns', err);
    }
  };

  // Get campaigns
  const getCampaigns = async () => {
    try {
      const response = await api.getCampaigns();
      dispatch({ type: GET_CAMPAIGNS, payload: response });
    } catch (err) {
      handleError('Error getting campaigns', err);
    }
  };

  // Create a new campaign
  const createCampaign = async (formData: any) => {
    try {
      let data = normalizeData(formData, CAMPAIGN);
      const response = await api.createCampaign(data);
      dispatch({ type: CREATE_CAMPAIGN, payload: response });
      return response._id;
    } catch (err) {
      handleError('Error creating a campaign', err);
    }
  };

  // Edit campaign
  const editCampaign = async (campaignId: number, formData: any) => {
    try {
      let data = normalizeData(formData, CAMPAIGN);
      const response = await api.editCampaign(campaignId, data);
      dispatch({ type: EDIT_CAMPAIGN, payload: response });
      return response;
    } catch (err) {
      handleError('Error editing a campaign', err);
    }
  };

  // Delete a campaign
  const deleteCampaign = async (id: number) => {
    try {
      await api.deleteCampaign(id);
      dispatch({ type: DELETE_CAMPAIGN });
    } catch (err) {
      handleError('Error deleting a campaign', err);
    }
  };

  // Create a tag
  const createTag = async (campaignId: number, formData: any) => {
    try {
      let tag = normalizeData(formData, TAG);
      const response = await tagApi.createTag(campaignId, tag);
      dispatch({ type: CREATE_TAG, payload: response });
      return response._id;
    } catch (err) {
      handleError('Error creating a tag', err);
    }
  };

  // Edit a tag
  const editTag = async (campaignId: number, tagId: number, formData: any) => {
    try {
      let tag = normalizeData(formData, TAG);
      const response = await tagApi.editTag(campaignId, tagId, tag);
      dispatch({ type: EDIT_TAG, payload: response });
      return tagId;
    } catch (err) {
      handleError('Error editing a tag', err);
    }
  };

  // Delete a tag
  const deleteTag = async (campaignId: number, tagId: number) => {
    try {
      await tagApi.deleteTag(campaignId, tagId);
      dispatch({ type: DELETE_TAG, payload: tagId });
    } catch (err) {
      handleError('Error deleting a tag', err);
    }
  };

  // Normalize form data, depends on type
  const normalizeData = (formData: any, type: string) => {
    let data: any = {};
    if (formData.name) data.name = formData.name;
    if (formData.description) data.description = formData.description;
    if (formData.imageUrl) data.imageUrl = formData.imageUrl;
    if (type === CAMPAIGN && formData.hidden) data.hidden = formData.hidden;
    if (type === CAMPAIGN && formData.wiki) data.wiki = formData.wiki;
    if (type === TAG && formData.privateDescription)
      data.privateDescription = formData.privateDescription;
    return data;
  };

  // Handle errors
  const handleError = (type: string, err: any) =>
    dispatch({ type: CAMPAIGN_ERROR, payload: `${type}: ${err}` });

  return (
    <CampaignContext.Provider
      value={{
        campaign: state.campaign,
        myCampaigns: state.myCampaigns,
        campaigns: state.campaigns,
        campaignError: state.campaignError,
        getCampaigns,
        getMyCampaigns,
        getCampaignForId,
        createCampaign,
        editCampaign,
        deleteCampaign,
        getTags,
        createTag,
        editTag,
        deleteTag,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignState;
