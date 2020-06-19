import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NavHeader from '../Components/NavHeader';
import LaunchScreen from "../Containers/LaunchScreen";
import MenuScreen from "../Containers/MenuScreen";
import ProfileScreen from "../Containers/ProfileScreen";

const Stack = createStackNavigator();

let screenOptions = {
  animationEnabled: false,
  header: ({scene, previous, navigation}) => {
    const {options} = scene.descriptor;
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;

    return (
      <NavHeader
        title={title}
        previous={previous}
        scene={scene}
        navigation={navigation}
      />
    );
  },
};
export default class DemoNav extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Launch"
          component={LaunchScreen}
          options={{...screenOptions, headerTitle: 'Demo'}}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{...screenOptions, headerTitle: 'Menu'}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{...screenOptions, headerTitle: 'Profile'}}
        />
      </Stack.Navigator>
    );
  }
}
