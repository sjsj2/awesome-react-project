// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
//
// import React, { Component } from 'react';
// import {
//   // AppRegistry,
//   Button,
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
//
// export default class App extends Component<{}> {
//
//   render() {
//     return (
//       // <View style={styles.container}>
//       //   <Text style={styles.welcome}>
//       //     Welcome to React Native!
//       //   </Text>
//       //   <Text style={styles.instructions}>
//       //     To get started, edit App.js
//       //   </Text>
//       //   <Text style={styles.instructions}>
//       //     {instructions}
//       //   </Text>
//       // </View>
//       <Text style={styles.instructions}> {instructions}
//       </Text>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
// import { StackNavigator } from 'react-navigation';
//
// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Welcome',
//   };
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <View>
//         <Text>Hello, Chat App!</Text>
//         <Button
//           onPress={() => navigate('Chat')}
//           title="Chat with Lucy"
//         />
//       </View>
//     );
//   }
// }
//
// class ChatScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Chat with Lucy',
//   };
//   render() {
//     return (
//       <View>
//         <Text>Chat with Lucy</Text>
//       </View>
//     );
//   }
// } 
// export const SimpleApp = StackNavigator({
//   Home: { screen: HomeScreen },
//   Chat : {screen : ChatScreen}
// });
//
// export default class App extends React.Component {
//   render() {
//     return <SimpleApp />;
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
import React, {Component} from "react";
import {StyleSheet} from "react-native";
import MainStackRouter from "./Routers/MainStackRouter";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <MainStackRouter />;
  }
}