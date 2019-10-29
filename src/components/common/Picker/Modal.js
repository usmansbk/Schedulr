import React from 'react';
import { Modal, Portal, Provider, Text } from 'react-native-paper';
import List from './List';

export default class ModalPicker extends React.Component {
	render() {
		const {
			visible,
			hideModal,
			prompt,
			items,
			selectedValue,
			onValueChange
		} = this.props;

		return (
			<Provider>
				<Portal>
					<Modal visible={visible} onDismiss={hideModal} >
						<Text>{prompt}</Text>
						<List
							data={items}
							selectedValue={selectedValue}
							onValueChange={onValueChange}
						/>
					</Modal>
				</Portal>
			</Provider>
		);
	}
}