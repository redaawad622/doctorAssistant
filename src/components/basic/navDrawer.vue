<template>
  <v-navigation-drawer
    v-model="model"
    :clipped="clipped"
    :floating="floating"
    :mini-variant="mini && !$vuetify.breakpoint.xs"
    :permanent="!$vuetify.breakpoint.xs"
    :temporary="$vuetify.breakpoint.xs"
    app
    overflow
    :stateless="!$vuetify.breakpoint.xs"
    :color="!$vuetify.theme.dark ? '#FBFBFB' : null"
  >
    <v-list
      dense
      nav
      class="py-0 mb-4"
      :class="!mini && 'px-5'"
      v-model="selected"
    >
      <v-list-item two-line :class="mini && 'px-0'">
        <v-list-item-avatar>
          <v-img src="/img/logo.svg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Doctor Assistant</v-list-item-title>
          <v-list-item-subtitle>Application</v-list-item-subtitle>
        </v-list-item-content>
        <v-btn
          v-if="!mini && !$vuetify.breakpoint.xs"
          style="right:-10px"
          icon
          @click="$emit('mini')"
          absolute
          ><v-icon>mdi-chevron-left</v-icon></v-btn
        >
      </v-list-item>
      <template v-for="item in items">
        <template v-if="item.header">
          <v-divider
            v-if="item.divider && mini"
            :key="`header${item.header}`"
          ></v-divider>
          <template v-else>
            <v-subheader
              v-if="!mini"
              :key="`header${item.header}`"
              class="subtitle-1 text-uppercase color mt-4"
              >{{ item.header }}</v-subheader
            >
          </template>
        </template>

        <v-list-item v-else :key="item.title" link :to="item.to">
          <v-list-item-icon
            class="mr-2 d-flex align-center"
            v-if="mini || item.mini"
          >
            <v-icon color="#000" style="opacity:0.25" v-if="item.icon">{{
              item.icon
            }}</v-icon>

            <component :is="item.component" :opacity="0.25"> </component>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="black--text font-weight-bold">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <div class="d-flex justify-center" v-if="isAc">
      <v-btn
        :icon="mini"
        color="primary"
        height="40px"
        @click="openPatient()"
        class="border-radius text-capitalize subtitle-1 font-weight-medium mb-4"
        ><v-icon>mdi-plus</v-icon
        ><template v-if="!mini"> add patient</template></v-btn
      >
    </div>
  </v-navigation-drawer>
</template>

<script>
import patient from "../../svg/patient";
import dashboard from "../../svg/dashboard";
import state from "../../svg/state";
import todo from "../../svg/todo";
//import settings from '../../svg/todo';
import { PATIENTS_NAMESPACE } from "../../store/modules/namespaces";
import { getItem } from "../../helpers/storage";
export default {
  props: {
    mini: {
      type: Boolean,
      default: false
    }
  },
  beforeMount() {
    if (this.$vuetify.breakpoint.xs) {
      this.$emit("mini");
    }
  },
  data() {
    return {
      selected: 0,
      model: false,
      type: "Permanent",
      clipped: false,
      floating: true,
      items: [
        { header: "main", divider: true },
        { title: "Home", component: "dashboard", to: "/", mini: true },
        {
          title: "Statistics",
          component: "state",
          to: "/statistics",
          mini: true
        },
        {
          title: "Patients",
          component: "patient",
          to: "/patients",
          mini: true
        },
        {
          title: "To-Do",
          component: "todo",
          to: "/todo",
          mini: true
        },
        // {
        // 	title: 'Settings',
        // 	component: 'settings',
        // 	to: '/settings',
        // 	mini: true
        // },
        { header: "Templates", divider: true },
        {
          title: "Complaint",
          icon: "C",
          to: "/template/complaint"
        },

        {
          title: "History",
          icon: "H",
          to: "/template/history"
        },
        {
          title: "Examination",
          icon: "E",
          to: "/template/examination"
        },
        {
          title: "Medicines",
          icon: "M",
          to: "/template/medicines"
        },
        { title: "Doses", icon: "Do", to: "/template/doses" },
        {
          title: "Diagnosis",
          to: "/template/diagnosis",
          icon: "Di"
        },
        {
          title: "Requests",
          to: "/template/requests",
          icon: "R"
        },
        {
          title: "Glass Notes",
          to: "/template/notes",
          icon: "G"
        }
      ]
    };
  },
  components: {
    patient,
    dashboard,
    state,
    todo
    //settings
  },
  computed: {
    isAc() {
      return getItem("isAc");
    }
  },
  methods: {
    openPatient() {
      this.$store.commit(`${PATIENTS_NAMESPACE}/updateDialog`, true);
    }
  }
};
</script>
<style>
/* width */
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f2f2f2;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #bcbcbc;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
