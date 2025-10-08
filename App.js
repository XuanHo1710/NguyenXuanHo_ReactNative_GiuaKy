import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import {
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
  RefreshControl,
  Switch,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TaskItem from './components/TaskItem';
import TaskItemCompleted from './components/TaskItemCompleted';
import axios from 'axios';
export default function App() {
  // ---------------- STATE ----------------
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const inputRef = useRef(null);

  // ---------------- API BASE ----------------
  const API_URL = 'https://6832918dc3f2222a8cb2b453.mockapi.io/api/v1/products';

  // ---------------- FETCH DATA (GET) ----------------
  const fetchTodos = useCallback(async () => {
    await axios.get(API_URL).then((res) => setTodos(res.data));
    // TODO: gọi API GET và cập nhật state
  }, []);

  useEffect(() => {
    // TODO: gọi fetchTodos khi mở app
    fetchTodos();
  }, [fetchTodos]);

  // ---------------- ADD (POST) ----------------
  const addTodo = useCallback(async () => {
    await axios
      .post(API_URL, {
        name: inputRef.current.value,
        completed: false,
      })
      .then((res) =>
        res.status === 201 ? alert('Add success') : alert('Add fail')
      )
      .finally(() => {
        inputRef.current.clear();
        onRefresh();
      });
    // TODO: gọi API POST và thêm công việc mới
  }, [onRefresh]);

  // ---------------- UPDATE (PUT) ----------------
  const saveEdit = useCallback(
    async (item) => {
      // TODO: gọi API PUT để cập nhật công việc
      await axios
        .put(API_URL + '/' + item.id, {
          name: item.name,
          completed: item.completed,
        })
        .then((res) =>
          res.status === 200 ? alert('Edit success') : alert('Edit fail')
        )
        .finally(() => onRefresh());
    },
    [onRefresh]
  );

  // ---------------- DELETE ----------------
  const deleteTodo = useCallback(
    async (id) => {
      // TODO: gọi API DELETE và xoá công việc
      await axios
        .delete(API_URL + '/' + id)
        .then((res) =>
          res.status === 200 ? alert('Remove success') : alert('Remove fail')
        )
        .finally(() => onRefresh());
    },
    [onRefresh]
  );

  // ---------------- REFRESH ----------------
  const onRefresh = useCallback(async () => {
    // TODO: gọi fetchTodos khi refresh
    fetchTodos();
  }, [fetchTodos]);

  // ---------------- MEMO LIST ----------------
  const todoList = useMemo(() => todos, [todos]);

  // ---------------- RENDER ITEM ----------------
  // Import tu components

  // ---------------- UI ----------------
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, margin: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
          MidTerm React Native – Todo App
        </Text>

        {/* Input thêm mới */}
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <TextInput
            ref={inputRef}
            placeholder="Enter new todo..."
            style={{ flex: 1, borderWidth: 1, marginRight: 5, padding: 5 }}
            onChangeText={setNewTodo}
          />
          <Button title="Add" onPress={addTodo} />
        </View>

        {/* Loading hoặc danh sách */}
        <View style={{ flex: 4 }}>
          {loading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <FlatList
              data={todoList.filter(item => !item.completed)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TaskItem
                  item={item}
                  saveEdit={saveEdit}
                  deleteTodo={deleteTodo}
                />
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
        </View>

        <Text style={{ color: 'red', fontSize: 20, fontWeight: '500' }}>
          Task completed
        </Text>
        <View style={{flex: 2}}>
          {loading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <FlatList
              data={todoList.filter((item) => item.completed)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TaskItemCompleted
                  item={item}
                  saveEdit={saveEdit}
                  deleteTodo={deleteTodo}
                />
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
