import React from 'react';
import {Appbar} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import Icon from 'components/common/Icon';
import {I18n} from 'aws-amplify';
import Album from './Album';

class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  _openViewer = (id, key) =>
    this.props.navigation.navigate('AlbumViewer', {id, key});

  render() {
    const {stores} = this.props;
    const styles = stores.styles.appStyles;
    const colors = stores.theme.colors;
    const id = this.props.navigation.getParam('id');
    return (
      <>
        <Appbar.Header collapsable style={styles.header}>
          <Appbar.Action
            onPress={this._goBack}
            color={colors.primary}
            size={24}
            icon={({size, color}) => (
              <Icon name="arrow-left" size={size} color={color} />
            )}
          />
          <Appbar.Content
            titleStyle={styles.headerColor}
            title={I18n.get('TEXT_album')}
          />
        </Appbar.Header>
        <Album id={id} navigateToViewer={this._openViewer} />
      </>
    );
  }
}

export default inject('stores')(observer(Screen));
