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
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
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
  });

  return styles;
};
