import React from "react";
import { MapView } from "expo";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button
} from "react-native";

const MapPins = props => {
  const imageHandler = (images, defaultImage) => {
    for (let i = 0; i < images.length; i++) {
      if (/(wiki)|(bookatable)/.test(images[i].image)) return images[i].image;
    }
    return defaultImage;
  };
  return props.attractions.map(attraction => {
    let color = "#ff0000";
    if (
      props.checkedInLocations.some(
        place =>
          place.latitude === attraction.coordinates.latitude &&
          place.longitude === attraction.coordinates.longitude
      )
    ) {
      color = "#00ff00";
    }
    return (
      <MapView.Marker
        key={attraction.name}
        coordinate={{
          latitude: attraction.coordinates.latitude,
          longitude: attraction.coordinates.longitude
        }}
        pinColor={color}
      >
        <MapView.Callout
          style={Styles.callout}
          onPress={() => {
            props.getDirections(
              {
                latitude: props.initialLocation.latitude,
                longitude: props.initialLocation.longitude
              },
              {
                latitude: attraction.coordinates.latitude,
                longitude: attraction.coordinates.longitude
              }
            );
          }}
        >
          <View>
            <ScrollView>
              <Image
                style={Styles.placeImage}
                source={{
                  uri: imageHandler(
                    attraction.images,
                    "https://www.visitmanchester.com/imageresizer/?image=%2Fdbimgs%2FCityscape%20Sunset%20website.jpg&action=Background_Overlay"
                  )
                }}
              />

              <Button title={attraction.name} onPress={() => null} />

              <Text>{attraction.intro}</Text>
            </ScrollView>
          </View>
        </MapView.Callout>
      </MapView.Marker>
    );
  });
};

const Styles = StyleSheet.create({
  callout: {
    width: 170,
    height: 200
  },

  placeImage: {
    width: 100,
    height: 100,
    marginLeft: "20%"
  },
  calloutHeader: {
    fontSize: 16,
    fontWeight: "bold"
  }
});
export default MapPins;
