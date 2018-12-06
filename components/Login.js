import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { FormLabel, FormInput, Icon, Button } from "react-native-elements";
import * as api from "../api";
import BgImg from "../assets/bgImgDT.png";

export default class LoginScreen extends React.Component {
  state = {
    username: "",
    password: ""
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image source={BgImg} style={styles.backgroundImage} />
        <FormLabel>Username</FormLabel>
        <FormInput
          containerStyle={{
            width: 200
          }}
          onChangeText={text =>
            this.setState({
              username: text
            })
          }
          value={this.state.username}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          containerStyle={{
            width: 200
          }}
          onChangeText={text =>
            this.setState({
              password: text
            })
          }
          value={this.state.password}
        />
        <Icon
          raised
          name="key"
          type="font-awesome"
          color="red"
          onPress={() => {
            api.getUserProfile(this.state.username).then(res =>
              Object.keys(res).length === 0
                ? this.setState({ username: "", password: "" })
                : this.props.navigation.navigate("Preferences", {
                    userDetails: res
                  })
            );
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            borderRadius: 10,
            borderColor: "black",
            marginVertical: 8,
            alignItems: "center",
            borderWidth: 1,
            width: 200,
            paddingBottom: 10,
            paddingTop: 10
            // marginLeft: 29
          }}
          title="Sign Up"
          onPress={() => this.props.navigation.navigate("SignUp")}
        >
          <Text style={{ fontSize: 18, color: "white", alignItems: "center" }}>
            Not got an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    position: "absolute",
    resizeMode: "cover"
  }
});
