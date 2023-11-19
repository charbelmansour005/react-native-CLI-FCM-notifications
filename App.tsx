/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
const TOPIC = 'MyNews';

type notification = string | undefined;

const App = () => {
  const [notifTitle, setNotifTitle] = useState<notification>('');
  const [notifDesc, setNotifDesc] = useState<notification>('');
  const [darkTheme, setDarkTheme] = useState(false);

  const requestUserPermission = async () => {
    /**
     * On iOS, messaging permission must be requested by
     * the current application before messages can be
     * received or sent
     */
    const authStatus = await messaging().requestPermission();
    console.log('Authorization status(authStatus):', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  const handleNotification = (remoteMessage: any) => {
    setNotifTitle(remoteMessage?.notification?.title);
    setNotifDesc(remoteMessage?.notification?.body);
  };

  useEffect(() => {
    requestUserPermission();

    // if (requestUserPermission.) {
    //   /**
    //    * Returns an FCM token for this device
    //    */
    //   messaging()
    //     .getToken()
    //     .then(fcmToken => {
    //       console.log('FCM Token -> ', fcmToken);
    //     });
    // } else console.log('Not Authorization status:', authStatus);

    /**
     * When a notification from FCM has triggered the application
     * to open from a quit state, this method will return a
     * `RemoteMessage` containing the notification data, or
     * `null` if the app was opened via another method.
     */
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          handleNotification(remoteMessage);
          console.log(
            'getInitialNotification:' +
              'Notification caused app to open from quit state',
          );
          console.log(remoteMessage);

          Alert.alert(
            'getInitialNotification: Notification caused app to' +
              ' open from quit state',
          );
        }
      });

    /**
     * When the user presses a notification displayed via FCM,
     * this listener will be called if the app has opened from
     * a background state. See `getInitialNotification` to see
     * how to watch for when a notification opens the app from
     * a quit state.
     */
    messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage) {
        handleNotification(remoteMessage);
        console.log(
          'onNotificationOpenedApp: ' +
            'Notification caused app to open from background state',
        );

        console.log(remoteMessage);
        Alert.alert(
          'onNotificationOpenedApp: Notification caused app to' +
            ' open from background state',
        );
      }
    });

    /**
     * Set a message handler function which is called when
     * the app is in the background or terminated. In Android,
     * a headless task is created, allowing you to access the
     * React Native environment to perform tasks such as updating
     * local storage, or sending a network request.
     */
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      if (remoteMessage) {
        handleNotification(remoteMessage);
      }
      console.log('Message handled in the background!', remoteMessage);
    });

    /**
     * When any FCM payload is received, the listener callback
     * is called with a `RemoteMessage`. Returns an unsubscribe
     * function to stop listening for new messages.
     */
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!');
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    /**
     * Apps can subscribe to a topic, which allows the FCM
     * server to send targeted messages to only those devices
     * subscribed to that topic.
     */
    messaging()
      .subscribeToTopic(TOPIC)
      .then(() => {
        console.log(`Topic: ${TOPIC} Suscribed`);
      });

    return () => {
      unsubscribe;
      /**
       * Unsubscribe the device from a topic.
       */
      // messaging().unsubscribeFromTopic(TOPIC);
    };
  }, []);

  return (
    <View style={[styles.container, darkTheme && styles.darkContainer]}>
      <Text style={[styles.flatListTitle, darkTheme && styles.darkTitle]}>
        Notification List
      </Text>
      <View
        style={[styles.notificationContainer, darkTheme && styles.darkTheme]}>
        <Text style={[styles.title, darkTheme && styles.darkTitle]}>
          {notifTitle}
        </Text>
        <Text style={[styles.description, darkTheme && styles.darkDescription]}>
          {notifDesc}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setDarkTheme(!darkTheme)}
        style={[styles.toggleButton, darkTheme && styles.darkToggleButton]}>
        <Text style={darkTheme && styles.darkToggleText}>
          Toggle Dark Theme: {darkTheme ? 'ON' : 'OFF'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  flatListTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  notificationContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  darkTheme: {
    backgroundColor: '#444',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  darkTitle: {
    color: '#ddd',
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  darkDescription: {
    color: '#aaa',
  },
  toggleButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  darkToggleButton: {
    backgroundColor: '#2c3e50',
  },
  darkToggleText: {
    color: '#fff',
  },
});
export default App;
