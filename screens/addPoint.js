import React from 'react'

import HandlePoint from '../handlePoint.js'

export default class AddPoint extends React.Component{

  render(){
    const open = () => this.props.navigation.navigate('CreateRoute')
    const action = 'add';
    return(
      <HandlePoint
        open = {open}
        action = {action}
      />
    )
  }
}
