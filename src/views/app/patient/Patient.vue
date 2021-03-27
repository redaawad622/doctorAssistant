<template>
  <v-card class="w-100" flat :loading="getPatientLoading">
    <v-card-title class="display-1 font-weight-bold text-capitalize"
      >Patient profile page
    </v-card-title>

    <v-card-text v-if="patient">
      <v-row>
        <v-col md="6" cols="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="form.name"
              :rules="nameRules"
              label="Name"
              required
              v-bind="inputStyle"
              clearable
              dense
            ></v-text-field>
            <v-text-field
              v-model="form.phone"
              label="Phone"
              required
              v-bind="inputStyle"
              clearable
              dense
            ></v-text-field>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="form.age"
                  :rules="ageRules"
                  label="Age"
                  required
                  v-bind="inputStyle"
                  clearable
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="items"
                  v-bind="inputStyle"
                  label="Gender"
                  v-model="form.gender"
                  required
                  dense
                ></v-select>
              </v-col>
              <v-textarea
                v-model="form.address"
                label="Address"
                required
                v-bind="inputStyle"
                clearable
                dense
                auto-grow
                no-resize
                rows="2"
              >
              </v-textarea>
              <v-btn
                :disabled="!valid"
                color="#A5C13D"
                class="mb-2 text-capitalize font-weight-bold "
                height="40px"
                :loading="loading"
                @click.prevent="validate"
                block
                v-bind="btnStyle"
              >
                Update
              </v-btn>
            </v-row>
          </v-form>
          <v-alert
            type="error"
            dense
            text
            v-for="(item, key) in errors"
            :key="`error${key}`"
          >
            {{ item }}
          </v-alert>
        </v-col>
        <v-col md="6" cols="12">
          <div class="d-flex justify-center align-center title primary--text">
            {{ patient.created_at }}
          </div>
        </v-col>
      </v-row>

      <v-snackbar left color="success" v-model="snackbar" :timeout="4000">
        Patient updated successfully
        <v-btn icon @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-card-text>
    <v-card-text v-if="!patient && !getPatientLoading">
      <v-alert type="error" text border="left">
        {{ msg || "something wrong" }}
      </v-alert>
    </v-card-text>
    <v-card-title
      class="font-weight-bold text-capitalize mt-10"
      v-if="patient && !getPatientLoading"
      >{{ `${patient.name} Sessions` }}</v-card-title
    >
    <v-card-text v-if="patient && !getPatientLoading">
      <v-data-table
        :headers="headers"
        :items="sessions"
        sort-by="id"
        :must-sort="mustSort"
        :options.sync="options"
        class="elevation-0"
        :server-items-length="meta.total || 0"
        :loading="getSessionLoading"
      >
        <template v-slot:item.id="{ item }">
          <v-btn @click="openDialog(item.id)" color="primary" text>{{
            item.id
          }}</v-btn>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="d-flex">
            <v-btn
              v-bind="btnStyle"
              x-small
              color="#A5C13D"
              class="mr-2"
              :class="{
                'white--text': !btnStyle.outlined && !btnStyle.text
              }"
              @click="openDialog(item.id)"
              fab
            >
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn
              @click="deleteItem = item"
              x-small
              color="red"
              fab
              v-bind="btnStyle"
              :class="{
                'white--text': !btnStyle.outlined && !btnStyle.text
              }"
            >
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </div>
        </template>
        <template v-slot:no-data>
          <span class="text-capitalize font-weight-bold "
            >No Session found</span
          >
          <v-btn
            color="primary"
            class="text-capitalize mx-1 "
            text
            @click="openDialog()"
          >
            <v-icon left>mdi-plus</v-icon>
            create session</v-btn
          >
        </template>
      </v-data-table>
    </v-card-text>
    <v-row justify="center">
      <v-dialog :value="true" v-if="deleteItem" persistent max-width="290">
        <v-card :loading="deleteLoading">
          <v-card-title class="headline">Delete Session</v-card-title>
          <v-card-text
            >Are you sure you want delete this session? by clicking agree the
            session will removed and their relations</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="deleteItem = null"
              >Disagree</v-btn
            >
            <v-btn
              color="green darken-1"
              text
              :loading="deleteLoading"
              @click="deleteSession(deleteItem)"
              >Agree</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-fab-transition>
      <v-btn
        v-bind="btnStyle"
        color="primary"
        style="bottom:70px"
        elevation="5"
        dark
        bottom
        right
        fixed
        fab
        v-if="patient"
        @click="openDialog()"
      >
        <v-icon class="display-2 font-weight-bold">mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <create
      v-model="dialog"
      @updateSession="
        id => {
          sessionId = id;
          this.total += 1;
        }
      "
      :sessionId="sessionId"
    ></create>
  </v-card>
