import {
  RECEIVE_DECKS,
  RECEIVE_DECK,
  ADD_DECK,
  ADD_CARD
} from '../actions'

const defaultState = {
  decks: {}
}

function decks(state = defaultState, action) {
  const {deck, decks, card} = action
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case RECEIVE_DECK:
      return {
        ...state,
        [deck]: deck
      }
    case ADD_CARD:
      return {
        ...state,
        decks: {
          ...state.decks,
          [deck]: {
            ...state.decks[deck],
            questions: [...state.decks[deck].questions, card]
          }
        }
      }
    case ADD_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          [deck]: {
            title: deck,
            questions: []
          }
        }
      }
    default:
      return state
  }
}

export default decks
