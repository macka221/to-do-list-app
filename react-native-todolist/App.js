import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { mainStyles } from './app.styles';
import { Header } from './components/header/header';

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={ mainStyles.root }>
        <View style={ mainStyles.header }>
            <Header />
        </View>
        <View style={ mainStyles.body }>
            <Text>Body</Text>
        </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={ mainStyles.footer }>
        <Text>Footer</Text>
      </View>
    </>
  );
}
