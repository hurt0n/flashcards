import { AsyncStorage } from 'react-native'

const FLASHCARDS_STORAGE_KEY = 'MobileFlashCards'

export function initStorage() {
  const defaultState = {
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
  AsyncStorage.clear()
  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(defaultState))
}

export function fetchDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  .then((result) => {JSON.parse(result)})
}

export function fetchDeck(deck) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
}

export function saveDeckTitle(deckTitle) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  .then((result) => {
    const data = JSON.parse(result)
    data
    ? data[deckTitle] = {
      title: deckTitle,
      questions: []
    }
    : null
    AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))})
}

export function addCardToDeck(title, card) {
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  .then((result) => {
    const data = JSON.parse(result)
    data
    ? (data[title].questions ? data[title].questions.push(card) : data[title].questions = new Array(card))
    : null
    AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))})
}
