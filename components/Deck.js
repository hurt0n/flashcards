import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {fetchDeck} from '../utils/api'
import {receiveDeck} from '../actions'
import Quiz from './Quiz'
import AddCard from './AddCard'
import {yellow, darkYellow} from '../utils/colors'

class Deck extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deck,
      headerTitleStyle: {
           color: 'white',
      },
      headerTintColor: 'white',
    }
  }

  render() {
    const { decks } = this.props
    const { deck } = this.props.navigation.state.params
    return(
      <View style={styles.container}>
        <View style={styles.deckItem}>
          <Text style={styles.cardName}>{decks[deck].title}</Text>
          <Text style={styles.questionCounter}>{decks[deck].questions.length} Cards</Text>
          {decks[deck].questions.length > 0 ? (
            <TouchableOpacity onPress={() => this.props.navigation.navigate(
              'Quiz',
              {deck}
            )}>
              <View style={styles.btnMain}>
                <Text style={styles.btnMainText}>{"Start Quiz".toUpperCase()}</Text>
              </View>
            </TouchableOpacity>
          ) : (<Text style={styles.questionCounter}>No cards</Text>)
          }
          <TouchableOpacity onPress={() => this.props.navigation.navigate(
            'AddCard',
            {deck}
          )}>
            <View style={styles.btnMain}>
              <Text style={styles.btnMainText}>{"Add Card".toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  deckItem: {
    height: 380,
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
    textAlign: 'center',
    marginBottom: 50
  },
  btnMain: {
    padding: 14,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 30,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: yellow,
    shadowColor: yellow,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 10,
    shadowOpacity: .4
  },
  btnMainText: {
    color: darkYellow,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(Deck)
