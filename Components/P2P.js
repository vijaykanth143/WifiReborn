import React, {PureComponent} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {
  initialize,
  startDiscoveringPeers,
  stopDiscoveringPeers,
  unsubscribeFromPeersUpdates,
  unsubscribeFromThisDeviceChanged,
  unsubscribeFromConnectionInfoUpdates,
  subscribeOnConnectionInfoUpdates,
  subscribeOnThisDeviceChanged,
  subscribeOnPeersUpdates,
  connect,
  cancelConnect,
  createGroup,
  removeGroup,
  getAvailablePeers,
  sendFile,
  receiveFile,
  getConnectionInfo,
  getGroupInfo,
  receiveMessage,
  sendMessage,
} from 'react-native-wifi-p2p';
import WifiManager from 'react-native-wifi-reborn';
import {PermissionsAndroid} from 'react-native';

export default class P2p extends PureComponent {
  state = {
    devices: [],
    ssid: null,
    listdata: null,
  };

  async componentDidMount() {
    try {
      await initialize();
      // since it's required in Android >= 6.0
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Access to wi-fi P2P mode',
          message: 'ACCESS_COARSE_LOCATION',
        },
      );

      console.log(
        granted === PermissionsAndroid.RESULTS.GRANTED
          ? 'You can use the p2p mode'
          : 'Permission denied: p2p mode will not work',
      );

      subscribeOnPeersUpdates(this.handleNewPeers);
      subscribeOnConnectionInfoUpdates(this.handleNewInfo);
      subscribeOnThisDeviceChanged(this.handleThisDeviceChanged);

      const status = await startDiscoveringPeers();
      console.log('startDiscoveringPeers status: ', status);
    } catch (e) {
      console.error(e);
    }
  }

  componentWillUnmount() {
    unsubscribeFromConnectionInfoUpdates(this.handleNewInfo);
    unsubscribeFromPeersUpdates(this.handleNewPeers);
    unsubscribeFromThisDeviceChanged(this.handleThisDeviceChanged);
  }

  handleNewInfo = info => {
    console.log('OnConnectionInfoUpdated', info);
  };

  handleNewPeers = ({devices}) => {
    console.log('OnPeersUpdated', devices);
    this.setState({devices: devices});
  };

  handleThisDeviceChanged = groupInfo => {
    console.log('THIS_DEVICE_CHANGED_ACTION', groupInfo);
  };

  onStartInvestigate = () => {
    startDiscoveringPeers()
      .then(status =>
        console.log(
          'startDiscoveringPeers',
          `Status of discovering peers: ${status}`,
        ),
      )
      .catch(err =>
        console.error(
          `Something is gone wrong. Maybe your WiFi is disabled? Error details: ${err}`,
        ),
      );
  };

  onGetAvailableDevices = () => {
    getAvailablePeers().then(peers => console.log(peers));
  };
  ShowDevice = () => {
    WifiManager.loadWifiList().then(
      list => this.setState({listdata: list}),
      console.log('Listdata', this.state.listdata),
    );
    this.state.listdata &&
      this.state.listdata.map(item =>
        item.SSID === 'ITEAD-10014bab7c'
          ? this.setState({ssid: item.SSID})
          : null,
      );
    console.log(this.state.ssid);
  };
  lists = () => {
    // WifiManager.getCurrentWifiSSID().then(
    //   ssid => {
    //     console.log('Your current connected wifi SSID is ' + ssid);
    //     setssid(ssid);
    //   },
    //   () => {
    //     console.log('Cannot get current SSID!');
    //   },
    // );
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Investigate" onPress={this.onStartInvestigate} />
        <Button
          title="Get Available Devices"
          onPress={this.onGetAvailableDevices}
        />
        <Button title="list" onPress={this.lists} />
        <Button title="Show device" onPress={this.ShowDevice} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
