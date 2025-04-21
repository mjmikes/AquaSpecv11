import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { BleManager, Device } from "react-native-ble-plx";

const BluetoothScanScreen = () => {
  const [devices, setDevices] = useState<Device[]>([]); // Explicitly define the state type as an array of Device
  const [scanning, setScanning] = useState(false);
  const bleManager = new BleManager();

  useEffect(() => {
    // Clean up on unmount
    return () => {
      bleManager.destroy();
    };
  }, []);

  const startScan = () => {
    setScanning(true);
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }

      // Null check for device
      if (device && device.name && device.name.includes("AquaSpec")) {
        setDevices((prevDevices) => [...prevDevices, device]);
      }
    });
  };

  const stopScan = () => {
    setScanning(false);
    bleManager.stopDeviceScan();
  };

  const handleConnect = (device: Device) => {
    if (device) {
      // Code to connect to the selected device
      console.log("Connecting to", device);
      stopScan();
      // Implement connection logic here
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth Device Scan</Text>
      {scanning ? (
        <TouchableOpacity style={styles.button} onPress={stopScan}>
          <Text style={styles.buttonText}>Stop Scanning</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={startScan}>
          <Text style={styles.buttonText}>Start Scanning</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={devices}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.deviceItem}
            onPress={() => handleConnect(item)} // Pass the valid device
          >
            <Text style={styles.deviceText}>
              {item.name || "Unknown Device"}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  deviceItem: {
    backgroundColor: "#1f2937",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  deviceText: {
    color: "#ffffff",
    fontSize: 18,
  },
});

export default BluetoothScanScreen;
