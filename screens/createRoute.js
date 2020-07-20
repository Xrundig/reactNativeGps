import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import { Provider } from 'react-redux'

import Waypoint from '../waypoint.js'
import {waypoints} from './addPoint.js'
import store from '../uxFolder/store.js'
import {saveNumber} from '../uxFolder/actions.js'

export default class CreateRoute extends React.Component {
  state = {
    test: false
  }

  render (){
    const edit = (number) => {
      store.dispatch(saveNumber(number));
      this.props.navigation.navigate('EditPoint');
    }

    const waypoints = store.getState().waypoint;
    return(
      <View style = {styles.routeBlock}>
        <Provider store = {store}>
          <Waypoint edit={edit}/>
        </Provider>
        <View >
          <TouchableOpacity onPress = {() => this.props.navigation.navigate('AddPoint')} style={styles.button}>
            <Text>Add Point</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => this.props.navigation.navigate('CurrentPosition')} style={styles.button}>
            <Text>Current</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  routeBlock: {
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    backgroundColor: '#474a51',
  },
  button : {
    marginTop: 20,
    backgroundColor: "rgb(200,200,200)",
    padding: 10,
  },
})
