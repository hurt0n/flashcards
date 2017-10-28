import React from 'react'
import {Notifications, Permissions} from 'expo'
import {AsyncStorage} from 'react-native'
import {StyleSheet} from 'react-native'
import {yellow, darkYellow} from './colors'

const NOTIFICATION_KEY = 'Flashcards:notifications'

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'log your stats',
    body: 'dont forget',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      sticky: false,
      priority: 'high',
      vibrate: true
    }
  }
}

export const StyleBtn = StyleSheet.create({
  btnMain: {
    padding: 14,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
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
  },
})

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(({status}) => {
        if (status === 'granted') {
          Notifications.cancelAllScheduleNotificationsAsync()

          let tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          tomorrow.setHours(20)
          tomorrow.setMinutes(0)

          Notifications.scheduleLocalNotificationAsync(
            createNotification(),
            {
              time: tomorrow,
              repeat: 'day'
            }
          )

          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        }
      })
    }
  }))
}
