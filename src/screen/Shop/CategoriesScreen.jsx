import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { colors } from "../../global/color";
import { fontFamily } from "../../global/fontFamily";
import FlatCard from "../../components/FlatCard";
import { useDispatch } from "react-redux";
import {
  setCategorieSelected,
  filterProducts,
} from "../../features/shop/shopSlice";
import { useGetCategoriesQuery } from "../../services/shop/shopApi";

const screenWidth = Dimensions.get("window").width;

const CategoriesScreen = ({ navigation }) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const dispatch = useDispatch();

  const renderCategoryItem = ({ item }) => (
    <Pressable
      onPress={() => {
        dispatch(setCategorieSelected(item.title));
        dispatch(filterProducts());
        navigation.navigate("Productos");
      }}
    >
      <FlatCard>
        <View style={styles.categoryContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Image style={styles.image} source={{ uri: item.image }} />
        </View>
      </FlatCard>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default CategoriesScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGray, // fondo cálido y amigable
  },
  list: {
    paddingVertical: 16,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.mediumGray, // se puede alternar dinámicamente
    borderRadius: 20,
    width: screenWidth * 0.95,
    alignSelf: "center",
    marginBottom: 12,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontFamily: fontFamily.tertiary, // Fredoka One
    color: colors.charcoal,
    letterSpacing: 1,
    flex: 1,
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 12,
    resizeMode: "cover",
    marginLeft: 16,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
