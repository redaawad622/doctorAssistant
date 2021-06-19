<template>
  <v-card
    flat
    :loading="loading"
    class="d-flex flex-column repDialog py-4"
    width="100%"
  >
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
  </v-card>
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
      currentComponent: "Template2",
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
    },
    getSession() {
      this.loading = true;
      this.$store
        .dispatch(`${SESSION_NAMESPACE}/getSession`, {
          id: this.$route.params.id
        })
        .then(() => {
          this.getPatient();
          this.loading = false;
        });
    },
    getPatient() {
      this.$store.dispatch(`${PATIENT_NAMESPACE}/getPatient`, {
        id: this.nativeSession.userData.number.split("-")[0]
      });
    }
  },
  created() {
    this.getSession();
  }
};
</script>

<style lang="scss">
@media print {
  .repDialog {
    .v-card__title,
    .v-card__actions {
      display: none !important;
    }
  }
}
</style>
