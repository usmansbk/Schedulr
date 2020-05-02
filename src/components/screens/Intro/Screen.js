import React from 'react';
import { StatusBar, View, StyleSheet, Image } from 'react-native';
import { Text, Headline } from 'react-native-paper';
import AppIntroSlider from 'react-native-app-intro-slider';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import colors from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 86,
    paddingHorizontal: 20
  },
  titleStyle: {
    fontWeight: 'bold',
    color: colors.white
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.white
  },
  activeDotStyle: {
    backgroundColor: colors.primary_dark
  },
  buttonTextStyle: {
    color: colors.primary_dark
  }
});

class Intro extends React.Component {
  
  state = {
    color: this.slides[0].backgroundColor
  };

  get slides() {
    return I18n.get('walkthrough');
  }

  _renderItem = ({ item }) => {
    return (
      <View style={[styles.container, { backgroundColor: item.backgroundColor}]}>
        <Headline style={styles.titleStyle}>{item.title}</Headline>
        <Image source={item.image} resizeMode="contain" style={{width: 320, height: 320}} />
        <Text style={styles.textStyle}>{item.text}</Text>
      </View>
    )
  }
  _onDone = () => {
    this.props.stores.appState.togglePref('showAppIntro');
    this.props.navigation.navigate('AuthLoading');
  };

  _onSlideChange = (index) => {
    const currentPage = this.slides[index];
    this.setState({
      color: currentPage.backgroundColor
    });
  };

  render() {
    return (
      <>
      <StatusBar hidden />
      <AppIntroSlider
        data={this.slides}
        onDone={this._onDone}
        onSkip={this._onDone}
        showSkipButton
        renderItem={this._renderItem}
        onSlideChange={this._onSlideChange}
        doneLabel={I18n.get("BUTTON_done")}
        nextLabel={I18n.get("BUTTON_next")}
        skipLabel={I18n.get("BUTTON_skip")}
      />
      </>
    )
  }
}

export default inject("stores")(observer(Intro));