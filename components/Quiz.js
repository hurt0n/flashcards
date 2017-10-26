import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native'
import {correct, correct2, error, error2, lightGray, yellow, darkYellow} from '../utils/colors'
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'

class Quiz extends Component {

  state = {
    questionIndex: 0,
    counter: 0,
    isAnswer: false
  }

  nextQuestion = (bool) => {
    this.setState((state) => ({
      ...state,
      questionIndex: state.questionIndex + 1,
      counter: bool ? state.counter + 1 : state.counter
    }))
  }

  restartQuiz = () => {
    this.setState((state) => ({
      ...state,
      questionIndex: 0,
      counter: 0
    }))
  }

  showAnswer = () => {
    this.setState((state) => ({
      ...state,
      isAnswer: !state.isAnswer
    }))
  }

  render() {
    const { decks } = this.props
    const { questionIndex, counter, isAnswer } = this.state
    const { deck } = this.props.navigation.state.params
    if (decks[deck].questions.length === questionIndex) {
      clearLocalNotification()
      .then(setLocalNotification)
    }
    return decks[deck].questions.length === questionIndex ? (
      <View style={styles.container}>
        <View style={styles.deckItem}>
          <Text style={styles.label3}>You answered correctly {counter} of {decks[deck].questions.length}</Text>
        </View>
        <View style={styles.container2}>
          <TouchableOpacity onPress={this.restartQuiz}>
            <View style={styles.btnMain}>
              <Text style={styles.btnMainText}>{"Restart Quiz".toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(
            'Deck',
            {deck}
          )}>
            <View style={styles.btnMain}>
              <Text style={styles.btnMainText}>{"Back to Deck".toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.showAnswer}>
          {isAnswer ? (
            <View style={styles.deckItem}>
              <Text style={styles.label2}>{questionIndex + 1} / {decks[deck].questions.length}</Text>
              <Text style={styles.cardName}>{decks[deck].questions[questionIndex].answer}</Text>
              <Text style={styles.label}>Answer</Text>
            </View>
          ) : (
            <View style={styles.deckItem}>
              <Text style={styles.label2}>{questionIndex + 1} / {decks[deck].questions.length}</Text>
              <Text style={styles.cardName}>{decks[deck].questions[questionIndex].question}</Text>
              <Text style={styles.label}>Question</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.container2}>
          <TouchableOpacity onPress={() => this.nextQuestion(true)}>
            <View style={styles.btnCorrect}>
              <Text style={styles.btnCorrectText}>{"Correct".toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.nextQuestion(false)}>
            <View style={styles.btnError}>
              <Text style={styles.btnErrorText}>{"Incorrect".toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container2: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center'
  },
  deckItem: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    marginTop: 25,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 15,
    shadowOpacity: 0.04
  },
  btnError: {
    padding: 14,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 30,
    width: 220,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: error,
    shadowColor: error,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 10,
    shadowOpacity: .4
  },
  btnErrorText: {
    color: error2,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  btnCorrect: {
    padding: 14,
    paddingLeft: 60,
    paddingRight: 60,
    width: 220,
    borderRadius: 30,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: correct,
    shadowColor: correct,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 10,
    shadowOpacity: .4
  },
  btnCorrectText: {
    color: correct2,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cardName: {
    fontSize: 28,
    textAlign: 'center',
    color: '#868890'
  },
  label: {
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
    color: '#868890'
  },
  label2: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 10,
    textAlign: 'center',
    color: '#868890'
  },
  label3: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#868890'
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
})
