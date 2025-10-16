import { StyleSheet, Text, FlatList, Pressable, View } from 'react-native';
import FlatCard from '../../components/FlatCard';
import { colors } from '../../global/color';
import { fontFamily } from '../../global/fontFamily';
import { useEffect, useState } from 'react';
import Search from '../../components/Search';
import { useSelector } from 'react-redux';
import { useGetProductsByCategoryQuery } from '../../services/shop/shopApi';

const ProductsScreen = ({ navigation }) => {
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [keyword, setKeyword] = useState('');
  const category = useSelector((state) => state.shopReducer.categorySelected);

  const { data: productsFilteredByCategory, isLoading, error } =useGetProductsByCategoryQuery(category)


  useEffect(() => {
  console.log("Categoría seleccionada:", category);
  console.log("Respuesta de Firebase:", productsFilteredByCategory);

  if (keyword) {
    const productsFilteredByKeyword = productsFilteredByCategory?.filter((product) =>
      product.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setProductsFiltered(productsFilteredByKeyword);
  } else {
    setProductsFiltered(productsFilteredByCategory);
  }
}, [category, keyword, productsFilteredByCategory]);

  const renderProductItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate('Producto', { product: item })}>
      <FlatCard style={styles.card}>
        <Text style={styles.productTitle}>{item.title}</Text>
      </FlatCard>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Search keyword={keyword} setKeyword={setKeyword} style={styles.search}  />
      <FlatList
        data={productsFiltered}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ProductsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGray, // igual que categorías
    paddingTop: 16,
  },
  search: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: colors.coralPink, // igual que tarjetas de categorías
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  productTitle: {
    fontSize: 22,
    fontFamily: fontFamily.heading, // Fredoka One
    color: colors.white,
    letterSpacing: 1,
  },
});

