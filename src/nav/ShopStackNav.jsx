import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {CategoriesScreen,ProductsScreen,ProductScreen} from '../screen'
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

export default function ShopStackNav() {
  return (
    <Stack.Navigator
        initialRouteName='Categorías'
        screenOptions={{
            header:({route})=><Header title="Paw Shop" subtitle={route.name} />
        }}
        >
      <Stack.Screen 
        name="Categorías" 
        component={CategoriesScreen} 
    />
      <Stack.Screen name="Productos" component={ProductsScreen} />
      <Stack.Screen name="Producto" component={ProductScreen} />
    </Stack.Navigator>
  );
}