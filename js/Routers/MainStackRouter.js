import React, {Component} from "react";
import Login from "../components/login/";
import Home from "../components/home/";
import { StackNavigator } from "react-navigation";

export default (StackNav = StackNavigator({
  Login : {screen: Login},
  Home : {screen: Home},
}));