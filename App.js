import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

// Screens
import LoginScreen from './screens/auth/LoginScreen';
import CalendarScreen from './screens/planning/CalendarScreen';
import ServiceSheetScreen from './screens/planning/ServiceSheetScreen';
import RadarScreen from './screens/radar/RadarScreen';
import RequestsScreen from './screens/requests/RequestsScreen';
import RecoveryRequestScreen from './screens/requests/RecoveryRequestScreen';
import LeaveRequestScreen from './screens/requests/LeaveRequestScreen';
import ShiftExchangeScreen from './screens/requests/ShiftExchangeScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import NotificationsScreen from './screens/notifications/NotificationsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="ServiceSheet" component={ServiceSheetScreen} />
    </Stack.Navigator>
  );
}

function RequestsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RequestsList" component={RequestsScreen} />
      <Stack.Screen name="RecoveryRequest" component={RecoveryRequestScreen} />
      <Stack.Screen name="LeaveRequest" component={LeaveRequestScreen} />
      <Stack.Screen name="ShiftExchange" component={ShiftExchangeScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Radar" component={RadarScreen} />
      <Tab.Screen name="Requests" component={RequestsStack} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.payload,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.payload,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      dispatch({ type: 'RESTORE_TOKEN', payload: userToken });
    };

    bootstrapAsync();
  }, []);

  React.useEffect(() => {
    // Set up notification listener
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('Notification received:', response);
      }
    );

    return () => subscription.remove();
  }, []);

  if (state.isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      {state.userToken == null ? (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      ) : (
        <MainTabs />
      )}
    </NavigationContainer>
  );
}
