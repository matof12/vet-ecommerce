import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { colors } from "../../global/color";
import { useDispatch } from "react-redux";
import { addItems } from "../../features/cart/cartSlice";
import { fontFamily } from "../../global/fontFamily";
import Toast from "react-native-toast-message";


const ProductScreen = ({ route }) => {
  const { product } = route.params;
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.productContainer}>
      <Image
        source={{ uri: product.mainImage }}
        alt={product.title}
        style={[styles.image, { height: width * 0.7 }]}
        resizeMode="contain"
      />

      <Text style={styles.textBrand}>{product.brand}</Text>
      <Text style={styles.textTitle}>{product.title}</Text>

      <Text style={styles.longDescription}>{product.longDescription}</Text>

      <View style={styles.tagsContainer}>
        <Text style={styles.tagLabel}>Tags:</Text>
        <View style={styles.tags}>
          {product.tags?.map((tag, index) => (
            <Text key={index} style={styles.tagChip}>
              {tag}
            </Text>
          ))}
        </View>
      </View>

      {product.discount > 0 && (
        <View style={styles.discount}>
          <Text style={styles.discountText}>-{product.discount}%</Text>
        </View>
      )}

      {product.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>}

      <Text style={styles.price}>Precio: ${product.price}</Text>

      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.95 : 1 },
          styles.addToCartButton,
        ]}
        onPress={() => {
          dispatch(addItems({ product: product, quantity: 1 }));
          Toast.show({
            type: "success",
            text1: "Producto agregado",
            text2: `${product.title} se agregó al carrito 🛒`,
          });
        }}
      >
        <Text style={styles.textAddToCart}>Agregar al carrito</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  productContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: colors.warmBeige,
  },
  image: {
    width: "100%",
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: colors.white,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  textBrand: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.charcoal,
    marginBottom: 4,
  },
  textTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.coralPink,
    marginBottom: 12,
  },
  longDescription: {
    fontSize: 16,
    textAlign: "justify",
    color: colors.charcoal,
    marginBottom: 16,
  },
  tagsContainer: {
    marginBottom: 16,
  },
  tagLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.charcoal,
    marginBottom: 6,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagChip: {
    backgroundColor: colors.lavender,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    fontSize: 14,
    color: colors.charcoal,
  },
  discount: {
    backgroundColor: colors.charcoal,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  discountText: {
    fontWeight: "700",
    color: colors.white,
  },
  noStockText: {
    color: colors.alertRed,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.charcoal,
    marginBottom: 16,
    textAlign: "center",
  },
  addToCartButton: {
    backgroundColor: colors.coralPink,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textAddToCart: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});
