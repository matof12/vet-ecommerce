import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStackNav from './ShopStackNav';
import CartStackNav from './CartStackNav';
import UserStackNav from './UserStackNav';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../global/color';
import { useWindowDimensions, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

const Tab = createBottomTabNavigator();

export default function TabNav() {
  const [isLargeScreen, setIsLargeScreen] = useState(null);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setIsLargeScreen(width > height);
  }, [width, height]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Shop"
        component={ShopStackNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="shopping-bag"
              size={24}
              color={focused ? colors.darkGray : colors.mediumGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="shopping-cart"
              size={24}
              color={focused ? colors.darkGray : colors.mediumGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserStackNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? colors.darkGray : colors.mediumGray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
  },
});
