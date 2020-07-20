import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'

import CurrentPosition from './screens/currentPosition'
import CreateRoute from './screens/createRoute'
import AddPoint from './screens/addPoint'
import EditPoint from './screens/editPoint'

const MainNavigator = createStackNavigator({
  'CurrentPosition' : CurrentPosition,
  'CreateRoute' : CreateRoute,
  'AddPoint' : AddPoint,
  'EditPoint' : EditPoint,
},{
  initialRouteName: 'CurrentPosition',
})

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  state = {
  }

  render(){
    return (
      < AppContainer />
    );
  }
}
