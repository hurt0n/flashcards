import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native'
import {yellow, darkYellow} from '../utils/colors'
import {addDeck} from '../actions'
import {saveDeckTitle} from '../utils/api'
import {NavigationActions} from 'react-navigation'

class AddDeck extends Component {

  state = {
    deck: null
  }

  submit = () => {
    const {deck} = this.state
    this.props.dispatch(addDeck(deck))
    this.toHome()
    saveDeckTitle(deck)
  }

  toHome = () => {
    this.props.navigation.navigate('DeckList')
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.heading1}>What is the title of your new deck?</Text>
        <TextInput style={styles.textInput}
          placeholder='Wrte your new deck name'
          onChangeText={(deckTitle) => this.setState({deck: deckTitle})}
          value={this.state.deck} />
        <TouchableOpacity onPress={this.submit}>
          <View style={styles.btnMain}>
            <Text style={styles.btnMainText}>{"Add Deck".toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(AddDeck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'stretch',
    padding: 30,
    alignItems: 'center',
  },
  deckItem: {
    height: 280,
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
  heading1: {
    fontSize: 34,
    lineHeight: 38,
    textAlign: 'center',
    color: '#868890'
  },
  textInput: {
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cecece',
    margin: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  btnMain: {
    padding: 14,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 30,
    margin: 20,
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
