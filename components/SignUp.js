import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  FormInput,
  FormLabel,
  FormValidationMessage,
  Button,
  Card,
} from 'react-native-elements';
import * as api from '../api';
import BgImg from '../assets/bgImgDT.png';

export default class SignUpScreen extends React.Component {
  state = {
    username: `${Date.now()}`,
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={BgImg} style={styles.backgroundImage} />
        <FormLabel
          labelStyle={{
            fontSize: 16,
            fontFamily: 'KohinoorDevanagari-Semibold',
          }}
        >
          Username:
        </FormLabel>
        <FormInput
          placeholder="choose a username"
          containerStyle={{
            width: 250,
            backgroundColor: 'rgba(0, 112, 149, 0.1)',
            borderRadius: 10,
          }}
          onChangeText={text => this.setState({ username: text })}
          value={this.state.username}
        />
        <Button
          fontSize={16}
          fontFamily="KohinoorDevanagari-Semibold"
          alignItems="center"
          buttonStyle={{
            backgroundColor: 'rgb(0, 112, 149)',
            borderRadius: 5,
            marginTop: 30,
            marginBottom: 15,
            borderWidth: 1,
            width: 250,
          }}
          title="Sign Up"
          onPress={() => {
            api
              .createUserProfile(this.state.username)
              .then(() => {
                api.getUserProfile(this.state.username).then(user => {
                  this.props.navigation.navigate('Profile', {
                    userDetails: user,
                  });
                });
              })
              .catch(err => {
                this.setState({ username: '' });
              });
          }}
        />
        <Button
          alignItems="center"
          fontSize={16}
          fontFamily="KohinoorDevanagari-Semibold"
          buttonStyle={{
            backgroundColor: 'rgba(0, 112, 149, 0.6)',
            borderRadius: 5,
            marginTop: 15,
            marginBottom: 30,
            borderWidth: 1,
            width: 250,
          }}
          title="Already have a account? Sign In"
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
  },
});
