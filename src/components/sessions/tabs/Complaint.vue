<template>
  <v-card flat>
    <v-card-text>
      <v-combobox
        v-model="description"
        :items="complaint"
        label="Complaint"
        multiple
        :loading="loading"
        cache-items
        chips
        clearable
        deletable-chips
        full-width
        item-text="content"
        item-value="content"
        open-on-clear
        v-bind="inputStyle"
      >
      </v-combobox>
      <v-checkbox
        class="mt-0 pt-0"
        label="save as a template"
        v-model="saveAsTemplate"
      ></v-checkbox>
      <fileUpload
        v-model="files"
        name="complaint"
        type="complaint_multiple"
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
    complaint() {
      return this.$store.getters[`${TEMPLATES_NAMESPACE}/complaint`].map(
        item => {
          return item.content;
        }
      );
    },
    description: {
      get() {
        return (
          this.$store.getters[`${SESSION_NAMESPACE}/complaint`][
            "description"
          ] || []
        );
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/complaint`, {
          name: "description",
          value: val
        });
      }
    },
    saveAsTemplate: {
      get() {
        return (
          this.$store.getters[`${SESSION_NAMESPACE}/complaint`][
            "saveAsTemplate"
          ] || false
        );
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/complaint`, {
          name: "saveAsTemplate",
          value: val
        });
      }
    },
    files: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/complaint`][
          "complaint_multiple"
        ];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/complaint`, {
          name: "complaint_multiple",
          value: val
        });
      }
    },
    multipart: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/complaint`][
          "multipart"
        ];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/complaint`, {
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
    this.$store.dispatch(`${TEMPLATES_NAMESPACE}/getComplaint`).then(() => {
      this.loading = false;
    });
  }
};
</script>

<style></style>
