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
    titleContainer: {
      backgroundColor: colors.primary2,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(4),
      paddingVertical: hp(1),
      marginHorizontal: wp(5),
      marginTop: hp(2),
      borderRadius: wp(1),
    },
    flatListContainer: {},

    btnTxtStyle: {
      color: colors.white,
      fontSize: fontSizes.FONT_SIZE_14,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    titleStyle: {
      color: colors.white,
      marginLeft: wp(5),
      fontSize: fontSizes.FONT_SIZE_18,
      fontWeight: '700',
    },
    logoStyle: {
      width: wp(7),
      height: wp(7),
    },
  });

  return styles;
};
