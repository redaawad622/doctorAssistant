<template>
  <v-row justify="center" class="printPres">
    <v-dialog
      :value="value"
      @input="close()"
      persistent
      scrollable
      fullscreen
      class="dia"
    >
      <v-card class="flex-column">
        <v-btn
          text
          absolute
          color="red"
          style="z-index:9"
          @click="preview = false"
          :class="{ disNoneP: !preview }"
          >cancel</v-btn
        >
        <v-toolbar
          max-height="56px"
          flat
          class="mb-4 disNone"
          :class="{ disNoneP: preview }"
        >
          <v-overflow-btn
            :items="dropdown_template"
            label="Select template"
            hide-details
            v-model="prStyle.temp"
            class="pa-0"
            title="prescription template"
          ></v-overflow-btn>
          <v-overflow-btn
            :items="dropdown_font"
            label="font family"
            hide-details
            v-model="prStyle.fontFamily"
            class="pa-0 mx-3"
            title="font family"
          ></v-overflow-btn>
          <v-overflow-btn
            :items="themes"
            label="change theme"
            hide-details
            v-model="prStyle.theme"
            class="pa-0 mx-3"
            title="quick theming"
          ></v-overflow-btn>
          <v-overflow-btn
            :items="fontWeights"
            label="font weight"
            hide-details
            v-model="prStyle.fontWeight"
            class="pa-0 mx-3"
            title="font weight"
          ></v-overflow-btn>
          <v-text-field
            style="max-width:120px"
            hide-details
            class="pa-0 mx-3"
            outlined
            dense
            type="number"
            v-model="prStyle.paddingL"
            label="padding left"
            title="padding left"
          ></v-text-field>
          <v-text-field
            style="max-width:120px"
            hide-details
            class="pa-0 mx-3"
            outlined
            dense
            type="number"
            v-model="prStyle.paddingR"
            label="padding right"
            title="padding right"
          ></v-text-field>
          <template>
            <v-spacer></v-spacer>

            <v-btn text @click="plusFont()" title="increase font size">
              <v-icon>mdi-format-font-size-increase</v-icon>
            </v-btn>

            <v-btn
              text
              style="font-size:14px;font-weight:bold"
              @click="minsFont()"
              title="decrease font size"
            >
              <v-icon size="20">mdi-format-font-size-decrease</v-icon>
            </v-btn>

            <v-menu
              v-model="color"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  v-model="color"
                  text
                  :color="prStyle[`color${tab}`]"
                  title="font color"
                >
                  <v-icon>mdi-format-color-text</v-icon>
                </v-btn>
              </template>
              <v-color-picker v-model="prStyle[`color${tab}`]"></v-color-picker>
            </v-menu>
            <v-menu
              v-model="color2"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  v-model="color2"
                  text
                  :color="prStyle.borderColor"
                  title="border color"
                >
                  <v-icon>mdi-select-color</v-icon>
                </v-btn>
              </template>
              <v-color-picker v-model="prStyle.borderColor"></v-color-picker>
            </v-menu>
            <v-menu
              v-model="color3"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  v-model="color3"
                  class="elevation-0"
                  :color="prStyle.background"
                  title="background color"
                >
                  <v-icon>mdi-format-color-fill</v-icon>
                </v-btn>
              </template>
              <v-color-picker v-model="prStyle.background"></v-color-picker>
            </v-menu>
            <v-btn text @click="reset()">reset</v-btn>
          </template>
        </v-toolbar>
        <v-card-text
          contenteditable
          class="presc fill-height"
          :class="{ 'A5 elevation-10 my-auto': preview }"
          :style="
            `background-color:${prStyle.background}; padding-left:${prStyle.paddingL}px;padding-right:${prStyle.paddingR}px`
          "
        >
          <presc1
            v-if="prStyle.temp === 'template 1'"
            @updateTab="updateTab"
            :tab="tab"
            :preview="preview"
            v-bind="prStyle"
          ></presc1>
          <presc2
            v-if="prStyle.temp === 'template 2'"
            @updateTab="updateTab"
            :tab="tab"
            v-bind="prStyle"
            :preview="preview"
          ></presc2>
        </v-card-text>
        <v-card-actions
          class="back justify-space-between py-4 mt-auto disNone"
          :class="{ disNoneP: preview }"
        >
          <v-btn
            v-bind="btnStyle"
            color="red darken-1"
            class="white--text font-weight-medium text-capitalize text-capitalize"
            @click="close()"
            >close</v-btn
          >
          <div>
            <v-btn
              v-bind="btnStyle"
              color="primary"
              class="white--text font-weight-medium text-capitalize text-capitalize me-3"
              @click="preview = true"
              >Preview</v-btn
            >
            <v-btn
              v-bind="btnStyle"
              color="primary"
              class="white--text font-weight-medium text-capitalize text-capitalize me-3"
              @click="print()"
              >Print</v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { SESSION_NAMESPACE } from "../../store/modules/namespaces";
