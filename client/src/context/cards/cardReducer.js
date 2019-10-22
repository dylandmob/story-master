import {
  CAMPAIGN_ERROR,
  GET_MY_CAMPAIGNS,
  GET_CAMPAIGNS,
  CREATE_CAMPAIGN,
  GET_CURRENT_CAMPAIGN,
  DELETE_CAMPAIGN
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_MY_CAMPAIGNS:
      return { ...state, myCampaigns: action.payload };
    case GET_CAMPAIGNS:
      return { ...state, campaigns: action.payload };
    case GET_CURRENT_CAMPAIGN:
      return { ...state, campaign: action.payload };
    case CREATE_CAMPAIGN:
      return { ...state, campaign: action.payload };
    case DELETE_CAMPAIGN:
      return { ...state, campaign: null };
    case CAMPAIGN_ERROR:
      return { ...state, userError: action.payload };
    default:
      return state;
  }
};
