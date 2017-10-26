import React from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation'
import {Provider} from 'react-redux'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import {createStore} from 'redux'
import reducer from './reducers'
import {Constants} from 'expo'
import DeckList from './components/DeckList'
import {FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import {blue, brown, lightGray} from './utils/colors'
import {initStorage} from './utils/api'
import {setLocalNotification} from './utils/helpers'

function FlashCardsStatusBar({backgroundColor, ...props}) {
  return(
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: (<MaterialCommunityIcons name='cards-outline' size={30} color={'#000'} />)
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: (<MaterialIcons name='library-add' size={30} color={'#000'} />)
    }
  }
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      style: {
        height: 56,
        backgroundColor: lightGray,
        borderWidth: 0,
      }
    }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerStyle: {
        backgroundColor: blue
      },
      title: 'Home',
      headerTintColor: 'white',
      headerTitleStyle: {
           color: 'white',
       },
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerStyle: {
        backgroundColor: blue
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerStyle: {
        backgroundColor: blue
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: blue,
      },
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class App extends React.Component {
  componentDidMount() {
    // initStorage()
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <FlashCardsStatusBar backgroundColor={blue} barStyle='light-content'/>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
