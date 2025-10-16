import { NavigationContainer } from "@react-navigation/native";
import AuthStackNav from "./AuthStackNav";
import TabNav from "./TabNav";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfilePictureQuery } from "../services/user/userApi";
import { useEffect, useState } from "react";
import { initLoginTable, getLogin } from "../db";
import { ActivityIndicator, View } from "react-native";
import { setUser, setProfilePicture } from "../features/user/userSlice";
import { colors } from "../global/color";

export default function MainNav() {
  const userEmail = useSelector(state => state.userReducer.userEmail);
  const localId = useSelector(state => state.userReducer.localId);
  const [checkingSession, setCheckingSession] = useState(true);
  const dispatch = useDispatch();

  const { data: profilePicture } = useGetProfilePictureQuery(localId, {
    skip: !localId,
  });

  useEffect(() => {
    const loginUser = async () => {
      try {
        await initLoginTable();
        const session = await getLogin();
        if (session) {
          dispatch(setUser({ email: session.email, localId: session.localId }));
        }
      } catch (err) {
        console.log("Error al obtener sesión:", err);
      } finally {
        setCheckingSession(false);
      }
    };
    loginUser();
  }, []);

  useEffect(() => {
    if (profilePicture?.image) {
      dispatch(setProfilePicture(profilePicture.image));
    }
  }, [profilePicture]);

  if (checkingSession) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.cobaltBlue} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userEmail ? <TabNav /> : <AuthStackNav />}
    </NavigationContainer>
  );
}
