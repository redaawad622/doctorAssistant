<template>
  <v-dialog
    :value="value"
    @input="$emit('input', false)"
    persistent
    scrollable
    fullscreen
  >
    <v-card :loading="loading" class="d-flex flex-column repDialog">
      <v-card-title class="headline text-capitalize"> report</v-card-title>
      <v-card-text class="pa-0">
        <component
          :is="'rep' + currentComponent"
          :patient="patient"
          :session="nativeSession"
          :dropdown_template="dropdown_template"
          :currentComponent.sync="currentComponent"
        ></component>
      </v-card-text>
      <v-card-actions class="back justify-space-between py-4 mt-auto">
        <v-btn
          v-bind="btnStyle"
          color="red darken-1"
          class="white--text font-weight-medium text-capitalize  text-capitalize"
          @click="$emit('input', false)"
        >
          close
        </v-btn>
        <div>
          <v-btn
            v-bind="btnStyle"
            color="primary"
            class="white--text font-weight-medium text-capitalize text-capitalize me-3"
            @click="printRep()"
          >
            Print
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import {
  PATIENT_NAMESPACE,
  SESSION_NAMESPACE
} from "../../../store/modules/namespaces";
import repTemplate1 from "./repTemplate1.vue";
import repTemplate2 from "./repTemplate2.vue";

export default {
  name: "report",
  components: { repTemplate1, repTemplate2 },
  props: ["value"],
  data() {
    return {
      loading: false,
      currentComponent: "Template1",
      dropdown_template: ["Template1", "Template2"]
    };
  },

  computed: {
    ...mapGetters(PATIENT_NAMESPACE, ["patient"]),
    ...mapGetters(SESSION_NAMESPACE, ["nativeSession"]),
    btnStyle() {
      return this.$store.getters.btnStyle;
    }
  },
  methods: {
    printRep() {
      this.$printing();
    }
  }
};
</script>

<style lang="scss">
@media print {
  .repDialog {
    .v-card__title,
    .v-card__actions,
    .printPres {
      display: none !important;
    }
  }
}
</style>
