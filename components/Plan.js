import React from "react";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView
} from "react-native";
import * as api from "../api";
import { Button, FormInput, FormLabel } from "react-native-elements";
import BgImg from "../assets/bgImgDT.png";
import Nav from "./Nav";

export default class PlanScreen extends React.Component {
  state = {
    location: "",
    username: "williamwalkers",
    attractions: []
  };

  render() {
    console.log();
    return (
      <>
        <Nav
          openDrawer={this.props.navigation.openDrawer}
          style={{ position: "absolute" }}
        />
        <KeyboardAvoidingView
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          enabled
        >
          <Image source={BgImg} style={styles.backgroundImage} />
          <View style={{ width: "70%", justifyContent: "center" }}>
            <FormLabel
              labelStyle={{
                textAlign: "center",
                fontSize: 20,
                fontFamily: "KohinoorDevanagari-Semibold"
              }}
            >
              Where are you heading to?
            </FormLabel>
            <FormInput
              placeholder="Location city"
              onChangeText={location => this.setState({ location })}
              value={this.state.location}
              containerStyle={{
                marginTop: 30,
                width: 200,
                backgroundColor: "rgba(0, 112, 149, 0.1)",
                borderRadius: 10,
                alignSelf: "center"
              }}
            />
            <Button
              fontSize={14}
              fontFamily="KohinoorDevanagari-Semibold"
              buttonStyle={{
                alignSelf: "center",
                backgroundColor: "rgba(0, 112, 149, 1)",
                borderRadius: 5,
                marginBottom: 30,
                marginTop: 30,
                borderWidth: 1,
                width: "89%",
                marginLeft: "5%"
              }}
              title={"Show me what's here!"}
              onPress={() => {
                api
                  .getAttractions(this.state.username, this.state.location)
                  .then(attractions => this.setState({ attractions }))
                  .then(res => {
                    this.props.navigation.navigate("Itinerary", {
                      location: `${this.state.location}`,
                      attractions: this.state.attractions
                    });
                  });
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  date: {
    color: "blue"
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    resizeMode: "cover",
    top: 69
  }
});
