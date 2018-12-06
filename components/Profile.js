import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { FormInput, FormLabel, Button, Card } from 'react-native-elements';
import Nav from './Nav';
import BgImg from '../assets/bgImgDT.png';
import * as api from '../api';

export default class ProfileScreen extends React.Component {
  state = {
    FirstName: '',
    LastName: '',
    Email: '',
    DOB: '',
  };
  render() {
    const username = this.props.navigation.state.params.userDetails.username;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        enabled
      >
        <Image source={BgImg} style={styles.backgroundImage} />
        <Nav
          openDrawer={this.props.navigation.openDrawer}
          style={{ position: 'absolute' }}
        />
        {/* <KeyboardAvoidingView behavior="padding" enabled> */}
        <Card containerStyle={{ width: 300 }}>
          {/* <ScrollView keyboardDismissMode="on-drag"> */}
          <FormLabel
            labelStyle={{
              fontSize: 16,
              fontFamily: 'KohinoorDevanagari-Semibold',
            }}
          >
            First Name:{' '}
          </FormLabel>
          <FormInput
            placeholder="Jane"
            onChangeText={input => this.setState({ FirstName: input })}
            value={this.state.FirstName}
          />
          <FormLabel
            labelStyle={{
              fontSize: 16,
              fontFamily: 'KohinoorDevanagari-Semibold',
            }}
          >
            Last Name:{' '}
          </FormLabel>
          <FormInput
            placeholder="Doe"
            onChangeText={input => this.setState({ LastName: input })}
            value={this.state.LastName}
          />
          <FormLabel
            labelStyle={{
              fontSize: 16,
              fontFamily: 'KohinoorDevanagari-Semibold',
            }}
          >
            Email:{' '}
          </FormLabel>
          <FormInput
            placeholder="jane@internet.com"
            onChangeText={input => this.setState({ Email: input })}
            value={this.state.Email}
          />
          <FormLabel
            labelStyle={{
              fontSize: 16,
              fontFamily: 'KohinoorDevanagari-Semibold',
            }}
          >
            D.O.B :{' '}
          </FormLabel>
          <FormInput
            placeholder="DD/MM/YYYY"
            onChangeText={input => this.setState({ DOB: input })}
            value={this.state.DOB}
          />
          <Button
            fontSize={16}
            fontFamily="KohinoorDevanagari-Semibold"
            buttonStyle={{
              marginTop: 30,
              backgroundColor: 'rgb(0, 112, 149)',
              borderRadius: 10,
              borderWidth: 1,
              width: 200,
              alignSelf: 'center',
            }}
            fontWeight={'bold'}
            // fontSize={20}
            title="Add my Info!"
            onPress={() => {
              api
                .updateUserInfo(username, this.state)
                .then(user => {
                  console.log(user);
                  this.props.navigation.navigate('Preferences', {
                    userDetails: user.Attributes,
                  });
                })
                .catch(err => {
                  console.log(err);
                });
            }}
          />
          {/* </ScrollView> */}
        </Card>
        {/* </KeyboardAvoidingView> */}
      </KeyboardAvoidingView>
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
