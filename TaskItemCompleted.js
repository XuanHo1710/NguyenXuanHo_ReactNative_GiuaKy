import { Text, View, TextInput, Button, Switch } from 'react-native';

import React, { useState } from 'react';

const TaskItemCompleted = ({ item, deleteTodo, saveEdit }) => {
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

      <Text style={{textDecorationLine: "line-through"}} lineBreakMode={'tail'} numberOfLines={1}>
        {item.name}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Switch onPointerDown={() => saveEdit({
          id: item.id,
          name: item.name,
          completed: !item.completed
        })} value={item.completed} />
        <Button
          onPress={() => {
            deleteTodo(item.id);
          }}
          color="black"
          title="Delete"
        />
      </View>
    </View>
  );
};

export default React.memo(TaskItemCompleted);
