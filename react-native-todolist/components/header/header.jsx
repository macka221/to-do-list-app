import { Text, Image } from 'react-native';
import { headerStyles } from './header.style';
import logoImage from '../../assets/logo.png';

export function Header() {
  return (
    <>
      <Image 
        style={ headerStyles.image }
        source={logoImage}
        resizeMode='contain'
      />
      <Text style={ headerStyles.subtitle }>
        You probably have something to do!
      </Text>
    </>
  )
}
