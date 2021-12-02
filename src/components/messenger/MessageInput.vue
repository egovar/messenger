<template>
  <div class="message-input">
    <form class="message-input__form" @submit.prevent="sendNewMessage()">
      <textarea
        v-model="newMessageText"
        class="message-input__text-field"
        placeholder="Введите текст..."
        aria-label="Введите текст нового сообщения"
        @keypress="(e) => dispatchEnterPress(e)"
      ></textarea>
      <button
        type="submit"
        class="message-input__send-button"
        :disabled="isSendingMessage"
      >
        <img
          v-if="isSendingMessage"
          src="../../assets/icons/loader.svg"
          alt="Иконка отправки"
          class="message-input__loader"
        />
        <img
          v-else
          src="../../assets/icons/send.svg"
          alt="Иконка отправки"
          class="message-input__icon"
        />
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_NEW_MESSAGE_TEXT } from "@/store/mutations";
import { SEND_NEW_MESSAGE } from "@/store/actions";

export default {
  name: "MessageInput",
  computed: {
    ...mapGetters("messenger", ["activeDialogId"]),
    dialogModule() {
      return `messenger/dialog_${this.activeDialogId}`;
    },
    newMessageText: {
      get() {
        return this.$store.getters[`${this.dialogModule}/newMessageText`];
      },
      set(newValue) {
        this.$store.commit(
          `${this.dialogModule}/${SET_NEW_MESSAGE_TEXT}`,
          newValue.replace(/^\s|\s(?=\s)/gi, "") // Trim all spaces except last one. Check work in Safari
        );
      },
    },
    isSendingMessage() {
      return this.$store.getters[`${this.dialogModule}/isSendingMessage`];
    },
  },
  methods: {
    async sendNewMessage() {
      if (this.newMessageText.length > 0) {
        await this.$store.dispatch(`${this.dialogModule}/${SEND_NEW_MESSAGE}`);
        this.$emit("new-message-sent");
      }
    },
    dispatchEnterPress(e) {
      const { key } = e;
      if (key === "Enter") {
        e.preventDefault();
        this.sendNewMessage();
      } else if (key === "\n") this.newMessageText += "\n";
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/assets/scss/variables" as *;
@use "src/assets/scss/mixins" as *;

.message-input {
  border-top: 1px solid $border-color;

  &__text-field {
    @include main-text;
    color: $preview-message-color;
    display: block;
    height: 100%;
    width: calc(100% - 5rem);
    border: none;
    resize: none;
    padding: 1.875rem;
    outline: none;
    font-family: Montserrat, sans-serif;
  }

  &__send-button {
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    cursor: pointer;
    background-color: $primary-color;
    margin: 0;

    &[disabled] {
      opacity: 0.7;
    }
  }

  &__form {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: nowrap;
  }

  &__icon {
    width: 1.375rem;
  }

  &__loader {
    width: 2rem;
  }
}
</style>
