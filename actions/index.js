import {RECEIVE_DECKS, RECEIVE_DECK, ADD_DECK, ADD_CARD} from './types'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function receiveDeck(deck) {
  return {
    type: RECEIVE_DECK,
    deck
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function addCard(deck, card) {
  return {
    type: ADD_CARD,
    deck,
    card
  }
}
