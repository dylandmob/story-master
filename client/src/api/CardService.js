import api from './api';

// Get cards for a campaign
const getCards = campaignId =>
  api({ url: `/campaigns/${campaignId}/cards`, method: 'GET' });

// Get cards by id
const getCardForId = (campaignId, cardId) =>
  api({ url: `/campaigns/${campaignId}/cards/${cardId}`, method: 'GET' });

// Get cards for an act
const getCardsForAct = (campaignId, actId) =>
  api({ url: `/campaigns/${campaignId}/cards?act=${actId}`, method: 'GET' });

// Get cards that have the specific tag
const getCardsForTag = (campaignId, tagId) =>
  api({ url: `/campaigns/${campaignId}/cards?tag=${tagId}`, method: 'GET' });

// Create a new card
const createCard = (campaignId, data) =>
  api({ url: `/campaigns/${campaignId}/cards`, method: 'POST', data });

// Edit a card
const editCard = (campaignId, cardId, data) =>
  api({
    url: `/campaigns/${campaignId}/cards/${cardId}`,
    method: 'PATCH',
    data
  });

// Delete a card
const deleteCard = (campaignId, cardId) =>
  api({ url: `/campaigns/${campaignId}/cards/${cardId}`, method: 'DELETE' });

export default {
  getCards,
  getCardForId,
  getCardsForAct,
  getCardsForTag,
  createCard,
  editCard,
  deleteCard
};
