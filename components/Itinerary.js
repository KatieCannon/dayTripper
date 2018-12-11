import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import _ from "lodash";
import { Button, Tile, Overlay } from "react-native-elements";
import BgImg from "../assets/bgImgDT.png";
import Nav from "./Nav";

export default class ItineraryScreen extends React.Component {
  state = {
    attractions: [],
    randomAttractions: [],
    isVisible: false,
    contentSize: { width: 0, height: 0 }
  };
  randomAttractionsHandler = () => {
    const locationsArray = this.props.navigation.state.params.attractions;
    const randomAttractions = _.shuffle(locationsArray).slice(0, 5);
    this.setState({
      attractions: locationsArray,
      randomAttractions: randomAttractions
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
      position: "absolute",
      resizeMode: "repeat",
      width: this.state.contentSize.width,
      height: this.state.contentSize.height
    };
    console.log(this.props.navigation.state.params.userDetails);
    return (
      <>
        <Nav
          openDrawer={this.props.navigation.openDrawer}
          style={{ position: "absolute" }}
        />
        <ScrollView
          marginTop={69}
          style={{ height: "80%" }}
          onContentSizeChange={(width, height) =>
            this.setState({ contentSize: { width, height } })
          }
        >
          <Image source={BgImg} style={backgroundImage} resizeMode="repeat" />

          {this.state.randomAttractions.map((attraction, index) => {
            return (
              <View key={index} style={{ width: 70 }}>
                <Tile
                  style={{ alignContent: "center", justifyContent: "center" }}
                  imageSrc={{
                    uri: this.imageHandler(
                      attraction.images,
                      "https://www.visitmanchester.com/imageresizer/?image=%2Fdbimgs%2FCityscape%20Sunset%20website.jpg&action=Background_Overlay"
                    )
                  }}
                  onPress={this.keepDestinationHandler}
                  title={attraction.name}
                />
              </View>
            );
          })}
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              padding: 10,
              borderRadius: 10
            }}
          >
            <Button
              fontSize={16}
              fontFamily="KohinoorDevanagari-Semibold"
              buttonStyle={{
                backgroundColor: "rgba(0, 112, 149, 1)",
                borderRadius: 5,
                marginBottom: 10,
                marginTop: 10,
                borderWidth: 1,
                alignSelf: "center"
              }}
              title="Map This Itinerary!"
              onPress={() =>
                this.props.navigation.navigate("Map", {
                  randomAttractions: this.state.randomAttractions
                })
              }
            />
            <Button
              fontSize={16}
              fontFamily="KohinoorDevanagari-Semibold"
              buttonStyle={{
                backgroundColor: "rgba(0, 112, 149, 0.7)",
                borderRadius: 5,
                marginBottom: 10,
                marginTop: 10,
                borderWidth: 1,
                alignSelf: "center"
              }}
              title="Different Itinerary"
              onPress={this.randomAttractionsHandler}
            />
            <Button
              fontSize={16}
              fontFamily="KohinoorDevanagari-Semibold"
              buttonStyle={{
                backgroundColor: "rgba(0, 112, 149, 0.4)",
                borderRadius: 5,
                marginBottom: 10,
                marginTop: 10,
                borderWidth: 1,
                alignSelf: "center"
              }}
              title="Save Itinerary"
              onPress={() =>
                this.props.navigation.navigate("SavedMaps", {
                  randomAttractions: this.state.randomAttractions
                })
              }
            />
          </View>
        </ScrollView>
      </>
    );
  }
  componentDidMount = () => {
    console.log("log 1");
    this.randomAttractionsHandler();
  };
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  }
});
