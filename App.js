import React from "react";
import Navigator from './routes/Stack';
import * as Font from 'expo-font';
import { enableScreens } from 'react-native-screens';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      fontsLoaded: false,
      user: null,
      initializing: true,
    }
  }

  async componentDidMount() {
    enableScreens();
    await Font.loadAsync({
      'Inter-Regular': require('./assets/fonts/Inter/static/Inter-Regular.ttf'),
      'Days': require('./assets/fonts/DaysSans/days.ttf'),
      'Days-Sans': require('./assets/fonts/DaysSans/dayssansblack.ttf')
    });
    this.setState({ fontsLoaded: true });
  }

  render() {
    if (!this.state.fontsLoaded) {
      return null;
    }
    return <Navigator />


  }
}