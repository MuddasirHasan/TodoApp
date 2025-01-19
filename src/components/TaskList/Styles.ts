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
    container: {
      width: '75%',
      paddingHorizontal: wp(5),
      borderRadius: wp(2),
    },
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
    },
    moreIcon: {
      right: wp(6),
    },
    binStyle: {
      width: wp(7),
      height: wp(7),
    },
    titleStyle: {
      color: colors.black,
      fontWeight: '700',
      fontSize: fontSizes.FONT_SIZE_16,
    },
    descriptionStyle: {
      width: '80%',
      fontSize: fontSizes.FONT_SIZE_16,
      color: colors.black,
      marginVertical: hp(1),
    },
    symbol: {
      fontWeight: 'bold',
    },
    dateText: {
      color: colors.white,
      fontWeight: '800',
    },
    timeText: {
      color: colors.white,
      fontWeight: '800',
    },
    timeDateContainer: {
      flexDirection: 'row',

      justifyContent: 'space-between',
      width: '50%',
      marginBottom: hp(1),
    },
    dateStyleContainer: {
      backgroundColor: 'red',
      padding: wp(1.5),
      borderRadius: wp(1),
      marginRight: wp(2),
    },
    timeStyleContainer: {
      backgroundColor: '#efb701',
      padding: wp(1.5),
      borderRadius: wp(1),
      marginLeft: wp(2),
    },
  });

  return styles;
};
