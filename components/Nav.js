import React from 'react';
import { Icon, Header } from 'react-native-elements';
import { Image } from 'react-native';

export default class Nav extends React.Component {
  render() {
    return (
      <>
        <Header
          title="drawer"
          placement="left"
          leftComponent={
            <Image
              source={require('../assets/cityscape.png')}
              style={{ height: 24, width: 24 }}
            />
          }
          centerComponent={{
            text: 'Day Tripper',
            style: {
              color: '#fff',
              fontFamily: 'KohinoorDevanagari-Semibold',
              fontSize: 22,
            },
          }}
          rightComponent={
            <Icon
              name="menu"
              color="white"
              onPress={() => this.props.openDrawer()}
            />
          }
          outerContainerStyles={{
            backgroundColor: 'rgb(0, 112, 149)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        />
      </>
    );
  }
}
