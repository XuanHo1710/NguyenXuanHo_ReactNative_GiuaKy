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

import React, { useState } from 'react';

const TaskItem = ({ item, saveEdit, deleteTodo }) => {
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState(item.name);

  return (
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
        <TextInput
          onChangeText={setName}
          style={{ borderWidth: 1, padding: 5, width: '70%' }}
          value={name}
        />
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        {editingId === null ? (
          <>
            <Switch
              onPointerDown={() =>
                saveEdit({
                  id: item.id,
                  name: item.name,
                  completed: !item.completed,
                })
              }
              value={item.completed}
            /> 
            <Button
              onPress={() => {
                setEditingId(item.id);
              }}
              color="black"
              title="Edit"
            />
            <Button
              onPress={() => {
                deleteTodo(item.id);
              }}
              color="black"
              title="Delete"
            />
          </>
        ) : (
          <Button
            onPress={() => {
              saveEdit({ id: item.id, name: name, completed: item.completed });
              setEditingId(null);
            }}
            color="black"
            title="Save"
          />
        )}
      </View>
    </View>
  );
};

export default React.memo(TaskItem);
