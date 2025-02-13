import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  FlatList,
  SafeAreaView,
  SafeAreaViewBase,
  StyleSheet,
  Pressable,
  Text,
  SectionList,
  Modal,
} from 'react-native';
import TimerItem from '../Components/TimerItem';
import TimerModal from '../Components/TimerModal';
import {getTimers, saveTimers} from '../Utils/Storage';

const HomeScreen = () => {
  const [timers, setTimers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [completedTimer, setCompletedTimer] = useState(null);

  useEffect(() => {
    loadTimers();
  }, []);

  const loadTimers = async () => {
    const savedTimers = await getTimers();
    setTimers(savedTimers);
  };

  const updateTimers = updatedTimer => {
    if (updatedTimer.status === 'completed') {
      setCompletedTimer(updatedTimer);
    }
    setTimers(prevTimers => {
      const updatedTimers = prevTimers.map(timer =>
        timer.id === updatedTimer.id ? updatedTimer : timer,
      );
      saveTimers(updatedTimers);
      return updatedTimers;
    });
  };

  const toggleStartPauseAll = category => {
    setTimers(prevTimers => {
      const allRunning = prevTimers
        .filter(t => t.category === category)
        .every(t => t.status === 'running');
      const newStatus = allRunning ? 'paused' : 'running';
      const updatedTimers = prevTimers.map(timer =>
        timer.category === category ? {...timer, status: newStatus} : timer,
      );
      saveTimers(updatedTimers);
      return updatedTimers;
    });
  };

  const groupedTimers = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) acc[timer.category] = [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  return (
    <SafeAreaView>
      <Pressable onPress={() => setModalVisible(true)} style={Styles.fab}>
        <Text style={Styles.fabText}>+</Text>
      </Pressable>
      <SectionList
        sections={Object.keys(groupedTimers).map(category => ({
          title: category,
          data: groupedTimers[category],
        }))}
        keyExtractor={item => item.id}
        renderItem={({item, section}) => (
          <View
            style={{
              backgroundColor: 'rgb(0, 0, 0)',
              marginTop: section.data[0] === item ? 10 : 0,
              padding: 20,
            }}>
            {section.data[0] === item && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '2%',
                }}>
                <Text style={Styles.categoryHeader}>{section.title}</Text>
                <Pressable
                  onPress={() => toggleStartPauseAll(section.title)}
                  style={Styles.btn}>
                  <Text style={Styles.btnText}>Start/Pause All</Text>
                </Pressable>
              </View>
            )}
            <TimerItem timer={item} onUpdate={updateTimers} />
          </View>
        )}
      />
      <TimerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={newTimer => {
          setTimers(prevTimers => {
            const updatedTimers = [...prevTimers, newTimer];
            saveTimers(updatedTimers);
            return updatedTimers;
          });
        }}
      />
      {completedTimer && (
        <Modal visible={true} transparent>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
              <Text>Timer {completedTimer.name} Completed!</Text>
              <Button title="Close" onPress={() => setCompletedTimer(null)} />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const Styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '10%',
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 10,
  },
  fabText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  btn: {
    backgroundColor: 'blue',
    width: '45%',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnText: {color: 'white'},
  categoryHeader: {
    color: 'white',
    fontWeight: '800',
    fontSize: 20,
  },
});
