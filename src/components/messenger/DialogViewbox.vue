<template>
  <div :key="activeDialogId" class="dialog-viewbox">
    <div ref="messages" class="dialog-viewbox__messages">
      <dialog-message
        v-for="message in messages"
        :key="message.id"
        :text="message.text"
        :sender="message.author"
        :time="message.created"
      />
    </div>
    <message-input
      class="dialog-viewbox__input"
      @new-message-sent="scrollToBottom()"
    />
    <loader v-if="isLoadingMessages" class="dialog-viewbox__loader" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_SERVER_MESSAGES } from "@/store/actions";

import DialogMessage from "@/components/messenger/DialogMessage";
import Dialog from "@/store/messenger/dialog/dialog";
import MessageInput from "@/components/messenger/MessageInput";
import Loader from "@/components/messenger/Loader";

export default {
  name: "DialogViewbox",
  components: {
    Loader,
    "dialog-message": DialogMessage,
    "message-input": MessageInput,
  },
  computed: {
    ...mapGetters("messenger", ["activeDialogId"]),
    dialogModule() {
      return `messenger/dialog_${this.activeDialogId}`;
    },
    messages() {
      return this.$store.getters[`${this.dialogModule}/allDialogMessages`];
    },
    isLoadingMessages() {
      return this.$store.getters[`${this.dialogModule}/isLoadingMessages`];
    },
  },
  watch: {
    activeDialogId: {
      async handler() {
        this.registerDialogModule();
        await this.getDialog();
        this.scrollToBottom();
      },
      immediate: true,
    },
  },
  methods: {
    async getDialog() {
      await this.$store.dispatch(`${this.dialogModule}/${GET_SERVER_MESSAGES}`);
    },
    registerDialogModule() {
      if (!this.$store.hasModule(this.dialogModule)) {
        this.$store.registerModule(
          this.dialogModule,
          new Dialog(this.activeDialogId)
        );
      }
    },
    scrollToBottom() {
      const messages = this.$refs.messages;
      messages.scrollTop = messages.scrollTop =
        messages.scrollHeight - messages.clientHeight;
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/assets/scss/variables" as *;

.dialog-viewbox {
  width: 60%;
  height: 100vh;
  position: relative;
  box-shadow: 0 0 1.25rem 0 rgba(0, 0, 0, 0.1);
  clip-path: inset(0 0 0 -1.25rem);
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &__input {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  &__messages {
    padding: 2.5rem 1rem 1.5rem 2.5rem;
    max-height: 100%;
    width: 100%;
    overflow-y: auto;
    scroll-behavior: smooth;
  }
  &__loader {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>
