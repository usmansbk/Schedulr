import React from 'react';
import {inject, observer} from 'mobx-react';
import {CustomPicker} from 'components/common/Picker';

function EventType({
  value,
  stores,
  prompt,
  onValueChange = () => null,
  onBlur = () => null,
  ...rest
}) {
  const _onDeleteItem = (val) => stores.appState.removeCustomType(val);

  return (
    <CustomPicker
      icon="tago"
      prompt={prompt}
      value={value}
      onValueChange={onValueChange}
      onBlur={onBlur}
      data={stores.appState.categories}
      onDeleteItem={_onDeleteItem}
      {...rest}
    />
  );
}

export default inject('stores')(observer(EventType));
