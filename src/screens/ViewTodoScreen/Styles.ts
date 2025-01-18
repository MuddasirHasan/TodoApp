import {Platform, StyleSheet} from 'react-native';
import {useColors} from '../../hooks';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import useFontSizes from '../../hooks/useFontSizes';

export const useStyle = () => {
  const {colors} = useColors();
  const {fontSizes} = useFontSizes();

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
    headerContainer: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      marginTop: hp(3),
      paddingHorizontal: wp(7),
    },
    taskDetail: {
      paddingLeft: wp(7),
      color: colors.white,
      fontSize: fontSizes.FONT_SIZE_15,
      bottom: hp(0.2),
      fontWeight: '600',
    },
    dateTimeContainer: {
      flexDirection: 'row',
      marginVertical: hp(1),
    },
    dateStyle: {
      fontWeight: '600',
      color: colors.white,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: wp(2),
    },
    miniCalenderStyle: {
      marginRight: wp(2),
    },
    sepratorStyle: {
      alignSelf: 'center',
      marginTop: hp(4),
      marginBottom: hp(2),
    },
    btnContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop: hp(4),
      backgroundColor: colors.btnBackground,
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      height: hp(6),
      borderRadius: wp(2),
    },
    updateStyle: {
      color: colors.white,
      fontWeight: '700',
      fontSize: fontSizes.FONT_SIZE_16,
    },
    btnStyle: {
      marginRight: wp(3),
    },
    descriptionStyle: {
      color: colors.white,
      letterSpacing: 1.5,
      lineHeight: hp(2.5),
    },
    descriptionContainer: {
      paddingHorizontal: wp(7),
    },
    miniClockStyle: {
      marginRight: wp(2),
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: wp(2),
    },
    titleContainer: {
      paddingLeft: wp(7),
      marginTop: hp(5),
    },
    titleStyle: {
      fontWeight: '800',
      fontSize: fontSizes.FONT_SIZE_18,
      color: colors.white,
    },
    symbolStyle: {
      fontWeight: '700',
      color: colors.white,
    },
    timeStyle: {
      fontWeight: '600',
      color: colors.white,
    },
  });

  return styles;
};
