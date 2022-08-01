import 'react-native-gesture-handler';
import React, {useState} from 'react';
import WifiManager from 'react-native-wifi-reborn';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import P2p from './Components/P2P';
import CurrentWifi from './Components/CurrentWifi';
import ShowDevice from './Components/ShowDevice';
const App = () => {
  const [ssid, setssid] = useState(null);
  const [Password, setPassword] = useState(null);
  const [success, setsuccess] = useState(false);
  const [listdata, setWifiList] = useState(null);
  const Stack = createNativeStackNavigator();
  const connect = e => {
    console.log(ssid);
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
  // const ShowDevice = () => {
  //   listdata.map(item =>
  //     item.SSID === 'ITEAD-10014bab7c' ? setssid(item.SSID) : null,
  //   );
  //   console.log(ssid);
  // };
  const lists = () => {
    WifiManager.loadWifiList().then(
      list => setWifiList(list),
      console.log('Listdata', listdata),
    );
    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        console.log('Your current connected wifi SSID is ' + ssid);
        setssid(ssid);
      },
      () => {
        console.log('Cannot get current SSID!');
      },
    );
  };

  return (
    // <View>
    //   <TextInput
    //     placeholder="username"
    //     value={ssid ? ssid : null}
    //     style={{borderWidth: 1, borderColor: 'white', margin: 10}}
    //     onChangeText={e => setssid(e)}
    //   />
    //   <TextInput
    //     placeholder="Password"
    //     value={Password}
    //     style={{borderWidth: 1, borderColor: 'white', margin: 10}}
    //     onChangeText={e => setPassword(e)}
    //   />
    //   <Button title="Connect" onPress={connect} />
    //   <Button title="list" onPress={lists} />

   
    // <Button title="Show device" onPress={ShowDevice} />
    //   {success ? (
    //     <Text style={{color: 'green'}}>Connected successfully</Text>
    //   ) : (
    //     <Text style={{color: 'red'}}>Disconnected</Text>
    //   )}
    // </View>
    // <P2p />
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="cwifi" component={CurrentWifi} />
        <Stack.Screen name="sdevice" component={ShowDevice} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
