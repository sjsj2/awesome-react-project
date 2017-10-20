import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";
import { reduxForm, Field } from 'redux-form';
import { TextInput, View, ScrollView, Text,TouchableOpacity,button } from 'react-native';
class Login extends Component {
  constructor(props) {
    super(props);
    this.myTextInput = this.myTextInput.bind(this);
  }
  myTextInput({input,inputProps}) {
    return (
      <View style = {{width :300}}>
        <TextInput
          {...inputProps}
          onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        secureTextEntry = {input.name === 'Password' ? true : false}
          />
      </View>
    )
  }
  render() {
    return ( 
      <View keyboardShouldPersistTaps={'handled'} style = {{flexDirection: 'column',flex : 1}}>
        <Text style={{fontWeight:'bold', fontSize:30, textAlign:'center'}}>Login</Text>
          <View style = {{flexDirection: 'row',flex : 1, alignItems: 'center'}}>
            <Text style = {{fontSize:15, flex:3}}>Email</Text>
            <Field style={{flex:6}} name="Email" component={this.myTextInput}/>
            <View style={{flex:1}}></View>
          </View>
          <View style = {{flexDirection: 'row',flex : 1, alignItems: 'center'}}>
            <Text style = {{fontSize:15,flex : 3}}>Password</Text>
            <Field style={{flex:6}}  name="Password" component={this.myTextInput}/>
            <View style={{flex:1}}></View>
          </View>
          <View style = {{flexDirection: 'row',flex :1, alignItems: 'center'}}>
            <TouchableOpacity style = {{backgroundColor: 'skyblue', width:85 }}>
              <Text style = {{fontSize:25}}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:6}}>
          </View>
      </View>
    )
  }
}
const LoginForm = reduxForm({form : "test"})(Login);
LoginForm.navigationOptions = {
  header: null
};
export default LoginForm;