import presc1 from "../patient/presc1";
import presc2 from "../patient/presc2";
import { getItem, setItem } from "../../helpers/storage";
export default {
  components: {
    presc1,
    presc2
  },
  data() {
    return {
      dropdown_template: [{ text: "template 1" }, { text: "template 2" }],
      dropdown_font: [
        "Roboto,sans-serif",
        '"Abel", sans-serif',
        '"Josefin Sans", sans-serif',
        '"Lato", sans-serif',
        "serif",
        "cursive",
        "fantasy",
        "monospace",
        "sans-serif"
      ],
      themes: [
        "default",
        "red background",
        "yellow background",
        "mono",
        "colored mono",
        "colored mono2",
        "colored mono3",
        "colored1",
        "colored2",
        "colored3",
        "colored4",
        "multi colors1",
        "multi colors2",
        "black",
        "black invert",
        "grey"
      ],
      fontWeights: ["lighter", "normal", "bold", "bolder"],
      tab: 1,
      color: false,
      color2: false,
      color3: false,
      preview: false,
      prStyle: {
        temp: "template 1",
        font1: 1,
        font2: 1,
        font3: 1,
        font4: 1,
        color1: "#333",
        color2: "#333",
        color3: "#333",
        color4: "#333",
        borderColor: "#3272ab",
        background: "#fff",
        fontFamily: "Roboto,sans-serif",
        theme: "default",
        fontWeight: "normal",
        paddingL: 20,
        paddingR: 20
      }
    };
  },
  computed: {
    printType() {
      return this.$store.getters[`${SESSION_NAMESPACE}/printType`];
    },
    value: {
      get() {
        return this.$store.getters[`${SESSION_NAMESPACE}/printDialog`];
      },
      set(val) {
        return this.$store.commit(`${SESSION_NAMESPACE}/updatePrint`, val);
      }
    },
    btnStyle() {
      return this.$store.getters.btnStyle;
    }
  },
  mounted() {
    const pr = getItem("prStyle");
    if (pr) this.prStyle = pr;
  },
  methods: {
    reset() {
      this.prStyle = {
        temp: "template 1",
        font1: 1,
        font2: 1,
        font3: 1,
        font4: 1,
        color1: "#333",
        color2: "#333",
        color3: "#333",
        color4: "#333",
        borderColor: "#3272abff",
        background: "#fff",
        fontFamily: "Roboto,sans-serif",
        theme: "default",
        fontWeight: "normal",
        paddingL: 20,
        paddingR: 20
      };
      setItem("prStyle", this.prStyle);
    },
    updateTab(val) {
      this.tab = val;
    },
    plusFont() {
      this.prStyle[`font${this.tab}`] += 0.05;
    },
    minsFont() {
      this.prStyle[`font${this.tab}`] -= 0.05;
    },
    setColor(val) {
      this.prStyle[`color${this.tab}`] -= val;
    },
    close() {
      this.value = false;
    },
    print() {
      setItem("prStyle", this.prStyle);
      this.$printing();
    }
    //
  },
  watch: {
    printType(val) {
      switch (val) {
        case "med":
          this.content = "med";
          break;
        case "glass":
          this.content = "glass";
          break;
        case "req":
          this.content = "req";
          break;
      }
    },

    "prStyle.theme"(val) {
      if (val) {
        switch (val) {
          case "default":
            this.reset();
            break;
          case "red background":
            this.prStyle = {
              ...this.prStyle,
              color1: "#333",
              color2: "#333",
              color3: "#333",
              color4: "#333",
              borderColor: "#da1010ff",
              background: "#ff000031",
              fontFamily: "Roboto,sans-serif"
            };
            break;
          case "yellow background":
            this.prStyle = {
              ...this.prStyle,
              color1: "#333",
              color2: "#333",
              color3: "#333",
              color4: "#333",
              borderColor: "#DA7C10FF",
              background: "#F7F7ECFF",
              fontFamily: "Roboto,sans-serif"
            };
            break;
          case "mono":
            this.prStyle = {
              ...this.prStyle,

              color1: "#333",
              color2: "#333",
              color3: "#333",
              color4: "#333",
              borderColor: "#3272abff",
              background: "#fff",
              fontFamily: "monospace"
            };
            break;
          case "colored mono":
            this.prStyle = {
              ...this.prStyle,
              color1: "#325F50",
              color2: "#325F50",
              color3: "#325F50",
              color4: "#325F50",
              borderColor: "#96BDC6",
              background: "#CFB9A5AF",
              fontFamily: "monospace"
            };
            break;
          case "colored mono2":
            this.prStyle = {
              ...this.prStyle,
              color1: "#333",
              color2: "#333",
              color3: "#333",
              color4: "#333",
              borderColor: "#3272abff",
              background: "#fff",
              fontFamily: "monospace"
            };
            break;
          case "colored mono3":
            this.prStyle = {
              ...this.prStyle,
              color1: "#545E75",
              color2: "#545E75",
              color3: "#545E75",
              color4: "#545E75",
              borderColor: "#63ADF2ff",
              background: "#A7CCED47",
              fontFamily: "monospace"
            };
            break;
          case "colored1":
            this.prStyle = {
              ...this.prStyle,
              color1: "#648381",
              color2: "#648381",
              color3: "#648381",
              color4: "#648381",
              borderColor: "#8ACB88ff",
              background: "#E4FDE1AA",
              fontFamily: "Roboto,sans-serif"
            };
            break;
          case "colored2":
            this.prStyle = {
              ...this.prStyle,
              color1: "#201E1F",
              color2: "#201E1F",
              color3: "#201E1F",
              color4: "#201E1F",
              borderColor: "#FF4000",
              background: "#FAAA8DA1",
              fontFamily: "Roboto,sans-serif"
            };
            break;
          case "colored3":
            this.prStyle = {
              ...this.prStyle,
              color1: "#1F2041",
              color2: "#1F2041",
              color3: "#1F2041",
              color4: "#1F2041",
              borderColor: "#417B5A",
              background: "#928BAA94",
              fontFamily: "Roboto,sans-serif"
            };
            break;
          case "colored4":
            this.prStyle = {
              ...this.prStyle,
              color1: "#697A21",
              color2: "#697A21",
              color3: "#697A21",
              color4: "#697A21",
              borderColor: "#B8B42D",
              background: "#FFFCE8",
              fontFamily: "Roboto,sans-serif"
            };
            break;
          case "multi colors1":
            this.prStyle = {
              ...this.prStyle,
              color1: "#E77728",
              color2: "#3BB273",
              color3: "#7768AE",
              color4: "#E77728",
              borderColor: "#E15554",
              background: "#fff",
              fontFamily: "Roboto,sans-serif"
            };
            break;
          case "multi colors2":
            this.prStyle = {
              ...this.prStyle,
              color1: "#A2666F",
              color2: "#F45866",
              color3: "#A2666F",
              color4: "#F45866",
              borderColor: "#C45AB3",
              background: "#fff",
              fontFamily: "Roboto,sans-serif"
            };
            break;
          case "black":
            this.prStyle = {
              ...this.prStyle,
              color1: "#111",
              color2: "#111",
              color3: "#111",
              color4: "#111",
              borderColor: "#000",
              background: "#fff",
              fontFamily: "Roboto,sans-serif"
            };
            break;
          case "black invert":
            this.prStyle = {
              ...this.prStyle,
              color1: "#fff",
              color2: "#fff",
              color3: "#fff",
              color4: "#fff",
              borderColor: "#fff",
              background: "#000",
              fontFamily: "Roboto,sans-serif"
            };
            break;
          case "grey":
            this.prStyle = {
              ...this.prStyle,
              color1: "#555",
              color2: "#555",
              color3: "#555",
              color4: "#555",
              borderColor: "#444",
              background: "#fff",
              fontFamily: "Roboto,sans-serif"
            };
            break;
        }
        setItem("prStyle", this.prStyle);
      }
    }
  }
};
</script>

<style>
.disNoneP {
  display: none;
}
@media print {
  .disNone {
    display: none;
  }
  .v-dialog > .v-card > .presc.v-card__text {
    zoom: 0.9;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  @page {
    margin: 0;
  }
}
.A5 {
  width: 148mm;
  height: 209mm;
  align-self: center;
  max-height: 100%;
  zoom: 0.7;

  flex: unset !important;
  padding: none !important;
}
</style>
