import React, {Component} from 'react';
import { TouchableRipple, Searchbar, Text } from 'react-native-paper';
import { FlatList } from 'react-navigation';
import { Animated } from 'react-native';
import colors from '../../../config/colors';
import styles from './styles';

import { withCollapsible } from 'react-navigation-collapsible';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class SearchTab extends Component{
  constructor(props){
    super(props);

    const data = [];
    for(let i = 0 ; i < 60 ; i++){
      data.push(i.toString());
    }

    this.state = {
      data: data
    }
  }

  renderItem = ({item}) => (
    <TouchableRipple 
      onPress={() => {
        this.props.navigation.navigate('DetailScreen');
      }}
      style={styles.item}>
      <Text style={{fontSize: 22}}>{item}</Text>
    </TouchableRipple>
  )

  render(){
    const { paddingHeight, animatedY, onScroll } = this.props.collapsible;

    return (
      <AnimatedFlatList 
        style={styles.list}
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => String(index)}

        contentContainerStyle={{paddingTop: paddingHeight}}
        scrollIndicatorInsets={{top: paddingHeight}}        
        onScroll={onScroll} 
        _mustAddThis={animatedY}
        />
    )
  }
}

const SearchBar = ({navigation}) => {
  return (
    <TouchableRipple
      onPress={() => navigation.navigate('SearchScreen')}
    >
      <Searchbar
        icon="search"
        editable={false}
        placeholder="Search"
      />
    </TouchableRipple>
  );
}

const collapsibleParams = {
  collapsibleComponent: SearchBar,
  collapsibleBackgroundStyle: {
    height: 49, 
    backgroundColor: colors.light_gray_2,
    // elevation: 4
    // disableFadeoutInnerComponent: true,
  }
}

export default withCollapsible(SearchTab, collapsibleParams);
