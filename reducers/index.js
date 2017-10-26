import {
  RECEIVE_DECKS,
  RECEIVE_DECK,
  ADD_DECK,
  ADD_CARD
} from '../actions'

const defaultState = {
  decks: {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
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
