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
    text: {
      color: colors.white,
      fontSize: fontSizes.FONT_SIZE_24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: hp(2),
    },
    image: {
      width: wp('30%'), // Set width as a percentage of the screen width
      height: wp('30%'), // Set height as a percentage of the screen width
      resizeMode: 'contain', // Ensure the image scales properly
    },
    searchViewContainer: {
      width: '75%',
      alignItems: 'center',

      marginTop: hp(3),
      flexDirection: 'row',
      height: hp(5),
      backgroundColor: colors.primary4,
      marginLeft: wp(3),
    },
    searchContainer: {
      flexDirection: 'row',
    },
    searchIcon: {
      width: wp(6),
      right: wp(2),
    },
    textInputStyle: {
      width: '90%',
      backgroundColor: colors.primary4,
      color: colors.white,
      padding: wp(2),
    },
    mainSearchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    filterContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary4,
      left: wp(6),
      width: wp(10),
      height: hp(5),
      top: hp(1.5),
    },
    filterSearchContainer: {
      flexDirection: 'row',
      width: '90%',
      marginTop: hp(2),
      alignSelf: 'center',
    },

    searchFilterContainer1: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary2,
      width: '35%',
      justifyContent: 'space-between',
      padding: wp(1),
      borderRadius: wp(1),
      marginLeft: wp(4),
    },

    searchFilterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary2,
      width: '35%',
      justifyContent: 'space-between',
      padding: wp(1),
      borderRadius: wp(1),
    },
    addTaskBtn: {
      width: '50%',
      backgroundColor: colors.primary2,
      alignSelf: 'center',
      marginTop: hp(2),
      justifyContent: 'center',
      alignItems: 'center',
      padding: wp(2),
      borderRadius: wp(2),
      marginBottom: hp(3),
    },
    flatListContainer: {},

    btnTxtStyle: {
      color: colors.white,
      fontSize: fontSizes.FONT_SIZE_14,
      fontWeight: 'bold',
      letterSpacing: 1,
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
      height: hp(15),
      borderColor: colors.black,
      borderWidth: 1,
      borderRadius: wp(2),
      paddingHorizontal: wp(3),
      marginBottom: wp(5),
      backgroundColor: colors.primary2,
      color: colors.white,
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
    dtContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    dateContainer: {
      flexDirection: 'row',
      width: '45%',
      borderWidth: 1,
      backgroundColor: colors.primary2,
      padding: wp(2),
      marginBottom: hp(5),
      alignItems: 'center',
      borderRadius: wp(2),
    },
    dateStyle: {
      color: colors.placeholderColor,
      paddingLeft: wp(5),
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  });

  return styles;
};
