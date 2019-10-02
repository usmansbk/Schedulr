import React from 'react';
import { StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import walkthrough from 'i18n/walkthrough';

class Intro extends React.Component {
  
  state = {
    color: this.slides[0].backgroundColor
  };

  get slides() {
    return walkthrough(this.props.stores.settingsStore.language);
  }

  _onDone = () => {
    console.log('Navigate to Auth screen');
  };

  _onSkip = () => {
    console.log('Skip tutorial');
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
      <StatusBar backgroundColor={this.state.color} />
      <AppIntroSlider
        slides={this.slides}
        onDone={this._onDone}
        onSkip={this._onSkip}
        onSlideChange={this._onSlideChange}
        showSkipButton
        doneLabel={I18n.get("BUTTON_done")}
        nextLabel={I18n.get("BUTTON_next")}
        skipLabel={I18n.get("BUTTON_skip")}
      />
      </>
    )
  }
}

export default inject("stores")(observer(Intro));