/***
 * Redux store, plug state slices here to activate them
 */

import { configureStore } from '@reduxjs/toolkit';
import globalReducer from '@/state/global/global-slice';

export const store = configureStore({
	reducer: {
		global: globalReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
