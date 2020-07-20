import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'

import AddPoint from './screens/addPoint.js'
import store from './uxFolder/store.js'
import {deleteRoute, deleteWaypoint, editWaypoint} from './uxFolder/actions.js'

class Waypoint extends React.Component{

  render(){
    // const waypoints = store.getState().waypoint;
    const waypoints = this.props.waypoint;
    return (
      <View style = {styles.mainBlock}>
      {
        Object.keys(waypoints).map((waypoint, i) => {
          return (
            <View key = {i} style = {styles.waypointBlock}>
              <Text style={styles.waypointText}>WP {i + 1}</Text>
              <View style = {styles.blockLine}>
                <Text style={styles.waypointText}>Latitude: {waypoints[waypoint].latitudeDeg} °
                                {waypoints[waypoint].latitudeMin} '
                                {waypoints[waypoint].latitudeDir}
                </Text>
                <Text style = {{marginLeft: 10, color: 'white',}}>Longitude: {waypoints[waypoint].longitudeDeg} °
                                                             {waypoints[waypoint].longitudeMin} '
                                                             {waypoints[waypoint].longitudeDir}
                </Text>
              </View>
              <View style = {styles.blockLine}>
                <TouchableOpacity style = {styles.button}  onPress = {() =>  store.dispatch(deleteWaypoint(i)) }>
                  <Text>Delete Waypoint</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button} onPress = {() => this.props.edit(i)}>
                  <Text>Edit Waypoint</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })
      }
      <TouchableOpacity style = {styles.button} onPress={()=> store.dispatch(deleteRoute())}>
        <Text>Delete route</Text>
      </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainBlock: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    color: 'white',
    width: '100%',
  },
  waypointBlock: {
    justifyContent: 'flex-start',
    marginBottom: 10,
    width: '100%',
  },
  blockLine: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  waypointText: {
    color: 'white',
  },
  button : {
    marginTop: 5,
    marginRight: 10,
    backgroundColor: "rgb(200,200,200)",
    padding: 10,
  },
})

const mapStateToProps = (state) => {
  return {
    waypoint: state.waypoint,
  }
}


export default connect(mapStateToProps)(Waypoint)
