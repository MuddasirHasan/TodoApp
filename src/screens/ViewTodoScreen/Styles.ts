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
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '95%',
      backgroundColor: colors.white,
      padding: wp(5),
      borderRadius: wp(2),
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: fontSizes.FONT_SIZE_18,
      fontWeight: 'bold',
      color: colors.black,
      marginBottom: hp(3),
    },
    modalInput: {
      width: '100%',
      height: hp(5),
      borderColor: colors.black,
      borderWidth: 1,
      borderRadius: wp(2),
      paddingHorizontal: wp(3),
      marginBottom: wp(5),
      backgroundColor: colors.primary2,
      color: colors.white,
    },
    modalInputDes: {
      width: '100%',
      color: colors.white,
      height: hp(15),
      borderColor: colors.black,
      borderWidth: 1,
      borderRadius: wp(2),
      paddingHorizontal: wp(3),
      marginBottom: wp(5),
      backgroundColor: colors.primary2,
    },
    modalButton: {
      backgroundColor: colors.createBtn,
      paddingVertical: hp(0.8),
      paddingHorizontal: wp(5),
      borderRadius: wp(2),
      justifyContent: 'center',
      alignItems: 'center',
      width: wp(30),
    },
    cancelModalButton: {
      backgroundColor: colors.white,
      paddingVertical: hp(0.8),
      paddingHorizontal: wp(5),
      borderRadius: wp(2),
      justifyContent: 'center',
      alignItems: 'center',
      width: wp(30),
      borderWidth: wp(0.4),
      borderColor: colors.primary2,
    },
    modalButtonText: {
      color: colors.white,
      fontSize: fontSizes.FONT_SIZE_16,
      fontWeight: 'bold',
    },
    cancelModalButtonText: {
      color: colors.primary2,
      fontSize: fontSizes.FONT_SIZE_16,
      fontWeight: 'bold',
    },

    updateStyle: {
      color: colors.white,
      fontWeight: '700',
      fontSize: fontSizes.FONT_SIZE_16,
    },
    dtContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    dateContainer1: {
      flexDirection: 'row',
      width: '45%',
      borderWidth: 1,
      backgroundColor: colors.primary2,
      padding: wp(2),
      marginBottom: hp(5),
      alignItems: 'center',
      borderRadius: wp(2),
    },
    dateStyle1: {
      color: colors.placeholderColor,
      paddingLeft: wp(5),
    },
    btnContainer1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
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
