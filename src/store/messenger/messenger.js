import { requestDialogsList } from "@/server/messenger";
import {
  FINISH_LOADING,
  SET_ACTIVE_DIALOG,
  SET_DIALOG_LIST,
  START_LOADING,
} from "../mutations";
import { CHANGE_ACTIVE_DIALOG_ID, GET_DIALOG_LIST } from "@/store/actions";

export const messengerModule = {
  namespaced: true,
  state: {
    dialogs: [],
    activeDialogId: null,
    isLoading: true,
  },
  getters: {
    dialogList: ({ dialogs }, getters) =>
      dialogs.map((dialog) => {
        return {
          id: dialog.id,
          subject: dialog.subject,
          lastMessage:
            getters[`dialog_${dialog.id}/lastMessage`] ||
            dialog.parts[dialog.parts.length - 1],
        };
      }),
    dialogsEmpty: (store, { dialogList }) => dialogList.length <= 0,
    messageCount: ({ dialogs }, getters) => {
      if (getters.dialogsEmpty) return 0;
      return dialogs.reduce((previousDialog, currentDialog) => {
        return (
          (getters[`dialog_${previousDialog.id}/dialogLength`] ||
            previousDialog.parts.length) +
          (getters[`dialog_${currentDialog.id}/dialogLength`] ||
            currentDialog.parts.length)
        );
      });
    },
    activeDialogId: ({ activeDialogId }) => activeDialogId,
    isLoading: ({ isLoading }) => isLoading,
  },
  mutations: {
    [SET_DIALOG_LIST]: (state, dialogs) => {
      state.dialogs = dialogs;
    },
    [SET_ACTIVE_DIALOG]: (state, dialogId) => {
      state.activeDialogId = dialogId;
    },
    [START_LOADING]: (state) => (state.isLoading = true),
    [FINISH_LOADING]: (state) => (state.isLoading = false),
  },
  actions: {
    [GET_DIALOG_LIST]: async ({ commit }) => {
      commit(START_LOADING);
      commit(SET_DIALOG_LIST, await requestDialogsList());
      commit(FINISH_LOADING);
    },
    [CHANGE_ACTIVE_DIALOG_ID]: ({ commit }, dialogId) => {
      commit(SET_ACTIVE_DIALOG, dialogId);
    },
  },
};
