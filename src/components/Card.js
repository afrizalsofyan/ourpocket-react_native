import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from '../styles/global';
import {COLOR_5, widthResponsive} from '../styles/constant';
import Icon from 'react-native-vector-icons/Ionicons';

export const UserCardHeader = ({
  image,
  subtitle,
  onPress,
  icon,
  notifCount,
}) => {
  return (
    <>
      <View style={styles.userCardHeader}>
        <View style={styles.userCardRow}>
          <View style={style.rowWrapper}>
            {icon ?? (
              <Image
                source={
                  image
                  //     {
                  //     uri: {image},
                  //   }
                }
                style={styles.imgCardUser}
              />
            )}
            <View style={styles.userCardText}>
              <Text style={style.textTitle}>Balance</Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={style.textSubtitle}>
                {subtitle}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={onPress}>
            <Icon
              name="ios-notifications-outline"
              size={widthResponsive(1.7)}
              color={'white'}
            />
            {notifCount || notifCount > 0 ? (
              <View style={style.countBox}>
                <View>
                  <Text style={style.textNotif}>
                    {notifCount > 10 ? '10+' : notifCount}
                  </Text>
                </View>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export const UserCardContent = ({
  image,
  name,
  type,
  recipient,
  amount,
  icon,
}) => {
  return (
    <>
      <View style={styles.userCardContent}>
        <View style={style.userCardRow}>
          <View style={style.rowWrapper2}>
            {icon ?? <Image source={image} style={styles.imgCardUser} />}
            <View style={style.userCardText}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={style.titleContent}>
                {name}
              </Text>
              <Text style={style.subtitleContent}>{type}</Text>
            </View>
          </View>
          <View style={style.amountTextStyle}>
            {recipient ? (
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={style.textGreen}>
                +{amount}
              </Text>
            ) : (
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={style.textRed}>
                -{amount}
              </Text>
            )}
          </View>
        </View>
      </View>
    </>
  );
};
export const UserCardContent2 = ({image, name, type, amount, icon}) => {
  return (
    <>
      <View style={style.userCardContent}>
        <View style={style.userCardRow2}>
          <View style={style.rowWrapper2}>
            {icon ?? <Image source={image} style={styles.imgCardUser} />}
            <View style={style.userCardText}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={style.titleContent}>
                {name}
              </Text>
              <Text style={style.subtitleContent}>{type}</Text>
            </View>
          </View>
          <View>
            <Text style={style.textGreen}>{amount}</Text>
          </View>
        </View>
      </View>
    </>
  );
};
export const UserCardContent3 = ({image, name, type, amount, icon}) => {
  return (
    <>
      <View style={style.userCardContent}>
        <View style={style.userCardRow2}>
          <View style={style.rowWrapper2}>
            {icon ?? (
              <Image
                source={
                  image
                  //     {
                  //     uri: {image},
                  //   }
                }
                style={styles.imgCardUser}
              />
            )}
            <View style={style.userCardText}>
              <View style={style.marginBottomStyle}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={style.subtitleContent}>
                  {name}
                </Text>
              </View>
              <Text style={style.titleContent}>{type}</Text>
            </View>
          </View>
          <View>
            <Text style={style.textGreen}>{amount}</Text>
          </View>
        </View>
      </View>
    </>
  );
};
export const UserCardContent4 = ({image, name, type, amount, icon}) => {
  return (
    <>
      <View style={style.userCardContent}>
        <View style={style.userCardRow2}>
          <View style={style.rowWrapper2}>
            {icon ?? (
              <Image
                source={
                  image
                  //     {
                  //     uri: {image},
                  //   }
                }
                style={styles.imgCardUser}
              />
            )}
            <View style={style.userCardText2}>
              <View style={style.marginBottomStyle}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={style.subtitleContent}>
                  {name}
                </Text>
              </View>
              <Text style={style.titleContent}>{type}</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export const CardTransaction = ({title, subtitle}) => {
  return (
    <>
      <View style={style.flexCard}>
        <View style={style.paddingTextCard}>
          <Text style={style.titleCardTransaction}>{title}</Text>
        </View>
        <View style={style.paddingTextCard}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={style.subtitleContentTransaction}>
            {subtitle}
          </Text>
        </View>
      </View>
    </>
  );
};

export const CardTopup = ({number, textContent}) => {
  return (
    <View style={[style.cardWrapper, style.rowWrapper]}>
      <View style={style.numberWrapper}>
        <Text style={style.numberStyle}>{number}</Text>
      </View>
      <View style={style.marginContent}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          style={style.contentTextStyle}>
          {textContent}
        </Text>
      </View>
    </View>
  );
};

export const SuccessCard = ({text}) => {
  return (
    <View style={style.successCard}>
      <Text style={style.textCardMessage}>{text}</Text>
    </View>
  );
};
export const ErrorCard = ({text}) => {
  return (
    <View style={style.errorCard}>
      <Text style={style.errorCardMessage}>{text}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  successCard: {
    backgroundColor: 'lightgreen',
    paddingVertical: widthResponsive(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthResponsive(0.5),
    marginBottom: widthResponsive(2),
  },
  errorCard: {
    backgroundColor: 'lightcoral',
    paddingVertical: widthResponsive(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthResponsive(0.5),
    marginBottom: widthResponsive(2),
  },
  textCardMessage: {
    color: COLOR_5,
    fontSize: widthResponsive(0.8),
    fontWeight: 'bold',
  },
  errorCardMessage: {
    color: 'white',
    fontSize: widthResponsive(0.8),
    fontWeight: 'bold',
  },
  textTitle: {
    fontSize: widthResponsive(0.8),
    color: 'white',
  },
  textSubtitle: {
    fontSize: widthResponsive(1.1),
    color: 'white',
    fontWeight: '800',
    letterSpacing: 0.1,
  },
  rowWrapper: {
    flexDirection: 'row',
  },
  userCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: widthResponsive(1),
  },
  userCardRow2: {
    width: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: widthResponsive(0.5),
    marginLeft: widthResponsive(0.5),
  },
  userCardContent: {
    backgroundColor: 'white',
    elevation: 0.3,
    borderRadius: widthResponsive(0.7),
    marginHorizontal: widthResponsive(1),
  },
  rowWrapper2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userCardText: {
    paddingVertical: widthResponsive(1),
    width: widthResponsive(20) - widthResponsive(5) - widthResponsive(7),
    flexDirection: 'column',
    marginLeft: widthResponsive(1),
  },
  userCardText2: {
    paddingVertical: widthResponsive(1),
    width: widthResponsive(20) - widthResponsive(5) - widthResponsive(5),
    flexDirection: 'column',
    marginLeft: widthResponsive(1),
  },
  titleContent: {
    fontSize: widthResponsive(0.8),
    color: '#4D4B57',
    fontWeight: '700',
  },
  subtitleContent: {
    color: '#7A7886',
    fontSize: widthResponsive(0.6),
    fontWeight: '300',
  },
  textGreen: {
    color: '#1EC15F',
    fontWeight: '800',
  },
  textRed: {
    color: '#FF5B37',
    fontWeight: '800',
  },
  flexCard: {
    flex: 1,
    backgroundColor: 'white',
    height: widthResponsive(5),
    margin: widthResponsive(0.5),
    justifyContent: 'center',
    padding: widthResponsive(0.5),
    borderRadius: widthResponsive(0.5),
    elevation: 3,
  },
  titleCardTransaction: {
    fontSize: widthResponsive(0.7),
    color: COLOR_5,
    fontWeight: '400',
  },
  subtitleContentTransaction: {
    fontSize: widthResponsive(0.9),
    color: COLOR_5,
    fontWeight: '700',
  },
  subtitleCardTransaction: {
    backgroundColor: 'white',
    height: widthResponsive(5),
    margin: widthResponsive(0.5),
    justifyContent: 'center',
    padding: widthResponsive(0.5),
    borderRadius: widthResponsive(0.5),
    elevation: 3,
  },
  paddingTextCard: {
    paddingVertical: widthResponsive(0.2),
  },
  marginBottomStyle: {
    marginBottom: widthResponsive(0.5),
  },
  cardWrapper: {
    backgroundColor: 'white',
    padding: widthResponsive(1),
    borderRadius: widthResponsive(0.5),
    elevation: 2,
    marginVertical: widthResponsive(0.5),
  },
  numberWrapper: {
    width: widthResponsive(2),
    justifyContent: 'center',
  },
  numberStyle: {
    fontSize: widthResponsive(1),
    color: COLOR_5,
    fontWeight: 'bold',
  },
  contentTextStyle: {
    lineHeight: 27,
  },
  marginContent: {
    flex: 1,
  },
  amountTextStyle: {
    width: widthResponsive(7),
    alignItems: 'flex-end',
  },
  countBox: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orangered',
    borderRadius: 20,
  },
  textNotif: {
    color: 'white',
    fontSize: widthResponsive(0.6),
  },
});
