import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
  Switch,
} from "react-native";
import { colors } from "../../global/color";
import { fontFamily } from "../../global/fontFamily";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../services/authentication/authApi";
import { setUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { saveLogin, clearLogin } from "../../db";
import Toast from "react-native-toast-message";

const textInputWidth = Dimensions.get("window").width * 0.7;

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [persistSession, setPersistSession] = useState(false);
  const [login, result] = useLoginMutation();

  const dispatch = useDispatch();

  const onsubmit = () => {
    login({ email, password });
  };

  useEffect(() => {
    const saveLoginSession = async () => {
      if (result.status === "fulfilled") {
        try {
          const { localId, email } = result.data;

          if (persistSession) {
            await saveLogin(localId, email);
          } else {
            await clearLogin();
          }

          dispatch(setUser({ localId, email }));

          Toast.show({
            type: "success",
            text1: "Login exitoso",
            text2: `Bienvenido ${email}`,
          });
        } catch (error) {
          console.log("Error al guardar sesión:", error);
          Toast.show({
            type: "error",
            text1: "Error al guardar sesión",
            text2: error.message,
          });
        }
      } else if (result.status === "rejected") {
        console.log("Error de login:", result.error);
        Toast.show({
          type: "error",
          text1: "Error de login",
          text2: result.error.message,
        });
      }
    };
    saveLoginSession();
  }, [result]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paw Shop</Text>
      <Text style={styles.subTitle}>Iniciar sesión</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={colors.white}
          placeholder="Email"
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={colors.white}
          placeholder="Contraseña"
          style={styles.textInput}
          secureTextEntry
        />
      </View>
      <View style={styles.footTextContainer}>
        <Text style={styles.whiteText}>¿No tienes cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text
            style={{
              ...styles.whiteText,
              ...styles.underLineText,
            }}
          >
            Crear cuenta
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.btn} onPress={onsubmit}>
        <Text style={styles.btnText}>Iniciar sesión</Text>
      </Pressable>
      <View style={styles.rememberMe}>
        <Text style={{ color: colors.white }}>¿Mantener sesión iniciada?</Text>
        <Switch
          onValueChange={() => setPersistSession(!persistSession)}
          value={persistSession}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.softBrown, 
  },
  title: {
    color: colors.warmBeige,
    fontFamily: fontFamily.heading, 
    fontSize: 40,
    letterSpacing: 2,
  },
  subTitle: {
    fontFamily: fontFamily.tertiary, 
    fontSize: 18,
    color: colors.skyBlue,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 24,
  },
  inputContainer: {
    gap: 16,
    margin: 16,
    marginTop: 32,
    alignItems: "center",
  },
  textInput: {
    padding: 12,
    paddingLeft: 16,
    borderRadius: 12,
    backgroundColor: colors.darkGray,
    width: textInputWidth,
    color: colors.warmBeige,
    fontFamily: fontFamily.primary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.mediumGray,
  },
  footTextContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  whiteText: {
    color: colors.white,
    fontFamily: fontFamily.secondary, 
    fontSize: 14,
  },
  underLineText: {
    textDecorationLine: "underline",
  },
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    backgroundColor: colors.skyBlue,
    borderRadius: 12,
    marginTop: 32,
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
    fontFamily: fontFamily.tertiary, 
    textAlign: "center",
  },
  error: {
    padding: 16,
    backgroundColor: colors.alertRed,
    borderRadius: 8,
    color: colors.white,
    fontFamily: fontFamily.primary,
  },
  rememberMe: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 24,
  },
});
