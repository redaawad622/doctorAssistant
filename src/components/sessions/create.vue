<template>
  <v-row justify="center">
    <v-dialog
      class="sec"
      :value="value"
      @input="$emit('input', false)"
      persistent
      scrollable
      fullscreen
    >
      <v-card :loading="loading" class="d-flex flex-column">
        <v-card-title class="headline text-capitalize">
          {{
            session.id ? "Update session " : "Create a New Session"
          }}</v-card-title
        >
        <v-card-text
          v-if="sessionLoading"
          class="d-flex justify-center align-center"
        >
          <v-progress-circular indeterminate></v-progress-circular>
        </v-card-text>
        <v-card-text class="px-0" v-else>
          <v-tabs
            v-model="tab"
            hide-slider
            grow
            :background-color="!$vuetify.theme.dark && '#FBFBFB'"
          >
            <v-tab v-for="item in tabs" :key="item.tab">
              {{ item.tab }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in tabs" :key="item.tab">
              <component :is="item.component"></component>
            </v-tab-item>
          </v-tabs-items>
          <v-alert
            type="error"
            dense
            text
            v-for="(item, key) in errors"
            :key="`error${key}`"
          >
            {{ item }}
          </v-alert>
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
              @click="print()"
              v-if="tab == 4 || tab == 5 || tab == 6"
            >
              Print
            </v-btn>
            <v-btn
              v-bind="btnStyle"
              color="primary"
              v-if="session.id"
              class="white--text font-weight-medium text-capitalize text-capitalize mr-2"
              @click="reportOpen = true"
            >
              Generate report
            </v-btn>
            <v-btn
              v-bind="btnStyle"
              color="primary"
              class="white--text font-weight-medium text-capitalize text-capitalize"
              @click="saveSession()"
              :loading="saveSessionLoading"
            >
              {{ session.id ? "Update session" : "Save session" }}
            </v-btn>
          </div>
        </v-card-actions>
        <v-overlay v-if="saveSessionLoading">
          <v-progress-circular
            :value="percentage"
            :size="50"
            color="primary"
            :indeterminate="percentage == 100"
            >{{ percentage }}</v-progress-circular
          >
        </v-overlay>
      </v-card>
    </v-dialog>
    <report v-model="reportOpen"></report>
  </v-row>
</template>

<script>
import Complaint from "./tabs/Complaint";
import History from "./tabs/History";
import Examination from "./tabs/Exam";
import Medicine from "./tabs/Med";
import Diagnosis from "./tabs/Diagnosis";
import Requests from "./tabs/requests";
import Glass from "./tabs/glass";
import {
  SESSION_NAMESPACE,
  PATIENT_NAMESPACE
} from "../../store/modules/namespaces";
import { mapGetters } from "vuex";
import Report from "../../views/app/reports/Report.vue";
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    sessionId: {
      type: [String, Number],
      default: null
    }
  },
  components: {
    Complaint,
    History,
    Examination,
    Medicine,
    Diagnosis,
    Requests,
    Glass,
    Report
  },
  data() {
    return {
      sessionLoading: false,
      saveSessionLoading: false,
      tab: null,
      reportOpen: false,
      tabs: [
        { tab: "Complaint", component: "Complaint" },
        { tab: "History", component: "History" },
        { tab: "Examination", component: "Examination" },
        { tab: "Diagnosis", component: "Diagnosis" },
        { tab: "Medicine", component: "Medicine" },
        { tab: "Glasses", component: "Glass" },
        { tab: "Requests", component: "Requests" }
      ],
      loading: false,
      errors: []
    };
  },
  computed: {
    ...mapGetters(PATIENT_NAMESPACE, ["patient", "sessions"]),
    ...mapGetters(SESSION_NAMESPACE, ["percentage", "session"]),
    btnStyle() {
      return this.$store.getters.btnStyle;
    }
  },
  methods: {
    print() {
      let val = "med";
      switch (this.tab) {
        case 4:
          val = "med";
          break;
        case 5:
          val = "glass";
          break;
        case 6:
          val = "req";
          break;

        default:
          val = "";
          break;
      }

      this.$store.commit(`${SESSION_NAMESPACE}/updatePrint`, val);
    },
    validate() {
      this.errors = [];
    },

    getSession() {
      this.sessionLoading = true;
      this.$store
        .dispatch(`${SESSION_NAMESPACE}/getSession`, {
          id: this.sessionId
        })
        .then(() => {
          this.sessionLoading = false;
        });
    },
    saveSession() {
      this.saveSessionLoading = true;
      if (!this.session.id) {
        this.$store
          .dispatch(`${SESSION_NAMESPACE}/saveSession`, {
            patient_id: this.patient.id
          })
          .then(res => {
            this.saveSessionLoading = false;
            const session = res.data.session;
            this.$store.commit(`${PATIENT_NAMESPACE}/unshiftSessions`, {
              id: session.id,
              created_at: session.created_at
            });
            this.$emit("updateSession", session.id);
          })
          .catch(() => {
            this.saveSessionLoading = false;
          });
      } else {
        this.$store
          .dispatch(`${SESSION_NAMESPACE}/updateSession`, {
            patient_id: this.patient.id
          })
          .then(() => {
            this.saveSessionLoading = false;
          })
          .catch(() => {
            this.saveSessionLoading = false;
          });
      }
    },
    generateReport() {
      console.log("GEC");
    }
  },
  watch: {
    sessionId(val) {
      if (!val) {
        this.$store.commit(`${SESSION_NAMESPACE}/reset`);
      }
      if (val !== this.session.id) {
        this.getSession();
      }
    }
  }
};
</script>

<style lang="scss">
@media print {
  .sec {
    display: none;
  }
}
</style>
