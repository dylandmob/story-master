import React, { useReducer } from 'react';
import CardContext from './index';
import cardReducer, { CardState as CardStateType } from './cardReducer';

import api from '../../api/CardService';

import {
  CARD_ERROR,
  EDIT_CARD,
  GET_CARDS,
  GET_CARDS_FOR_ACT,
  GET_CARDS_FOR_TAG,
  GET_CARD_FOR_ID,
} from '../types';

const CardState: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState: CardStateType = {
    cards: [],
    card: null,
    cardError: null,
  };

  const [state, dispatch] = useReducer(cardReducer, initialState);

  // Get campaign cards
  const getCards = async (campaignId: number) => {
    try {
      const response = await api.getCards(campaignId);
      dispatch({ type: GET_CARDS, payload: response });
    } catch (err) {
      handleError('Error getting campaign cards', err);
    }
  };

  // Get card for id
  const getCardForId = async (campaignId: number, cardId: number) => {
    try {
      const response = await api.getCardForId(campaignId, cardId);
      dispatch({ type: GET_CARD_FOR_ID, payload: response });
    } catch (err) {
      handleError('Error getting card', err);
    }
  };

  // Get cards for an act
  const getCardsForAct = async (campaignId: number, actId: number) => {
    try {
      const response = await api.getCardsForAct(campaignId, actId);
      dispatch({ type: GET_CARDS_FOR_ACT, payload: response });
    } catch (err) {
      handleError('Error getting cards for an act', err);
    }
  };

  // Get cards for a tag
  const getCardsForTag = async (campaignId: number, tagId: number) => {
    try {
      const response = await api.getCardsForTag(campaignId, tagId);
      dispatch({ type: GET_CARDS_FOR_TAG, payload: response });
    } catch (err) {
      handleError('Error getting cards for a tag', err);
    }
  };

  // Create a new card
  const createCard = async (campaignId: number, formData: Partial<Card>) => {
    try {
      let data: Partial<Card> = {};
      if (formData.name) data.name = formData.name;
      if (formData.description) data.description = formData.description;
      if (formData.privateDescription)
        data.privateDescription = formData.privateDescription;
      if (formData.imageUrl) data.imageUrl = formData.imageUrl;
      if (formData.tags) data.tags = formData.tags;
      if (formData.hidden !== undefined) data.hidden = formData.hidden;
      const response = await api.createCard(campaignId, data);
      dispatch({ type: EDIT_CARD, payload: response });
      return response._id;
    } catch (err) {
      handleError('Error editing card', err);
    }
  };

  // Edit a card
  const editCard = async (
    campaignId: number,
    cardId: number,
    formData: Partial<Card>
  ) => {
    try {
      let data: Partial<Card> = {};
      if (formData.name) data.name = formData.name;
      if (formData.description) data.description = formData.description;
      if (formData.privateDescription)
        data.privateDescription = formData.privateDescription;
      if (formData.imageUrl) data.imageUrl = formData.imageUrl;
      if (formData.tags) data.tags = formData.tags;
      if (formData.hidden !== undefined) data.hidden = formData.hidden;
      await api.editCard(campaignId, cardId, data);
      return cardId;
    } catch (err) {
      handleError('Error editing card', err);
    }
  };

  // Delete a card
  const deleteCard = async (campaignId: number, cardId: number) => {
    try {
      await api.deleteCard(campaignId, cardId);
    } catch (err) {
      handleError('Error deleting card', err);
    }
  };

  // Handle errors
  const handleError = (type: string, err: any) =>
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
        deleteCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardState;
