import React, { useReducer } from 'react';
import CampaignContext from './index';
import campaignReducer from './campaignReducer';

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
  GET_TAGS
} from '../types';

const CampaignState = props => {
  const initialState = {
    campaign: null,
    campaigns: [],
    myCampaigns: [],
    campaignError: null
  };

  const [state, dispatch] = useReducer(campaignReducer, initialState);

  // Get a campaign by it's id
  const getCampaignForId = async id => {
    try {
      const response = await api.getCampaignForId(id);
      const tags = await tagApi.getTags(id);
      response.tags = tags;
      dispatch({ type: GET_CURRENT_CAMPAIGN, payload: response });
    } catch (err) {
      handleError('Error getting a campaign', err);
    }
  };

  const getTags = async campaignId => {
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

  // Create a new campaign
  const createCampaign = async (name, description, imageUrl) => {
    try {
      if (!name && name.length > 2 && name.length < 30) {
        throw Error('Name is not of proper format');
      }
      let data = {};
      if (name) data.name = name;
      if (description) data.description = description;
      if (imageUrl) data.imageUrl = imageUrl;
      const response = await api.createCampaign(data);
      dispatch({ type: CREATE_CAMPAIGN, payload: response });
      return response;
    } catch (err) {
      handleError('Error creating a campaign', err);
    }
  };

  // Edit campaign
  const editCampaign = async (campaignId, name, description, imageUrl) => {
    try {
      let data = {};
      if (name) data.name = name;
      if (description) data.description = description;
      if (imageUrl) data.imageUrl = imageUrl;
      const response = await api.editCampaign(campaignId, data);
      dispatch({ type: EDIT_CAMPAIGN, payload: response });
      return response;
    } catch (err) {
      handleError('Error editing a campaign', err);
    }
  };

  // Delete a campaign
  const deleteCampaign = async id => {
    try {
      await api.deleteCampaign(id);
      dispatch({ type: DELETE_CAMPAIGN });
    } catch (err) {
      handleError('Error deleting a campaign', err);
    }
  };

  // Create a tag
  const createTag = async (campaignId, formData) => {
    try {
      let tag = {};
      if (formData.name) tag.name = formData.name;
      if (formData.description) tag.description = formData.description;
      if (formData.privateDescription)
        tag.privateDescription = formData.privateDescription;
      if (formData.imageUrl) tag.imageUrl = formData.imageUrl;
      const response = await tagApi.createTag(campaignId, tag);
      dispatch({ type: CREATE_TAG, payload: response });
    } catch (err) {
      handleError('Error creating a tag', err);
    }
  };

  // Edit a tag
  const editTag = async (campaignId, tagId, formData) => {
    try {
      let tag = {};
      if (formData.name) tag.name = formData.name;
      if (formData.description) tag.description = formData.description;
      if (formData.privateDescription)
        tag.privateDescription = formData.privateDescription;
      if (formData.imageUrl) tag.imageUrl = formData.imageUrl;
      const response = await tagApi.editTag(campaignId, tagId, tag);
      dispatch({ type: EDIT_TAG, payload: response });
    } catch (err) {
      handleError('Error editing a tag', err);
    }
  };

  // Delete a tag
  const deleteTag = async (campaignId, tagId) => {
    try {
      await tagApi.deleteTag(campaignId, tagId);
      dispatch({ type: DELETE_TAG });
    } catch (err) {
      handleError('Error deleting a tag', err);
    }
  };

  // Handle errors
  const handleError = (type, err) =>
    dispatch({ type: CAMPAIGN_ERROR, payload: `${type}: ${err}` });

  return (
    <CampaignContext.Provider
      value={{
        campaign: state.campaign,
        myCampaigns: state.myCampaigns,
        campaigns: state.campaigns,
        campaignError: state.campaignError,
        getMyCampaigns,
        getCampaignForId,
        createCampaign,
        editCampaign,
        deleteCampaign,
        createTag,
        editTag,
        deleteTag
      }}
    >
      {props.children}
    </CampaignContext.Provider>
  );
};

export default CampaignState;
