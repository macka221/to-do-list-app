import { TouchableOpacity, Text } from 'react-native';
import { addTodoStyle } from './button-add.style';

export function AddTodoButton({ onPress }) {
  return (
  <TouchableOpacity style={ addTodoStyle.button } onPress={ onPress } >
      <Text style={ addTodoStyle.text }>
        + New todo
      </Text>
  </TouchableOpacity>
  );
}

