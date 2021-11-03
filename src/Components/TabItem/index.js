import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  File,
  FileActive,
  Home,
  HomeActive,
  Info,
  InfoActive,
  Person,
  PersonActive,
} from '../../assets/icons';

const TabItem = ({isFocused, onLongPress, onPress, label}) => {
  const Icon = () => {
    if (label === 'Home') {
      return isFocused ? <HomeActive /> : <Home />;
    }
    if (label === 'Catatan') {
      return isFocused ? <FileActive /> : <File />;
    }
    if (label === 'About') {
      return isFocused ? <InfoActive /> : <Info />;
    }
    if (label === 'Profile') {
      return isFocused ? <PersonActive /> : <Person />;
    }

    return <HomeActive />;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
