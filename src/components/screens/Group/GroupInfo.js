import React, { Component } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  Header,
  Body,
  Title,
  Right,
  Left,
  Icon,
  View,
} from 'native-base';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import IconButton from '../../common/IconButton';
import Details from './Details';
import i18n from '../../../config/i18n';
import styles from './styles';

const optionWrapper = {
  paddingLeft: 16,
  paddingTop: 12,
  paddingBottom: 12,
};

const optionText = {
  fontSize: 16,
  color: 'black'
};

const DeleteModalPath = '../../../containers/modals/DeleteGroup';
const CloseModalPath = '../../../containers/modals/CloseGroup';
const OpenModalPath = '../../../containers/modals/OpenGroup';

let DeleteModal = null;
let CloseModal = null;
let OpenModal = null;

class GroupInfo extends Component {
  state = {
    visibleModal: null
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextState.visibleModal !== this.state.visibleModal ||
      nextProps.privacy !== this.props.privacy ||
      nextProps.isClosed !== this.props.isClosed ||
      nextProps.name !== this.props.name ||
      nextProps.logo !== this.props.logo ||
      nextProps.membersCount !== this.props.membersCount ||
      nextProps.description !== this.props.description ||
      nextProps.url !== this.props.url;
  }

  handleClose = () => this.setState({ visibleModal: null });

  handleSelect = (value) => {
    if (value === 'edit') {
      const id = this.props.navigation.getParam('id');
      this.props.navigation.navigate('EditGroup', { id, title: i18n.t('screens.edit_group') });
    } else {
      this.setState({ visibleModal: value })
    }
    return true;
  }

  render() {
    const {
      id,
      name,
      description,
      url,
      membersCount,
      status,
      logo,
      author,
      privacy,
      isAuthor,
      isClosed,
      createdAt
    } = this.props;

    const menuItems = [
      {text: i18n.t('menu.delete'), value: 'delete'},
      {text: i18n.t('menu.edit'), value: 'edit'}
    ];
    if (isClosed) {
      menuItems.push({
        text: i18n.t('menu.open'), value: "open"
      })
    } else {
      menuItems.push({
        text: i18n.t('menu.close'), value: "close"
      })
    }

    if (isAuthor) {
      DeleteModal = require(DeleteModalPath).default;
      OpenModal = require(OpenModalPath).default;
      CloseModal = require(CloseModalPath).default;
    }

    return (
      <View style={styles.container}>
        <Header>
          <Left>
            <IconButton
              onPress={() => this.props.navigation.pop()}
              name="arrow-left"
              type="Feather"
            />
          </Left>
          <Body>
            <Title>Group Info</Title>
          </Body>
          <Right>
            {
              isAuthor && (
                <Menu
                  onSelect={this.handleSelect}
                >
                  <MenuTrigger
                    customStyles={{
                      triggerWrapper: styles.menuButton,
                      TriggerTouchableComponent: TouchableNativeFeedback,
                      triggerTouchable: {
                        background: TouchableNativeFeedback.SelectableBackgroundBorderless()
                      }
                    }}
                  >
                    <Icon style={styles.moreIcon} name="more-vertical" type="Feather" />
                  </MenuTrigger>
                  <MenuOptions>
                    {
                      menuItems.map(item => (
                        <MenuOption
                          key={item.value}
                          text={item.text}
                          value={item.value}
                          customStyles={{
                          optionWrapper,
                          optionText
                        }}
                      />
                      ))
                    }
                  </MenuOptions>
                </Menu>
              )}
          </Right>
        </Header>
        <Details  
          id={id}
          name={name}
          description={description}
          url={url}
          membersCount={membersCount}
          status={status}
          logo={logo}
          author={author}
          privacy={privacy}
          createdAt={createdAt}
        />
        {
          isAuthor && (
            <React.Fragment>
              <CloseModal
                id={id}
                name={name}
                isVisible={this.state.visibleModal === 'close'}
                handleClose={this.handleClose}
              />
              <OpenModal
                id={id}
                name={name}
                isVisible={this.state.visibleModal === 'open'}
                handleClose={this.handleClose}
              />
              <DeleteModal
                id={id}
                name={name}
                isVisible={this.state.visibleModal === 'delete'}
                handleClose={this.handleClose}
              />
            </React.Fragment>
          )
        }
      </View>
    )
  }
}

export default withNavigation(GroupInfo);