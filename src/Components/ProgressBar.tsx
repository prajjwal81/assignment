import React from 'react';
import {View} from 'react-native';
const ProgressBar = ({progress}) => {
  return (
    <View style={{width: '100%', height: 10, backgroundColor: 'gray'}}>
      <View
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: 'green',
        }}
      />
    </View>
  );
};

export default ProgressBar;
