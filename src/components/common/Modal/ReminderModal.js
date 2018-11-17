import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import {
  CheckBox,
  Text,
  Item,
  List,
  H3,
  Button
} from 'native-base';
import i18n from '../../../config/i18n';

export default class ReminderModal extends Component {

  shouldComponentUpdate = (nextProps) => {
    return nextProps.isVisible !== this.props.isVisible ||
      nextProps.fiveMin !== this.props.fiveMin ||
      nextProps.tenMin !== this.props.tenMin ||
      nextProps.fifteenMin !== this.props.fifteenMin ||
      nextProps.thirtyMin !== this.props.thirtyMin ||
      nextProps.fortyFiveMin !== this.props.fortyFiveMin ||
      nextProps.oneHour !== this.props.oneHour ||
      nextProps.oneDay !== this.props.oneDay;
  }

  handleToggle = (key) => {
    this.props.toggle(key);
  }

  handleClose = () => this.props.handleClose();

  render() {
    const {
      isVisible,
      fiveMin,
      tenMin,
      fifteenMin,
      thirtyMin,
      fortyFiveMin,
      oneHour,
      oneDay,
    } = this.props;


    return (
      <Modal
        isVisible={isVisible}
        useNativeDriver
        onBackButtonPress={this.handleClose}
        hideModalContentWhileAnimating
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={styles.modalContent}>
        <ScrollView>
          <Item>
            <View style={styles.header}>
              <H3 style={styles.text}>Remind me</H3>
            </View>
          </Item>
          <View style={styles.container}>
            <List>
              <View style={styles.item}>
                <CheckBox checked={fiveMin} onPress={() => this.handleToggle('fiveMin')}/>
                <Text style={styles.marginLeft}>5 minutes before</Text>
              </View>
              <View style={styles.item}>
                <CheckBox checked={tenMin} onPress={() => this.handleToggle('tenMin')}/>
                <Text style={styles.marginLeft}>10 minutes before</Text>
              </View>
              <View style={styles.item}>
                <CheckBox checked={fifteenMin} onPress={() => this.handleToggle('fifteenMin')}/>
                <Text style={styles.marginLeft}>15 minutes before</Text>
              </View>
              <View style={styles.item}>
                <CheckBox checked={thirtyMin} onPress={() => this.handleToggle('thirtyMin')}/>
                <Text style={styles.marginLeft}>30 minutes before</Text>
              </View>
              <View style={styles.item}>
                <CheckBox checked={fortyFiveMin} onPress={() => this.handleToggle('fortyFiveMin')}/>
                <Text style={styles.marginLeft}>45 minutes before</Text>
              </View>
              <View style={styles.item}>
                <CheckBox checked={oneHour} onPress={() => this.handleToggle('oneHour')} />
                <Text style={styles.marginLeft}>1 hour before</Text>
              </View>
              <View style={styles.item}>
                <CheckBox checked={oneDay} onPress={() => this.handleToggle('oneDay')} />
                <Text style={styles.marginLeft}>1 day before</Text>
              </View>
            </List>
          </View>
          <View style={styles.buttons}>
            <Button
              bordered
              rounded
              onPress={this.handleClose}
            >
              <Text uppercase={false}>
                {i18n.t('options.cancel')}
              </Text>
            </Button>
          </View>
        </ScrollView>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingLeft: 24,
    paddingRight: 16,
  },
  buttons: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingBottom: 16,
    paddingRight: 16
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  item: {
    marginVertical: 16,
    flexDirection: 'row'
  },
  marginLeft: {
    marginLeft: 16
  },
  header: {
    paddingTop: 24,
    paddingLeft: 16,
    paddingBottom: 16
  },
  text: {
    fontWeight: 'bold',
    color: '#404040'
  }
})