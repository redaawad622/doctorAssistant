<template>
  <div>
    <v-subheader class="px-0 mx-0" v-if="label && selectType === 'chip'">{{
      label
    }}</v-subheader>
    <v-chip-group
      v-if="selectType === 'chip'"
      center-active
      :value="value"
      @change="changeItem"
      active-class="primary"
      :column="!$vuetify.breakpoint.xs"
    >
      <v-chip small filter v-for="item in items" :key="item" :value="item">{{
        item
      }}</v-chip>
    </v-chip-group>
    <template v-else-if="selectType === 'autocomplete'">
      <v-combobox
        v-if="allow"
        :items="items"
        :value="value"
        @change="changeItem"
        allow-overflow
        v-bind="inputStyle"
        :label="label"
        @focus="focusEmit()"
        :dense="dense"
        :hide-details="hideDetails"
        :id="id"
        :cache-items="true"
      ></v-combobox>
      <v-autocomplete
        v-else
        :items="items"
        :value="value"
        @change="changeItem"
        allow-overflow
        @focus="focusEmit()"
        v-bind="inputStyle"
        :label="label"
        :hide-details="hideDetails"
        :dense="dense"
      ></v-autocomplete>
    </template>
    <v-select
      v-else
      :items="items"
      :value="value"
      @change="changeItem"
      allow-overflow
      @focus="focusEmit()"
      :hide-details="hideDetails"
      v-bind="inputStyle"
      :label="label"
      :dense="dense"
    ></v-select>
    <select @change="changeItem" :value="value">
      <option v-for="item in items" :key="id + item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Number, String],
      default: ""
    },
    type: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: ""
    },
    allow: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: [Boolean, String],
      default: false
    },
    id: {
      type: String,
      default: () => {
        const length = 5;
        let result = "";
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }
    }
  },
  computed: {
    selectType() {
      let type = this.type;
      if (!type) {
        type = this.$store.getters.selectType;
      }
      return type;
    },
    inputStyle() {
      return this.$store.getters.inputStyle;
    }
  },
  methods: {
    focusEmit() {
      this.$emit("focus");
    },
    changeItem(val) {
      this.$emit("input", val.target.value);
    }
  }
};
</script>

<style></style>
