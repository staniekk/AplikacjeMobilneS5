import { Text, View, ScrollView, BackHandler, Button, Image } from "react-native";
import { styles } from "./style";
import React from "react";
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export function Calendar({ navigation }) {
  const [imageUri, setImageUri] = React.useState(null);

  React.useEffect(() => {
    const backAction = () => true;
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Niestety, potrzebujemy uprawnień do galerii!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const manipulateImageCrop = async () => {
    if (imageUri) {
      try {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          imageUri,
          [{ crop: { originX: 0, originY: 0, width: 250, height: 250 } }],
          { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        setImageUri(manipulatedImage.uri);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const manipulateImageRotate = async () => {
    if (imageUri) {
      try {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          imageUri,
          [{ rotate: 90 }],
          { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        setImageUri(manipulatedImage.uri);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const manipulateImageResize = async () => {
    if (imageUri) {
      try {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          imageUri,
          [
          { resize: { width: 100, height: 100 } }],
          { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        setImageUri(manipulatedImage.uri);
      } catch (error) {
        console.error(error);
      }
    }
  };


  const saveImage = async () => {
    if (imageUri) {
      try {
        const asset = await MediaLibrary.createAssetAsync(imageUri);
        await MediaLibrary.createAlbumAsync('YourAppName', asset, false);
        console.log('Zapisano obraz w albumie YourAppName');
      } catch (e) {
        console.error('Błąd zapisywania obrazu:', e);
      }
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image style={styles.logo} source={require('../../img/logo/Logo.png')} />

        <Button style={styles.loginBtn1} title="Wybierz Obraz" onPress={pickImage} />
        <Button style={styles.loginBtn} title="Crop" onPress={manipulateImageCrop} />
        <Button style={styles.loginBtn} title="Rotate" onPress={manipulateImageRotate} />
        <Button style={styles.loginBtn} title="Resize" onPress={manipulateImageResize} />
        <Button style={styles.loginBtn} title="Zapisz Obraz" onPress={saveImage} />
        {imageUri && <Image source={{ uri: imageUri }} style={{ width: 300, height: 300 }} />}
      </View>
    </ScrollView>
  );
}
