import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import { colors } from '../../global/color';
import FlatCard from '../../components/FlatCard';
import { useSelector, useDispatch } from 'react-redux';
import { removeItems } from '../../features/cart/cartSlice';
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cartReducer.items);
  const total = useSelector((state) => state.cartReducer.total);
  const dispatch = useDispatch();

  const handleRemove = (id, title) => {
    dispatch(removeItems(id));
    Toast.show({
      type: 'success',
      text1: 'Producto eliminado',
      text2: `${title} fue eliminado del carrito 🗑️`,
    });
  };

  const handleConfirm = () => {
    Toast.show({
      type: 'success',
      text1: 'Compra confirmada',
      text2: 'Gracias por tu compra 🛍️',
    });
  };

  const FooterComponent = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerTotal}>Total: ${total}</Text>
      <Pressable style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirmar compra</Text>
      </Pressable>
    </View>
  );

  const renderCartItem = ({ item }) => (
    <FlatCard style={styles.cartContainer}>
      <Image
        source={{ uri: item.mainImage }}
        style={styles.cartImage}
        resizeMode="cover"
      />
      <View style={styles.cartDescription}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.shortDescription}</Text>
        <Text style={styles.price}>Precio: ${item.price}</Text>
        <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
        <Text style={styles.total}>
          Total: ${item.quantity * item.price}
        </Text>
        <Pressable onPress={() => handleRemove(item.id, item.title)}>
          <FontAwesome
            name="trash"
            size={28}
            color={colors.white}
            style={styles.trashIcon}
          />
        </Pressable>
      </View>
    </FlatCard>
  );

  return (
    <>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={renderCartItem}
          ListHeaderComponent={
            <Text style={styles.cartScreenTitle}>Tu carrito de compras:</Text>
          }
          ListFooterComponent={<FooterComponent />}
        />
      ) : (
        <Text style={styles.emptyCart}>No agregaste productos al carrito</Text>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartContainer: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.softBrown,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cartImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  cartDescription: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.charcoal,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.mediumGray,
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.charcoal,
  },
  quantity: {
    fontSize: 14,
    color: colors.charcoal,
  },
  total: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    marginTop: 8,
  },
  trashIcon: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  footerContainer: {
    padding: 24,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderColor: colors.mediumGray,
    alignItems: 'center',
  },
  footerTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.charcoal,
    marginBottom: 12,
  },
  confirmButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: colors.coralPink,
    borderRadius: 24,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  cartScreenTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 16,
    color: colors.charcoal,
  },
  emptyCart: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
    color: colors.mediumGray,
  },
});
