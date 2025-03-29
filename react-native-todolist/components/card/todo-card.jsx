import { TouchableOpacity, Text, Image } from 'react-native';
import { todoCardStyles } from './todo-card.styles';
import taskCompleted from '../../assets/check.png';

export function ToDoCard({ todo, onPress }) {
  return (
    <TouchableOpacity style={ todoCardStyles.card } onPress={ () => onPress(todo) }>
      <Text 
        style={[
          todoCardStyles.title,
          todo.isCompleted && { textDecorationLine: "line-through" }
        ]}>
          { todo.title }
      </Text>
      { todo.isCompleted && <Image source={ taskCompleted } style={ todoCardStyles.image } /> }
    </TouchableOpacity>
  )
}
