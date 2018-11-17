import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Text,
  Card,
  CardItem,
  Icon,
  H1,
  H3,
  Container,
  Content
} from 'native-base';
import moment from 'moment';
import { withNavigation } from 'react-navigation';
import Hyperlink from 'react-native-hyperlink';
import UserAvatar from '../../common/UserAvatar';
import PhotoUpload from '../../common/PhotoUpload';
import { decapitalize } from '../../../lib/capitalizr';
import i18n from '../../../config/i18n';
import styles from './styles';

const FORMAT = 'MMM Do YYYY, hh:mm a';

class Details extends Component {
  shouldComponentUpdate = (nextProps) => {
    return nextProps.name !== this.props.name ||
      nextProps.description !== this.props.description ||
      nextProps.logo !== this.props.logo ||
      nextProps.privacy !== this.props.privacy ||
      nextProps.status !== this.props.status ||
      nextProps.membersCount !== this.props.membersCount ||
      nextProps.url !== this.props.url;
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
      createdAt
    } = this.props;

    const createdAtTime = moment(Date.parse(createdAt)).format(FORMAT);

    return (
      <Container>
        <Content>
          <Card transparent>
            <CardItem>
            <View style={{
              flexGrow: 1,
              alignItems: 'center'
            }}>
              <PhotoUpload id={id} name={name} logo={logo} />
              <H1 style={styles.title}>{name}</H1>
            </View>
            </CardItem>
            <CardItem
              button
              onPress={() => this.props.navigation.navigate('Members', { id, name })}
            >
              <Icon style={styles.icon} name="users" type="Feather" />
              <Text style={styles.bold}>{membersCount} member{membersCount > 1 ? 's' : '' }</Text>
            </CardItem>
            <CardItem>
              <Icon style={styles.icon} name="lock" type="Feather" />
              <Text style={styles.bold}>{decapitalize(status)}</Text>
            </CardItem>
            <CardItem>
              <Icon style={styles.icon} name="eye" type="Feather" />
              <Text style={styles.bold}>{decapitalize(privacy)}</Text>
            </CardItem>
            {
              Boolean(url) && (
                <CardItem>
                  <Icon style={styles.icon} name="link" type="Feather" />
                  <Hyperlink linkDefault={true}>
                    <Text>{url}</Text>
                  </Hyperlink>
                </CardItem>
              )
            }
            <CardItem>
              <Text style={styles.bold}>{i18n.t('group.createdOn')} {createdAtTime}</Text>
            </CardItem>
            <CardItem style={styles.author}>
              <UserAvatar rounded name={ author.name } src={author.photo} size={40} />
              <Text style={styles.authorText} note>{ author.name }</Text>
            </CardItem>
            {
              Boolean(description) && (
                <CardItem>
                  <View>
                    <H3
                      style={styles.about}
                    >
                    {
                      i18n.t('group.about')
                    }
                    </H3>
                    <Text style={styles.bold}>{description}</Text>          
                  </View>
                </CardItem>
              )
            }
          </Card>
        </Content>
      </Container>
    )
  }
}

export default withNavigation(Details);