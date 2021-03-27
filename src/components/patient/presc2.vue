<template>
		<v-card-text  :style="`font-family:${fontFamily};min-height:100%`" class="d-flex flex-column  pa-2">
			<div class="section section1 mb-2" :style="`border-color:${borderColor}`">
				<v-checkbox
					:value="tab == 1"
					@change="$emit('updateTab', 1)"
					dense
					hide-details
					class="check disNone"
               :class="{ disNoneP: preview }"
				></v-checkbox>
				<div class="d-flex justify-space-between">
               <div :style="`font-size:${14*font1}px;color:${color1}`" class="left">
                <h4>D.R</h4>
                <p v-if="doctorInfo.enName" :style="`font-size:${14*font1+3}px`" >{{doctorInfo.enName}}</p>
                <p  v-if="doctorInfo.specializationEn" ><pre>{{doctorInfo.specializationEn}}</pre></p>
            </div>
            <div class="right" :style="`font-size:${14*font1}px;color:${color1}`">
                <h4>دكتور</h4>
                <p v-if="doctorInfo.arName" :style="`font-size:${14*font1+3.3}px`" >{{doctorInfo.arName}}</p>
                <p  v-if="doctorInfo.specializationAr" ><pre>{{doctorInfo.specializationAr}}</pre></p>
            </div>
            </div>
			</div>
			<div class="section section2"  :style="`color:${color2};border-color:${borderColor}`">
				<v-checkbox
					:value="tab == 2"
					dense
					hide-details
					class="check disNone"
               :class="{ disNoneP: preview }"
					@change="$emit('updateTab', 2)"
				></v-checkbox>
            <v-row>
               <v-col cols="6" class="py-0"><span :style="`font-size:${14*font2}px`">Patient Name: {{ patientData.name }}</span></v-col>
               <v-col cols="6" class="py-0"><span :style="`font-size:${14*font2}px`">Age: {{ patientData.age }}</span></v-col>
               <v-col cols="6" class="py-0"><span :style="`font-size:${14*font2}px`">Date: {{ patientData.selectedDate }}</span></v-col>
               <v-col cols="6" class="py-0"><span :style="`font-size:${14*font2}px`">number: {{ session.id }}</span></v-col>
               <v-col v-if="session.diagnosis.length>0" cols="12" class="py-0"><span :style="`font-size:${14*font2}px`">Diagnosis: <template v-for="di in session.diagnosis">{{ di.diagnosis+" ," }}</template></span></v-col>

            </v-row>
			</div>
			<div class="section section3"  :style="`color:${color3};border-color:${borderColor}`">
				<v-checkbox
					:value="tab == 3"
					dense
					hide-details
					class="check disNone"
               :class="{ disNoneP: preview }"
					@change="$emit('updateTab', 3)"
				></v-checkbox>
             <h2>R<span class="small">x</span></h2>
             <component :is="printType" :font="font3" :borderColor="borderColor"></component>
			</div>
			<div class="section section4"  :style="`color:${color4};border-color:${borderColor}`">
				<v-checkbox
					:value="tab == 4"
					dense
					hide-details
					class="check disNone"
               :class="{ disNoneP: preview }"
					@change="$emit('updateTab', 4)"
				></v-checkbox>
             <p :style="`font-size:${18*font4}px`">{{doctorInfo.address}}</p>
            <div class="d-flex justify-space-between">
                <span :style="`font-size:${14*font4}px`">م العياده {{doctorInfo.clinicPhone}}</span>
                <span :style="`font-size:${14*font4}px`">م الطبيب {{doctorInfo.personalPhone}}</span>
            </div>
			</div>
		</v-card-text>
</template>

<script>
   import { AUTH_NAMESPACE, SESSION_NAMESPACE } from '../../store/modules/namespaces';
   import med from './priscComponent/med';
   import req from './priscComponent/req';
   import glass from './priscComponent/glass';
	export default {
		props: {
			tab: {
				type: Number,
            default: 1,
          
			},
			font1: {
				type: Number,
            default: 1,
			},
			font2: {
				type: Number,
            default: 1,
			},
			font3: {
				type: Number,
            default: 1,
			},
			font4: {
				type: Number,
            default: 1,
			},
			color1: {
				type: String,
            default: "#666",
			},
			color2: {
				type: String,
            default: "#666",
			},
			color3: {
				type: String,
            default: "#666",
			},
			color4: {
				type: String,
            default: "#666",
			},
			borderColor: {
				type: String,
            default: "#666",
			},
			fontFamily: {
				type: String,
            default: "Roboto",
			},
			preview: {
				type: Boolean,
            default: false,
			},
      },
      data() {
         return {
          
         }
      },
      components: {
         med,req,glass
      },
		computed: {
         	printType() {
				return this.$store.getters[`${SESSION_NAMESPACE}/printType`];
			},
			doctorInfo() {
				return this.$store.getters[`${AUTH_NAMESPACE}/currentUser`].info;
         },
			session() {
				return this.$store.getters[`${SESSION_NAMESPACE}/session`]
         },
         patientData(){
            return this.session.userData
         }
         
		}
	};
</script>

<style lang="scss" scoped>
	.section {
		position: relative;
		min-height: 30px;
		.check {
			position: absolute;
			top: -5px;
         left: -30px;
			margin: 0;
			padding: 0;
		}
       .left,.right{
        width: 50%;

        p,h4{
            text-align: center;
            font-weight: bold;
        }

        h4{
        margin: 5px 0;
        }
    }
    p
    {
        margin: 1px 0;
    }

   }
   .section1{
         
        border-bottom: 3px solid;
   }
   .section2{
       padding: 10px;
        margin-bottom: 5px;
    
   }

      .section3{
          padding: 10px;
        margin-bottom: 5px;
       border-bottom: 3px solid;
        flex: 1;
          h2
         {
            font-size: 50px;
            margin: 15px 0;
            span
         {

            font-size: 18px;
            font-weight: 400;
         }

    }
      }
      .section4{
         padding: 10px;
        margin-bottom: 5px;
      
           p
        {
          
            font-weight: bold;
            text-align: center;
        }
      
      }
    
</style>
