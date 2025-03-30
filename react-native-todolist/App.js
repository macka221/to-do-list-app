import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, ScrollView, Alert } from 'react-native';
import Dialog from 'react-native-dialog';
import { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mainStyles } from './app.styles';
import { Header } from './components/header/header';
import { ToDoCard } from './components/card/todo-card';
import { TabBottomMenu } from './components/tab-bottom-menu/tab-bottom-menu'
import { AddTodoButton } from './components/button-add/button-add';

let isFirstRender = true;
let isLoadUpdate = false;

export default function App() {
  const TODO_LIST = [];

  const [todoList, setTodoList] = useState(TODO_LIST);
  const [selectedTabName, setSelectedTabName] = useState('all');
  const [isDialogDisplayed, setIsDialogDisplayed] = useState(false);
  const [inputValue, setInputValue] = useState('');


  useEffect(() => {
    loadTodoList();
  }, [])
  // TODO: Fix this to be prettier
  useEffect(() => {
    if (!isLoadUpdate) {
      if (!isFirstRender){
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    } else {
      isLoadUpdate = false;
    }
  }, [todoList]);

  // Saving/Reading Application State:
  async function loadTodoList() {
    console.log('LOAD');
    try { 
      const storedData = await AsyncStorage.getItem('@todoList');
      const parsedTodoList = JSON.parse(storedData);

      isLoadUpdate = true;
      setTodoList(parsedTodoList || []);
    } catch(error) {
      alert(err);
    }
  }

  async function saveTodoList() {
    console.log('SAVE');
    try {
      const savedTodoList = JSON.stringify(todoList)
      await AsyncStorage.setItem('@todoList', savedTodoList);
    } catch(error) {
      alert(err);
    }
  }

  function getFilteredList() {
    switch (selectedTabName) {
      case 'all':
        return todoList;
      case 'inProgress':
        return todoList.filter((todo) => !todo.isCompleted);
      case 'done':
        return todoList.filter((todo) => todo.isCompleted);
      default:
        break;
    }
  }

  function deleteTodo(todoToDelete) {
    Alert.alert(
      'Delete todo', 
      'Are you sure you want to delete this todo?',
      [ 
        { text: 'Delete', style: 'destructive', onPress: () => {
            setTodoList(todoList.filter((todo) => todo.id !== todoToDelete.id));
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    )
  }

  function renderToDoList() {
    return getFilteredList().map((todo) => 
      <View key={todo.id} style={ mainStyles.cardItem }>
        <ToDoCard 
          onPress={ updateTodoItem }
          todo={ todo } 
          onLongPress={ deleteTodo }
        />
      </View>
    );
  }

  function addTodo() {
    const newTodo = {
      id: `${uuid.v4()}`,
      title: inputValue,
      isCompleted: false,
    }

    setTodoList([...todoList, newTodo]);
    setIsDialogDisplayed(false);
    setInputValue('');
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

  function renderAddDialog() {
    // TODO: Turn this into its own component
    return (
      <Dialog.Container visible={ isDialogDisplayed } onBackdropPress={ () => setIsDialogDisplayed(false) } >
        <Dialog.Title>Add todo</Dialog.Title>
        <Dialog.Description>
          Choose a name for your todo.
        </Dialog.Description>
        <Dialog.Input placeholder='Ex) Go to the dentist' onChangeText={ setInputValue } />
        <Dialog.Button label={ 'Cancel' } color={ 'grey' } onPress={ () => setIsDialogDisplayed(false) } />
        <Dialog.Button label={ 'Save' } disabled={ inputValue.length === 0 } onPress={ addTodo } />
      </Dialog.Container>
    )
  }

  function showAddTodoDialog() {
    setIsDialogDisplayed(true);
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
          <AddTodoButton onPress={ showAddTodoDialog } />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={ mainStyles.footer }>
        <TabBottomMenu 
          selectedTabName={selectedTabName} 
          onPress={setSelectedTabName}
          todoList={todoList}
        /> 
      </View>
      { renderAddDialog() }
    </>
  );
}
