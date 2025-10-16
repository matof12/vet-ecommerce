import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartScreen } from '../screen'
import Header from '../components/Header';

const Stack = createNativeStackNavigator();


export default function CartStackNav() {
    return (
        <Stack.Navigator
            initialRouteName='Carrito de compras'
            screenOptions={{
                header: ({ route }) => <Header title="Paw Shop" subtitle={route.name} />
            }}
        >
            <Stack.Screen name="Carrito de compras" component={CartScreen} />
        </Stack.Navigator>
    );
}