import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-elements';
import BgImg from '../assets/bgImgDT.png';
import Nav from './Nav';

export default class SavedMapsScreen extends React.Component {
  state = {
    attractionHistory: [],
  };

  componentDidMount = () => {
    this.getAttractions();
  };

  getAttractions = () => {
    const attractHis = this.props.navigation.state.params.randomAttractions;
    this.setState({
      attractionHistory: attractHis,
    });
  };

  render() {
    console.log(this.props.navigation.state.params.randomAttractions);
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image source={BgImg} style={styles.backgroundImage} />
        <Nav
          openDrawer={this.props.navigation.openDrawer}
          style={{ position: 'absolute' }}
        />
        <Card
          containerStyle={{ width: '90%', marginTop: 100 }}
          titleStyle={{
            color: 'rgba(0, 112, 149, 1)',
            fontFamily: 'KohinoorDevanagari-Semibold',
            fontSize: 20,
          }}
          title="Previous Trip"
          image={{
            uri:
              'https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          }}
        >
          {this.state.attractionHistory.map((attraction, index) => {
            return (
              <Text
                key={index}
                style={{
                  fontFamily: 'KohinoorDevanagari-Semibold',
                  fontSize: 15,
                }}
              >
                {attraction.name}
              </Text>
            );
          })}
          <Button
            color="rgba(0, 112, 149, 1)"
            title="Maps"
            fontFamily="KohinoorDevanagari-Semibold"
            fontSize={20}
            onPress={() =>
              this.props.navigation.navigate('Map', {
                randomAttractions: this.state.attractionHistory,
              })
            }
          />
        </Card>
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
