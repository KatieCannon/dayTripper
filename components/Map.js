import React from "react";
import { MapView } from "expo";
import {
  Platform,
  View,
  ActivityIndicator,
  FlatList,
  Text
} from "react-native";
import { Button, Badge } from "react-native-elements";
import Nav from "./Nav";

import { Constants, Location, Permissions } from "expo";
import MapPins from "./MapPins.js";
import { getDirections } from "../api";
import geolib from "geolib";

const MINIMUM_DISTANCE_TO_DESTINATION = 50;

export default class MapScreen extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    error: null,
    currentDestination: null,
    coordsArray: [],
    isCloseToDestination: false,
    isLoading: true,
    watchPositionSubscription: null,
    checkedInLocations: [],
    distance: 0
  };

  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        error:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      Location.watchPositionAsync(
        {
          enableHighAccuracy: true,
          distanceInterval: 1
        },
        this.isCloseToDestination
      ).then(subscription => {
        this.setState({
          watchPositionSubscription: subscription
        });
      });
      this._getLocationAsync();
    }
  }

  componentWillUnmount() {
    if (this.state.watchPositionSubscription !== null) {
      this.state.watchPositionSubscription.remove();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        error: "Permission to access location was denied"
      });
    } else {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        isLoading: false
      });
    }
  };

  generateDirections = (start, end) => {
    console.log(JSON.stringify(end));
    getDirections(start, end).then(coords => {
      this.setState({
        currentDestination: end,
        coordsArray: [...this.state.coordsArray, coords]
      });
    });
  };

  isCloseToDestination = currentPosition => {
    if (this.state.currentDestination === null) return;
    const distanceBetweenLocations = geolib.getDistance(
      {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude
      },
      {
        latitude: this.state.currentDestination.latitude,
        longitude: this.state.currentDestination.longitude
      }
    );
    console.log("we are " + distanceBetweenLocations + " from our destination");
    if (distanceBetweenLocations < MINIMUM_DISTANCE_TO_DESTINATION) {
      this.setState({
        isCloseToDestination: true
      });
    }
    this.setState({
      distance: distanceBetweenLocations
    });
  };

  cameraViewHandler = () => {
    this.map.animateToViewingAngle(50, 2);
    // this.map.animateCamera({ pitch: 45, altitude: 50 });
  };

  checkIn = () => {
    this.setState({
      checkedInLocations: [
        ...this.state.checkedInLocations,
        this.state.currentDestination
      ]
    });
  };

  render() {
    const initialLocation = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };

    if (this.state.isLoading) {
      return (
        <View>
          <Text>loading....</Text>
        </View>
      );
    }

    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={initialLocation}
        showsUserLocation
        //followsUserLocation={true}
        showsCompass={true}
        onPress={this.cameraViewHandler}
        ref={ref => (this.map = ref)}
        maxZoomLevel={30}
        showsMyLocationButton
      >
        <MapPins
          initialLocation={initialLocation}
          getDirections={this.generateDirections}
          attractions={this.props.navigation.state.params.randomAttractions}
          checkedInLocations={this.state.checkedInLocations}
        />
        {this.state.coordsArray.map((coords, index) => {
          return (
            <MapView.Polyline
              key={index}
              coordinates={coords}
              stroke={2}
              strokeColor="red"
            />
          );
        })}

        <Text
          style={{
            marginTop: 500,
            backgroundColor: "red",
            color: "white",
            textAlign: "center",
            fontSize: 18
          }}
        >
          You are {this.state.distance} from your destination
        </Text>

        {this.state.isCloseToDestination && (
          <Button
            buttonStyle={{
              backgroundColor: "red",
              borderRadius: 5,
              marginBottom: 30,
              marginTop: 20,
              borderWidth: 1,
              width: "89%",
              marginLeft: 29
            }}
            title="Check In"
            onPress={this.checkIn}
          />
        )}
      </MapView>
    );
  }
}
