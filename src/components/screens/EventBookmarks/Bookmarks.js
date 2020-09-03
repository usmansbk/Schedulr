import React from 'react';
import {Appbar} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import List from './ListHoc';
import Suspense from 'components/common/Suspense';

class Bookmarks extends React.Component {
  state = {
    display: false,
  };

  componentDidMount = () => {
    setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
  };

  render() {
    if (!this.state.display) return <Suspense />;
    const {id, goBack, isOwner, stores} = this.props;

    return (
      <>
        <Appbar style={stores.styles.appStyles.header}>
          <Appbar.Action
            animated={false}
            color={stores.theme.colors.primary}
            size={24}
            onPress={goBack}
            icon={({color, size}) => (
              <Icon name="arrow-left" color={color} size={size} />
            )}
          />
          <Appbar.Content
            title={I18n.get('BOOKMARKED_BY')}
            titleStyle={stores.styles.appStyles.headerColor}
          />
        </Appbar>
        <List id={id} isOwner={isOwner} />
      </>
    );
  }
}

export default inject('stores')(observer(Bookmarks));
