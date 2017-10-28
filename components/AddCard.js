import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native'
import {yellow, darkYellow } from '../utils/colors'
import {StyleBtn} from '../utils/helpers'
import {addCard} from '../actions'
import {addCardToDeck} from '../utils/api'
import {NavigationActions} from 'react-navigation'

class AddCard extends Component {

  state = {
    question: null,
    answer: null
  }

  submit = () => {
    const card = {
      question: this.state.question,
      answer: this.state.answer
    }
    const { deck } = this.props.navigation.state.params
    this.props.dispatch(addCard(deck, card))
    this.toDeck()
    addCardToDeck(deck, card)
  }

  toDeck = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.deckItem}>
          <Text style={stylesForm.label}>{"Question".toUpperCase()}</Text>
          <TextInput style={stylesForm.textInput}
            placeholder='Write your new question'
            onChangeText={(question) => this.setState({question: question})}
            value={this.state.question} />
          <Text style={styles.label}>{"Answer".toUpperCase()}</Text>
          <TextInput style={stylesForm.textInput}
            placeholder='Write an answer'
            onChangeText={(answer) => this.setState({answer: answer})}
            value={this.state.answer} />
          <TouchableOpacity onPress={this.submit}>
            <View style={StyleBtn.btnMain}>
              <Text style={StyleBtn.btnMainText}>{"Add Card".toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default connect()(AddCard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  deckItem: {
    alignItems: 'stretch',
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    marginTop: 25,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 15,
    shadowOpacity: 0.04
  },
  container2: {
    flex: 1,
    alignItems: 'stretch',
  },
});

const stylesForm = StyleSheet.create({
  textInput: {
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cecece',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  label: {
    fontSize: 13,
    marginTop: 10,
    marginBottom: 10,
  }
})
