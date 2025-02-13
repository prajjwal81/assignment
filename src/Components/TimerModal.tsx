import React, {useState} from 'react';
import {
  Modal,
  View,
  TextInput,
  Button,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';

const TimerModal = ({visible, onClose, onAdd}) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const handleAdd = () => {
    if (!name || !duration || !category) return;
    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration),
      remaining: parseInt(duration),
      category,
      status: 'paused',
    };
    onAdd(newTimer);
    onClose();
  };

  return (
    <Modal visible={visible}>
      <SafeAreaView style={{}}>
        <TextInput
          placeholder="Name"
          onChangeText={setName}
          style={Styles.input}
          placeholderTextColor={'white'}
        />
        <TextInput
          placeholder="Duration (sec)"
          keyboardType="numeric"
          onChangeText={setDuration}
          style={Styles.input}
          placeholderTextColor={'white'}
        />
        <TextInput
          placeholder="Category"
          onChangeText={setCategory}
          style={Styles.input}
          placeholderTextColor={'white'}
        />
        <View style={Styles.btnContainer}>
          <Pressable onPress={handleAdd} style={Styles.btn}>
            <Text style={Styles.btnText}>Add</Text>
          </Pressable>

          <Pressable
            onPress={onClose}
            style={[Styles.btn, {backgroundColor: 'red'}]}>
            <Text style={Styles.btnText}>Close</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default TimerModal;

const Styles = StyleSheet.create({
  input: {
    width: '80%',
    height: '10%',
    backgroundColor: 'grey',
    marginTop: '5%',
    alignSelf: 'center',
    borderRadius: 10,
    paddingLeft: '5%',
    color: 'white',
  },
  btn: {
    backgroundColor: 'green',
    width: '45%',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {color: 'white'},
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '10%',
  },
});
