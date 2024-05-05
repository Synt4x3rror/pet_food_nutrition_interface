<template>
    <v-sheet width="100vw" height="100vh" color="grey">
        <v-container fluid class="fill-height">
            <ProductInfoDialog :itemSelected="selectedItem"/>
            <v-row justify="center" align="center">
                <v-card height="90vh" width="95vw">
                    <v-card-title>Cat Food Info</v-card-title>
                    <v-sheet class="ma-6">
                        <v-data-table
                        height="65vh"
                        :headers="headers"
                        :items="fixedData"
                        fixed-header
                        >
                            <template v-slot:[`item.img_url`]="{ value }">
                                <v-sheet width="150">
                                    <v-img :src="value" alt="productImage" @click="handleProductSelected(value)"></v-img>
                                </v-sheet>
                            </template>
                            <template v-slot:[`item.dmb_fat`]="{ value }">
                                {{ (Math.round(value * 100) / 100).toFixed(2) }}
                            </template>
                            <template v-slot:[`item.dmb_protein`]="{ value }">
                                {{ (Math.round(value * 100) / 100).toFixed(2) }}
                            </template>
                        </v-data-table>
                    </v-sheet>
                </v-card>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script>
import products from '~/content/products.json'

export default {
    data() {
        return {
            products,
            selectedItem: {},
            displayOverlay: true,
            headers: [
                { title: 'Image', key: 'img_url', sortable: false, align: 'center'},
                { title: 'Name', key: 'name', sortable: true, align: 'center' },
                { title: 'DMB Fat %', key: 'dmb_fat', sortable: true, align: 'center' },
                { title: 'DMB Protein %', key: 'dmb_protein', sortable: true, align: 'center' }
            ]
        }
    },

    computed: {
        fixedData (src) {
            let data = {}
            if(this.products['cat-food']) {
                data = this.products['cat-food']
                for(let item of data) {
                    item['dmb_fat'] = DMBHelper.getDMBValue(item.analysis_percentage.moisture, item.analysis_percentage.fat)
                    item['dmb_protein'] = DMBHelper.getDMBValue(item.analysis_percentage.moisture, item.analysis_percentage.protein)
                }
            }
            return data
        }
    },

    mounted () {
        const { $event } = useNuxtApp()

        this.toggleDialog = () => {
            $event('info:toggleDialog')
        }
    },

    methods: {
        handleProductSelected (img_url) {
            // Use Image URL to determine item selected
            this.selectedItem = this.fixedData.filter((el)=> el.img_url === img_url)[0]
            this.toggleDialog()
        }
    }
}
</script>