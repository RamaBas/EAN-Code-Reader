import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { BarCodeScanner, BarCodeScannedCallback } from 'expo-barcode-scanner';
import axios from 'axios';

export default function BarcodeScannerComponent() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned: BarCodeScannedCallback = ({ data }) => {
    setScanned(true);
    setScannedData(data);
    sendBarcodeToBackend(data);
  };

  const sendBarcodeToBackend = async (barcode: string) => {
    console.log('enviando al servidor:', barcode);
    try {
      await axios.post(`http://192.168.0.24:3000/api/barcode?barcode=${barcode}`);
      setScanned(false);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Error al enviar el código de barras al backend:', error.response?.data || error.message);
      } else {
        console.error('Error desconocido:', error);
      }
    }
  };
  

  if (hasPermission === null) {
    return <Text>Solicitando permiso para acceder a la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Permiso denegado para acceder a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.dataContainer}>
          <Text>Código de barras escaneado: {scannedData}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dataContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});
