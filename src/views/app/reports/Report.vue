<template>
  <v-app id="reportBox">
    <v-main>
      <v-overlay v-if="loading">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-overlay>

      <component
        :is="'rep' + currentComponent"
        :patient="patient"
        :session="nativeSession"
        :dropdown_template="dropdown_template"
        :currentComponent.sync="currentComponent"
      ></component>
    </v-main>
  </v-app>
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
  components: { repTemplate1, repTemplate2 },
  data() {
    return {
      loading: false,
      currentComponent: "Template1",
      dropdown_template: ["Template1", "Template2"]
    };
  },

  computed: {
    ...mapGetters(PATIENT_NAMESPACE, ["patient"]),
    ...mapGetters(SESSION_NAMESPACE, ["nativeSession"])
  },
  beforeCreate() {
    document.getElementsByTagName("title")[0].innerText = "Report";
  },

  created() {
    this.loading = true;
    this.$store.dispatch(`${PATIENT_NAMESPACE}/getPatient`, {
      id: this.$route.params.id
    });
    this.$store
      .dispatch(`${SESSION_NAMESPACE}/getSession`, {
        id: this.$route.params.session_id
      })
      .then(() => {
        this.loading = false;
      });
  },
  destroyed() {
    document.getElementsByTagName("title")[0].innerText = "Doctor Assisstant";
  }
};
</script>

<style></style>
