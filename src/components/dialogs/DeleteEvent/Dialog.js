import React from 'react';
import {View} from 'react-native';
import {inject, observer} from 'mobx-react';
import {Text} from 'react-native-paper';
import {I18n} from 'aws-amplify';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from 'components/common/Button';

class DeleteEvent extends React.Component {
  _confirmRef = (ref) => (this.confirmRef = ref);
  open = () => this.confirmRef.open();

  shouldComponentUpdate = (nextProps, nextState) =>
    nextState.loading !== this.state.loading;

  _onContinue = () => {
    const {id, navigation, deleteEvent} = this.props;
    let input = {id};
    setTimeout(() => deleteEvent(input), 200);
    navigation.goBack();
    this._handleDismiss();
  };

  _handleDismiss = () => this.confirmRef.close();

  render() {
    const {stores} = this.props;
    const styles = stores.styles.sheet;

    return (
      <RBSheet
        ref={this._confirmRef}
        height={200}
        closeOnDragDown
        customStyles={{
          container: styles.container,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View style={(styles.header, {alignItems: 'center'})}>
            <Text style={styles.title}>{I18n.get('DIALOG_deleteEvent')}</Text>
          </View>
          <View style={styles.footer}>
            <Button onPress={this._handleDismiss}>
              {I18n.get('BUTTON_dismiss')}
            </Button>
            <Button danger onPress={this._onContinue}>
              {I18n.get('BUTTON_continue')}
            </Button>
          </View>
        </View>
      </RBSheet>
    );
  }
}

export default inject('stores')(observer(DeleteEvent));
