import React, { Component } from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  Header,
  Body,
  Title,
  Right,
  Left,
  Fab,
  Icon,
  Text,
} from 'native-base';
import Firebase from 'react-native-firebase';
import Share from 'react-native-share';
import Config from 'react-native-config';
import EventList from '../../EventList';
import IconButton from '../../common/IconButton';
import styles from './styles';

class GroupScreen extends Component {
  componentDidMount = () => {
    Firebase.analytics().setCurrentScreen('group_screen');
  }

  handleShare = (group) => {
    const {
      name,
      id,
    } = group;
    const url = `${Config.APP_URL}group/${id}`
    const message = `Invitation to "${name}" group.`;
    const options = {
      title: 'Invite friend via..',
      message,
      subject: message,
      url
    }
    Share.open(options);
  }

  shouldComponentUpdate = (nextProps) => {
    return (this.props.loading !== nextProps.loading) ||
      (this.props.edges !== nextProps.edges) ||
      (this.props.group.name !== nextProps.group.name) ||
      (this.props.group.description !== nextProps.group.description);
    ;
  }

  render() {
    const {
      id,
      name,
      description,
      edges,
      toInfo,
      loading,
    } = this.props;
    
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
            <Title>{name}</Title>
            { Boolean(description) && (<Text style={styles.more} numberOfLines={1} ellipsizeMode="tail" note >{description}</Text>)}
          </Body>
          <Right>
            <IconButton
              name="share-2"
              type="Feather"
              onPress={() => this.handleShare({ name, id })}
            />
            <IconButton
              name="alert-circle"
              type="Feather"
              onPress={toInfo}
            />
          </Right>
        </Header>
        <EventList
          edges={edges}
          loading={loading}
        />
        <Fab
          position="bottomRight"
          style={{backgroundColor: '#3f51b5'}}
          onPress={this.props.onPress}
        >
          <Icon name="edit-2" type="Feather" />
        </Fab>
      </View>
    )
  }
}

export default withNavigation(GroupScreen);