import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CreateMessage from './pages/CreateMessage';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateMessage"
          component={CreateMessage}
          options={({ navigation }) => ({
            headerTitle: () => (
              <View style={{ flex: 1 }}>
                <Text
                  style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}
                >
                  Nova Mensagem
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={({ navigation }) => ({
            headerTitle: () => (
              <View style={{ flex: 1 }}>
                <Text
                  style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}
                >
                  Posts
                </Text>
              </View>
            ),
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <Button
                  style={{ margin: 10 }}
                  onPress={() => navigation.navigate('CreateMessage')}
                  title="Novo"
                  color="#333"
                />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
