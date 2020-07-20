import React from 'react'
import {ScrollView, View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, Picker} from 'react-native'


import store from './uxFolder/store.js'
import {addWaypoint, editWaypoint} from './uxFolder/actions.js'


export default class HandlePoint extends React.Component{
  state={
    name: "",
    latitudeDeg: this.props.latitudeDeg,
    latitudeMin: this.props.latitudeMin,
    latitudeDir: this.props.latitudeDir || 'N',
    longitudeDeg: this.props.longitudeDeg,
    longitudeMin: this.props.longitudeMin,
    longitudeDir: this.props.longitudeDir || 'E',
    isReady: false,
    waypoints: [],
    test: 'true',
  }


  getHandler = key => val => {
    this.setState({ [key] : val });
  }

  checkLatitudeDeg = () => {
    let value = this.state.latitudeDeg;
    if(value){
      let dotIndex = value.indexOf('.');
      if( value.indexOf('.') !== -1 ){
        value = value.slice(0, dotIndex);
        this.setState({ latitudeDeg : value });
      }
      if ( value < 0 ){
        this.setState({ latitudeDeg : '0' });
      }
      if (value > 90){
        this.setState({ latitudeDeg : '90' });
      }
    }
  }

  checkLongitudeDeg = () => {

    let value = this.state.longitudeDeg;
    if(value){
      let dotIndex = value.indexOf('.');
      if( value.indexOf('.') !== -1 ){
        value = value.slice(0, dotIndex);
        this.setState({ longitudeDeg : value });
      }
      if ( value < 0 ){
        this.setState({ longitudeDeg : '0' });
      }
      if (value > 90){
        this.setState({ longitudeDeg : '180' });
      }
    }
  }

  checkLatitudeMin = () => {
    let value = +this.state.latitudeMin;
    if (value < 0 || this.state.latitudeDeg === '90'){
      this.setState({ latitudeMin : '0.00' });
      return
    }
    if (value > 59.99){
      this.setState({ latitudeMin : '59.99' });
      return
    }
    if(value){
      value = value.toFixed(2);
      this.setState({ latitudeMin : value });
    }
  }

  checkLongitudeMin = () => {
    let value = +this.state.longitudeMin;
    if (value < 0 || this.state.longitudeDeg === '180'){
      this.setState({ longitudeMin : '0.00' });
      return
    }
    if (value > 59.99){
      this.setState({ longitudeMin : '59.99' });
      return
    }
    if(value){
      value = value.toFixed(2);
      this.setState({ longitudeMin : value });
    }
  }

  addHundred = action => {
    let valueLat = (+this.state.latitudeMin).toFixed(2);
    let valueLong = (+this.state.longitudeMin).toFixed(2);
    this.setState({ longitudeMin: valueLong});
    this.setState({ longitudeMin: valueLat});
    this.setState({ isReady : true });
    setTimeout(() => this.handleSubmit(action), 0);
  }


  handleSubmit = action => {
    if(this.state.longitudeDeg && this.state.longitudeMin  &&
      this.state.latitudeDeg && this.state.latitudeMin){
          if(action === 'add'){
            store.dispatch(addWaypoint({
             latitudeDeg: `${this.state.latitudeDeg}`,
             latitudeMin: `${this.state.latitudeMin}`,
             latitudeDir: `${this.state.latitudeDir}`,
             longitudeDeg: `${this.state.longitudeDeg}`,
             longitudeMin: `${this.state.longitudeMin}`,
             longitudeDir: `${this.state.longitudeDir}`,
           }));
          }
          if(action === 'edit'){
            store.dispatch(editWaypoint({
              latitudeDeg: `${this.state.latitudeDeg}`,
              latitudeMin: `${this.state.latitudeMin}`,
              latitudeDir: `${this.state.latitudeDir}`,
              longitudeDeg: `${this.state.longitudeDeg}`,
              longitudeMin: `${this.state.longitudeMin}`,
              longitudeDir: `${this.state.longitudeDir}`,
           }));
          }
        this.props.open();
      }
      else{
        alert('Please fulfill the fileds');
      }
  }

  render(){
    return(
      <KeyboardAvoidingView style= {styles.form}>
        <View style= {styles.formline}>
          <TextInput
            value = {this.state.latitudeDeg}
            keyboardType = {'numeric'}
            placeholder = "45"
            style = {styles.input}
            onBlur = {this.checkLatitudeDeg}
            onChangeText = {this.getHandler('latitudeDeg')}
          />
          <Text> °</Text>
          <TextInput
            value = {this.state.latitudeMin}
            keyboardType = {'numeric'}
            placeholder = "25.08"
            style = {styles.input}
            onBlur = {this.checkLatitudeMin}
            onChangeText = {this.getHandler('latitudeMin')}
          />
          <Text> '</Text>
          <View style = {styles.select}>
            <Picker
              selectedValue = {this.state.latitudeDir}
              onValueChange = {latitudeDir => this.setState({ latitudeDir })}
              mode = 'dialog'
              itemStyle = {styles.selectItem}
            >
              <Picker.Item label = "N" value = "N"/>
              <Picker.Item label = "S" value = "S"/>
            </Picker>
          </View>

        </View>

        <View style= {styles.formline}>
          <TextInput
            value = {this.state.longitudeDeg}
            keyboardType = {'numeric'}
            placeholder = "30"
            style = {styles.input}
            onBlur = {this.checkLongitudeDeg}
            onChangeText = {this.getHandler('longitudeDeg')}
          />
          <Text> °</Text>
          <TextInput
            value = {this.state.longitudeMin}
            keyboardType = {'numeric'}
            placeholder = "43.18"
            style = {styles.input}
            onBlur = {this.checkLongitudeMin}
            onChangeText = {this.getHandler('longitudeMin')}
          />
          <Text> '</Text>
          <View style = {styles.select}>
            <Picker
              selectedValue = {this.state.longitudeDir}
              onValueChange = {longitudeDir => this.setState({ longitudeDir })}
              mode = 'dialog'
              itemStyle = {styles.selectItem}
            >
              <Picker.Item label = "E" value = "E"/>
              <Picker.Item label = "W" value = "W"/>
            </Picker>
          </View>

        </View>

        <TouchableOpacity
          style = {styles.button}
          onPress = {() => this.addHundred(this.props.action)}
        >
          <Text>{this.props.action === 'add' ? 'Add' : 'Edit'} point</Text>
        </TouchableOpacity>


      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    height: 250,
  },
  formline: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 70,
    marginLeft: 5,
    textAlign: 'center',
    fontSize: 22,
  },
  select: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 5,
  },
  button : {
    marginTop: 20,
    backgroundColor: "rgb(200,200,200)",
    padding: 10,
  },
  error : {
    borderColor: 'red',
  }
})
