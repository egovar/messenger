import { requestDialog } from "@/server/messenger";
import { dateObjectToString } from "@/utils/formatDate";
import { SEND_NEW_MESSAGE, GET_SERVER_MESSAGES } from "@/store/actions";
import {
  CLEAR_NEW_MESSAGE_TEXT,
  FINISH_MESSAGE_SENDING,
  SET_NEW_MESSAGE,
  SET_NEW_MESSAGE_TEXT,
  SET_SERVER_MESSAGES,
  START_MESSAGE_SENDING,
  FINISH_MESSAGES_LOADING,
  START_MESSAGES_LOADING,
} from "@/store/mutations";
import { sendData } from "@/server";

class State {
  constructor(dialogId) {
    this.dialogId = dialogId;
    this.newMessageText = "";
    this.serverMessages = [];
    this.clientMessages = [];
    this.isLoadingMessages = false;
    this.isSendingMessage = false;
  }
}

class Message {
  constructor(id, author, text, created = dateObjectToString(new Date())) {
    this.id = id;
    this.author = author;
    this.created = created;
    this.text = text;
  }
}

class Dialog {
  constructor(dialogId = null) {
    this.namespaced = true;
    this.state = () => new State(dialogId);
    this.getters = {
      newMessageText: ({ newMessageText }) => newMessageText,
      dialogId: ({ dialogId }) => dialogId,
      serverMessages: ({ serverMessages }) => serverMessages,
      clientMessages: ({ clientMessages }) => clientMessages,
      allDialogMessages: (state, { serverMessages, clientMessages }) => {
        return [...serverMessages, ...clientMessages];
      },
      newMessageId: (state, { allDialogMessages }) => {
        let maxId = Number(allDialogMessages[0].id);
        for (let i = 1; i < allDialogMessages.length; i++) {
          const currentId = parseInt(allDialogMessages[i].id);
          if (parseInt(allDialogMessages[i].id) > maxId) maxId = currentId;
        }
        return maxId + 1;
      },
      dialogLength: (state, { allDialogMessages }) => {
        return allDialogMessages.length;
      },
      lastMessage: (state, { allDialogMessages, dialogLength }) => {
        return allDialogMessages[dialogLength - 1];
      },
      isSendingMessage: ({ isSendingMessage }) => isSendingMessage,
      isLoadingMessages: ({ isLoadingMessages }) => isLoadingMessages,
    };
    this.mutations = {
      [CLEAR_NEW_MESSAGE_TEXT]: (state) => (state.newMessageText = ""),
      [SET_NEW_MESSAGE_TEXT]: (state, text) => {
        state.newMessageText = text;
      },
      [SET_SERVER_MESSAGES]: (state, messages) =>
        (state.serverMessages = messages),
      [SET_NEW_MESSAGE]: (state, message) => {
        state.clientMessages.push(message);
      },
      [START_MESSAGES_LOADING]: (state) => {
        state.isLoadingMessages = true;
      },
      [FINISH_MESSAGES_LOADING]: (state) => {
        state.isLoadingMessages = false;
      },
      [START_MESSAGE_SENDING]: (state) => {
        state.isSendingMessage = true;
      },
      [FINISH_MESSAGE_SENDING]: (state) => {
        state.isSendingMessage = false;
      },
    };
    this.actions = {
      [SEND_NEW_MESSAGE]: async ({
        commit,
        getters: { newMessageText, newMessageId },
        rootGetters: { userName },
      }) => {
        commit(START_MESSAGE_SENDING);
        await sendData(() =>
          commit(
            SET_NEW_MESSAGE,
            new Message(newMessageId, userName, newMessageText)
          )
        );
        commit(CLEAR_NEW_MESSAGE_TEXT);
        commit(FINISH_MESSAGE_SENDING);
      },
      [GET_SERVER_MESSAGES]: async ({ commit, getters: { dialogId } }) => {
        commit(START_MESSAGES_LOADING);
        commit(SET_SERVER_MESSAGES, await requestDialog(dialogId));
        commit(FINISH_MESSAGES_LOADING);
      },
    };
  }
}

export default Dialog;
