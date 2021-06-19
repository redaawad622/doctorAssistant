<template>
  <v-card flat>
    <v-card-text>
      <v-combobox
        v-model="description"
        :items="history"
        label="History"
        multiple
        :loading="loading"
        cache-items
        chips
        clearable
        v-bind="inputStyle"
        deletable-chips
        full-width
        open-on-clear
      >
      </v-combobox>
      <v-checkbox
        class="mt-0 pt-0"
        label="save as a template"
        v-model="saveAsTemplate"
      ></v-checkbox>
      <fileUpload
        v-model="files"
        id="hisFile"
        name="history"
        type="history_multiple"
      ></fileUpload>

      <filePreview
        v-if="multipart && multipart.length > 0"
        v-model="multipart"
      ></filePreview>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  TEMPLATES_NAMESPACE,
  SESSION_NAMESPACE
} from "../../../store/modules/namespaces";
import fileUpload from "../fileUpload";
import filePreview from "../filePreview";
export default {
  components: {
    fileUpload,
    filePreview
  },
  computed: {
    inputStyle() {
      return this.$store.getters.inputStyle;
    },
    history() {
      return this.$store.getters[`${TEMPLATES_NAMESPACE}/history`].map(item => {
        return item.content;
      });
    },
    description: {
      get() {
        return (
          this.$store.getters[`${SESSION_NAMESPACE}/history`]["description"] ||
          []
        );
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/history`, {
          name: "description",
          value: val
        });
      }
    },
    saveAsTemplate: {
      get() {
        return (
          this.$store.getters[`${SESSION_NAMESPACE}/history`][
            "saveAsTemplate"
          ] || false
        );
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/history`, {
          name: "saveAsTemplate",
          value: val
        });
      }
    },
    files: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/history`][
          "history_multiple"
        ];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/history`, {
          name: "history_multiple",
          value: val
        });
      }
    },
    multipart: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/history`]["multipart"];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/history`, {
          name: "multipart",
          value: val
        });
      }
    }
  },
  data() {
    return {
      loading: false
    };
  },
  created() {
    this.loading = true;
    this.$store.dispatch(`${TEMPLATES_NAMESPACE}/getHistory`).then(() => {
      this.loading = false;
    });
  }
};
</script>

<style></style>
