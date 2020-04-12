<template>
    <md-card :md-elevation="0" class="shadow-0">
        <md-card-header>
            <div class="md-title">Patient diagnosis</div>
        </md-card-header>

        <md-card-content>
            <div>
                <div v-for="(dig,key) in diagnosiss"  class="md-layout md-gutter listItem">
                   <div class="md-layout-item md-size-80 flex">
                       <md-icon md-src="/images/icon/diagnosiss.svg" class="icon"></md-icon>
                       <span class="md-list-item-text">{{dig.diagnosis}}</span>
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
                    <custome-auto-complete :loading="loading"   @add="addDig" v-model="diagnosis" placeholder="diagnosis" id="diagnosisId" :arr="diagnosisList" ></custome-auto-complete>
                   
                </div>
                <div class="md-layout-item md-size-20">
                    <md-button class="md-primary addBtn md-raised" @click="addDig"><md-icon>add</md-icon> Add</md-button>
                </div>
            </div>
        </md-card-content>
    </md-card>
</template>

<script>
import CustomeAutoComplete from "../../../../../components/public/customeAutoComplete";
    export default {
        name: "diagnosis",
        props:['patient'],
         components: {CustomeAutoComplete},
        data: () => ({

            diagnosis:null,
            diagnosisList:[],
            loading:false

        }),
        computed:{
            diagnosiss:{
                get(){
                    return this.$store.getters['sessionModules/diagnosis'];
                },
                set(val){
                    this.$store.commit('sessionModules/diagnosis',val);
                }
            },

        },
        methods: {
            getDig(searchTerm){
                this.loading=true;
              
                axios('diagnosis/autoComplete',{params:{val:searchTerm}}).then((res)=>{
                    this.loading=false;
                    this.diagnosisList=res.data.result;
                })
            },
            deleteReq(key)
            {
                let arr=this.diagnosiss;
                arr.splice(key,1);
                this.diagnosiss=arr;
            },
            addDig(){
              if(this.diagnosis)
              {
                  let arr=this.diagnosiss;
                  arr.push({'diagnosis':this.diagnosis});
                  this.diagnosiss=arr;
                  this.diagnosis="";
              }
            },

        },
        created(){
            this.getDig('');
        },
      
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
