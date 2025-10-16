import { Text, View, Pressable, StyleSheet } from "react-native";
import { colors } from "../global/color";
import { fontFamily } from "../global/fontFamily";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { clearLogin } from "../db";
import { clearUser } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

const Header = ({ title, subtitle }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const canGoBack = navigation.canGoBack();
  const user = useSelector((state) => state.userReducer.userEmail);
  const dispatch = useDispatch();

  const handleClearSession = async () => {
    try {
      await clearLogin();
      console.log ("Sesión cerrada", clearLogin);
      dispatch(clearUser());
    } catch (error) {
      console.log("Error al cerrar sesión", error);
    }
  };

  const handleBack = () => {
    if (route.name === "Profile") {
      navigation.navigate("Shop"); 
    } else if (canGoBack) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        {user && (
          <Pressable onPress={handleClearSession}>
            <FontAwesome name="sign-out" size={24} color={colors.white} />
          </Pressable>
        )}
        <Pressable onPress={handleBack}>
          <FontAwesome name="arrow-left" size={24} color={colors.white} />
        </Pressable>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 160,
    backgroundColor: colors.caramel, 
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  topBar: {
    position: "absolute",
    top: 32,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: fontFamily.heading, 
    color: colors.white,
    letterSpacing: 1,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: fontFamily.secondary, 
    color: colors.white,
    textAlign: "center",
  },
});
