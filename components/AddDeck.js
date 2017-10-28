import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Text, TextInput, View, KeyboardAvoidingView, StyleSheet, TouchableOpacity} from 'react-native'
import {yellow, darkYellow} from '../utils/colors'
import {addDeck} from '../actions'
import {saveDeckTitle} from '../utils/api'
import {NavigationActions} from 'react-navigation'
import {StyleBtn} from '../utils/helpers'

class AddDeck extends Component {

  state = {
    deck: null
  }

  submit = () => {
    const {deck} = this.state
    this.props.dispatch(addDeck(deck))
    this.toDeck()
    saveDeckTitle(deck)
  }

  toDeck = () => {
    const {deck} = this.state
    this.props.navigation.navigate(
      'Deck',
      {deck}
    )
  }

  render() {
    return(
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.heading1}>What is the title of your new deck?</Text>
        <TextInput style={styles.textInput}
          placeholder='Wrte your new deck name'
          onChangeText={(deckTitle) => this.setState({deck: deckTitle})}
          value={this.state.deck} />
        <TouchableOpacity onPress={this.submit}>
          <View style={StyleBtn.btnMain}>
            <Text style={StyleBtn.btnMainText}>{"Add Deck".toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  }
});
