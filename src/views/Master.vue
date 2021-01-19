<template>
  <v-app id="sandbox">
    <imagePreview
      :images="images"
      :path="path"
      :current="currentImg"
      v-if="images"
    />
    <printPres></printPres>
    <navDrawer
      :mini="mini"
      @mini="mini = !mini"
      v-if="!hide && $vuetify.theme.layout === 'Vertical'"
    />
    <appNav @mini="mini = !mini" :mini="mini" v-if="!hide" />
    <v-main>
      <v-container
        fluid
        :class="{
          'pa-0': hide && !$vuetify.breakpoint.xs,
          'py-0': hide && $vuetify.breakpoint.xs
        }"
      >
        <v-row align="center" justify="center">
          <router-view></router-view>
        </v-row>
        <create v-if="dialog" v-model="dialog"></create>
      </v-container>
    </v-main>
    <appFooter v-if="!hide" />
  </v-app>
</template>
<script>
import navDrawer from "../components/basic/navDrawer";
import appNav from "../components/basic/appNav";
import appFooter from "../components/basic/appFooter";
import {
  AUTH_NAMESPACE,
  PATIENTS_NAMESPACE,
  SESSION_NAMESPACE
} from "../store/modules/namespaces";
import { getItem } from "../helpers/storage";
import create from "../components/patient/create";
import imagePreview from "../components/common/imagePreview";
import printPres from "../components/sessions/print";

export default {
  name: "Master",

  components: {
    navDrawer,
    appNav,
    appFooter,
    create,
    imagePreview,
    printPres
  },
  data: () => ({
    mini: false
  }),
  computed: {
    hide() {
      return this.$route.meta && this.$route.meta.hide;
    },
    currentUser() {
      return this.$store.getters[`${AUTH_NAMESPACE}/currentUser`];
    },
    dialog: {
      get() {
        return this.$store.getters[`${PATIENTS_NAMESPACE}/dialog`];
      },
      set(val) {
        this.$store.commit(`${PATIENTS_NAMESPACE}/updateDialog`, val);
      }
    },
    images() {
      return this.$store.getters[`${SESSION_NAMESPACE}/images`];
    },
    path() {
      return this.$store.getters[`${SESSION_NAMESPACE}/path`];
    },
    currentImg() {
      return this.$store.getters[`${SESSION_NAMESPACE}/currentImg`];
    }
  },
  created() {
    if (!this.currentUser && !this.$route.meta.auth) {
      this.$router.replace("/auth/login");
    }
    const color = getItem("color") || "#336cfb";
    const dark = getItem("dark") || false;
    const layout = getItem("layout") || "Vertical";
    this.$vuetify.theme.themes.light.primary = color;

    // Dark theme
    this.$vuetify.theme.themes.dark.primary = color;
    this.$vuetify.theme.dark = dark;
    this.$vuetify.theme.layout = layout;
  }
};
</script>
