import {View, Text} from 'react-native';
import React from 'react';
import Login from './Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getHeaderTitle} from '@react-navigation/elements';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import CreatePin from './CreatePin';
import CreatePinSuccess from './CreatePinSuccess';
import HomeTab from './privates/HomeTab';
import {widthResponsive} from '../styles/constant';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderCustom from '../components/Header';
import TransactionDetail from './privates/TransactionDetail';
import styles from '../styles/global';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  const token = useSelector(state => state.auth.token);

  const [isLogin, setIsLogin] = React.useState(false);
  React.useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          {!isLogin ? (
            <>
              <Stack.Screen
                options={{headerShown: false}}
                name={'Login'}
                component={Login}
              />
              <Stack.Screen
                options={{headerShown: false}}
                name={'Sign Up'}
                component={Register}
              />
              <Stack.Screen
                name={'Forgot Password'}
                component={ForgotPassword}
              />
              <Stack.Screen name={'Reset Password'} component={ResetPassword} />
            </>
          ) : (
            <>
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
                                  <Text style={styles.textLightWhite}>
                                    Income
                                  </Text>
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
                                  <Text style={styles.textLightWhite}>
                                    Income
                                  </Text>
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
              <Stack.Screen
                name={'Create Pin Success'}
                component={CreatePinSuccess}
              />
              <Stack.Screen name={'Create Pin'} component={CreatePin} />
            </>
          )}
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
