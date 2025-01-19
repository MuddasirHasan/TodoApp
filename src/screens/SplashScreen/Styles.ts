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
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors.white,
      fontSize: fontSizes.FONT_SIZE_24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: hp(2),
    },
    image: {
      width: wp('30%'),
      height: wp('30%'),
      resizeMode: 'contain',
    },
  });

  return styles;
};
