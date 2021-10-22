<template>
  <v-card flat>
    <v-card-text>
      <v-simple-table fixed-header class="cTable">
        <template v-slot:default>
          <thead>
            <tr>
              <td class="body-1">#</td>
              <td class="body-1">Right Eye</td>
              <td class="body-1">Left Eye</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UC_BC_VA</td>
              <td>
                <v-row>
                  <v-col cols="12" sm="6">
                    <custom-select
                      :allow="true"
                      :items="VA_List"
                      label="UCVA"
                      hideDetails="auto"
                      :dense="true"
                      v-model="r_UCVA"
                    ></custom-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <custom-select
                      :allow="true"
                      :items="VA_List"
                      label="BCVA"
                      hideDetails="auto"
                      :dense="true"
                      v-model="r_BCVA"
                    ></custom-select>
                  </v-col>
                </v-row>
              </td>
              <td>
                <v-row>
                  <v-col cols="12" sm="6">
                    <custom-select
                      :allow="true"
                      :items="VA_List"
                      label="UCVA"
                      hideDetails="auto"
                      :dense="true"
                      v-model="l_UCVA"
                    ></custom-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <custom-select
                      :allow="true"
                      :items="VA_List"
                      label="BCVA"
                      hideDetails="auto"
                      :dense="true"
                      v-model="l_BCVA"
                    ></custom-select>
                  </v-col>
                </v-row>
              </td>
            </tr>
            <tr>
              <td>Dist.</td>
              <td>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <custom-select
                      :allow="true"
                      :items="sph_list"
                      label="Sph"
                      type="autocomplete"
                      :dense="true"
                      hideDetails="auto"
                      v-model="r_sph"
                    ></custom-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <custom-select
                      :allow="true"
                      :items="cyl_list"
                      label="Cyl"
                      type="autocomplete"
                      :dense="true"
                      hideDetails="auto"
                      v-model="r_cyl"
                    ></custom-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <custom-select
                      :allow="true"
                      :items="axis_list"
                      label="Axis"
                      type="autocomplete"
                      :dense="true"
                      hideDetails="auto"
                      v-model="r_axis"
                    ></custom-select>
                  </v-col>
                </v-row>
              </td>
              <td>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <custom-select
                      :allow="true"
                      :items="sph_list"
                      label="Sph"
                      type="autocomplete"
                      :dense="true"
                      hideDetails="auto"
                      v-model="l_sph"
                    ></custom-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <custom-select
                      :allow="true"
                      :items="cyl_list"
                      label="Cyl"
                      type="autocomplete"
                      :dense="true"
                      hideDetails="auto"
                      v-model="l_cyl"
                    ></custom-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <custom-select
                      :allow="true"
                      :items="axis_list"
                      label="Axis"
                      type="autocomplete"
                      :dense="true"
                      hideDetails="auto"
                      v-model="l_axis"
                    ></custom-select>
                  </v-col>
                </v-row>
              </td>
            </tr>
            <tr>
              <td>Near</td>
              <td>
                <v-row>
                  <v-col cols="12">
                    <custom-select
                      :allow="true"
                      :items="add_list"
                      label="Add"
                      hideDetails="auto"
                      :dense="true"
                      v-model="r_add"
                    ></custom-select>
                  </v-col>
                </v-row>
              </td>
              <td>
                <v-row>
                  <v-col cols="12">
                    <custom-select
                      :allow="true"
                      :items="add_list"
                      label="Add"
                      hideDetails="auto"
                      :dense="true"
                      v-model="l_add"
                    ></custom-select>
                  </v-col>
                </v-row>
              </td>
            </tr>
            <tr>
              <td>IPD</td>
              <td colspan="2">
                <v-row>
                  <v-col cols="12">
                    <custom-select
                      :allow="true"
                      :items="ipd_list"
                      hideDetails="auto"
                      :dense="true"
                      v-model="ipd"
                    ></custom-select>
                  </v-col>
                </v-row>
              </td>
            </tr>
            <tr>
              <td>Notes</td>
              <td colspan="2">
                <v-row>
                  <v-col cols="12">
                    <v-combobox
                      v-model="notes"
                      :items="note"
                      label="Notes"
                      multiple
                      :loading="loading"
                      cache-items
                      chips
                      clearable
                      v-bind="inputStyle"
                      deletable-chips
                      full-width
                      open-on-clear
                      hide-details="auto"
                      :search-input.sync="noSearchInput"
                      @change="noSearchInput = ''"
                    >
                    </v-combobox>
                  </v-col>
                </v-row>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  LIST_NAMESPACE,
  TEMPLATES_NAMESPACE,
  SESSION_NAMESPACE
} from "../../../store/modules/namespaces";
import customSelect from "../../common/customSelect";
export default {
  name: "Glass",
  props: ["patient"],
  components: { customSelect },
  data() {
    return {
      noSearchInput: "",
      sph_list: [
        "+16.00",
        "+15.75",
        "+15.50",
        "+15.25",
        "+15.00",
        "+14.75",
        "+14.50",
        "+14.25",
        "+14.00",
        "+13.75",
        "+13.50",
        "+13.25",
        "+13.00",
        "+12.75",
        "+12.50",
        "+12.25",
        "+12.00",
        "+11.75",
        "+11.50",
        "+11.25",
        "+11.00",
        "+10.75",
        "+10.50",
        "+10.25",
        "+10.00",
        "+9.75",
        "+9.50",
        "+9.25",
        "+9.00",
        "+8.75",
        "+8.50",
        "+8.25",
        "+8.00",
        "+7.75",
        "+7.50",
        "+7.25",
        "+7.00",
        "+6.75",
        "+6.50",
        "+6.25",
        "+6.00",
        "+5.75",
        "+5.50",
        "+5.25",
        "+5.00",
        "+4.75",
        "+4.50",
        "+4.25",
        "+4.00",
        "+3.75",
        "+3.50",
        "+3.25",
        "+3.00",
        "+2.75",
        "+2.50",
        "+2.25",
        "+2.00",
        "+1.75",
        "+1.50",
        "+1.25",
        "+1.00",
        "+0.75",
        "+0.50",
        "+0.25",
        "0.00",
        "-0.25",
        "-0.50",
        "-0.75",
        "-1.00",
        "-1.25",
        "-1.50",
        "-1.75",
        "-2.00",
        "-2.25",
        "-2.50",
        "-2.75",
        "-3.00",
        "-3.25",
        "-3.50",
        "-3.75",
        "-4.00",
        "-4.25",
        "-4.50",
        "-4.75",
        "-5.00",
        "-5.25",
        "-5.50",
        "-5.75",
        "-6.00",
        "-6.25",
        "-6.50",
        "-6.75",
        "-7.00",
        "-7.25",
        "-7.50",
        "-7.75",
        "-8.00",
        "-8.25",
        "-8.50",
        "-8.75",
        "-9.00",
        "-9.25",
        "-9.50",
        "-9.75",
        "-10.00",
        "-10.25",
        "-10.50",
        "-10.75",
        "-11.00",
        "-11.25",
        "-11.50",
        "-11.75",
        "-12.00",
        "-12.25",
        "-12.50",
        "-12.75",
        "-13.00",
        "-13.25",
        "-13.50",
        "-13.75",
        "-14.00",
        "-14.25",
        "-14.50",
        "-14.75",
        "-15.00",
        "-15.25",
        "-15.50",
        "-15.75",
        "-16.00",
        "-16.25",
        "-16.50",
        "-16.75",
        "-17.00",
        "-17.25",
        "-17.50",
        "-17.75",
        "-18.00",
        "-18.25",
        "-18.50",
        "-18.75",
        "-19.00",
        "-19.25",
        "-19.50",
        "-19.75",
        "-20.00",
        "-20.25",
        "-20.50",
        "-20.75",
        "-21.00",
        "-21.25",
        "-21.50",
        "-21.75",
        "-22.00",
        "-22.25",
        "-22.50",
        "-22.75",
        "-23.00",
        "-23.25",
        "-23.50",
        "-23.75",
        "-24.00",
        "-24.25",
        "-24.50",
        "-24.75",
        "-25.00",
        "-25.25",
        "-25.50"
      ],
      cyl_list: [
        "+6.00",
        "+5.75",
        "+5.50",
        "+5.25",
        "+5.00",
        "+4.75",
        "+4.50",
        "+4.25",
        "+4.00",
        "+3.75",
        "+3.50",
        "+3.25",
        "+3.00",
        "+2.75",
        "+2.50",
        "+2.25",
        "+2.00",
        "+1.75",
        "+1.50",
        "+1.25",
        "+1.00",
        "+0.75",
        "+0.50",
        "+0.25",
        "0.00",
        "-0.25",
        "-0.50",
        "-0.75",
        "-1.00",
        "-1.25",
        "-1.50",
        "-1.75",
        "-2.00",
        "-2.25",
        "-2.50",
        "-2.75",
        "-3.00",
        "-3.25",
        "-3.50",
        "-3.75",
        "-4.00",
        "-4.25",
        "-4.50",
        "-4.75",
        "-5.00",
        "-5.25",
        "-5.50",
        "-5.75",
        "-6.00"
      ],
      axis_list: [
        "5°",
        "10°",
        "15°",
        "20°",
        "25°",
        "30°",
        "35°",
        "40°",
        "45°",
        "50°",
        "55°",
        "60°",
        "65°",
        "70°",
        "75°",
        "80°",
        "85°",
        "90°",
        "95°",
        "100°",
        "105°",
        "110°",
        "115°",
        "120°",
        "125°",
        "130°",
        "135°",
        "140°",
        "145°",
        "150°",
        "155°",
        "160°",
        "165°",
        "170°",
        "175°",
        "180°"
      ],
      add_list: [
        "+0.75",
        "+1.00",
        "+1.25",
        "+1.50",
        "+1.75",
        "+2.00",
        "+2.25",
        "+2.50",
        "+2.75",
        "+3.00",
        "+3.25",
        "+3.50",
        "+3.75",
        "+4.00",
        "+4.25",
        "+4.50",
        "+4.75",
        "+5.00",
        "+5.25",
        "+5.50",
        "+5.75",
        "+6.00"
      ],
      ipd_list: [
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
        "60",
        "61",
        "62",
        "63",
        "64",
        "65",
        "66",
        "67",
        "68",
        "69",
        "70",
        "71",
        "72",
        "73",
        "74",
        "75",
        "76",
        "77",
        "78",
        "79",
        "80",
        "To be measured"
      ],
      loading: false
    };
  },
  computed: {
    note() {
      return this.$store.getters[`${TEMPLATES_NAMESPACE}/notes`];
    },
    VA_List() {
      return this.$store.getters[`${LIST_NAMESPACE}/VA_List`];
    },
    inputStyle() {
      return this.$store.getters.inputStyle;
    },
    r_UCVA: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/glass`]["r_UCVA"];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/glass`, {
          name: "r_UCVA",
          value: val
        });
      }
    },
    r_BCVA: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/glass`]["r_BCVA"];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/glass`, {
          name: "r_BCVA",
          value: val
        });
      }
    },
    r_sph: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/glass`]["r_sph"];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/glass`, {
          name: "r_sph",
          value: val
        });
      }
    },
    r_cyl: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/glass`]["r_cyl"];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/glass`, {
          name: "r_cyl",
          value: val
        });
      }
    },
    r_axis: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/glass`]["r_axis"];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/glass`, {
          name: "r_axis",
          value: val
        });
      }
    },
    r_add: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/glass`]["r_add"];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/glass`, {
          name: "r_add",
          value: val
        });
      }
    },

    l_UCVA: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/glass`]["l_UCVA"];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/glass`, {
          name: "l_UCVA",
          value: val
        });
      }
    },
    l_BCVA: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/glass`]["l_BCVA"];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/glass`, {
          name: "l_BCVA",
          value: val
        });
      }
    },
    l_sph: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/glass`]["l_sph"];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/glass`, {
          name: "l_sph",
          value: val
        });
      }
    },
    l_cyl: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/glass`]["l_cyl"];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/glass`, {
          name: "l_cyl",
          value: val
        });
      }
    },
    l_axis: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/glass`]["l_axis"];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/glass`, {
          name: "l_axis",
          value: val
        });
      }
    },
    l_add: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/glass`]["l_add"];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/glass`, {
          name: "l_add",
          value: val
        });
      }
    },
    ipd: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/glass`]["ipd"];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/glass`, {
          name: "ipd",
          value: val
        });
      }
    },
    notes: {
      get() {
        const note = this.$store.getters[`${SESSION_NAMESPACE}/glass`]["notes"];
        if (note) {
          return note.split(",");
        }
        return [];
      },
      set(val) {
        this.$store.commit(`${SESSION_NAMESPACE}/glass`, {
          name: "notes",
          value: val.join(",")
        });
      }
    }
  },
  methods: {},
  created() {
    this.loading = true;
    this.$store.dispatch(`${TEMPLATES_NAMESPACE}/getNotes`).then(() => {
      this.loading = false;
    });
  }
};
</script>
<style lang="scss" scoped>
tr td {
  text-align: center;
}
</style>
