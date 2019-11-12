import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

import styles from './styles';

export default function CameraPage() {
  cam = null;
  [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
	  const componentDidMount = async () => {
	    const camera = await Permissions.askAsync(Permissions.CAMERA);
	    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
	    setCameraPermission(camera.status === 'granted' && audio.status === 'granted');
	  };
	  componentDidMount();
	}, []);

  if (cameraPermission === null) {
  	return <View />;
  } else if (cameraPermission === false) {
    return <Text>Access to camera has been denied.</Text>;
  }
  return (
    <View>
      <Camera
        style={styles.preview}
        ref={camera => cam = camera}
      />
    </View>
  );
}

