import React from 'react';
import { Mutation } from 'react-apollo';
import Button from '../components/common/SButton';
import StarEvent from '../graphql/mutation/StarEvent';
import theme from '../components/theme';

const COLOR = theme.bgLight;

export default class StarButtonContainer extends React.Component {
  shouldComponentUpdate = (nextProps) => {
      return nextProps.isStarred !== this.props.isStarred;
  }

  render() {
    const {
      isStarred,
      id,
    } = this.props;

    return (
      <Mutation
        mutation={StarEvent}
      >
        {(mutate) => {
          return (
            <Button
              onPress={() => {
                mutate({
                  variables: {
                    input: {
                      id
                    }
                  },
                })}
              }
              name={ isStarred ? 'star' : 'star-o'}
              type="FontAwesome"
              color={COLOR}
              isClicked
            />
          )
        }}
      </Mutation>
    )
  }
}