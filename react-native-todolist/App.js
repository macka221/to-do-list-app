import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { mainStyles } from './app.styles';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Lets's Go!</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
