import { TouchableOpacity, Text, View } from 'react-native';
import { bottomMenuStyles } from './tab-bottom-menu.style';

export function TabBottomMenu({ selectedTabName, onPress, todoList }) {
  const countByStatus = todoList.reduce((accumulator, todo) => {
    todo.isCompleted ? accumulator.done++ : accumulator.inProgress++;
    return accumulator;
  }, { all: todoList.length, inProgress: 0, done: 0 });

  function getTextStyle(tabName) {
    return {
      fontWeight: "bold",
      color: selectedTabName === tabName ? '#2F76E5' : 'black'
    }
  }

  return (
    <View style={ bottomMenuStyles.root }>
      <TouchableOpacity onPress={ () => onPress('all') }>
        <Text style={ getTextStyle('all') }>All ({ countByStatus.all })</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => onPress('inProgress') }>
        <Text style={ getTextStyle('inProgress') }>In Progress ({ countByStatus.inProgress })</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => onPress('done') }>
        <Text style={ getTextStyle('done') }>Done ({ countByStatus.done })</Text>
      </TouchableOpacity>
    </View>
  );
}

