import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { colors } from "../../global/color";
import { IconCamera } from "../../components/IconCamera";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { usePutProfilePictureMutation } from "../../services/user/userApi";
import { setProfilePicture } from "../../features/user/userSlice";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";

let MapView, Marker;

if (Platform.OS !== "web") {
  const Maps = require("react-native-maps");
  MapView = Maps.default;
  Marker = Maps.Marker;
}

const ProfileScreen = () => {
  const user = useSelector((state) => state.userReducer.userEmail);
  const localId = useSelector((state) => state.userReducer.localId);
  const image = useSelector((state) => state.userReducer.profilePicture);
  const [triggerPutProfilePicture, result] = usePutProfilePictureMutation();
  const [location, setLocation] = useState(null);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [address, setAddress] = useState("");
  const [locationError, setLocationError] = useState(false);

  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      dispatch(setProfilePicture(imgBase64));
      triggerPutProfilePicture({ localId: localId, image: imgBase64 });
    }
  };

  const getLocationWithTimeout = async (timeout = 40000) => {
    return Promise.race([
      Location.getCurrentPositionAsync({}),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout de ubicación")), timeout)
      ),
    ]);
  };

  const fetchLocation = async () => {
    setLocationLoaded(false);
    setLocationError(false);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Permiso de ubicación:", status);

      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Permiso denegado",
          text2: "No se puede acceder a la ubicación 📍",
        });
        setLocationError(true);
        return;
      }

      console.log("Solicitando ubicación con timeout...");
      const location = await getLocationWithTimeout();
      console.log("Ubicación obtenida:", location);
      setLocation(location);

      try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${process.env.EXPO_PUBLIC_MAPS_KEY}`;
        console.log("URL de geocoding:", url);

        const response = await fetch(url);
        const data = await response.json();
        console.log("Respuesta de geocoding:", data);

        if (data.results && data.results.length > 0) {
          setAddress(data.results[0].formatted_address);
        } else {
          console.log("No se encontró dirección");
          setAddress("");
        }
      } catch (geoError) {
        console.log("Error al obtener la dirección:", geoError);
        Toast.show({
          type: "error",
          text1: "Error de geocoding",
          text2: "No se pudo obtener la dirección 🗺️",
        });
      }
    } catch (error) {
      console.log("Error al obtener ubicación:", error.message);
      Toast.show({
        type: "error",
        text1: "Error de ubicación",
        text2: error.message || "No se pudo obtener tu ubicación",
      });
      setLocationError(true);
    } finally {
      setLocationLoaded(true);
      console.log("Ubicación cargada");
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageProfileContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            style={styles.profileImage}
          />
        ) : (
          <Text style={styles.textProfilePlaceHolder}>
            {user.charAt(0).toUpperCase()}
          </Text>
        )}
        <Pressable
          onPress={pickImage}
          style={({ pressed }) => [
            { opacity: pressed ? 0.9 : 1 },
            styles.cameraIcon,
          ]}
        >
          <IconCamera />
        </Pressable>
      </View>

      <Text style={styles.profileData}>Correo electrónico: {user}</Text>

      <View style={styles.titleContainer}>
        <Text style={styles.mapTitle}>Ubicación:</Text>
      </View>

      <View style={styles.mapContainer}>
        {Platform.OS !== "web" && MapView ? (
          location ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Tu ubicación"
                description={address}
                pinColor={colors.coralPink}
              />
            </MapView>
          ) : locationLoaded && locationError ? (
            <View style={styles.centeredMessage}>
              <Text style={styles.errorText}>
                No se pudo obtener la ubicación. Intente más tarde.
              </Text>
              <Pressable style={styles.retryButton} onPress={fetchLocation}>
                <Text style={styles.retryButtonText}>Reintentar ubicación</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.centeredMessage}>
              <ActivityIndicator size="large" color={colors.purple} />
              <Text style={styles.loadingText}>Buscando ubicación...</Text>
            </View>
          )
        ) : (
          <Text style={styles.errorText}>
            El mapa no está disponible en web.
          </Text>
        )}
      </View>

      <View style={styles.placeDescriptionContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{address}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 24,
    backgroundColor: colors.warmBeige,
    alignItems: "center",
  },
  imageProfileContainer: {
    width: 140,
    height: 140,
    borderRadius: 140,
    backgroundColor: colors.alertRed,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 140,
  },
  textProfilePlaceHolder: {
    color: colors.white,
    fontSize: 48,
    fontWeight: "700",
  },
  cameraIcon: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  profileData: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.charcoal,
    marginBottom: 24,
  },
  titleContainer: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.charcoal,
  },
  mapContainer: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.white,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  placeDescriptionContainer: {
    width: "100%",
    paddingHorizontal: 8,
    marginBottom: 32,
  },
  addressContainer: {
    backgroundColor: colors.lavender,
    padding: 12,
    borderRadius: 12,
  },
  address: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.charcoal,
    textAlign: "center",
  },
  centeredMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.charcoal,
    textAlign: "center",
  },
  errorText: {
    fontSize: 14,
    color: colors.coralPink,
    textAlign: "center",
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: colors.coralPink,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  retryButtonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 14,
  },
});
