<template>
    <md-card :md-elevation="0" class="shadow-0">
        <md-card-header>
            <div class="md-title">Patient Glasses</div>
        </md-card-header>
        <md-card-content>
            <table>
                <tr>
                    <th >#</th>
                    <th>Right Eye</th>
                    <th>Left Eye</th>
                </tr>
                <tr>
                    <td>UC_BC_VA</td>
                    <td>
                        <div class="flex">
                            <div class="item">
                                <h4>UCVA</h4>
                                <div>
                                    <UC_BC_VA id="uc_bc_list1" v-model="glass.r_UCVA" :arr="uc_bc_list"></UC_BC_VA>
                                </div>
                            </div>
                            <div class="item">
                                <h4>BCVA</h4>
                                <div>
                                    <UC_BC_VA  id="uc_bc_list2"  v-model="glass.r_BCVA" :arr="uc_bc_list"></UC_BC_VA>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="flex">
                            <div class="item">
                                <h4>UCVA</h4>
                                <div>
                                    <UC_BC_VA id="uc_bc_list3" v-model="glass.l_UCVA" :arr="uc_bc_list"></UC_BC_VA>
                                </div>
                            </div>
                            <div class="item">
                                <h4>BCVA</h4>
                                <div>
                                    <UC_BC_VA id="uc_bc_list4" v-model="glass.l_BCVA" :arr="uc_bc_list"></UC_BC_VA>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Dist.</td>
                    <td>
                        <div class="flex">
                            <div class="item">
                                <h4>Sph</h4>
                                <div>
                                    <UC_BC_VA id="sph_list" v-model="glass.r_sph" :arr="sph_list"></UC_BC_VA>
                                </div>
                            </div>
                            <div class="item">
                                <h4>Cyl</h4>
                                <div>
                                    <UC_BC_VA id="cyl_list" v-model="glass.r_cyl" :arr="cyl_list"></UC_BC_VA>
                                </div>
                            </div>
                            <div class="item">
                                <h4>Axis</h4>
                                <div>
                                    <UC_BC_VA id="axis_list" v-model="glass.r_axis" :arr="axis_list"></UC_BC_VA>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="flex">
                            <div class="item">
                                <h4>Sph</h4>
                                <div>
                                    <UC_BC_VA id="sph_list2" v-model="glass.l_sph" :arr="sph_list"></UC_BC_VA>
                                </div>
                            </div>
                            <div class="item">
                                <h4>Cyl</h4>
                                <div>
                                    <UC_BC_VA id="cyl_list2" v-model="glass.l_cyl" :arr="cyl_list"></UC_BC_VA>
                                </div>
                            </div>
                            <div class="item">
                                <h4>Axis</h4>
                                <div>
                                    <UC_BC_VA id="axis_list2" v-model="glass.l_axis" :arr="axis_list"></UC_BC_VA>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Near</td>
                    <td>
                        <div class="flex">
                            <div class="item">
                                <h4>Add</h4>
                                <div>
                                    <UC_BC_VA id="add_list" v-model="glass.r_add" :arr="add_list"></UC_BC_VA>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="flex">
                            <div class="item">
                                <h4>Add</h4>
                                <div>
                                    <UC_BC_VA id="add_list2" v-model="glass.l_add" :arr="add_list"></UC_BC_VA>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>IPD</td>
                    <td colspan="2">
                        <UC_BC_VA id="ipd_list" v-model="glass.ipd" :arr="ipd_list"></UC_BC_VA>
                    </td>
                </tr>
            </table>
        </md-card-content>

        <md-card-actions md-alignment="left">
            <md-button @click="saveAndPrint">Print</md-button>
        </md-card-actions>
    </md-card>
</template>

