import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const LS_FAV_KEY = 'rfk'

interface GithubState {
    favourites : string[]
}

const initialState = {
    favourites : JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
} as GithubState


export const githubSlice = createSlice({
    name : 'github',
    initialState,
    reducers: {
        addFavourite(state, action : PayloadAction<string>) {

            state.favourites.push(action.payload)
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
        },
        removeFavourite(state, action : PayloadAction<string>) {
            state.favourites = state.favourites.filter(repo => repo !== action.payload)
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
        }
    }
})

export const gitHubActions = githubSlice.actions
export const gitHubReducers = githubSlice.reducer

