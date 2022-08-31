import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  COLOR_5,
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
import {onNextPage} from '../../redux/reducers/transaction';

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

const History = () => {
  const history = useSelector(state => state.transaction.results);
  const infoData = useSelector(state => state.transaction.infoPage);
  const [data, setData] = useState([...history]);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [activeAsc, setActiveAsc] = React.useState(false);
  const [activeDesc, setActiveDesc] = React.useState(false);
  const [filterBy, setFilterBy] = React.useState(0);
  const bottomSheet = useRef();
  console.log(history);
  let sortBy = '';
  if (filterBy === 0) {
    sortBy = 'time_transaction';
  } else {
    sortBy = 'amount';
  }
  const onRefreshData = () => {
    setActiveAsc(false);
    setActiveDesc(false);
    setFilterBy(0);
    // dispatch(historyTransaction({token: token, page: '1'}))
  };

  const onAscFilter = () => {
    setActiveAsc(!activeAsc);
    dispatch(historyTransaction({token: token, sortType: '0', sortBy: sortBy, limit: 10000}));
    // if (activeAsc) {
    // } else {
    //   dispatch(historyTransaction({token: token, sortType: '1'}));
    // }
    setActiveDesc(false);
  };
  const onDescFilter = () => {
    setActiveDesc(!activeDesc);
    setActiveAsc(false);
    dispatch(historyTransaction({token: token, sortType: '1', sortBy: sortBy, limit: 10000}));
    // if (activeDesc) {
    // } else {
    //   onRefreshData();
    // }
  };

  const onNextPageData = () => {
    let type = '';
    if (activeAsc) {
      type = '0';
    } else if (activeDesc) {
      type = '1';
    } else {
      type = '1';
    }
    if (data.length < infoData.totalDatas) {
      if (infoData.nextPage != null) {
        dispatch(
          historyTransaction({
            token: token,
            sortType: type,
            sortBy: sortBy,
            page: infoData.nextPage,
          }),
        );
      }
      if (infoData.currentPage !== 1) {
        setData([...data, ...history]);
      } else {
        setData([...data]);
      }
      // dispatch(onNextPage(history));
    }
  };
  React.useEffect(() => {
    if (!activeAsc && !activeDesc) {
      dispatch(historyTransaction({token: token,sortBy: sortBy, limit: 5}));
      setData(history);
    }
  }, [dispatch, token, activeAsc, activeDesc]);
  return (
    <DashboardLayout
      child={
        <>
          <View style={[style.root, style.marginContent]}>
            {/* <StatusBar backgroundColor={COLOR_SECONDARY} /> */}
            <View style={style.root}>
              <TitleContent titleText={'Your Transaction'} />
              <FlatList
                onRefresh={onRefreshData}
                refreshing={false}
                data={activeAsc || activeDesc ? history : data}
                contentContainerStyle={style.container}
                onEndReachedThreshold={0.5}
                onEndReached={!activeAsc || !activeDesc ? onNextPageData : null}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={style.cardPadding}
                    onPress={() =>
                      console.log('this is data with id ' + item.id)
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
                        item.type === 'topup' || item.type === 'accept'
                          ? item.sender
                          : item.recipient
                      }
                      type={item.type}
                      amount={convertMoney(item.amount)}
                    />
                  </TouchableOpacity>
                )}
              />
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
                      filterBy == 0 ? style.bgFilterActive : style.bgWhite,
                    ]}
                    onPress={() => {
                      setFilterBy(0);
                      bottomSheet.current.close();
                    }}>
                    <Text
                      style={
                        filterBy == 0 ? style.textWhite : style.textButton
                      }>
                      Filter By Date
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      style.btnFilterWrapper,
                      filterBy == 1 ? style.bgFilterActive : style.bgWhite,
                    ]}
                    onPress={() => {
                      setFilterBy(1);
                      bottomSheet.current.close();
                    }}>
                    <Text
                      style={
                        filterBy == 1 ? style.textWhite : style.textButton
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
});

export default History;
