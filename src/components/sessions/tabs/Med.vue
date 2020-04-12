<template>
   <md-card :md-elevation="0" class="shadow-0">
      <md-card-header>
         <div class="md-title">Patient Medication</div>
      </md-card-header>
      <md-card-content>
         <md-field :class="getValidationClass('name')">
            <label for="first-name">Patient Name</label>
            <md-input
               name="first-name"
               id="first-name"
               autocomplete="given-name"
               v-model="userData.name"
               :disabled="sending"
            />
            <span class="md-error" v-if="!$v.userData.name.required"
               >The first name is required</span
            >
            <span class="md-error" v-else-if="!$v.userData.name.minlength"
               >Invalid first name</span
            >
         </md-field>

         <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
               <md-field :class="getValidationClass('gender')">
                  <label>Gender</label>
                  <md-select
                     name="gender"
                     id="gender"
                     v-model="userData.gender"
                     md-dense
                     :disabled="sending"
                  >
                     <md-option></md-option>
                     <md-option value="male">M</md-option>
                     <md-option value="female">F</md-option>
                  </md-select>
                  <span class="md-error">The gender is required</span>
               </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
               <md-field :class="getValidationClass('age')">
                  <label for="age">Age</label>
                  <md-input
                     type="number"
                     id="age"
                     name="age"
                     autocomplete="age"
                     v-model="userData.age"
                     :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.userData.age.required"
                     >The age is required</span
                  >
                  <span class="md-error" v-else-if="!$v.userData.age.maxlength"
                     >Invalid age</span
                  >
               </md-field>
            </div>
         </div>
         <md-datepicker v-model="userData.selectedDate" :mdModelType="String">
            <label>Select date</label>
         </md-datepicker>
         <div>
            <div
               v-for="(med, key) in medicines"
               class="md-layout md-gutter listItem"
               :key="'med'+key"
            >
               <div class="md-layout-item md-size-40 flex">
                  <md-icon
                     md-src="/images/icon/medicine.svg"
                     class="icon"
                  ></md-icon>
                  <span class="md-list-item-text">{{ med.medicine }}</span>
               </div>
               <div class="md-layout-item md-size-40 flex">
                  <md-icon
                     md-src="/images/icon/dose.svg"
                     class="icon"
                  ></md-icon>
                  <span class="md-list-item-text">{{ med.dose }}</span>
               </div>
               <div class="md-layout-item md-size-20">
                  <md-button
                     class="md-icon-button md-raised md-accent"
                     @click="deleteMed(key)"
                  >
                     <md-icon>delete</md-icon>
                  </md-button>
               </div>
            </div>
         </div>
         <div class="formLayout md-layout md-gutter">
            <div class="md-layout-item md-size-40">
               <custome-auto-complete
                  v-model="medicine"
                  placeholder="Medicine"
                  id="medId"
                  :arr="medicineList"
               ></custome-auto-complete>
            </div>
            <div class="md-layout-item md-size-40">
               <custome-auto-complete
                  v-model="dose"
                  placeholder="Dose"
                  id="doseId"
                  :arr="doseList"
                  @add="addMed"
               ></custome-auto-complete>
               
            </div>
            <div class="md-layout-item md-size-20">
               <md-button class="md-primary addBtn md-raised" @click="addMed"
                  ><md-icon>add</md-icon> Add</md-button
               >
            </div>
         </div>
      </md-card-content>

      <md-card-actions md-alignment="left">
         <md-button @click="saveAndPrint()">Print</md-button>
      </md-card-actions>
   </md-card>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
   required,
   minLength,
   maxLength,
   numeric,
   between,
} from 'vuelidate/lib/validators';
import CustomeAutoComplete from '../../../../../components/public/customeAutoComplete';

export default {
   name: 'Med',
   components: { CustomeAutoComplete },
   props: ['patient'],
   mixins: [validationMixin],
   data: () => ({
      userSaved: false,
      sending: false,
      lastUser: null,
      dose: null,
      medicine: null,
      doseList: [],
      medicineList: [],
   }),
   computed: {
      medicines: {
         get() {
            return this.$store.getters['sessionModules/medicines'];
         },
         set(val) {
            this.$store.commit('sessionModules/medicines', val);
         },
      },
      userData: {
         get() {
            return this.$store.getters['sessionModules/userData'];
         },
         set(val) {
            this.$store.commit('sessionModules/userData', val);
         },
      },
      session() {
         return this.$store.getters['sessionModules/session'];
      },
   },
   validations: {
      userData: {
         name: {
            required,
            minLength: minLength(3),
         },
         age: {
            required,
            maxLength: maxLength(3),
            numeric,
            between: between(1, 150),
         },
         phone: {
            required,
            maxLength: minLength(7),
            numeric,
         },
         gender: {
            required,
         },
      },
   },
   methods: {
      getMed(searchTerm) {
         axios('medicine/autoComplete', { params: { val: searchTerm } }).then(
            res => {
               this.loading = false;
               this.medicineList = res.data.result;
            }
         );
      },
      getDose(searchTerm) {
         axios('dose/autoComplete', { params: { val: searchTerm } }).then(
            res => {
               this.loading = false;
               this.doseList = res.data.result;
            }
         );
      },
      deleteMed(key) {
         let arr = this.medicines;
         arr.splice(key, 1);
         this.medicines = arr;
      },
      addMed() {
         if (this.medicine && this.dose) {
            let arr = this.medicines;
            arr.push({ medicine: this.medicine, dose: this.dose });
            this.medicines = arr;
            this.medicine = '';
            this.dose = '';
         }
      },
      getValidationClass(fieldName) {
         const field = this.$v.userData[fieldName];

         if (field) {
            return {
               'md-invalid': field.$invalid && field.$dirty,
            };
         }
      },
      clearForm() {
         this.$v.$reset();
         this.init(this.patient);
      },
      saveAndPrint() {
         if (this.session === 'new') {
            this.$emit('save');
         } else {
            this.$emit('update');
         }
         let doctorData = this.$store.getters['doctorData'];
         let hospitalName = this.$store.getters['hospitalName'];
         let medicines = this.medicines;
         let patientData = this.userData;
         let prescription = {
            doctorData: doctorData,
            hospitalName: hospitalName,
            medicines: medicines,
            patientData: patientData,
            patientGlass: null,
         };
         this.$store.commit('prescription', prescription);
      },
      validateUser() {
         this.$v.$touch();
         if (!this.$v.$invalid) {
            this.saveUser();
         }
      },
      init(val, first = true) {
         if (first) {
            let user = {};
            user.name = val.name;
            user.gender = val.gender;
            user.age = val.age;
            user.number = val.number || '';
        
            this.userData = user;
         }

         this.medicines = [];
         this.dose = null;
         this.medicine = null;
      },
   },
   watch: {
      patient(val) {
         this.init(val);
      },
   },
   mounted() {
      this.init(this.patient);
      this.getMed('');
      this.getDose('');
   },
};
</script>

<style scoped>
.flex {
   display: flex;
   align-items: center;
}
.flex .md-list-item-text {
   margin-left: 30px;
    white-space: pre-wrap;
}
.listItem {
   margin-bottom: 16px;
}
.addBtn {
   position: relative;
   height: 40px;
   text-transform: capitalize;
   font-size: 18px;
   margin: 0;
}
</style>
