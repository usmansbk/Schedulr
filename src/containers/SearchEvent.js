import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { Query } from 'react-apollo';
import { FlatList, View } from 'react-native';
import EventItem from '../components/screens/Search/EventItem';
import EmptyList from '../components/common/EmptyList';
import ErrorAlert from '../components/error/ErrorAlert';
import SEARCH_EVENT from '../graphql/localState/query/SearchEvent';
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

class SearchEvent extends PureComponent {
  updateQuery = (prev, { fetchMoreResult }) => {
    const { search } = fetchMoreResult;
    const { events } = search;
    if (!fetchMoreResult || !events) return prev;
    const updated = Object.assign({}, prev, {
      search: Object.assign({}, prev.search, {
        events: Object.assign({}, prev.search.events, {
          edges: [...prev.search.events.edges, ...events.edges],
          pageInfo: Object.assign({}, prev.search.events.pageInfo, events.pageInfo)
        })
      })
    });
    return updated;
  }

  _onPressAvatar = ({ id, name }) => {
    this.props.navigation.navigate(
      'ImageViewer',
      {
        id,
        name,
        action: 'event',
      })
  }

  _onPressItem = (id, name) => {
    this.props.navigation.navigate('EventCard', { id, name });
  }

  _onPressComment = (id, name) => {
    this.props.navigation.navigate('Comments', { id, name });
  }

  _renderSeparator = () => <View style={{ height: 1 }} />

  _renderItem = ({item: { node }}) => {
    const {
      id,
      name,
      description,
      eventType,
      isCancelled,
      commentsCount,
      isMember,
      isStarred,
      start,
      end,
      repeat
    } = node;
    return (
      <EventItem
        id={id}
        name={name}
        description={description}
        eventType={eventType}
        isCancelled={isCancelled}
        commentsCount={commentsCount}
        isMember={isMember}
        isStarred={isStarred}
        start={start}
        end={end}
        repeat={repeat}
        onPressItem={this._onPressItem}
        onPressAvatar={this._onPressAvatar}
        onPressComment={this._onPressComment}
      />
    )
  }

  _renderEmptyList = () => <EmptyList title={i18n.t('search.empty')} />

  _renderHeader = () => !this.props.online ? <ErrorAlert message="Searching offline..." /> : null;

  render() {
    const type = 'event';
    const { name='' } = this.props;

    return (
      <Query query={COMMUNITY}>
        {({ data }) => {
          let community = data.community || {};
          if (data) community = data.community || {};

          return (
            <Query
              fetchPolicy="no-cache"
              query={SEARCH_EVENT}
              variables={{
                input: {
                  name,
                  type,
                  first: LIMIT,
                  schoolId: community.id,
                }
              }}
            >
              {({loading, data, fetchMore, refetch}) => {
                this._refetch = refetch;
                let eventlist = [];
                let after;
                let hasNextPage;
                if (data) {
                  const { search } = data;
                  if (search) {
                    const { events } = search;
                    if (events) {
                      const { edges,pageInfo } = events;
                      if ( edges ) {
                        eventlist = edges;
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
                    keyboardShouldPersistTaps="always"
                    refreshing={loading}
                    keyExtractor={(item) => item.node.id}
                    data={eventlist}
                    renderItem={this._renderItem}
                    onRefresh={refetch}
                    ListHeaderComponent={this._renderHeader}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListEmptyComponent={this._renderEmptyList}
                    onEndReached={() => {
                      if (hasNextPage) {
                        fetchMore({
                          variables: {
                            input: {
                              name,
                              after,
                              first: LIMIT,
                              schoolId: community.id,
                              type
                            }
                          },
                          updateQuery: this.updateQuery,
                        })
                      }
                    }}
                    onEndReachedThreshold={0.5}
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

export default withNavigation(SearchEvent);