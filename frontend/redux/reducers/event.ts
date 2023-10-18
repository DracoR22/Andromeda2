import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const eventReducer = createReducer(initialState, {
  eventCreateRequest: (state) => {
    state.isLoading = true;
  },
  eventCreateSuccess: (state: any, action) => {
    state.isLoading = false;
    state.event = action.payload;
    state.success = true;
  },
  eventCreateFail: (state: any, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all events of shop
  getAlleventsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAlleventsShopSuccess: (state: any, action) => {
    state.isLoading = false;
    state.events = action.payload;
  },
  getAlleventsShopFailed: (state: any, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete event of a shop
  deleteeventRequest: (state) => {
    state.isLoading = true;
  },
  deleteeventSuccess: (state: any, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteeventFailed: (state: any, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all events 
  getAlleventsRequest: (state) => {
    state.isLoading = true;
  },
  getAlleventsSuccess: (state: any, action) => {
    state.isLoading = false;
    state.allEvents = action.payload;
  },
  getAlleventsFailed: (state: any, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state: any) => {
    state.error = null;
  },
});