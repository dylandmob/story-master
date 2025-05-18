import {
  CARD_ERROR,
  EDIT_CARD,
  GET_CARDS,
  GET_CARDS_FOR_ACT,
  GET_CARDS_FOR_TAG,
  GET_CARD_FOR_ID,
} from '../types';

export interface CardAction {
  type: string;
  payload?: any;
}

export interface CardState {
  cards: Card[];
  card: Card | null;
  cardError: string | null;
}

const cardReducer = (state: CardState, action: CardAction) => {
  switch (action.type) {
    case GET_CARD_FOR_ID:
    case EDIT_CARD:
      return { ...state, card: action.payload };
    case GET_CARDS:
    case GET_CARDS_FOR_ACT:
    case GET_CARDS_FOR_TAG:
      return { ...state, cards: action.payload };
    case CARD_ERROR:
      return { ...state, cardError: action.payload };
    default:
      return state;
  }
};

export default cardReducer;
