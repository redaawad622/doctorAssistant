<template>
  <div>
    <ul v-if="medicines">
      <li v-for="(med, index) in medicines" :key="`prisMed${index}`">
        <span class="med body-1" :style="`font-size:${16 * font}px !important`"
          ><pre>{{ med.medicine }}</pre></span
        ><span
          class="dose text-center subtitle-1"
          :style="`font-size:${14 * font}px !important`"
          ><pre>{{ med.dose }}</pre></span
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { SESSION_NAMESPACE } from "../../../store/modules/namespaces";
export default {
  name: "med",
  props: {
    font: {
      type: Number,
      default: 1
    }
  },
  computed: {
    medicines() {
      return this.$store.getters[`${SESSION_NAMESPACE}/medicines`];
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
ul li {
  padding: 8px 0;
}
</style>
