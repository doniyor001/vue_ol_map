<template>
    <div>
        <button class="btn"
                v-for="btn in filterButtons"
                :key="btn.name"
                :class="[filterName === btn.name ? 'btn-dark' : 'btn-outline-dark']"
                @click="filterHandler(btn.name)">{{ btn.title }}</button>

    </div>
</template>

<script>
export default {
    props: {
        updateFilterHandler: {
            type: Function,
            required: true,
        },
        filterName: {
            type: String,
            required: true,
        },
    },
    data(){
        return{
            filterButtons:[
                {
                    title:'All Lists',
                    name: 'all',
                },
                {
                    title:'Type 1',
                    name: 'popular',
                },
                {
                    title:"Type 2",
                    name: 'mostViewers',
                },
            ],
            filter: 'all',
        }
    },
    methods: {
        filterHandler(filter){
            this.filter = filter
            this.updateFilterHandler(this.filter)
        },
    },
}
</script>

<style>
</style>