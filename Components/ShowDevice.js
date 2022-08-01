import {View, Text} from 'react-native';
import React from 'react';

const ShowDevice = ({route}) => {
  const {devicename} = route.params;
  console.log('devicename', JSON.stringify(devicename));

  return (
    <View>
      {devicename ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'black'}}>{devicename}</Text>
          <Text style={{color: 'black'}}>Password:-12345678</Text>
          <Text>Open wifi settings and connect to this network</Text>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No device found</Text>
        </View>
      )}
    </View>
  );
};

export default ShowDevice;
