<template>
  <div width="100%">
    <input type="file" multiple ref="inputFile" @change="getFiles" hidden />
    <div
      class="fileUpload border-color"
      :class="{
        back: !$vuetify.theme.dark,
        'v-card--shaped': inputStyle.shaped,
        rounded: inputStyle.rounded,
        'elevation-2': inputStyle.solo
      }"
      @click="$refs.inputFile.click()"
    >
      <v-btn icon x-large><v-icon class="display-3">mdi-plus</v-icon></v-btn>
    </div>

    <span class="justify-end d-flex mx-10">{{ files.length }}/8</span>

    <v-list>
      <v-list-item v-for="(file, key) in files" :key="`file${key}`">
        <v-list-item-avatar tile width="150px" height="auto">
          <img
            v-if="isFileImage(file)"
            :id="id + key"
            :src="readURL(file, id + key)"
            alt="img"
          />
          <video
            v-else-if="isFileVideo(file)"
            :src="readVid(file)"
            controls
            width="150px"
          ></video>
          <template v-else>
            <v-icon class="display-1">mdi-file</v-icon>
          </template>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ file.name || "file name" }}</v-list-item-title>
          <v-list-item-subtitle v-if="file.type">{{
            file.type
          }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action
          ><v-btn icon color="red" @click="removeFile(key)"
            ><v-icon>mdi-delete</v-icon></v-btn
          ></v-list-item-action
        >
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { SESSION_NAMESPACE } from "../../store/modules/namespaces";
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: "comFile"
    },
    name: {
      type: String,
      default: "complaint"
    },
    type: {
      type: String,
      default: "complaint_multiple"
    }
  },
  data() {
    return {
      files: []
    };
  },
  computed: {
    inputStyle() {
      return this.$store.getters.inputStyle;
    }
  },
  methods: {
    getFiles($event) {
      let obj = [...this.value];
      Object.values($event.target.files).forEach(f => {
        if (obj && obj.length > 7) {
          obj.shift();
        }
        obj.push(f);
      });

      this.$emit("input", obj);
      this.updateFiles();
    },
    updateFiles() {
      this.files = this.$store.getters[`${SESSION_NAMESPACE}/${this.name}`][
        this.type
      ];
    },
    removeFile(key) {
      let obj = [...this.files];
      obj.splice(key, 1);
      this.$emit("input", obj);
      this.updateFiles();
    },
    readURL(file, id) {
      let reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById(id).setAttribute("src", e.target.result);
      };

      reader.readAsDataURL(file);
    },
    readVid(file) {
      return URL.createObjectURL(file);
    },
    isFileImage(file) {
      let type = file && file["type"] && file["type"].split("/")[0] === "image";
      return type;
    },
    isFileVideo(file) {
      let type = file && file["type"] && file["type"].split("/")[0] === "video";
      return type;
    }
  }
};
</script>

<style scoped>
.fileUpload {
  width: 100%;
  display: flex;
  border: 2px dashed;
  justify-content: center;
  align-items: center;
  height: 100px;

  cursor: pointer;
}
.rounded {
  border-radius: 50px;
}

.fileUpload:hover {
  background-color: unset !important;
}
</style>
