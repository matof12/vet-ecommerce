import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import storage from './src/storage';
import MainNav from './src/nav/MainNav';
import {toastConfig}  from './src/config/toastConfig';
import Toast from 'react-native-toast-message';

export default function App() {

  return (
    <Provider store={storage}>
        <StatusBar style="light" />
        <MainNav />
        <Toast config={toastConfig} />
    </Provider>
  );
}

