<template>
  <v-simple-table class="borderTable">
    <tr>
      <td colspan="1">#</td>
      <td colspan="5">Right Eye</td>
      <td colspan="5">Left Eye</td>
    </tr>

    <tbody>
      <tr>
        <td colspan="1"></td>
        <td colspan="5">
          <v-row>
            <v-col cols="6">
              <div class="data">
                <span
                  class="name"
                  :style="`font-size:${11 * font}px !important`"
                  >UCVA</span
                >
                <span
                  class="value"
                  :style="`font-size:${14 * font}px !important`"
                  >{{ glass.r_UCVA }}</span
                >
              </div>
            </v-col>
            <v-col cols="6">
              <div class="data noneBorder">
                <span
                  class="name"
                  :style="`font-size:${11 * font}px !important`"
                  >BCVA</span
                >
                <span
                  class="value"
                  :style="`font-size:${14 * font}px !important`"
                  >{{ glass.r_BCVA }}</span
                >
              </div>
            </v-col>
          </v-row>
        </td>
        <td colspan="5">
          <v-row>
            <v-col cols="6">
              <div class="data">
                <span
                  class="name"
                  :style="`font-size:${11 * font}px !important`"
                  >UCVA</span
                >
                <span
                  class="value"
                  :style="`font-size:${14 * font}px !important`"
                  >{{ glass.l_UCVA }}</span
                >
              </div>
            </v-col>
            <v-col cols="6">
              <div class="data noneBorder">
                <span
                  class="name"
                  :style="`font-size:${11 * font}px !important`"
                  >BCVA</span
                >
                <span
                  class="value"
                  :style="`font-size:${14 * font}px !important`"
                  >{{ glass.l_BCVA }}</span
                >
              </div>
            </v-col>
          </v-row>
        </td>
      </tr>
      <tr>
        <td colspan="1">Dist.</td>
        <td colspan="5">
          <v-row>
            <v-col cols="4">
              <div class="data">
                <span
                  class="name"
                  :style="`font-size:${11 * font}px !important`"
                  >Sph</span
                >
                <span
                  class="value"
                  :style="`font-size:${14 * font}px !important`"
                  >{{ glass.r_sph }}</span
                >
              </div>
            </v-col>
            <v-col cols="4">
              <div class="data">
                <span
                  class="name"
                  :style="`font-size:${11 * font}px !important`"
                  >Cyl</span
                >
                <span
                  class="value"
                  :style="`font-size:${14 * font}px !important`"
                  >{{ glass.r_cyl }}</span
                >
              </div>
            </v-col>
            <v-col cols="4">
              <div class="data noneBorder">
                <span
                  class="name"
                  :style="`font-size:${11 * font}px !important`"
                  >Axis</span
                >
                <span
                  class="value"
                  :style="`font-size:${14 * font}px !important`"
                  >{{ glass.r_axis }}</span
                >
              </div>
            </v-col>
          </v-row>
        </td>
        <td colspan="5">
          <v-row>
            <v-col cols="4">
              <div class="data">
                <span
                  class="name"
                  :style="`font-size:${11 * font}px !important`"
                  >Sph</span
                >
                <span
                  class="value"
                  :style="`font-size:${14 * font}px !important`"
                  >{{ glass.l_sph }}</span
                >
              </div>
            </v-col>
            <v-col cols="4">
              <div class="data">
                <span
                  class="name"
                  :style="`font-size:${11 * font}px !important`"
                  >Cyl</span
                >
                <span
                  class="value"
                  :style="`font-size:${14 * font}px !important`"
                  >{{ glass.l_cyl }}</span
                >
              </div>
            </v-col>
            <v-col cols="4">
              <div class="data noneBorder">
                <span
                  class="name"
                  :style="`font-size:${11 * font}px !important`"
                  >Axis</span
                >
                <span
                  class="value"
                  :style="`font-size:${14 * font}px !important`"
                  >{{ glass.l_axis }}</span
                >
              </div>
            </v-col>
          </v-row>
        </td>
      </tr>
      <tr>
        <td colspan="1">Near</td>
        <td colspan="5">
          <v-row>
            <v-col cols="12">
              <div class="data noneBorder">
                <span
                  class="name"
                  :style="`font-size:${11 * font}px !important`"
                  >Add</span
                >
                <span
                  class="value"
                  :style="`font-size:${14 * font}px !important`"
                  >{{ glass.r_add }}</span
                >
              </div>
            </v-col>
          </v-row>
        </td>
        <td colspan="5">
          <v-row>
            <v-col cols="12">
              <div class="data noneBorder">
                <span
                  class="name"
                  :style="`font-size:${11 * font}px !important`"
                  >Add</span
                >
                <span
                  class="value"
                  :style="`font-size:${14 * font}px !important`"
                  >{{ glass.l_add }}</span
                >
              </div>
            </v-col>
          </v-row>
        </td>
      </tr>
      <tr>
        <td colspan="1">IPD</td>
        <td colspan="10">
          <v-row>
            <v-col cols="12">
              <div class="data noneBorder">
                <span
                  class="name"
                  :style="`font-size:${11 * font}px !important`"
                ></span>
                <span
                  class="value"
                  :style="`font-size:${14 * font}px !important`"
                  >{{ glass.ipd }}</span
                >
              </div>
            </v-col>
          </v-row>
        </td>
      </tr>
      <tr>
        <td colspan="1">Notes</td>
        <td colspan="10">
          <v-row>
            <v-col cols="12">
              <div class="data noneBorder">
                <span
                  class="name"
                  :style="`font-size:${11 * font}px !important`"
                ></span>
                <span
                  class="value"
                  :style="`font-size:${14 * font}px !important`"
                  >{{ glass.notes }}</span
                >
              </div>
            </v-col>
          </v-row>
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
import { SESSION_NAMESPACE } from "../../../store/modules/namespaces";
export default {
  name: "req",
  props: {
    font: {
      type: Number,
      default: 1
    },
    borderColor: {
      type: String,
      default: ""
    }
  },
  computed: {
    glass() {
      return this.$store.getters[`${SESSION_NAMESPACE}/glass`];
    }
  }
};
</script>
<style>
.borderTable.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 0 5px !important;
}
</style>
<style lang="scss" scoped>
.data {
  display: flex;
  flex-direction: column;
  text-align: center;
  .value {
    font-weight: bold;
    min-height: 27px;
    border: 1px solid #b0b5c6;
    border-radius: 4px;
    margin-bottom: 4px;
  }
  .name {
    margin-bottom: 4px;
  }
}
.data.noneBorder {
  border-right: 0;
}

ul {
  list-style: none;
}
ul li {
  padding: 8px 0;
}

table tr td {
  text-align: center;
  padding: 2px 0;
}
</style>
<style>
.borderTable .v-data-table__wrapper {
  overflow-x: hidden;
}
.borderTable tr {
  background: transparent !important;
}

.borderTable tr td {
  border: 2px solid #b0b5c6;
}
</style>
