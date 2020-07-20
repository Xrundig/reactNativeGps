import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native'


export default class CurrentPosition extends React.Component {
  state = {
    initialPosition: "",
    currentPosition: "",
    time: "",
    heading: "",
    longitude: "",
    latitude: "",
    speed: "",
    accuracy: "",
  }
  addZero = value => {
    return 0 + value.toString();
  }
  convertDeg = (value, type) => {
    const valueString = value.toString();
    const positive = valueString > 0 ? true : false;
    const dotIndexLong = valueString.indexOf('.');
    const valueDeg = valueString.slice(0, dotIndexLong);
    const valueFraction = 0+valueString.slice(dotIndexLong);
    const valueMinsAll = valueFraction*60;
    const valueMins = Math.floor(valueMinsAll);
    const valueSeconds = Math.round((valueMinsAll - valueMins)*60);
    const letter = this.addLetter(type, positive);
    return `${valueDeg}° ${valueMins}' ${valueSeconds}" ${letter}`
  }
  addLetter = (type, positive) => {
    if( type === "longitude" && positive){
      return 'E'
    }
    if( type === "longitude"){
      return 'W'
    }
    if( type === "latitude" && positive){
      return 'N'
    }
    if( type === "latitude"){
      return 'S'
    }
  }
  roundOne = value => {
    const valueString = value.toString()
    const dotIndex = valueString.indexOf('.');
    return valueString.slice(0, dotIndex+2);
  }

  calculateDate = position => {

    //Time
    const time = new Date(+position.timestamp);
    const date = time.getDate() < 10 ? this.addZero(time.getDate()) : time.getDate();
    const month = time.getMonth() < 10 ? this.addZero(time.getMonth()) : time.getMonth();
    const year = time.getFullYear();
    const hours = time.getHours() < 10 ? this.addZero(time.getHours()) : time.getHours();
    const minutes = time.getMinutes() < 10 ? this.addZero(time.getMinutes()) : time.getMinutes();
    const seconds = time.getSeconds() < 10 ? this.addZero(time.getSeconds()) : time.getSeconds();

    //Heading
    const heading = this.roundOne(position.coords.heading);
    //Speed
    const speed = this.roundOne(position.coords.speed);
    //Accuracy
    const accuracy = this.roundOne(position.coords.accuracy);

    //Position
    const longitude = this.convertDeg(position.coords.longitude, 'longitude');
    const latitude = this.convertDeg(position.coords.latitude, 'latitude');


    this.setState({
      time: `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`,
      heading: `${heading}°`,
      longitude: longitude,
      latitude: latitude,
      speed: speed,
      accuracy: `${accuracy}m`,
     });
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
      position  => {
        this.calculateDate(position);
       },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }

    watchCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition(
        position  => {
          const initialPosition = JSON.stringify(position);
          this.setState({ initialPosition })
         },
        error => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition(
          position => {
            this.calculateDate(position);
            const currentPosition = JSON.stringify(position);
            this.setState({ currentPosition })
          },
          error => alert(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1}
        );
    }

    stopWatchCurrentPosition = () => {
      navigator.geolocation.clearWatch(this.watchID);
    }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.indicator}>{this.state.time}</Text>
        <Text style={styles.indicator}>HDG : {this.state.heading}</Text>
        <Text style={styles.indicator}>Lat. : {this.state.latitude}</Text>
        <Text style={styles.indicator}>Long. : {this.state.longitude}</Text>
        <Text style={styles.indicator}>SPD : {this.state.speed}</Text>
        <Text style={styles.indicator}>ACC : {this.state.accuracy}</Text>
        <TouchableOpacity onPress={this.watchCurrentPosition} style={styles.button}>
          <Text>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.stopWatchCurrentPosition} style={styles.button}>
          <Text>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress= {() => this.props.navigation.navigate('CreateRoute')} style={styles.button}>
          <Text>Create route</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // flex: 1,
    backgroundColor: '#474a51',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  // block: {
  //   borderColor: 'green',
  //   borderWidth: 2,
  // },
  button : {
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
  },
  indicator : {
    paddingTop: 10,
    paddingBottom: 10,
    color: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    textAlign: 'center',
    borderColor: '#8fae15',
    borderWidth: 2,
    // fontFamily: "Lato-Regular",
  }
});
