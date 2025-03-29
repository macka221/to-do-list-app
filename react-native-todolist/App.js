import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { mainStyles } from './app.styles';
import { Header } from './components/header/header';
import { ToDoCard } from './components/card/todo-card';
import { TabBottomMenu } from './components/tab-bottom-menu/tab-bottom-menu'

export default function App() {
  const TODO_LIST = [
    { id: 1, title: 'Walk the dog', isCompleted: true },
    { id: 2, title: 'Go to the dentist', isCompleted: false },
    { id: 3, title: 'Learn react native', isCompleted: false },
    { id: 4, title: 'Walk the dog', isCompleted: true },
    { id: 5, title: 'Go to the dentist', isCompleted: false },
    { id: 6, title: 'Learn react native', isCompleted: false },
    { id: 7, title: 'Walk the dog', isCompleted: true },
    { id: 8, title: 'Go to the dentist', isCompleted: false },
    { id: 9, title: 'Learn react native', isCompleted: false },
  ];

  const [todoList, setTodoList] = useState(TODO_LIST)
  const [selectedTabName, setSelectedTabName] = useState('all');
  
  function renderToDoList() {
    return todoList.map((todo) => 
      <View key={todo.id} style={ mainStyles.cardItem }>
        <ToDoCard onPress={updateTodoItem} todo={ todo } />
      </View>
    );
  }



  function updateTodoItem(todo) {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };

    const updatedTodoList = [ ...todoList ]
    const indexToUpdate = updatedTodoList.findIndex(t => t.id === updatedTodo.id)
    updatedTodoList[indexToUpdate] = updatedTodo;
    setTodoList(updatedTodoList);
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={ mainStyles.root }>
        <View style={ mainStyles.header }>
            <Header />
        </View>
        <View style={ mainStyles.body }>
            <ScrollView>
              {renderToDoList()}
            </ScrollView>
        </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={ mainStyles.footer }>
        <TabBottomMenu 
          selectedTabName={selectedTabName} 
          onPress={setSelectedTabName}
          todoList={todoList}
        /> 
      </View>
    </>
  );
}
