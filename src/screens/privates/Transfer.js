import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import {UserCardContent} from '../../components/Card';
import styles from '../../styles/global';
import {
  COLOR_5,
  COLOR_GRAY,
  COLOR_PRIMARY,
  widthResponsive,
} from '../../styles/constant';
import {useDispatch, useSelector} from 'react-redux';
import {getAllUser, getOtherUser} from '../../redux/asyncActions/user';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderCustom2} from '../../components/Header';
import {onRefreshPage} from '../../redux/reducers/user';
import {useFocusEffect} from '@react-navigation/native';

const Transfer = ({navigation}) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.results);
  const errorMsg = useSelector(state => state.users.errorMsg);
  const nextUsers = useSelector(state => state.users.resultNextUser);
  const token = useSelector(state => state.auth.token);
  const infoData = useSelector(state => state.users.infoData);
  const [keywords, setKeywords] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const onSearchUser = val => {
    console.log(val);
    if (val) {
      setKeywords(val);
    } else {
      setPage(1);
      dispatch(onRefreshPage());
      setKeywords('');
    }
  };

  const onNextPageUsers = () => {
    if (infoData.nextPage != null) {
      setPage(infoData.nextPage);
    }
  };

  const onRefreshPageData = () => {
    setPage(1);
    setKeywords('');
    dispatch(onRefreshPage());
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        dispatch(onRefreshPage());
        setPage(1);
        setKeywords('');
        setLoading(false);
      }, 1000);
    }, []),
  );

  React.useEffect(() => {
    if (keywords) {
      dispatch(getAllUser({token: token, keywords: keywords.toLowerCase()}));
    } else {
      if (keywords === '' && page === 1) {
        dispatch(getAllUser({token: token, limit: 4, page: 1}));
      } else {
        dispatch(getAllUser({token: token, limit: 4, page: page}));
      }
    }
  }, [keywords, dispatch, token, page]);
  return (
    <DashboardLayout
      child={
        <>
          <HeaderCustom2
            navigation={navigation}
            title={'Transfer'}
            back={true}
            child={
              <View style={style.inputWrapper}>
                <View style={style.iconBox}>
                  <Icon name="ios-search" size={widthResponsive(1)} />
                </View>
                <TextInput
                  placeholder="Search reciever here"
                  value={keywords}
                  onChangeText={onSearchUser}
                />
              </View>
            }
          />
          <View style={[styles.rootFlex1]}>
            <View style={styles.rootFlex1}>
              {!loading ? (
                <>
                  {!errorMsg || !nextUsers ? (
                    <FlatList
                      data={
                        keywords
                          ? users
                          : !keywords && page === 1
                          ? users
                          : nextUsers
                      }
                      refreshing={false}
                      onRefresh={onRefreshPageData}
                      onEndReachedThreshold={0.01}
                      onEndReached={onNextPageUsers}
                      keyExtractor={item => item.id}
                      ListHeaderComponent={
                        <View style={style.contentWrapper}>
                          <View style={style.titleWrapper}>
                            <View style={style.textWrapper}>
                              <Text style={style.textTitle}>Contact</Text>
                            </View>
                            <View style={style.textWrapper}>
                              <Text style={style.subtitleText}>
                                17 Contact Founds
                              </Text>
                            </View>
                          </View>
                        </View>
                      }
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          style={style.cardPadding}
                          onPress={() => {
                            dispatch(getOtherUser({token: token, id: item.id}));
                            navigation.navigate('Input Amount', {
                              data: {item},
                            });
                          }}>
                          <UserCardContent
                            image={{uri: item.photo_url}}
                            icon={
                              !item.photo_url ? (
                                <Icon
                                  name="ios-person"
                                  size={widthResponsive(3)}
                                />
                              ) : null
                            }
                            name={item.username}
                            // amount={item.}
                            type={item.phone_number ?? '-'}
                          />
                        </TouchableOpacity>
                      )}
                    />
                  ) : (
                    <View style={style.boxEmpty}>
                      <Text style={style.emptyText}>Data is empty</Text>
                    </View>
                  )}
                </>
              ) : (
                <View style={style.boxEmpty}>
                  <ActivityIndicator size={'large'} color={COLOR_PRIMARY} />
                </View>
              )}
            </View>
          </View>
        </>
      }
    />
  );
};
const style = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: widthResponsive(1),
  },
  titleWrapper: {
    paddingVertical: widthResponsive(1.5),
  },
  textTitle: {
    color: COLOR_5,
    fontSize: widthResponsive(1),
    fontWeight: 'bold',
  },
  subtitleText: {
    color: COLOR_5,
    fontSize: widthResponsive(0.6),
    fontWeight: '600',
  },
  textWrapper: {
    paddingVertical: widthResponsive(0.25),
  },
  cardPadding: {
    paddingBottom: widthResponsive(1),
  },
  inputWrapper: {
    backgroundColor: 'white',
    marginHorizontal: widthResponsive(1),
    borderRadius: widthResponsive(0.5),
    flexDirection: 'row',
    height: widthResponsive(2.5),
    alignItems: 'center',
  },
  iconBox: {
    width: widthResponsive(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  emptyText: {
    fontSize: widthResponsive(1.3),
    color: COLOR_GRAY,
    fontWeight: 'bold',
  },
});
export default Transfer;
