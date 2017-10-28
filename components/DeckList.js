import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchDecks, initStorage} from '../utils/api'
import {receiveDecks} from '../actions'
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native'

class DeckList extends Component {

  componentDidMount() {
    fetchDecks().then((data) => {
      this.props.dispatch(receiveDecks(JSON.parse(data)))
    })
  }

  render() {
    const {decks} = this.props
    return(
      <View style={styles.container}>
        {Object.keys(decks).map((deck) => (
          <TouchableOpacity key={deck} style={styles.button}
            onPress={() => this.props.navigation.navigate(
                'Deck',
              {deck}
            )}>
            <View style={styles.deckItem}>
              <Text style={styles.cardName}>{decks[deck].title}</Text>
              <Text style={styles.questionCounter}>{decks[deck].questions.length}</Text>
            </View>
          </TouchableOpacity>)
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  deckItem: {
    height: 180,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    marginTop: 25,
    marginBottom: 0,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 15,
    shadowOpacity: 0.04
  },
  cardName: {
    fontSize: 28,
    textAlign: 'center',
    color: '#868890'
  },
  questionCounter: {
    fontSize: 20,
    color: '#cecece',
    textAlign: 'center'
  },
})

function mapStateToProps(state) {
  return {
    decks: state.decks
  }
}

export default connect(mapStateToProps)(DeckList)
