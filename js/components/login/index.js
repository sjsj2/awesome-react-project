import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";
import { reduxForm, Field } from 'redux-form';
import { NativeModules, StyleSheet, Alert,TextInput, View, ScrollView, Text,TouchableOpacity,button } from 'react-native';
import firebase from 'react-native-firebase';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
const { RNGoogleSignin } = NativeModules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',flexDirection: 'row'
  },
});
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail : '',
      inputPW : '',
      isAuthenticated: "false",
      user : null,
    };
    this.myTextInput = this.myTextInput.bind(this);
    this.loginWithEmail = this.loginWithEmail.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithTest = this.loginWithTest.bind(this);
  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes : ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/user.birthday.read", "https://www.googleapis.com/auth/contacts"],
      webClientId : '833185333176-6khvc5to53hqeegui33pdlsdso2uco39.apps.googleusercontent.com',
      offlineAccess : false
    })
    .then(() => {
      GoogleSignin.currentUserAsync().then((user) => {
        console.log('USER : ', user);
        if(user) {
          this.setState({isAuthenticated : "google", user: user});
          this.props.navigation.navigate("Home",{isAuthenticated : this.state.isAuthenticated, user : this.state.user});
        }
      }).done();
    });
    // NativeModules.FirebaseGoogleAuth.setConfigure();
  }
  loginWithTest() {
    // NativeModules.FirebaseGoogleAuth.getAccessToken().then((user)=>{
    //   console.log('test'+user);
    // });
  }
  loginWithGoogle() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.setState({isAuthenticated : "google", user: user});
      // const cred = firebase.auth.GoogleAuthProvider.credential(
      //     user.idToken,
      //     user.accessToken,
      // );
      this.props.navigation.navigate("Home",{isAuthenticated : this.state.isAuthenticated, user : this.state.user});
      // firebase.auth().signInWithCredential(cred).then(()=>{
      //   console.log('firebase login');
      // }).catch(error=>{console.log('firebase error');})
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }
  loginWithEmail() {
    firebase.auth().signInWithEmailAndPassword(this.state.inputEmail,this.state.inputPW)
      .then((confirmResult)=>{
        if(confirmResult._auth.authenticated) {
          console.log(confirmResult);
          this.setState({
            isAuthenticated : "email",
            user : confirmResult._user,
            inputEmail : '',
            inputPW : ''
          });
          this.props.navigation.navigate("Home",{isAuthenticated : this.state.isAuthenticated, user : this.state.user});
        }
      })
      .catch(error =>{this.props.navigation.navigate("Home",{isAuthenticated : this.state.isAuthenticated, user : this.state.user});console.log(error);})
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
    // if (this.state.isAuthenticated) {
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
            <TouchableOpacity onPress={this.loginWithTest} style = {{backgroundColor: 'skyblue', width:85, }}>
              <Text style = {{fontSize:25}}> Test</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <GoogleSigninButton style={{width: 312, height: 48}} color={GoogleSigninButton.Color.Light} size={GoogleSigninButton.Size.Wide} onPress={this.loginWithGoogle}/>
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
