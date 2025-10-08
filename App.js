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
import axios from 'axios';
export default function App() {
  // ---------------- STATE ----------------
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
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
    await axios.post(API_URL, {
      name: inputRef.current.value,
      completed: false
    }).then(res => res.status === 201 ? alert("Add success") : alert("Add fail"))
    .finally(() =>  {
       inputRef.current.clear(); 
       onRefresh();
    })
    // TODO: gọi API POST và thêm công việc mới
  }, [newTodo]); 

  // ---------------- UPDATE (PUT) ----------------
  const saveEdit = useCallback(
    async (id) => {
      // TODO: gọi API PUT để cập nhật công việc
    },
    [editingText]
  );

  // ---------------- DELETE ----------------
  const deleteTodo = useCallback(async (id) => {
    // TODO: gọi API DELETE và xoá công việc
  }, []);

  // ---------------- REFRESH ----------------
  const onRefresh = useCallback(async () => {
    // TODO: gọi fetchTodos khi refresh
    fetchTodos();
  }, [fetchTodos]);

  // ---------------- MEMO LIST ----------------
  const todoList = useMemo(() => todos, [todos]);

  // ---------------- RENDER ITEM ----------------
  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
      }}>
      {/* TODO: nếu đang edit thì hiển thị TextInput, ngược lại hiển thị Text */}
      {/* TODO: thêm nút Save / Edit / Delete */}
      {editingId === null ? (
        <Text lineBreakMode={'tail'} numberOfLines={1}>
          {item.name}
        </Text>
      ) : (
        <TextInput style={{borderWidth: 1, padding: 5, width: "70%"}} value={item.name} />
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        {editingId === null ? (
          <>
            <Switch value={item.completed} />
            <Button
              onPress={() => {
                 setEditingId(item.id);
                 setEditingText(item.name)
              }}
              color="black"
              title="Edit"
            />
            <Button color="black" title="Delete" />
          </>
        ) : (
          <Button
            onPress={() => {
              setEditingId(null);
            }}
            color="black"
            title="Save"
          />
        )}
      </View>
    </View>
  );

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
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <FlatList
            data={todoList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
