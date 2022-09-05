import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useRef} from 'react';
import {
  COLOR_5,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  convertMoney,
  widthResponsive,
} from '../../styles/constant';
import {TitleContent} from '../../components/Title';
import {UserCardContent} from '../../components/Card';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector, useDispatch} from 'react-redux';
import {historyTransaction} from '../../redux/asyncActions/transaction';
import {onNextPage, onRefreshPage} from '../../redux/reducers/transaction';

export const dummy = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1661395122138-6a5ad27e37a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    name: 'Jessica Liu',
    type: 'accept',
    amount: 10000000,
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1661395122138-6a5ad27e37a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    name: 'Jessica Liu',
    type: 'send',
    amount: 400000,
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1661395122138-6a5ad27e37a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    name: 'Jessica Liu',
    type: 'accept',
    amount: 550000,
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1661395122138-6a5ad27e37a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    name: 'Jessica Liu',
    type: 'send',
    amount: 50000,
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1661395122138-6a5ad27e37a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    name: 'Jessica Liu',
    type: 'accept',
    amount: 10000,
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1661395122138-6a5ad27e37a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    name: 'Jessica Liu',
    type: 'send',
    amount: 90000,
  },
];

const History = ({navigation}) => {
  const history = useSelector(state => state.transaction.results);
  const nextHistory = useSelector(state => state.transaction.resultsNextPage);
  const infoData = useSelector(state => state.transaction.infoPage);
  const token = useSelector(state => state.auth.token);
  const profile = useSelector(state => state.users.profile);
  const dispatch = useDispatch();
  const [activeAsc, setActiveAsc] = React.useState(false);
  const [activeDesc, setActiveDesc] = React.useState(false);
  const [filterType, setFilterType] = React.useState(1);
  const [filterBy, setFilterBy] = React.useState(0);
  const [page, setPage] = React.useState(1);
  let filterName = '';
  if (filterBy === 0) {
    filterName = 'time_transaction';
  } else if (filterBy === 1) {
    filterName = 'amount';
  }

  const bottomSheet = useRef();

  const onAscFilter = () => {
    if (!activeAsc) {
      setFilterType(0);
      setActiveAsc(!activeAsc);
      setActiveDesc(false);
    } else {
      setFilterType(1);
      setActiveAsc(!activeAsc);
      setActiveDesc(false);
    }
    setPage(1);
    dispatch(onRefreshPage());
  };
  const onDescFilter = () => {
    setActiveDesc(!activeDesc);
    setActiveAsc(false);
    setFilterType(1);
    setPage(1);
    dispatch(onRefreshPage());
  };

  const onNextPageData = () => {
    if (infoData.nextPage != null) {
      setPage(infoData.nextPage);
    } else {
      if (nextHistory.length < infoData.totalDatas) {
        setPage(infoData.currentPage + 1);
      }
    }
  };

  const onRefreshData = () => {
    setFilterBy(0);
    setFilterType(1);
    setActiveAsc(false);
    setActiveDesc(false);
    setPage(1);
    dispatch(onRefreshPage());
  };

  console.log(filterName);
  console.log(activeAsc);
  console.log(activeDesc);
  console.log(filterType);
  console.log(page);
  console.log(infoData);
  console.log(nextHistory);

  React.useEffect(() => {
    if (page === 1) {
      dispatch(
        historyTransaction({
          token: token,
          sortType: filterType,
          sortBy: filterName,
          page: 1,
        }),
      );
      dispatch(onRefreshPage());
    } else {
      dispatch(
        historyTransaction({
          token: token,
          sortType: filterType,
          sortBy: filterName,
          page: page,
        }),
      );
      dispatch(onNextPage());
    }
  }, [dispatch, token, filterType, filterName, page]);
  return (
    <DashboardLayout
      child={
        <>
          <View style={[style.root, style.marginContent]}>
            <View style={style.root}>
              <TitleContent titleText={'Your Transaction'} />
              {history ? (
                <FlatList
                  onRefresh={onRefreshData}
                  refreshing={false}
                  data={page === 1 ? history : nextHistory}
                  // contentContainerStyle={style.container}
                  onEndReached={onNextPageData}
                  onEndReachedThreshold={0.01}
                  ListFooterComponent={
                    <View>
                      <Text style={{textAlign: 'center'}}>No data anymore</Text>
                    </View>
                  }
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={style.cardPadding}
                      onPress={() =>
                        navigation.navigate('History Detail', {item})
                      }>
                      <UserCardContent
                        image={{
                          uri: item.image_recipient,
                        }}
                        icon={
                          !item.image_recipient ? (
                            <View style={style.iconBox}>
                              <Icon2
                                name="attach-money"
                                size={widthResponsive(1.5)}
                              />
                            </View>
                          ) : null
                        }
                        name={
                          item.recipient === profile.username &&
                          item.sender !== 'topup'
                            ? item.sender
                            : item.recipient
                          // item.type === 'topup' || item.type === 'accept'
                          //   ? item.sender
                          //   : item.recipient
                        }
                        recipient={
                          item.sender === profile.username ? false : true
                        }
                        type={
                          item.type === 'payment' &&
                          item.recipient === profile.username
                            ? 'accept'
                            : item.sender === profile.username
                            ? 'send'
                            : item.type
                        }
                        amount={convertMoney(item.amount)}
                      />
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <View style={[style.containerr, style.horizontal]}>
                  <ActivityIndicator size={'large'} color={COLOR_PRIMARY} />
                </View>
              )}
            </View>
            <View style={style.boxFilter}>
              <TouchableOpacity
                style={[
                  style.buttonFilterBox,
                  activeAsc ? style.bgActive : style.bgWhite,
                ]}
                onPress={onAscFilter}>
                <Icon
                  name="ios-arrow-up"
                  color={activeAsc ? 'white' : 'orangered'}
                  size={widthResponsive(1.5)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.buttonFilterBox,
                  activeDesc ? style.bgActive : style.bgWhite,
                ]}
                onPress={onDescFilter}>
                <Icon
                  name="ios-arrow-down"
                  color={activeDesc ? 'white' : 'lime'}
                  size={widthResponsive(1.5)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.buttonFilterBox, style.root, style.bgWhite]}
                onPress={() => bottomSheet.current.open()}>
                <Text style={style.textButton}>Filter by Date</Text>
              </TouchableOpacity>
              <RBSheet
                ref={bottomSheet}
                closeOnPressMask={true}
                height={Dimensions.get('screen').height / 3.5}
                closeOnDragDown={true}
                customStyles={{
                  draggableIcon: {
                    backgroundColor: '#000',
                  },
                  container: {
                    borderTopLeftRadius: widthResponsive(1),
                    borderTopRightRadius: widthResponsive(1),
                  },
                }}>
                <View style={style.contentModal}>
                  <TouchableOpacity
                    style={[
                      style.btnFilterWrapper,
                      filterBy === 0 ? style.bgFilterActive : style.bgWhite,
                    ]}
                    onPress={() => {
                      setFilterBy(0);
                      setPage(1);
                      dispatch(onRefreshPage());
                      bottomSheet.current.close();
                    }}>
                    <Text
                      style={
                        filterBy === 0 ? style.textWhite : style.textButton
                      }>
                      Filter By Date
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      style.btnFilterWrapper,
                      filterBy === 1 ? style.bgFilterActive : style.bgWhite,
                    ]}
                    onPress={() => {
                      setFilterBy(1);
                      setPage(1);
                      dispatch(onRefreshPage());
                      bottomSheet.current.close();
                    }}>
                    <Text
                      style={
                        filterBy === 1 ? style.textWhite : style.textButton
                      }>
                      Filter By Amount
                    </Text>
                  </TouchableOpacity>
                </View>
              </RBSheet>
            </View>
          </View>
        </>
      }
    />
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
  marginContent: {
    marginTop: widthResponsive(6),
  },
  container: {
    paddingVertical: widthResponsive(1),
  },
  cardPadding: {
    paddingBottom: widthResponsive(1),
  },
  boxFilter: {
    height: widthResponsive(5),
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonFilterBox: {
    width: widthResponsive(2.5),
    height: widthResponsive(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: widthResponsive(0.4),
    elevation: 1,
    borderRadius: widthResponsive(0.5),
  },
  textButton: {
    color: COLOR_5,
  },
  textWhite: {
    color: 'white',
  },
  bgWhite: {
    backgroundColor: 'white',
  },
  bgActive: {
    backgroundColor: COLOR_SECONDARY,
  },
  contentModal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: widthResponsive(2),
  },
  btnFilterWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: widthResponsive(18),
    height: widthResponsive(2),
    elevation: 2,
    borderRadius: widthResponsive(0.3),
    marginVertical: widthResponsive(0.5),
  },
  bgFilterActive: {
    backgroundColor: COLOR_SECONDARY,
  },
  btnFilterInactive: {
    backgroundColor: 'white',
  },
  iconBox: {
    padding: widthResponsive(0.3),
  },
  containerr: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default History;
