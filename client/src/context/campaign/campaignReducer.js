import {
  CAMPAIGN_ERROR,
  GET_MY_CAMPAIGNS,
  GET_CAMPAIGNS,
  CREATE_CAMPAIGN,
  GET_CURRENT_CAMPAIGN,
  DELETE_CAMPAIGN,
  GET_TAGS,
  CREATE_TAG,
  DELETE_TAG,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_MY_CAMPAIGNS:
      return { ...state, myCampaigns: action.payload };
    case GET_CAMPAIGNS:
      return { ...state, campaigns: action.payload };
    case GET_CURRENT_CAMPAIGN:
      return { ...state, campaign: { ...state.campaign, ...action.payload } };
    case CREATE_CAMPAIGN:
      return { ...state, campaign: action.payload };
    case DELETE_CAMPAIGN:
      return { ...state, campaign: null };
    case GET_TAGS:
      return {
        ...state,
        campaign: { ...state.campaign, tags: action.payload },
      };
    case CREATE_TAG:
      return {
        ...state,
        campaign: {
          ...state.campaign,
          tags: [...state.campaign.tags, action.payload],
        },
      };
    case DELETE_TAG:
      return {
        ...state,
        campaign: {
          ...state.campaign,
          tags: state.campaign.tags.filter((tag) => tag._id !== action.payload),
          wiki: state.campaign.wiki.filter((tab) => tab !== action.payload),
        },
      };
    case CAMPAIGN_ERROR:
      return { ...state, userError: action.payload };
    default:
      return state;
  }
};
