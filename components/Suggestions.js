import React from "react";
import { View, Text, Button } from "react-native";
import { Card } from "react-native-elements";

export default class SuggestionsScreen extends React.Component {
  state = {
    attractionHistory: []
  };

  componentDidMount = () => {
    this.getAttractions();
  };

  getAttractions = () => {
    const attractHis = this.props.navigation.state.params.randomAttractions;
    this.setState({
      attractionHistory: attractHis
    });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Card
          containerStyle={{ width: "90%" }}
          title="Previous Trip"
          image={{
            uri:
              "https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }}
        >
          {this.state.attractionHistory.map((attraction, index) => {
            return (
              <Text style={{ alignContent: "center" }}>{attraction.name}</Text>
            );
          })}
          <Button
            title="Maps"
            onPress={() =>
              this.props.navigation.navigate("Map", {
                randomAttractions: this.state.attractionHistory
              })
            }
          />
        </Card>
      </View>
    );
  }
}
