<template>
    <v-overlay v-model="showOverlay" width="100vw" height="100vh">
        <v-container fluid class="fill-height">
            <v-row justify="center" align="center">
                <v-card height="75vh" width="85vw">
                    <v-card-title>{{ itemSelected.name }}</v-card-title>
                    <v-row justify="center">
                        <v-img :src="itemSelected.img_url" alt="product image" height="30vh"></v-img>
                    </v-row>
                    <v-row justify="center">
                        <v-col>
                            <h5>{{ showDMB? 'Analysis Percentage' : 'Dry Matter Basis Percentage' }}</h5>
                        </v-col>
                        <v-col>
                            <NuxtLink :to="itemSelected.url" target="_blank">
                                <v-icon>mdi-web</v-icon>
                            </NuxtLink>
                            
                            <v-icon @click="handleToggleDMB()">{{ showDMB? 'mdi-percent-outline' : 'mdi-weight' }}</v-icon>
                            <v-icon @click="showOverlay=false">mdi-close</v-icon>
                        </v-col>
                    </v-row>
                    <v-sheet class="mt-3" width="85vw">
                        <v-container fluid>
                            <v-table>
                                <tr v-for="(item, key, index) in getRelevantItems" :key="index">
                                    <th>{{key}}</th>
                                    <td>{{ (Math.round(item * 100) / 100).toFixed(2) }} %</td>
                                </tr>
                            </v-table>
                        </v-container>
                    </v-sheet>
                </v-card>
            </v-row>
        </v-container>
    </v-overlay>
</template>

<script>
export default {
    props: {
        itemSelected: Object
    },

    data () {
        return {
            showOverlay: false,
            showDMB: false
        }   
    },

    mounted() {
        const { $listen } = useNuxtApp()

        $listen('info:toggleDialog', () => {
            this.showOverlay = true
        })
    },

    computed: {
        getRelevantItems() {
            let items = {...this.itemSelected.analysis_percentage}
            
            if(this.showDMB) {
                const moisture = items.moisture

                delete items.moisture
                for(let [property, value] of Object.entries(items)) {
                    items[property] = DMBHelper.getDMBValue(moisture, value)
                }
            }
 
            // Remove properties with value 0 from analysis percentage
            items = Object.fromEntries(Object.entries(items).filter(([key, value])=> value !== 0))
            return items
        }
    },

    methods: {
        handleToggleDMB() {
            this.showDMB = !this.showDMB
        }
    }
}
</script>

<style scoped>
.scrollable{
    overflow-y: auto;
}
</style>