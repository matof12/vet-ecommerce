import { TextInput, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../global/color';

const Search = ({ keyword, setKeyword }) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => setKeyword(text)}
        style={styles.searchInput}
        placeholder="Buscar..."
        placeholderTextColor={colors.gray}
        value={keyword}
      />
      <FontAwesome name="search" size={20} color={colors.charcoal} />
    </View>
  );
};

export default Search;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins',
    color: colors.charcoal,
    marginRight: 8,
  },
});
