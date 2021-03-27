<template>
  <div>
    <div class="d-flex report_wrapper1">
      <v-sheet width="270px" color="#303D4B" class="left pa-5">
        <div class="dash"></div>
        <div class="title text-uppercase ">Patient Report</div>
        <div class="subtitle-2 text-uppercase mb-5">
          {{ new Date().toDateString() }}
        </div>
        <div class="subtitle-1 text-capitalize border-bottom-1">
          Doctore Info
        </div>
        <div class="text-center title py-3 text-capitalize font-bold">
          {{ currentUser.info.enName }}
        </div>
        <div class="text-center">Ophthalmologist</div>
        <v-list two-line color="transparent" flat dark v-if="currentUser">
          <v-list-item v-if="currentUser.info.personalPhone">
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-phone
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{
                currentUser.info.personalPhone
              }}</v-list-item-title>
              <v-list-item-subtitle>Mobile</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="currentUser.info.clinicPhone">
            <v-list-item-action></v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{
                currentUser.info.clinicPhone
              }}</v-list-item-title>
              <v-list-item-subtitle>Work</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item v-if="currentUser.email">
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-email
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="allow">{{
                currentUser.email
              }}</v-list-item-title>
              <v-list-item-subtitle>Work</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset v-if="currentUser.email"></v-divider>

          <v-list-item v-if="repAdd">
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-map-marker
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-subtitle class="allow">{{
                repAdd
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div class="subtitle-1 text-capitalize border-bottom-1">
          Patient Info
        </div>
        <div class="text-center title py-3 text-capitalize" v-if="patient">
          {{ patient.name }}
        </div>
        <v-list two-line color="transparent" flat dark v-if="patient">
          <v-list-item v-if="patient.age">
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-account
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ patient.age }}</v-list-item-title>
              <v-list-item-subtitle>Age</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset v-if="patient.phone"></v-divider>

          <v-list-item v-if="patient.gender">
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-account-box-multiple-outline
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="allow">{{
                patient.gender
              }}</v-list-item-title>
              <v-list-item-subtitle>Gender</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset v-if="patient.gender"></v-divider>

          <v-list-item v-if="patient.address">
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-map-marker
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-subtitle class="allow">{{
                patient.address
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
      <v-sheet class="right pa-5" v-if="session">
        <v-toolbar max-height="56px" flat class="mb-4 disNone">
          <v-overflow-btn
            :items="dropdown_template"
            label="Select template"
            hide-details
            :value="currentComponent"
            @change="updateVal"
            class="pa-0"
            title="prescription template"
          ></v-overflow-btn>
          <v-slider
            v-model="zoom"
            hide-details
            track-color="grey"
            class="mx-3"
            always-dirty
          >
            <template v-slot:prepend>
              <v-icon @click="zoom--">
                mdi-minus
              </v-icon>
            </template>

            <template v-slot:append>
              <v-icon @click="zoom++">
                mdi-plus
              </v-icon>
            </template>
          </v-slider>
          <v-btn text @click="printRep()">print</v-btn>
        </v-toolbar>
        <v-sheet class="section" v-if="session.complaint.description">
          <div class="dash"></div>
          <div class="title  mb-5 fontColor font-weight-bold">
            Patient Complaint
          </div>
          <p>{{ $arrayToString(session.complaint.description, " ") }}</p>
          <v-divider></v-divider>
        </v-sheet>

        <v-sheet class="section" v-if="session.history.description">
          <div class="dash"></div>
          <div class="title  mb-5 fontColor font-weight-bold">
            Patient History
          </div>
          <p>{{ $arrayToString(session.history.description, " ") }}</p>
          <v-divider></v-divider>
        </v-sheet>

        <v-sheet class="section" v-if="session.diagnosis">
          <div class="dash"></div>
          <div class="title  mb-5 fontColor font-weight-bold">
            Diagnosis
          </div>
          <p v-for="(di, index) in session.diagnosis" :key="index + 'di'">
            {{ di.diagnosis }}
          </p>
          <v-divider></v-divider>
        </v-sheet>
        <v-sheet class="section" v-if="session.examination.description">
          <div class="dash"></div>
          <div class="title  mb-5 fontColor font-weight-bold">
            Examination
          </div>
          <div class="d-flex justify-space-around">
            <div class="d-flex flex-column align-center">
              <span>Right Eye</span>
              <v-chip-group active-class="primary--text">
                <v-chip small class="mr-0">
                  {{ session.examination.UC_VA_R }}
                </v-chip>
                <v-icon
                  small
                  color="#ed3657"
                  v-if="session.examination.BC_VA_R"
                >
                  mdi-arrow-right
                </v-icon>
                <v-chip small v-if="session.examination.BC_VA_R">
                  {{ session.examination.BC_VA_R }}
                </v-chip>
              </v-chip-group>
            </div>

            <div class="d-flex flex-column align-center">
              <span>Left Eye</span>
              <v-chip-group active-class="primary--text">
                <v-chip small class="mr-0">
                  {{ session.examination.UC_VA_L }}
                </v-chip>
                <v-icon
                  small
                  color="#ed3657"
                  v-if="session.examination.BC_VA_L"
                >
                  mdi-arrow-right
                </v-icon>
                <v-chip small v-if="session.examination.BC_VA_L">
                  {{ session.examination.BC_VA_L }}
                </v-chip>
              </v-chip-group>
            </div>
          </div>

          <p class="my-4">
            {{ $arrayToString(session.examination.description, " ") }}
          </p>
        </v-sheet>
      </v-sheet>
    </div>
    <div
      class="pa-5"
      v-if="
        session && (session.medicines.length > 0 || session.requests.length > 0)
      "
    >
      <v-sheet class="section" v-if="session.medicines.length > 0">
        <div class="dash"></div>
        <div class="title  mb-5 fontColor font-weight-bold">
          Medicines
        </div>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Doses
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in session.medicines"
                :key="item.id + item.medicine"
              >
                <td>{{ item.medicine }}</td>
                <td>{{ item.dose }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-divider></v-divider>
      </v-sheet>
      <v-sheet class="section py-5" v-if="session.requests.length > 0">
        <div class="dash"></div>
        <div class="title  mb-5 fontColor font-weight-bold">
          Requests
        </div>
        <p v-for="req in session.requests" :key="req.id + 'req'">
          {{ req.request }}
        </p>
      </v-sheet>
      <div class="generate">
        report generated by doctor assisstant application
      </div>
    </div>
  </div>
</template>

<script>
import { getItem } from "../../../helpers/storage";
import { AUTH_NAMESPACE } from "../../../store/modules/namespaces";

export default {
  name: "repTemplate1",
  props: ["patient", "session", "currentComponent", "dropdown_template"],
  computed: {
    currentUser() {
      return this.$store.getters[`${AUTH_NAMESPACE}/currentUser`];
    }
  },
  data() {
    return {
      zoom: 100,
      repAdd: ""
    };
  },
  methods: {
    printRep() {
      window.print();
    },
    updateVal(val) {
      this.$emit("update:currentComponent", val);
    }
  },
  mounted() {
    this.repAdd = getItem("repAddress") || this.currentUser.info.address;
  },
  watch: {
    zoom(val) {
      document.querySelector(".report_wrapper1").style.zoom = +val / 100;
    }
  }
};
</script>

<style lang="scss" scoped>
@media print {
  p {
    font-size: 14px;
  }
}
.generate {
  font-size: 10px;
}
.v-list-item__subtitle {
  font-size: 0.775rem;
}
.v-list-item__title {
  font-size: 0.875rem;
}
.allow {
  white-space: pre-wrap;
}
.border-bottom-1 {
  border-bottom: 1px solid #545e69;
}
.dash {
  background-color: #ed3657;
  width: 20px;
  height: 2px;
}
.fontColor {
  color: #34414e;
}
.left {
  color: #fff;
  min-height: 880px;
  max-height: 880px;
  height: 880px;
}
.right {
  flex: 1;
  .section {
    padding-top: 20px;
  }
  thead,
  thead tr {
    background: #fff !important;
  }
  thead tr th {
    color: rgba(0, 0, 0, 0.6) !important;
  }
}
</style>