</template>

<script>
import {
  AUTH_NAMESPACE,
  PATIENTS_NAMESPACE,
  PATIENT_NAMESPACE
} from "../../../store/modules/namespaces";
import { mapGetters } from "vuex";
import create from "../../../components/sessions/create";
export default {
  components: {
    create
  },
  data() {
    return {
      mustSort: true,
      sessionId: null,
      valid: true,
      loading: false,
      getPatientLoading: false,
      getSessionLoading: false,
      snackbar: false,
      msg: null,
      dialog: false,
      nameRules: [
        v => !!v || "field is required",
        v => v.length > 1 || "field must be at least 2 characters"
      ],
      ageRules: [
        v => v.length < 10 || "field must be at less than 10 characters"
      ],
      form: {
        name: "",
        gender: "male",
        age: "",
        phone: "",
        address: ""
      },
      errors: [],
      items: ["male", "female"],
      options: {},
      deleteItem: null,
      deleteLoading: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Date", value: "created_at" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters[`${AUTH_NAMESPACE}/currentUser`];
    },
    ...mapGetters(PATIENT_NAMESPACE, ["patient", "sessions", "meta"]),
    total: {
      get() {
        return this.meta.total;
      },
      set(val) {
        this.$store.commit(`${PATIENT_NAMESPACE}/updateTotal`, val);
      }
    },
    inputStyle() {
      return this.$store.getters.inputStyle;
    },
    btnStyle() {
      return this.$store.getters.btnStyle;
    }
  },
  created() {
    this.getPatient();
  },

  methods: {
    openDialog(id = null) {
      this.sessionId = id;
      this.dialog = true;
    },
    validate() {
      this.errors = [];
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.form["_method"] = "patch";
        this.$store
          .dispatch(`${PATIENTS_NAMESPACE}/create`, this.form)
          .then(() => {
            this.loading = false;
            this.snackbar = true;
            this.$emit("input", false);
            this.patient.name = this.form.name;
          })
          .catch(rej => {
            this.loading = false;
            this.errors = rej.response.data.errors;
          });
      }
    },
    getSession(perPage = 10, page = 1, sortBy = "id", desc = false) {
      this.getSessionLoading = true;
      this.$store
        .dispatch(`${PATIENT_NAMESPACE}/getSessions`, {
          perPage: perPage,
          page: page,
          sortBy: sortBy,
          desc: desc || false
        })
        .then(() => {
          this.getSessionLoading = false;
        })
        .catch(() => {
          this.getSessionLoading = false;
        });
    },
    deleteSession(item) {
      const index = this.sessions.indexOf(item);
      this.deleteLoading = true;
      this.$store
        .dispatch(`${PATIENT_NAMESPACE}/deleteSession`, {
          id: item.id
        })
        .then(() => {
          this.$store.commit(`${PATIENT_NAMESPACE}/deleteSession`, index);
          this.deleteItem = null;
          this.deleteLoading = false;
        })
        .catch(() => {
          this.deleteLoading = false;
        });
    },
    getPatient() {
      this.getPatientLoading = true;
      this.$store
        .dispatch(`${PATIENT_NAMESPACE}/getPatient`, {
          id: this.$route.params.id
        })
        .then(() => {
          this.getPatientLoading = false;
        })
        .catch(rej => {
          if (rej.response.status === 404) {
            this.msg = "Patient not found";
          }

          this.getPatientLoading = false;
        });
    }
  },
  watch: {
    $route() {
      this.getPatient();
    },
    patient(val) {
      if (val) {
        for (let item in val) {
          if (val[item]) {
            this.form[item] = val[item];
          }
        }
      }
    },
    options(val) {
      if (this.patient) {
        let per = val.itemsPerPage;
        if (per == -1) {
          per = this.meta.total;
        }
        this.getSession(per, val.page, val.sortBy[0], val.sortDesc[0]);
      }
    }
  }
};
</script>

<style></style>
