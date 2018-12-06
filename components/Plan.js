import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator
} from "react-native";
import DateTimePickerTester from "./DatePicker";
import * as api from "../api";
import { Button, FormInput, FormLabel } from "react-native-elements";
import BgImg from "../assets/bgImgDT.png";
import Nav from "./Nav";

export default class PlanScreen extends React.Component {
  state = {
    location: "Manchester",
    username: "williamwalkers",
    attractions: []
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image source={BgImg} style={styles.backgroundImage} />
        <Nav
          openDrawer={this.props.navigation.openDrawer}
          style={{ position: "absolute" }}
        />
        <View style={{ width: "70%", justifyContent: "center" }}>
          <Text style={{ fontSize: 15, marginLeft: "9%" }}>
            Where are you heading to?
          </Text>
          <FormInput
            placeholder="Location city"
            onChangeText={location => this.setState({ location })}
            value={this.state.location}
          />
          <Button
            buttonStyle={{
              backgroundColor: "red",
              borderRadius: 5,
              marginBottom: 30,
              marginTop: 20,
              borderWidth: 1,
              width: "89%",
              marginLeft: "6%"
            }}
            title="Map my day!"
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
        {/* 
        <DateTimePickerTester
          style={{ justifyContent: "center", alignItems: "center" }}
        />
         */}
      </View>
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
    resizeMode: "cover"
  }
});
