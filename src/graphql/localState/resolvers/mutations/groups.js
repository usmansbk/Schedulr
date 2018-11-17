import gql from 'graphql-tag';
import moment from 'moment';
import deleteGroupEvents from './helpers';
import createNewGroup from '../../../../lib/utils';
import GROUPS from '../../query/Groups';
import ME from '../../query/UserInfo';

export default {
  createGroup: (_, { input: { group } }, { cache }) => {
    const { groups } = cache.readQuery({ query: GROUPS });
    const { me } = cache.readQuery({ query: ME });
    const node =  createNewGroup(group, me);
    const edge = {
      __typename: 'GroupEdge',
      cursor: node.id,
      node
    }
    const newGroups = Object.assign({}, groups, {
      edges: [edge, ...groups.edges],
    });
    cache.writeQuery({
      query: GROUPS,
      data: {
        groups: newGroups
      }
    });
    return node;
  },
  deleteGroup: (_, { input: { id } }, { cache }) => {
    const { groups } = cache.readQuery({ query: GROUPS });
    const { edges } = groups;
    const targetIndex = edges.findIndex(({ node }) => node.id === id);
    if (targetIndex !== -1) {
      deleteGroupEvents(cache, id);
      const newEdges = edges.slice(0, targetIndex).concat(
        edges.slice(targetIndex + 1)
      );
      const newList = Object.assign({}, groups, {
        edges: newEdges
      });
      cache.writeQuery({
        query: GROUPS,
        data: {
          groups: newList
        }
      });
    }
    return id;
  },
  closeGroup: (_, { input: { id } }, { cache, getCacheKey }) => {
    const fragmentId = getCacheKey({ __typename: 'Group', id });
    const fragment = gql`
      fragment closeGroup on Group {
        status
        isClosed
        updatedAt
      }
    `;
    const node = cache.readFragment({ fragment, id: fragmentId });
    const data = {
      ...node,
      status: 'CLOSED',
      isClosed: true,
      updatedAt: moment().toISOString()
    };
    cache.writeFragment({ fragment, id: fragmentId, data });
    return data;
  },
  openGroup: (_, { input: { id } }, { cache, getCacheKey }) => {
    const fragmentId = getCacheKey({ __typename: 'Group', id });
    const fragment = gql`
      fragment openGroup on Group {
        status
        isClosed
        updatedAt
      }
    `;
    const node = cache.readFragment({ fragment, id: fragmentId });
    const data = {
      ...node,
      status: 'OPEN',
      isClosed: false,
      updatedAt: moment().toISOString()
    };
    cache.writeFragment({ fragment, id: fragmentId, data });
    return data;
  },
  editGroup: (_, { input: { id, group } }, { cache, getCacheKey }) => {
    const fragmentId = getCacheKey({ __typename: 'Group', id });
    const fragment = gql`
      fragment editGroup on Group {
        name
        description
        url
        privacy
        isPrivate
        updatedAt
      }
    `;
    const node = cache.readFragment({ fragment, id: fragmentId });
    const data = {
      ...node,
      name: group.name,
      description: group.description,
      url: group.url,
      privacy: group.privacy,
      isPrivate: group.privacy === 'PRIVATE',
      updatedAt: moment().toISOString()
    };
    cache.writeFragment({ fragment, id: fragmentId, data });
    return data;
  }
};
