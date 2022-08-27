import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getHeaderTitle} from '@react-navigation/elements';
import Register from './src/screens/Register';
import ForgotPassword from './src/screens/ForgotPassword';
import ResetPassword from './src/screens/ResetPassword';
import CreatePin from './src/screens/CreatePin';
import CreatePinSuccess from './src/screens/CreatePinSuccess';
import Dashboard from './src/screens/privates/Dashboard';
import HomeTab from './src/screens/privates/HomeTab';
import History from './src/screens/privates/History';
import {COLOR_SECONDARY, widthResponsive} from './src/styles/constant';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderCustom from './src/components/Header';
import TransactionDetail from './src/screens/privates/TransactionDetail';
import styles from './src/styles/global';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen
          options={{headerShown: false}}
          name={'Login'}
          component={Login}
        />
        <Stack.Screen name={'Sign Up'} component={Register} />
        <Stack.Screen name={'Forgot Password'} component={ForgotPassword} />
        <Stack.Screen name={'Reset Password'} component={ResetPassword} />
        <Stack.Screen
          name={'Create Pin Success'}
          component={CreatePinSuccess}
        />
        <Stack.Screen name={'Create Pin'} component={CreatePin} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={'HomeTab'}
          component={HomeTab}
        />
        <Stack.Screen
          options={{
            headerTransparent: true,
            header: ({navigation, options, route, back}) => {
              const title = getHeaderTitle(options, route.name);
              return (
                <HeaderCustom
                  navigation={navigation}
                  title={title}
                  back={back}
                  child={
                    <View style={styles.headerChild}>
                      <View style={styles.headerChildContent}>
                        <View style={styles.headerContentRow}>
                          <Icon
                            name="ios-arrow-down"
                            size={widthResponsive(1.2)}
                            color={'green'}
                          />
                          <View style={styles.textHeaderWrapper}>
                            <Text style={styles.textLightWhite}>Income</Text>
                            <Text
                              style={styles.textBoldWhite}
                              ellipsizeMode="tail"
                              numberOfLines={1}>
                              Rp. 2.000.000.000.000,00
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.headerChildContent}>
                        <View style={styles.headerContentRow}>
                          <Icon
                            name="ios-arrow-up"
                            size={widthResponsive(1.2)}
                            color={'firebrick'}
                          />
                          <View style={styles.textHeaderWrapper}>
                            <Text style={styles.textLightWhite}>Income</Text>
                            <Text
                              style={styles.textBoldWhite}
                              ellipsizeMode="tail"
                              numberOfLines={1}>
                              Rp. 2.000.000.000.000,00
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  }
                />
              );
            },
          }}
          name={'Transaction Detail'}
          component={TransactionDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
