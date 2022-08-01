import {View, Text, TextInput, Button, FlatList, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import WifiManager from 'react-native-wifi-reborn';
const CurrentWifi = () => {
  const [ssid, setssid] = useState(null);
  const [device, setDevice] = useState('');
  const [Password, setPassword] = useState(null);
  const [success, setsuccess] = useState(false);
  const [listdata, setWifiList] = useState(null);
  const navigation = useNavigation();
  const connect = e => {
    WifiManager.connectToProtectedSSID(
      ssid ? ssid : null,
      Password,
      false,
    ).then(
      async () => {
        setsuccess(true);
        console.log('Connected successfully!');

        await WifiManager.loadWifiList().then(list => setWifiList(list));
        listdata.map(item => item.SSID === console.log(item.SSID));

        listdata.map(item => {
          if (item.SSID === 'ITEAD-10014bab7c') {
            return (
              setDevice('ITEAD-10014bab7c'),
              console.log('devicename-list', item.SSID)
            );
          }
        });

        navigation.navigate('sdevice', {devicename: device});
      },
      () => {
        console.log('Connection failed!');
        setsuccess(false);
      },
    );
  };
  var devicename = '';
  WifiManager.getCurrentWifiSSID().then(
    ssids => {
      console.log('Your current connected wifi SSID is ' + ssids);
    },
    err => {
      console.log('Cannot get current SSID! ' + err);
    },
  );

  console.log('devicename-state', device);
  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <TextInput
        placeholder="username"
        value={ssid ? ssid : null}
        style={{borderWidth: 1, borderColor: 'white', margin: 10}}
        onChangeText={e => setssid(e)}
      />
      <TextInput
        placeholder="Password"
        value={Password}
        style={{borderWidth: 1, borderColor: 'white', margin: 10}}
        onChangeText={e => setPassword(e)}
      />
      <Button title="Connect" onPress={connect} />

      <FlatList
        data={listdata}
        renderItem={({item}) => <Button title={item.SSID} onPress={connect} />}
      />

      {success ? (
        <Text style={{color: 'green'}}>Connected successfully</Text>
      ) : (
        <Text style={{color: 'red'}}>Disconnected</Text>
      )}
    </View>
  );
};

export default CurrentWifi;
