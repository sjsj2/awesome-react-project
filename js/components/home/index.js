import React, { Component } from "react";
import { connect } from "react-redux";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {View, Text, TouchableOpacity} from "react-native";
import PropTypes from 'prop-types';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import firebase from 'react-native-firebase';

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  // static propTypes = {
  //   isAuthenticated : PropTypes.bool
  // };
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    const {state} = this.props.navigation;
    if(state.params.isAuthenticated === "email") {
      console.log("email");
      firebase.auth().signOut()
      .then((state)=>{
        console.log(state);
        this.props.navigation.navigate("Login");
      }) 
      .catch((err)=>{console.log(err);})
    }else if(state.params.isAuthenticated === "google"){
      console.log("google");
      GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
        this.props.navigation.navigate("Login");
      })
      .done();
    }else {
      console.log("else");
    }
  }

  render() {
    // const {props : {isAuthenticated}} = this;
    const {state} = this.props.navigation;
    if(state.params) {
      return (
        <View>
          <Text>{state.params.isAuthenticated}</Text>
          <Text>email : {state.params.user.email}</Text>
          <Text>LOGIN OK</Text>
          <TouchableOpacity onPress={this.logout} style = {{backgroundColor: 'skyblue', width:85, left : 10}}>
            <Text style = {{fontSize:25}}>Logout</Text>
          </TouchableOpacity>
        </View>
      )
    }else {
      return (
        <View>
          <Text>Fail</Text>
        </View>
      )
    }

  }
}
// const mapStateToProps = state => ({
//   isAuthenticated: state.isAuthenticated,
// });
export default Home;
// export default connect(mapStateToProps)(Home);

