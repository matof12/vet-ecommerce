import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../global/color";
import { fontFamily } from "../../global/fontFamily";
import { useState } from "react";
import { useSignupMutation } from "../../services/authentication/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import Toast from "react-native-toast-message";

const textInputWidth = Dimensions.get("window").width * 0.7;

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmContraseña, setConfirmContraseña] = useState("");
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    if (!email || !contraseña || !confirmContraseña) {
      Toast.show({
        type: "error",
        text1: "Campos incompletos",
        text2: "Por favor completá todos los campos",
      });
      return;
    }

    if (contraseña !== confirmContraseña) {
      Toast.show({
        type: "error",
        text1: "Contraseñas no coinciden",
        text2: "Verificá que ambas contraseñas sean iguales",
      });
      return;
    }

    try {
      const response = await signup({
        email,
        password: contraseña,
        returnSecureToken: true,
      }).unwrap();

      dispatch(setUser({ email: response.email, localId: response.localId }));

      Toast.show({
        type: "success",
        text1: "Cuenta creada",
        text2: "Te registraste correctamente 🎉",
      });

      navigation.navigate("Login"); 
    } catch (error) {
      console.log("Error al registrarse:", error);
      Toast.show({
        type: "error",
        text1: "Error al registrarse",
        text2: error?.data?.error?.message || "Intentalo más tarde",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paw Shop</Text>
      <Text style={styles.subTitle}>Registrarse</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setEmail}
          placeholderTextColor={colors.white}
          placeholder="Email"
          style={styles.textInput}
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={setContraseña}
          placeholderTextColor={colors.white}
          placeholder="Contraseña"
          style={styles.textInput}
          secureTextEntry
        />
        <TextInput
          onChangeText={setConfirmContraseña}
          placeholderTextColor={colors.white}
          placeholder="Repetir contraseña"
          style={styles.textInput}
          secureTextEntry
        />
      </View>

      <View style={styles.footTextContainer}>
        <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={{ ...styles.whiteText, ...styles.underLineText }}>
            Iniciar sesión
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.btn} onPress={handleSignup} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.btnText}>Crear cuenta</Text>
        )}
      </Pressable>
    </View>
  );
};

export default SignupScreen;


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
});
