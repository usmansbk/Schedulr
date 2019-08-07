import React, {Component} from 'react';
import { TouchableRipple, Searchbar } from 'react-native-paper';
import { withCollapsible } from 'react-navigation-collapsible';
import { FlatList } from 'react-navigation';
import { Animated, InteractionManager } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import Empty from './Empty';
import Item from './Item';
import colors from 'config/colors';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class ExploreTab extends Component{
  static defaultProps = {
    data: [],
    loading: false,
    error: false
  }

  _renderEmptyList = () => <Empty />

  renderItem = ({item}) => <Item />

  componentDidMount = async () => {
    InteractionManager.runAfterInteractions(this.props.stores.appState.requestLocation);
  };

  render(){
    const { paddingHeight, animatedY, onScroll } = this.props.collapsible;
    const styles = this.props.stores.appStyles.explore;

    return (
      <AnimatedFlatList 
        style={styles.list}
        data={this.props.data}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => String(index)}
        ListEmptyComponent={this._renderEmptyList}

        contentContainerStyle={{paddingTop: paddingHeight, flexGrow: 1}}
        scrollIndicatorInsets={{top: paddingHeight}}        
        onScroll={onScroll} 
        _mustAddThis={animatedY}
      />
    )
  }
}

const SearchBar = inject('stores')(observer(
  ({navigation, stores }) => {
    return (
      <TouchableRipple
        onPress={() => navigation.navigate('SearchScreen')}
      >
        <Searchbar
          icon={() => <Icon name="search" size={24} />}
          editable={false}
          collapsable
          placeholder="Search"
          theme={{ roundness: 0 }}
          style={{
            backgroundColor: stores.themeStore.colors.bg
          }}
        />
      </TouchableRipple>
    );
  }
));

const withStores = inject("stores")(observer(ExploreTab));

const collapsibleParams = {
  collapsibleComponent: SearchBar,
  collapsibleBackgroundStyle: {
    height: 49, 
    backgroundColor: colors.light_gray_2,
    // elevation: 4
    // disableFadeoutInnerComponent: true,
  }
}

export default withCollapsible(withStores, collapsibleParams);
