import React from 'react';
import {StyleSheet, TextStyle, TouchableHighlight, View} from "react-native";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Props {
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  iconStyle?: StyleProp<TextStyle> | undefined;
}

export default function EditButton({onPress, containerStyle, iconStyle}: Props) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={containerStyle}>
        <MaterialIcons name={"edit"} color={"white"} style={iconStyle ?? styles.btnDefaultStyles}/>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btnDefaultStyles: {
    fontSize: 25,
  }
})

