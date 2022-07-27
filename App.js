import {View, Text, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import WifiManager from 'react-native-wifi-reborn';
const App = () => {
  const [ssid, setssid] = useState(null);
  const [Password, setPassword] = useState(null);
  const [success, setsuccess] = useState(false);
  const connect = () => {
    WifiManager.connectToProtectedSSID(
      ssid ? ssid : null,
      Password,
      false,
    ).then(
      () => {
        setsuccess(true);
        console.log('Connected successfully!');
      },
      () => {
        console.log('Connection failed!');
        setsuccess(false);
      },
    );
  };
  WifiManager.getCurrentWifiSSID().then(
    ssid => {
      console.log('Your current connected wifi SSID is ' + ssid);
      setssid(ssid);
    },
    () => {
      console.log('Cannot get current SSID!');
    },
  );
  return (
    <View>
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
      {success ? (
        <Text style={{color: 'green'}}>Connected successfully</Text>
      ) : (
        <Text style={{color: 'red'}}>Disconnected</Text>
      )}
    </View>
  );
};

export default App;
