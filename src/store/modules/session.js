import api from "./api";
import { objectToFormData, stringToArray } from "../../helpers/objectAndArrays";
export default {
  namespaced: true,
  state: {
    percentage: 0,
    nativeSession: null,
    sessionData: {
		new: true,
      complaint: {
        description: [],
        complaint_multiple: [],
        multipart: [],
        filesName: null,
      },
      history: {
        description: [],
        history_multiple: [],
        multipart: [],
        filesName: null,
      },
      examination: {
        UC_VA_R: "",
        BC_VA_R: "",
        UC_VA_L: "",
        BC_VA_L: "",
        description: [],
        examination_multiple_r: [],
        multipart_r: [],
        examination_multiple_l: [],
        multipart_l: [],
      },
      medicines: [],
      requests: [],
      diagnosis: [],
      userData: {
        name: "",
        gender: "",
        age: "",
        number: "",
        selectedDate: new Date().toISOString().substr(0, 10),
      },
      glass: {
        r_UCVA: "6/60",
        r_BCVA: "6/60",
        r_sph: "0.00",
        r_cyl: "0.00",
        r_axis: "145°",
        r_add: "",
        l_UCVA: "6/60",
        l_BCVA: "6/60",
        l_sph: "0.00",
        l_cyl: "0.00",
        l_axis: "145°",
        l_add: "",
        ipd: "68",
        notes: "",
      },
    },
    images: null,
    currentImg: 0,
    path: null,
    print: false,
  },
  getters: {
    session(state) {
      return state.sessionData;
    },
    nativeSession(state) {
      return state.nativeSession;
    },
    percentage(state) {
      return state.percentage;
    },
    complaint(state) {
      return state.sessionData.complaint;
    },
    history(state) {
      return state.sessionData.history;
    },
    examination(state) {
      return state.sessionData.examination;
    },
    medicines(state) {
      return state.sessionData.medicines;
    },
    requests(state) {
      return state.sessionData.requests;
    },
    diagnosis(state) {
      return state.sessionData.diagnosis;
    },
    userData(state) {
      return state.sessionData.userData;
    },
    glass(state) {
      return state.sessionData.glass;
    },
    images(state) {
      return state.images;
    },
    currentImg(state) {
      return state.currentImg;
    },
    path(state) {
      return state.path;
    },
    isNew(state) {
      return state.sessionData.new;
    },
    printDialog(state) {
      return !!state.print;
    },
    printType(state) {
      return state.print;
    },
  },
  mutations: {
    updatePrint(state, payload) {
      state.print = payload;
    },
    updateCurrentImg(state, payload) {
      state.currentImg = payload;
    },
    updateImages(state, payload) {
      state.images = payload;
    },
    updatePath(state, payload) {
      state.path = payload;
    },
    resetImages(state) {
      state.images = state.path = null;
      state.currentImg = 0;
    },
    sessionData(state, payload) {
      const session = payload;

      state.nativeSession = payload;
      session.complaint.description = stringToArray(
        session.complaint.description
      );
      session.complaint.complaint_multiple = [];

      session.history.description = stringToArray(session.history.description);
      session.history.history_multiple = [];

      session.examination.examination_multiple_r = [];
      session.examination.examination_multiple_l = [];
      session.examination.description = stringToArray(
        session.examination.description
      );

      state.sessionData = session;
    },
    complaint(state, payload) {
      state.sessionData.complaint[payload.name] = payload.value;
    },

    history(state, payload) {
      state.sessionData.history[payload.name] = payload.value;
    },
    examination(state, payload) {
      state.sessionData.examination[payload.name] = payload.value;
    },
    medicines(state, payload) {
      state.sessionData.medicines = payload;
    },
    requests(state, payload) {
      state.sessionData.requests = payload;
    },
    diagnosis(state, payload) {
      state.sessionData.diagnosis = payload;
    },

    userData(state, payload) {
      state.sessionData.userData[payload.name] = payload.value;
    },
    glass(state, payload) {
      state.sessionData.glass[payload.name] = payload.value;
    },
    updatePercentage(state, payload) {
      state.percentage = payload;
    },

    reset(state) {
      state.sessionData = {
        new: true,
        complaint: {
          description: [],
          complaint_multiple: [],
          multipart: [],
          filesName: null,
        },
        history: {
          description: [],
          history_multiple: [],
          multipart: [],
          filesName: null,
        },
        examination: {
          UC_VA_R: "",
          BC_VA_R: "",
          UC_VA_L: "",
          BC_VA_L: "",
          description: [],
          examination_multiple_r: [],
          multipart_r: [],
          examination_multiple_l: [],
          multipart_l: [],
        },
        medicines: [],
        requests: [],
        diagnosis: [],
        userData: {
          name: "",
          gender: "",
          age: "",
          number: "",
          selectedDate: new Date().toISOString().substr(0, 10),
        },
        glass: {
          r_UCVA: "6/60",
          r_BCVA: "6/60",
          r_sph: "0.00",
          r_cyl: "0.00",
          r_axis: "145°",
          r_add: "",
          l_UCVA: "6/60",
          l_BCVA: "6/60",
          l_sph: "0.00",
          l_cyl: "0.00",
          l_axis: "145°",
          l_add: "",
          ipd: "68",
          notes: "",
        },
      };
    },
  },
  actions: {
    getSession({ commit }, payload) {
      commit("reset");
      if (!payload.id) {
        return;
      }
      return new Promise((resolve, reject) => {
        window
          .axios(`${api.getSession}/${payload.id}`)
          .then((res) => {
            commit("sessionData", res.data.session);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    saveSession({ commit, state, rootGetters }, payload) {
      if (!state.sessionData.userData.name) {
        commit("userData", {
          name: "name",
          value: rootGetters["patient/patient"].name,
        });
      }
      return new Promise((resolve, reject) => {
        let formData = objectToFormData(state.sessionData);
        formData.append("patient_id", payload.patient_id);
        window.axios
          .post(api.getSession, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              let uploadPercentage = parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
              commit("updatePercentage", uploadPercentage);
            },
          })
          .then((res) => {
            commit("updatePercentage", 0);
            commit("sessionData", res.data.session);
            resolve(res);
          })
          .catch((rej) => {
            reject(rej);
          });
      });
    },
    updateSession({ commit, state, rootGetters }, payload) {
      return new Promise((resolve, reject) => {
        if (!state.sessionData.userData.name) {
          commit("userData", {
            name: "name",
            value: rootGetters["patient/patient"].name,
          });
        }
        let formData = objectToFormData(state.sessionData);
        formData.append("patient_id", payload.patient_id);
        formData.append("_method", "put");
        window.axios
          .post(api.getSession + "/" + state.sessionData.id, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              let uploadPercentage = parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
              commit("updatePercentage", uploadPercentage);
            },
          })
          .then((res) => {
            commit("updatePercentage", 0);
            commit("sessionData", res.data.session);
            resolve();
          })
          .catch((rej) => {
            reject(rej);
          });
      });
    },
  },
};
