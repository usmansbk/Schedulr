import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { Query } from 'react-apollo';
import { FlatList, View, } from 'react-native';
import ErrorAlert from '../components/error/ErrorAlert';
import GroupItem from '../components/screens/Search/GroupItem';
import EmptyList from '../components/common/EmptyList';
import SEARCH_GROUP from '../graphql/localState/query/SearchGroup';
import COMMUNITY from '../graphql/localState/query/Community';
import { ITEM_HEIGHT, SEPERATOR_HEIGHT } from '../components/screens/Search/styles';
import i18n from '../config/i18n';

const LIMIT = 10;

const getItemLayout = (_, index) => (
  {
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index + SEPERATOR_HEIGHT,
    index
  }
);

class SearchGroup extends PureComponent {
  updateQuery = (prev, { fetchMoreResult }) => {
    const { search } = fetchMoreResult;
    const { groups } = search;
    if (!fetchMoreResult || !groups) return prev;
    const updated = Object.assign({}, prev, {
      search: Object.assign({}, prev.search, {
        groups: Object.assign({}, prev.search.groups, {
          edges: [...prev.search.groups.edges, ...groups.edges],
          pageInfo: Object.assign({}, prev.search.groups.pageInfo, groups.pageInfo)
        })
      })
    });
    return updated;
  }

  _onPressItem = (id, name, description) => this.props.navigation.navigate('GroupScreen', { id, name, description })

  _onPressAvatar = ({ id, name }) => 
    this.props.navigation.navigate(
      'ImageViewer',
      {
        id,
        name,
        action: 'group',
      })


  _keyExtractor = (item) => item.node.id

  _renderSeparator = () => <View style={{ height: 1 }} />
  
  _renderHeader = () => !this.props.online ? <ErrorAlert message="Searching offline..." /> : null;

  _renderItem = ({item: { node }}) => {
    const {
      id,
      name,
      description,
      isClosed,
      isAuthor,
      logo,
      membersCount
    } = node;

    return (
      <GroupItem
        id={id}
        name={name}
        description={description}
        isAuthor={isAuthor}
        isClosed={isClosed}
        membersCount={membersCount}
        logo={logo && logo.path}
        onPressItem={this._onPressItem}
        onPressAvatar={this._onPressAvatar}
      />
    )
  }

  _renderEmptyList = () => <EmptyList title={i18n.t('search.empty')} />

  render() {
    const type = 'group';
    const { name='' } = this.props;

    return (
      <Query query={COMMUNITY}>
        {({ data }) => {
          let community = data.community || {};
          if (data) community = data.community || {};
          
          return (
            <Query
              fetchPolicy="no-cache"
              query={SEARCH_GROUP}
              variables={{
                input: {
                  type,
                  name,
                  first: LIMIT,
                  schoolId: community.id,
                }
              }}
            >
              {({ loading, data, refetch, fetchMore }) => {

                let groupList = [];
                let after;
                let hasNextPage;
                if (data) {
                  const { search } = data;
                  if (search) {
                    const { groups } = search;
                    if (groups) {
                      const { edges,pageInfo } = groups;
                      if ( edges ) {
                        groupList = edges;
                        if (pageInfo) {
                          hasNextPage = pageInfo.hasNextPage;
                          after = pageInfo.endCursor;
                        }
                      }
                    }
                  }
                }
                return (
                  <FlatList
                    getItemLayout={getItemLayout}
                    ListHeaderComponent={this._renderHeader}
                    keyboardShouldPersistTaps="always"
                    refreshing={loading}
                    keyExtractor={this._keyExtractor}
                    data={groupList}
                    renderItem={this._renderItem}
                    onRefresh={refetch}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListEmptyComponent={this._renderEmptyList}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                      if (hasNextPage) {
                        fetchMore({
                          variables: {
                            input: {
                              name: name.toLowerCase(),
                              after,
                              first: LIMIT,
                              schoolId: community.id,
                              type,
                            }
                          },
                          updateQuery: this.updateQuery,
                        })
                      }
                    }}
                  />
                )
              }}
            </Query>
          )
        }}
      </Query>
    )
  }
}

export default withNavigation(SearchGroup);