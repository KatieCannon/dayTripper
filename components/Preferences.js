import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
// import DashBoard from './DashBoard'
import { CheckBox, Button, Card } from 'react-native-elements';
import * as api from '../api';
import Nav from './Nav';
import BgImg from '../assets/bgImgDT.png';
import User from '../assets/william.png';

export default class PreferencesScreen extends React.Component {
  state = {
    preferences: {},
  };

  handleSubmit = () => {
    const username = this.props.navigation.state.params.userDetails.username;
    api
      .updateUserPreferences(username, this.state.preferences)
      .then(user => {
        this.props.navigation.navigate('Preferences');
      })
      .catch(err => console.log(err));
  };

  render() {
    const {
      cruises,
      eatingout,
      musicandshows,
      shopping,
      exploringnature,
      sightseeing,
    } = this.state.preferences;

    const preferences = this.state.preferences;
    const username = this.props.navigation.state.params.userDetails.username;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={BgImg} style={styles.backgroundImage} />
        <Nav
          openDrawer={this.props.navigation.openDrawer}
          style={{ position: 'absolute' }}
        />
        <ScrollView style={{ marginTop: 100 }}>
          <View>
            <Card
              titleStyle={{
                color: 'rgba(0, 112, 149, 1)',
                fontFamily: 'KohinoorDevanagari-Semibold',
                fontSize: 16,
              }}
              containerStyle={{
                justifyContent: 'center',
              }}
              title={username}
            >
              <View>
                <Image
                  style={{
                    marginLeft: '25%',
                    height: 100,
                    width: 100,
                    marginBottom: 20,
                  }}
                  source={User}
                />
                <Text
                  style={{
                    fontFamily: 'KohinoorDevanagari-Semibold',
                    fontSize: 16,
                    textAlign: 'center',
                  }}
                >
                  Hey {username}, set some preferences!
                </Text>
              </View>
            </Card>

            <CheckBox
              fontFamily="KohinoorDevanagari-Semibold"
              title="shopping"
              checked={shopping}
              onPress={() =>
                this.setState({
                  preferences: { ...preferences, shopping: !shopping },
                })
              }
            />
            <CheckBox
              fontFamily="KohinoorDevanagari-Semibold"
              title="eating out"
              checked={eatingout}
              onPress={() =>
                this.setState({
                  preferences: { ...preferences, eatingout: !eatingout },
                })
              }
            />
            <CheckBox
              fontFamily="KohinoorDevanagari-Semibold"
              title="music and shows"
              checked={musicandshows}
              onPress={() =>
                this.setState({
                  preferences: {
                    ...preferences,
                    musicandshows: !musicandshows,
                  },
                })
              }
            />
            <CheckBox
              fontFamily="KohinoorDevanagari-Semibold"
              title="Nature"
              checked={exploringnature}
              onPress={() =>
                this.setState({
                  preferences: {
                    ...preferences,
                    exploringnature: !exploringnature,
                  },
                })
              }
            />
            <CheckBox
              fontFamily="KohinoorDevanagari-Semibold"
              title="Cruises"
              checked={cruises}
              onPress={() =>
                this.setState({
                  preferences: { ...preferences, cruises: !cruises },
                })
              }
            />
            <Button
              fontSize={16}
              fontFamily="KohinoorDevanagari-Semibold"
              buttonStyle={{
                backgroundColor: 'rgba(0, 112, 149, 0.7)',
                borderRadius: 5,
                marginBottom: 10,
                marginTop: 20,
                borderWidth: 1,
                width: '89%',
                marginLeft: '5%',
              }}
              title="Save Preferences"
              onPress={this.handleSubmit}
            />
            <Button
              fontSize={16}
              fontFamily="KohinoorDevanagari-Semibold"
              buttonStyle={{
                backgroundColor: 'rgba(0, 112, 149, 1)',
                borderRadius: 5,
                marginBottom: 30,
                marginTop: 10,
                borderWidth: 1,
                width: '89%',
                marginLeft: '5%',
              }}
              title="Plan a trip"
              onPress={() => {
                this.props.navigation.navigate('Plan');
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  componentDidMount = () => {
    const userPreferences = this.props.navigation.state.params.userDetails
      .preferences;
    this.setState({ preferences: userPreferences });
  };
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
  },
});
