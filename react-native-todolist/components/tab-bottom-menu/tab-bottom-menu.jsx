import { TouchableOpacity, Text, View } from 'react-native';
import { bottomMenuStyles } from './tab-bottom-menu.style';

export function TabBottomMenu({ selectedTabName, onPress, todoList }) {
  function getTextStyle(tabName) {
    return {
      fontWeight: "bold",
      color: selectedTabName === tabName ? '#2F76E5' : 'black'
    }
  }

  return (
    <View style={ bottomMenuStyles.root }>
      <TouchableOpacity onPress={ () => onPress('all') }>
        <Text style={ getTextStyle('all') }>All</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => onPress('inProgress') }>
        <Text style={ getTextStyle('inProgress') }>In Progress</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => onPress('done') }>
        <Text style={ getTextStyle('done') }>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

