import React from 'react';
import {
  Content,
  Item,
  Left,
  Right,
  Text,
  Input,
  Button,
} from 'native-base';
import {
  Switch,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import styles from './styles';
import {
  MAX_NAME_LEN,
  GROUP_DESC_LEN
} from '../../../lib/constants';
import i18n from '../../../config/i18n';

export default class Form extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = this._default()
  }

  _default = () => ({
    name: this.props.initialName || '',
    description: this.props.initialDescription || '',
    url: this.props.initialUrl || '',
    privacy: this.props.initialPrivacy || 'PUBLIC',
    communityId: this.props.communityId,
  });

  handleCheck = (value) => {
    const privacy = value ? 'PRIVATE' : 'PUBLIC';
    this.setState({ privacy })
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value })
  }

  onTextChange = (name, value) => {
    const len = value.length;
    if (name === 'name' && len > MAX_NAME_LEN) {
      ToastAndroid.show(i18n.t('input.warn_51'), ToastAndroid.SHORT);
      return;
    }
    if (value.length < GROUP_DESC_LEN) {
      this.setState({ [name]: value });
    } else {
      ToastAndroid.show(i18n.t('input.warn'), ToastAndroid.SHORT);
    }
  }

  _onReset = () => {
    this.setState(this._default(), () => ToastAndroid.show(i18n.t('toast.form_reset'), ToastAndroid.SHORT));
  }

  handleSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  render() {
    const { name, description, url, privacy } = this.state;
    const isPrivate = privacy === 'PRIVATE';
    const { loading } = this.props;

    return (
      <Content
        padder
        refreshControl={<RefreshControl refreshing={loading} onRefresh={this._onReset} />}
      >
        <Item style={styles.spacing}>
          <Input
            value={name}
            onChangeText={(value) => this.onTextChange('name', value)}
            placeholder={i18n.t('group.name')}
          />
        </Item>

        <Item style={styles.spacing}>
          <Input
            value={description}
            onChangeText={(value) => this.onTextChange('description', value)}
            placeholder={i18n.t('group.description')} />
        </Item>
        
        <Item style={styles.spacing}>
          <Input
            dataDetectorTypes="link"
            value={url}
            onChangeText={(value) => this.onTextChange('url', value)}
            placeholder="URL"
          />
        </Item>

        <Item style={[styles.spacing, styles.checkbox]}>
          <Left>
            <Text style={styles.text}>{i18n.t('group.private')}</Text>
          </Left>
          <Right>
            <Switch
              value={isPrivate}
              onValueChange={this.handleCheck}
            />
          </Right>
        </Item>
        <Button
          bordered
          rounded
          block
          disabled={loading || !name}
          onPress={this.handleSubmit}
          style={styles.spacing}
        >
          <Text uppercase={false}>Submit</Text>
        </Button>
      </Content>
    )
  }
}