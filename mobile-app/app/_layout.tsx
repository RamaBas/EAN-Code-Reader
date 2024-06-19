import React from 'react';
import { View } from 'react-native';
import BarcodeScannerComponent from './ScannerCam';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <BarcodeScannerComponent />
    </View>
  );
}
