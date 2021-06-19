<template>
  <v-row justify="center">
    <v-dialog :value="value" max-width="500" persistent>
      <v-card :loading="loading">
        <v-card-title class="headline text-capitalize">
          {{
            item ? "Update Patient " + item.name : "Create a New Patient"
          }}</v-card-title
        >

        <v-card-text>
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
                  label="Gender"
                  v-model="form.gender"
                  required
                  v-bind="inputStyle"
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
        </v-card-text>

        <v-card-actions class="back justify-space-between py-4">
          <v-btn
            color="red darken-1"
            class="white--text font-weight-medium text-capitalize text-capitalize"
            @click="$emit('input', false)"
            v-bind="btnStyle"
          >
            cancel
          </v-btn>
          <v-btn
            color="primary"
            class="white--text font-weight-medium text-capitalize text-capitalize"
            @click="validate()"
            :loading="loading"
            v-bind="btnStyle"
          >
            {{ item ? "Update Patient" : "Add Patient" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="invalidKey" max-width="500" persistent>
      <v-card :loading="checkKeyLoading">
        <v-card-title class="headline text-capitalize">
          {{ msg ? msg : "please active your account" }}</v-card-title
        >

        <v-card-text>
          <p class="subtitle-1">
            Call any of this number to get active code
          </p>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <a href="tel:01097171325">01097171325</a>
              </v-list-item-title>
              <v-list-item-subtitle>
                (reda awad , developer)</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <a href="tel:01032633647">01032633647 </a>
              </v-list-item-title>
              <v-list-item-subtitle>
                (saad karam , developer)</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <a href="tel:01025045392">01025045392</a>
              </v-list-item-title>
              <v-list-item-subtitle>
                (Dr/ahmed assi , doctor)</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-form ref="form2" v-model="valid2" lazy-validation>
            <v-textarea
              v-model="key"
              label="enter key"
              required
              v-bind="inputStyle"
              clearable
              dense
              auto-grow
              no-resize
              :rules="reqRules"
              rows="2"
              :error-messages="errMsg"
            >
            </v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions class="back justify-space-between py-4">
          <v-btn
            color="red darken-1"
            class="white--text font-weight-medium text-capitalize text-capitalize"
            @click="invalidKey = false"
            v-bind="btnStyle"
          >
            cancel
          </v-btn>
          <v-btn
            color="primary"
            class="white--text font-weight-medium text-capitalize text-capitalize"
            @click="checkKey()"
            :loading="checkKeyLoading"
            v-bind="btnStyle"
          >
            active
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {
  PATIENTS_NAMESPACE,
  AUTH_NAMESPACE
} from "../../store/modules/namespaces";
var CryptoJS = require("crypto-js");
import { getItem, setItem } from "../../helpers/storage";
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters[`${AUTH_NAMESPACE}/currentUser`];
    },
    meta() {
      return this.$store.getters[`${PATIENTS_NAMESPACE}/meta`];
    },
    item: {
      get() {
        return this.$store.getters[`${PATIENTS_NAMESPACE}/editItem`];
      },
      set(val) {
        this.$store.commit(`${PATIENTS_NAMESPACE}/updateEditItem`, val);
      }
    },
    inputStyle() {
      return this.$store.getters.inputStyle;
    },
    btnStyle() {
      return this.$store.getters.btnStyle;
    }
  },
  data() {
    return {
      msg: "",
      key: "",
      invalidKey: false,
      checkKeyLoading: false,
      valid: true,
      valid2: true,
      loading: false,
      nameRules: [
        v => !!v || "field is required",
        v => v.length > 1 || "field must be at least 2 characters"
      ],
      reqRules: [v => !!v || "field is required"],
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
      errMsg: ""
    };
  },
  methods: {
    checkKey() {
      if (this.$refs.form2.validate()) {
        setItem("DA_K_E", this.key);
        this.validate();
      }
    },
    isActive() {
      this.errMsg = "";
      let key = getItem("DA_K_E");

      if (key) {
        var decrypted = CryptoJS.AES.decrypt(key, "generate DA Key &&");
        if (decrypted.toString(CryptoJS.enc.Utf8) == this.currentUser.email) {
          return true;
        } else {
          this.errMsg = "wrong key";
        }
      }
      this.invalidKey = true;
      return false;
    },
    validate() {
      if (this.meta.total >= 1) {
        if (!this.isActive()) {
          setItem("isAc", false);
          this.msg = "You can't create more  patients before active";

          return;
        } else {
          setItem("isAc", true);
        }
      }
      this.invalidKey = false;
      this.errors = [];
      if (this.$refs.form.validate()) {
        this.loading = true;
        if (this.item) {
          this.form["_method"] = "patch";
        }
        this.$store
          .dispatch(`${PATIENTS_NAMESPACE}/create`, this.form)
          .then(res => {
            this.loading = false;
            this.$emit("input", false);
            this.$router.push(`patients/${res.id}`);
          })
          .catch(rej => {
            this.loading = false;
            this.errors = rej.response.data.errors;
          });
      }
    }
  },
  destroyed() {
    this.item = null;
  },
  beforeMount() {
    if (this.item) {
      for (let item in this.item) {
        if (this.item[item]) {
          this.form[item] = this.item[item];
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
