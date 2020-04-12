<template>
    <md-card :md-elevation="0" class="shadow-0">
        <md-card-header>
            <div class="md-title">Patient Requests</div>
        </md-card-header>

        <md-card-content>
            <div>
                <div v-for="(req,key) in requests"  class="md-layout md-gutter listItem">
                   <div class="md-layout-item md-size-80 flex">
                       <md-icon md-src="/images/icon/requests.svg" class="icon"></md-icon>
                       <span class="md-list-item-text">{{req.request}}</span>
                   </div>
                    <div class="md-layout-item md-size-20" >
                        <md-button class="md-icon-button md-raised md-accent"  @click="deleteReq(key)" >
                            <md-icon>delete</md-icon>
                        </md-button>
                    </div>
                </div>
            </div>
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-80">
                    <custome-auto-complete   @add="addReq" v-model="request" placeholder="Request" id="requestId" :arr="requestList" ></custome-auto-complete>
                </div>
                
                <div class="md-layout-item md-size-20">
                    <md-button class="md-primary addBtn md-raised" @click="addReq"><md-icon>add</md-icon> Add</md-button>
                </div>
            </div>
        </md-card-content>

        <md-card-actions md-alignment="left">
            <md-button @click="saveAndPrint()">Print</md-button>
        </md-card-actions>
    </md-card>
</template>

<script>    
import CustomeAutoComplete from "../../../../../components/public/customeAutoComplete";

    export default {
        name: "requests",
        props:['patient'],
         components: {CustomeAutoComplete},
        data: () => ({

            request:null,
            requestList:[],

        }),
        computed:{
            requests:{
                get(){
                    return this.$store.getters['sessionModules/requests'];
                },
                set(val){
                    this.$store.commit('sessionModules/requests',val);
                }
            },
            userData:{
                get(){
                    return this.$store.getters['sessionModules/userData'];
                },
                set(val){
                    this.$store.commit('sessionModules/userData',val);
                }
            },
            session(){
                return this.$store.getters['sessionModules/session'];
            }

        },
        methods: {
            getReq(searchTerm){
                axios('request/autoComplete',{params:{val:searchTerm}}).then((res)=>{
                    this.loading=false;
                    this.requestList=res.data.result;
                })
            },
            deleteReq(key)
            {
                let arr=this.requests;
                arr.splice(key,1);
                this.requests=arr;
            },
            addReq(){
              if(this.request)
              {
                  let arr=this.requests;
                  arr.push({'request':this.request});
                  this.requests=arr;
                  this.request="";
              }
            },
            saveAndPrint(){
                if(this.session==='new')
                {
                    this.$emit('save');
                }
                else
                {
                    this.$emit('update');
                }
                let doctorData=this.$store.getters['doctorData'];
                let hospitalName=this.$store.getters['hospitalName'];
                let requests=this.requests;
                let patientData=this.userData;
                let prescription={doctorData:doctorData,hospitalName:hospitalName,requests:requests,patientData:patientData,patientGlass:null,medicines:null};
                this.$store.commit('prescription',prescription);
            },
        },
        created(){
            this.getReq('');
        }
    }
</script>

<style scoped>

    .flex
    {
        display: flex;
        align-items: center;

    }

    .listItem
    {
        margin-bottom: 16px;
    }
    .addBtn
    {
        position: relative;
        height: 40px;
        margin: 0;
    }
    .flex .md-list-item-text
    {
        margin-left: 30px;
        white-space: pre-wrap;
    }
</style>
