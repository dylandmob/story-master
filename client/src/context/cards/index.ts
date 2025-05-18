import { createContext } from 'react';

export interface CardContextType {
  cards: Card[];
  card: Card | null;
  cardError: string | null;
  getCards: (campaignId: number) => Promise<void>;
  getCardForId: (campaignId: number, cardId: number) => Promise<void>;
  getCardsForAct: (campaignId: number, actId: number) => Promise<void>;
  getCardsForTag: (campaignId: number, tagId: number) => Promise<void>;
  createCard: (campaignId: number, formData: any) => Promise<string>;
  editCard: (
    campaignId: number,
    cardId: number,
    formData: any
  ) => Promise<number>;
  deleteCard: (campaignId: number, cardId: number) => Promise<void>;
}

const CardContext = createContext<CardContextType | null>(null);

export default CardContext;
