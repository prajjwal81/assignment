import React, {useEffect, useState} from 'react';
import {View, Text, Button, Pressable, StyleSheet, Alert} from 'react-native';
import ProgressBar from './ProgressBar';

const TimerItem = ({timer, onUpdate}) => {
  const [remaining, setRemaining] = useState(timer.remaining);
  const [running, setRunning] = useState(timer.status === 'running');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setRunning(timer.status === 'running');
  }, [timer.status]);

  useEffect(() => {
    let interval;
    if (running && remaining > 0) {
      interval = setInterval(() => {
        setRemaining(prev => {
          const newRemaining = prev - 1;
          if (newRemaining === Math.floor(timer.duration / 2)) {
            Alert.alert(
              'Halfway Alert',
              `Timer ${timer.name} is halfway done!`,
            );
          }
          if (newRemaining === 0) {
            setModalVisible(true);
            onUpdate({...timer, remaining: 0, status: 'completed'});
          }
          return newRemaining;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, remaining]);

  return (
    <View
      style={{
        marginTop: 2,
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center',
        padding: '5%',
        backgroundColor: 'white',
      }}>
      <Text>
        {timer.name} - {remaining}s
      </Text>
      <View style={{marginTop: 10}}>
        <ProgressBar progress={(remaining / timer.duration) * 100} />
      </View>

      <View style={Styles.btnContainer}>
        <Pressable
          onPress={() => {
            setRunning(!running);
            onUpdate({...timer, status: running ? 'paused' : 'running'});
          }}
          style={Styles.btn}>
          <Text style={Styles.btnText}>{running ? 'Pause' : 'Start'}</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setRemaining(timer.duration);
            onUpdate({...timer, remaining: timer.duration, status: 'paused'});
          }}
          style={[Styles.btn, {backgroundColor: 'red'}]}>
          <Text style={Styles.btnText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TimerItem;

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
