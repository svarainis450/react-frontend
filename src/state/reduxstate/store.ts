import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducer, RootState } from './slice';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'projects',
  storage: storageSession,
  blacklist: [''], // blacklisted reducers which won't be saved in session storage
  whitelist: ['projects'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
