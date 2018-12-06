import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import _ from 'lodash';
import { Button, Tile, Overlay } from 'react-native-elements';
import BgImg from '../assets/bgImgDT.png';
import Nav from './Nav';
import ActivityIndicator from './ActivityIndicator';

export default class ItineraryScreen extends React.Component {
  state = {
    attractions: [],
    randomAttractions: [],
    isVisible: false,
    contentSize: { width: 0, height: 0 },
    loading: true,
  };
  randomAttractionsHandler = () => {
    const locationsArray = this.props.navigation.state.params.attractions;
    const randomAttractions = _.shuffle(locationsArray).slice(0, 5);
    this.setState({
      attractions: locationsArray,
      randomAttractions: randomAttractions,
    });
  };
  imageHandler = (images, defaultImage) => {
    for (let i = 0; i < images.length; i++) {
      if (/(wiki)|(bookatable)/.test(images[i].image)) return images[i].image;
    }
    return defaultImage;
  };
  handleIntroToggle = () => {
    const doesShow = this.state.isVisible;
    this.setState({ isVisible: !doesShow });
  };
  componentDidMount = () => {
    this.setState({ loading: false });
    this.randomAttractionsHandler();
  };
  render() {
    const backgroundImage = {
      flex: 1,
      position: 'absolute',
      resizeMode: 'repeat',
      width: this.state.contentSize.width,
      height: this.state.contentSize.height,
    };
    if (this.state.loading) {
      return <ActivityIndicator openDrawer={this.props.navigation.openDrawer} />;
    } else {
      return (
        <ScrollView
          style={{ height: '80%' }}
          onContentSizeChange={(width, height) =>
            this.setState({ contentSize: { width, height } })
          }
        >
          <Image source={BgImg} style={backgroundImage} resizeMode="repeat" />
          <Nav
            openDrawer={this.props.navigation.openDrawer}
            style={{ position: 'absolute' }}
          />
          {this.state.randomAttractions.map((attraction, index) => {
            return (
              <View key={index} style={{ width: 70 }}>
                <Tile
                  style={{ alignContent: 'center', justifyContent: 'center' }}
                  imageSrc={{
                    uri: this.imageHandler(
                      attraction.images,
                      'https://itefix.net/sites/default/files/not_available.png',
                    ),
                  }}
                  onPress={this.keepDestinationHandler}
                  title={attraction.name}
                />
              </View>
            );
          })}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Button
              buttonStyle={{
                backgroundColor: 'red',
                borderRadius: 5,
                marginBottom: 10,
                marginTop: 10,
                borderWidth: 1,
                width: '89%',
                marginLeft: 29,
              }}
              title="Randomize"
              onPress={this.randomAttractionsHandler}
            />
            <Button
              buttonStyle={{
                backgroundColor: 'red',
                borderRadius: 5,
                marginBottom: 10,
                marginTop: 10,
                borderWidth: 1,
                width: '89%',
                marginLeft: 29,
              }}
              title="Save Map"
              onPress={() =>
                this.props.navigation.navigate('SavedMaps', {
                  randomAttractions: this.state.randomAttractions,
                })
              }
            />
            <Button
              buttonStyle={{
                backgroundColor: 'red',
                borderRadius: 5,
                marginBottom: 10,
                marginTop: 10,
                borderWidth: 1,
                width: '89%',
                marginLeft: 29,
              }}
              title="Map locations"
              onPress={() =>
                this.props.navigation.navigate('Map', {
                  randomAttractions: this.state.randomAttractions,
                })
              }
            />
          </View>
        </ScrollView>
      );
    }
  }
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
});
