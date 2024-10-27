import React from "react";
import { StatusBar } from "react-native";

import Tabs from './src/screens/bottomNavigation/Tabs';

import { GlobalStyles } from "./src/styles/Colours";

function App() {
  return (
    <>
      <StatusBar backgroundColor={GlobalStyles.colours.gray200} barStyle={'dark-content'} />
      <Tabs />
    </>
  );
}


export default App;
