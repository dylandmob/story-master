import React, { useReducer } from 'react';
import CardContext from './index';
import cardReducer from './cardReducer';

import api from '../../api/CardService';

import {
  CARD_ERROR,
  EDIT_CARD,
  GET_CARDS,
  GET_CARDS_FOR_ACT,
  GET_CARDS_FOR_TAG,
  GET_CARD_FOR_ID
} from '../types';

const CardState = props => {
  const initialState = {
    cards: [],
    card: null,
    cardError: null
  };

  const [state, dispatch] = useReducer(cardReducer, initialState);

  // Get campaign cards
  const getCards = async campaignId => {
    try {
      const response = await api.getCards(campaignId);
      dispatch({ type: GET_CARDS, payload: response });
    } catch (err) {
      handleError('Error getting campaign cards', err);
    }
  };

  // Get card for id
  const getCardForId = async (campaignId, cardId) => {
    try {
      const response = await api.getCardForId(campaignId, cardId);
      dispatch({ type: GET_CARD_FOR_ID, payload: response });
    } catch (err) {
      handleError('Error getting card', err);
    }
  };

  // Get cards for an act
  const getCardsForAct = async (campaignId, actId) => {
    try {
      const response = await api.getCardsForAct(campaignId, actId);
      dispatch({ type: GET_CARDS_FOR_ACT, payload: response });
    } catch (err) {
      handleError('Error getting cards for an act', err);
    }
  };

  // Get cards for a tag
  const getCardsForTag = async (campaignId, tagId) => {
    try {
      const response = await api.getCardsForTag(campaignId, tagId);
      dispatch({ type: GET_CARDS_FOR_TAG, payload: response });
    } catch (err) {
      handleError('Error getting cards for a tag', err);
    }
  };

  // Create a new card
  const createCard = async (campaignId, formData) => {
    try {
      let data = {};
      if (formData.name) data.name = formData.name;
      if (formData.description) data.description = formData.description;
      if (formData.privateDescription)
        data.privateDescription = formData.privateDescription;
      if (formData.imageUrl) data.imageUrl = formData.imageUrl;
      if (formData.tags) data.tags = formData.tags;
      const response = await api.createCard(campaignId, data);
      dispatch({ type: EDIT_CARD, payload: response });
      return response._id;
    } catch (err) {
      handleError('Error editing card', err);
    }
  };

  // Edit a card
  const editCard = async (campaignId, cardId, formData) => {
    try {
      let data = {};
      if (formData.name) data.name = formData.name;
      if (formData.description) data.description = formData.description;
      if (formData.privateDescription)
        data.privateDescription = formData.privateDescription;
      if (formData.imageUrl) data.imageUrl = formData.imageUrl;
      await api.editCard(campaignId, cardId, formData.data);
    } catch (err) {
      handleError('Error editing card', err);
    }
  };

  // Delete a card
  const deleteCard = async (campaignId, cardId) => {
    try {
      await api.deleteCard(campaignId, cardId);
    } catch (err) {
      handleError('Error deleting card', err);
    }
  };

  // Handle errors
  const handleError = (type, err) =>
    dispatch({ type: CARD_ERROR, payload: `${type}: ${err}` });

  return (
    <CardContext.Provider
      value={{
        cards: state.cards,
        card: state.card,
        cardError: state.cardError,
        getCardsForAct,
        getCardsForTag,
        getCards,
        getCardForId,
        createCard,
        editCard,
        deleteCard
      }}
    >
      {props.children}
    </CardContext.Provider>
  );
};

export default CardState;
