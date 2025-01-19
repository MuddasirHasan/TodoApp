import {Platform, StyleSheet} from 'react-native';
import useColors from '../../../hooks/useColors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {useFontSizes} from '../../../hooks';

export const useStyle = () => {
  const {colors} = useColors();
  const {fontSizes} = useFontSizes();

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors.white,
      fontSize: fontSizes.FONT_SIZE_14,
      fontWeight: '300',
      textAlign: 'center',
      bottom: hp(8),
      paddingHorizontal: wp(4),
      lineHeight: hp(3),
    },
    image: {
      width: wp('80%'),
      height: wp('80%'),
      resizeMode: 'contain',
    },
    btnText: {
      color: colors.primary2,
      fontWeight: 'bold',
      fontSize: fontSizes.FONT_SIZE_15,
    },
    btnBackground: {
      backgroundColor: colors.white,
      width: wp(27),
      height: wp(8),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: wp(2),
      top: hp(8),
    },
  });

  return styles;
};
