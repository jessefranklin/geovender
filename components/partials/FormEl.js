import React from 'react';
import styles from '../../styles';
import { 
    Text, 
    TextInput,
  } from 'react-native';

export const textField = (name, placeholder, lines ) => {
    const mline = lines ? true : false;
    return (
      <TextInput
          style={styles.textInputForm}
          onChangeText={(text) => this.setState({ [name]: text })}
          multiline={mline}
          lines={lines}
          placeholder={placeholder}
          value={this.state[name]}/>
    )
}

export const nestedTextField = (name, placeholder, nest ) => {
    return (
      <TextInput
          style={styles.textInputForm}
          onChangeText={(text) => this.updateNested(name, text, nest)}
          placeholder={placeholder}
          value={this.state[nest][name]}/>
    )
}
  
export const nestedNumericField = (name, placeholder, nest ) => {
    return (
      <TextInput
          style={styles.textInputForm}
          onChangeText={(text) => this.updateNested(name, text, nest)}
          keyboardType='numeric'
          value={this.state[nest][name]}
          placeholder={placeholder}
          maxLength={10}
          />
    )
}