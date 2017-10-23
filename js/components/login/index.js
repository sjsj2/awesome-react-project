import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";
import { reduxForm, Field } from 'redux-form';
import { Alert,TextInput, View, ScrollView, Text,TouchableOpacity,button } from 'react-native';
import firebase from 'react-native-firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail : '',
      inputPW : '',
      isAuthenticated: false,
      user : null,
    };
    this.myTextInput = this.myTextInput.bind(this);
    this.loginWithEmail = this.loginWithEmail.bind(this);
  }

  componentDidMount() {
  }
  loginWithGoogle() {
    const cred = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
    );
  }
  loginWithEmail() {
    firebase.auth().signInWithEmailAndPassword(this.state.inputEmail,this.state.inputPW)
      .then((confirmResult)=>{
        if(confirmResult._auth.authenticated) {
          console.log(confirmResult);
          // this.state = {
          //   isAuthenticated : true,
          //   user : confirmResult._user,
          //   inputEmail : '',
          //   inputPW : ''
          // }
        }
      })
      .catch(error =>{console.log(error);})
  }
  myTextInput({input,inputProps}) {
    return (
      <View style = {{width :300}}>
        <TextInput
          {...inputProps}
          onChangeText={input.name === 'Password' ? (text) => this.setState({inputPW : text}) : (text) => this.setState({inputEmail : text}) }
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.name === 'Password' ? this.state.inputPW : this.state.inputEmail}
        secureTextEntry = {input.name === 'Password' ? true : false}
          />
      </View>
    )
  }
  render() {
    // if (!this.state.isAuthenticated) {
    //   return (<View keyboardShouldPersistTaps={'handled'} style = {{flexDirection: 'column',flex : 1}}>
    //     <Text style={{fontWeight:'bold', fontSize:30, textAlign:'center'}}>Fail Auth</Text>
    //
    //   </View>);
    // }
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
            <TouchableOpacity onPress={this.loginWithEmail} style = {{backgroundColor: 'skyblue', width:85, }}>
              <Text style = {{fontSize:25}}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{backgroundColor: 'skyblue', width:85, left : 10}}>
              <Text style = {{fontSize:25}}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <View style = {{flexDirection: 'row',flex : 1, alignItems: 'center'}}>
          <TouchableOpacity style = {{backgroundColor: 'skyblue', width:300, left : 10}}>
            <Text style = {{fontSize:25}}>Login with Google</Text>
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
