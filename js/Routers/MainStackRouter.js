import React, {Component} from "react";
import Login from "../components/login/";
import { StackNavigator } from "react-navigation";


export default (StackNav = StackNavigator({
  Login : {screen: Login},
}));