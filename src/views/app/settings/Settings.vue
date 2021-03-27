<template>
  <v-col cols="12">
    <v-form class="mx-3">
      <v-textarea
        v-bind="inputStyle"
        v-model="repAdd"
        label="Report Address"
      ></v-textarea>
      <v-btn v-bind="btnStyle" class="mr-4" @click="saveDate" color="primary">
        Save
      </v-btn>
    </v-form>
  </v-col>
</template>

<script>
import { getItem, setItem } from "../../../helpers/storage";
export default {
  computed: {
    inputStyle() {
      return this.$store.getters.inputStyle;
    },
    btnStyle() {
      return this.$store.getters.btnStyle;
    }
  },
  data() {
    return {
      repAdd: ""
    };
  },
  methods: {
    saveDate() {
      setItem("repAddress", this.repAdd);
    }
  },
  created() {
    this.repAdd = getItem("repAddress") || "";
  }
};
</script>