<script>
    import UC_BC_VA from "../../../../../components/glassComponent/UC_BC_VA";

    export default {
        name: "Glass",
        props:["patient"],
        components: {UC_BC_VA},
        data() {
            return {

                uc_bc_list: ["NO PL", "PL", "HM", "CF 10 cm", "CF 30 cm", "CF 50 cm", "CF 1 m", "CF 2 m", "CF 3 m", "CF 4 m", "CF 5 m", "6/60", "6/36", "6/24", "6/18", "6/12", "6/9", "6/6", "0.05", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"],
                sph_list: ["+16.00", "+15.75", "+15.50", "+15.25", "+15.00", "+14.75", "+14.50", "+14.25", "+14.00", "+13.75", "+13.50", "+13.25", "+13.00", "+12.75", "+12.50", "+12.25", "+12.00", "+11.75", "+11.50", "+11.25", "+11.00", "+10.75", "+10.50", "+10.25", "+10.00", "+9.75", "+9.50", "+9.25", "+9.00", "+8.75", "+8.50", "+8.25", "+8.00", "+7.75", "+7.50", "+7.25", "+7.00", "+6.75", "+6.50", "+6.25", "+6.00", "+5.75", "+5.50", "+5.25", "+5.00", "+4.75", "+4.50", "+4.25", "+4.00", "+3.75", "+3.50", "+3.25", "+3.00", "+2.75", "+2.50", "+2.25", "+2.00", "+1.75", "+1.50", "+1.25", "+1.00", "+0.75", "+0.50", "+0.25", "0.00", "-0.25", "-0.50", "-0.75", "-1.00", "-1.25", "-1.50", "-1.75", "-2.00", "-2.25", "-2.50", "-2.75", "-3.00", "-3.25", "-3.50", "-3.75", "-4.00", "-4.25", "-4.50", "-4.75", "-5.00", "-5.25", "-5.50", "-5.75", "-6.00", "-6.25", "-6.50", "-6.75", "-7.00", "-7.25", "-7.50", "-7.75", "-8.00", "-8.25", "-8.50", "-8.75", "-9.00", "-9.25", "-9.50", "-9.75", "-10.00", "-10.25", "-10.50", "-10.75", "-11.00", "-11.25", "-11.50", "-11.75", "-12.00", "-12.25", "-12.50", "-12.75", "-13.00", "-13.25", "-13.50", "-13.75", "-14.00", "-14.25", "-14.50", "-14.75", "-15.00", "-15.25", "-15.50", "-15.75", "-16.00", "-16.25", "-16.50", "-16.75", "-17.00", "-17.25", "-17.50", "-17.75", "-18.00", "-18.25", "-18.50", "-18.75", "-19.00", "-19.25", "-19.50", "-19.75", "-20.00", "-20.25", "-20.50", "-20.75", "-21.00", "-21.25", "-21.50", "-21.75", "-22.00", "-22.25", "-22.50", "-22.75", "-23.00", "-23.25", "-23.50", "-23.75", "-24.00", "-24.25", "-24.50", "-24.75", "-25.00", "-25.25", "-25.50"],
                cyl_list:["+6.00", "+5.75", "+5.50", "+5.25", "+5.00", "+4.75", "+4.50", "+4.25", "+4.00", "+3.75", "+3.50", "+3.25", "+3.00", "+2.75", "+2.50", "+2.25", "+2.00", "+1.75", "+1.50", "+1.25", "+1.00", "+0.75", "+0.50", "+0.25", "0.00", "-0.25", "-0.50", "-0.75", "-1.00", "-1.25", "-1.50", "-1.75", "-2.00", "-2.25", "-2.50", "-2.75", "-3.00", "-3.25", "-3.50", "-3.75", "-4.00", "-4.25", "-4.50", "-4.75", "-5.00", "-5.25", "-5.50", "-5.75", "-6.00"],
                axis_list:["10°", "15°", "20°", "25°", "30°", "35°", "40°", "45°", "50°", "55°", "60°", "65°", "70°", "75°", "80°", "85°", "90°", "95°","100°", "105°", "110°", "115°", "120°", "125°", "130°", "135°", "140°", "145°", "150°", "155°", "160°", "165°", "170°", "175°", "180°"],
                add_list:["+0.75", "+1.00", "+1.25", "+1.50", "+1.75", "+2.00", "+2.25", "+2.50", "+2.75", "+3.00", "+3.25", "+3.50", "+3.75", "+4.00", "+4.25", "+4.50", "+4.75", "+5.00", "+5.25", "+5.50", "+5.75", "+6.00"],
                ipd_list:["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80"],
                sending:false,
            }
        },
        computed:{
            glass:{
                get(){
                    return this.$store.getters['sessionModules/glass'];
                },
                set(val){
                    this.$store.commit('sessionModules/glass',val);
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
                let medicines=null;
                let patientData=this.userData;
                let patientGlass=this.glass;
                let prescription={doctorData:doctorData,hospitalName:hospitalName,medicines:medicines,patientData:patientData,patientGlass:patientGlass};
                this.$store.commit('prescription',prescription);
            },
        },
        watch: {}
    }
</script>

<style scoped>
    .autoCompleteWrapper {
        position: relative;
    }

    .result {
        max-height: 300px;
        overflow: auto;
    }

    .loading {
        text-align: center;
        width: 100%;
    }

    .flex {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

    }

    .flex .item {
        flex: 1;
        padding: 5px;
        min-width: 64px;
    }

    .flex .item h4 {
        margin: 0 0 5px 0;
        text-align: center;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    table, td, th {
        border: 1px solid #b0b5c6;
    }
    tr td:first-child{
        text-align: center;
    }

</style>
