
import { configureStore } from '@reduxjs/toolkit'
import {combinedProfileAppReducers} from './features/root'

export const profileStore = configureStore({
  reducer: combinedProfileAppReducers,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof profileStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof profileStore.dispatch


