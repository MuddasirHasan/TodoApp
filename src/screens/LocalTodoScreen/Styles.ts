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
  });

  return styles;
};
