import React from 'react'

import HandlePoint from '../handlePoint.js'
import store from '../uxFolder/store.js'

export default class AddPoint extends React.Component{

  render(){
    const open = () => this.props.navigation.navigate('CreateRoute')
    const waypoint = (store.getState().waypoint).find(wp => wp.edit === "true")
    console.warn(waypoint);
    const action = 'edit';
    return(
      <HandlePoint
        open = {open}
        action = {action}
        latitudeDeg = {waypoint.latitudeDeg}
        latitudeMin = {waypoint.latitudeMin}
        latitudeDir = {waypoint.latitudeDir}
        longitudeDeg = {waypoint.longitudeDeg}
        longitudeMin = {waypoint.longitudeMin}
        longitudeDir = {waypoint.longitudeDir}
      />
    )
  }
}
