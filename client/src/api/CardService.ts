import api from './api';

// Get cards for a campaign
const getCards = (campaignId: number): Promise<Card[]> =>
  api({ url: `/api/campaigns/${campaignId}/cards`, method: 'GET' });

// Get cards by id
const getCardForId = (campaignId: number, cardId: number): Promise<Card> =>
  api({ url: `/api/campaigns/${campaignId}/cards/${cardId}`, method: 'GET' });

// Get cards for an act
const getCardsForAct = (campaignId: number, actId: number): Promise<Card[]> =>
  api({
    url: `/api/campaigns/${campaignId}/cards?act=${actId}`,
    method: 'GET',
  });

// Get cards that have the specific tag
const getCardsForTag = (campaignId: number, tagId: number): Promise<Card[]> =>
  api({
    url: `/api/campaigns/${campaignId}/cards?tag=${tagId}`,
    method: 'GET',
  });

// Create a new card
const createCard = (campaignId: number, data: Partial<Card>): Promise<Card> =>
  api({ url: `/api/campaigns/${campaignId}/cards`, method: 'POST', data });

// Edit a card
const editCard = (
  campaignId: number,
  cardId: number,
  data: Partial<Card>
): Promise<Card> =>
  api({
    url: `/api/campaigns/${campaignId}/cards/${cardId}`,
    method: 'PATCH',
    data,
  });

// Delete a card
const deleteCard = (campaignId: number, cardId: number): Promise<void> =>
  api({
    url: `/api/campaigns/${campaignId}/cards/${cardId}`,
    method: 'DELETE',
  });

const CardService = {
  getCards,
  getCardForId,
  getCardsForAct,
  getCardsForTag,
  createCard,
  editCard,
  deleteCard,
};

export default CardService;
