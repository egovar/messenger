<template>
  <main class="messenger">
    <dialog-list />
    <dialog-viewbox v-if="activeDialogId" />
    <loader v-if="isLoading" class="messenger__loader" />
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { CHANGE_ACTIVE_DIALOG_ID } from "@/store/actions";

import DialogList from "@/components/messenger/DialogList";
import DialogViewbox from "@/components/messenger/DialogViewbox";
import Loader from "@/components/messenger/Loader";

export default {
  components: {
    loader: Loader,
    "dialog-list": DialogList,
    "dialog-viewbox": DialogViewbox,
  },
  computed: {
    ...mapGetters("messenger", ["isLoading"]),
    activeDialogId: {
      get() {
        return this.$store.getters["messenger/activeDialogId"];
      },
      set(newVal) {
        this[CHANGE_ACTIVE_DIALOG_ID](newVal);
      },
    },
  },
  watch: {
    "$route.params.dialogId": {
      handler() {
        this.activeDialogId = this.$route.params.dialogId;
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions("messenger", [CHANGE_ACTIVE_DIALOG_ID]),
  },
};
</script>

<style scoped lang="scss">
@use "src/assets/scss/mixins" as *;
@use "src/assets/scss/variables" as *;

.messenger {
  @include container;
  height: 100vh;
  position: relative;
  display: flex;
  overflow: hidden;
  border-right: 1px solid $border-color;

  &__loader {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>
