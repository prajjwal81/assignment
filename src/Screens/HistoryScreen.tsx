import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {getTimers} from '../Utils/Storage';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getTimers();
    const completedTimers = data.filter(timer => timer.status === 'completed');
    setHistory(completedTimers);
  };

  return (
    <SafeAreaView>
      <Text style={styles.text}>Completed Timers</Text>
      <FlatList
        data={history}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text>{item.name} - Completed</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  itemContainer: {
    width: '95%',
    alignSelf: 'center',
    height: 30,
    backgroundColor: 'grey',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: '700',
  },
});
