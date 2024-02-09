/***
 * Global global states should be added here. For redux reference: https://redux.js.org/introduction/getting-started
 */
import { createSlice } from '@reduxjs/toolkit';

interface GlobalState {
	sidebarVisible: boolean;
}

const initialState: GlobalState = {
	sidebarVisible: true,
};

const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		toggleSidebarVisibility(state) {
			state.sidebarVisible = !state.sidebarVisible;
		},
	},
});

export const { toggleSidebarVisibility } = globalSlice.actions;
export default globalSlice.reducer;
