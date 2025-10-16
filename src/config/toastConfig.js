import { BaseToast } from 'react-native-toast-message';
import { colors } from '../global/color';

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.coralPink,
        backgroundColor: colors.white,
        borderRadius: 12,
        shadowColor: colors.charcoal,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '700',
        color: colors.charcoal,
        fontFamily: 'Poppins',
      }}
      text2Style={{
        fontSize: 14,
        color: colors.charcoal,
        fontFamily: 'Poppins',
      }}
    />
  ),
};
