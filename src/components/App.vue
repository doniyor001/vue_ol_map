<template>
    <div class="app">
        <div class="content">
            <InfoData :allMoviesCount="movies.length"/>
            <div class="search-panel">
                <SearchPanel :updateTernHandler="updateTernHandler"/>
                <FilterData :updateFilterHandler="updateFilterHandler" :filterName="filter" />
                <AddData @createMovie="createMovie"/>
            </div>
            <Box v-if="!movies.length && !isLoading">
                <p class="text-center fs-3 text-danger">No Data</p>
            </Box>
            <Box v-else-if="isLoading" class="d-flex justify-content-center">
                <Loader/>
            </Box>
            <ListsData
                   v-else
                    v-bind:movies="onFilterHandler(onSearchHandler(movies, term), filter)"
                    @onToggle="onToggleHandler"
                    @onRemove='onRemoveHandler'/>

            <Box class="d-flex justify-content-center">
                <nav aria-label="pagination">
                    <ul class="pagination pagination-sm">
                        <li v-for="pageNumber in totalPages"
                            :key="pageNumber"
                            :class="{active: pageNumber === page}"
                            @click="changePageHandler(pageNumber)">

                            <span class="page-link">{{ pageNumber }}</span>
                        </li>
                    </ul>
                </nav>
            </Box>
            <Map/>
        </div>
    </div>
</template>

<script>
import Box from "@/ui-components/Box.vue";
import Loader from "@/ui-components/Loader.vue";
import InfoData from "@/components/InfoData.vue";
import FilterData from "@/components/FilterData.vue";
import AddData from "@/components/AddData.vue";
import ListsData from "@/components/ListsData.vue";
import SearchPanel from "@/components/SearchPanel.vue";
import Map from "@/components/Map.vue"
import axios from "axios";

export default {
    components: {
        InfoData,
        SearchPanel,
        FilterData,
        AddData,
        ListsData,
        Map,
        Loader,
        Box,
    },
    data() {
        return {
            movies: [],
            term: '',
            filter: 'all',
            isLoading: false,
            limit: 10,
            page: 1,
            totalPages: 0,
        }
    },
    methods: {
        async createMovie(item) {
            try {
                const response = await axios.post('https://16bf-213-230-80-15.ngrok-free.app/api/Point', item)
                console.log(response)
                this.movies.push(response.data)
            } catch (error) {
                alert(error.message)
            }

        },
        onToggleHandler({id, prop}) {
            this.movies = this.movies.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        },
        async onRemoveHandler(id) {
            try {
                const response = await axios.delete(`https://16bf-213-230-80-15.ngrok-free.app/api/Point/${id}`)
                console.log(response)
                this.movies = this.movies.filter(c => c.id !== id)
            } catch (error) {
                alert(error.message)
            }
        },
        onSearchHandler(arr, term) {
            if (term.length === 0) {
                return arr
            }
            return arr.filter(c => c.name.toLowerCase().indexOf(term) > -1)
        },
        onFilterHandler(arr, filter) {
            switch (filter) {
                case 'Type1':
                    return arr.filter(c => c.type === 1)
                case 'Type2':
                    return arr.filter(c => c.type > 1)
                default:
                    return arr
            }
        },
        updateTernHandler(term) {
            this.term = term
        },
        updateFilterHandler(filter) {
            this.filter = filter
        },

        async fetchMovie() {
            try {
                this.isLoading = true
                const response = await axios.get('https://16bf-213-230-80-15.ngrok-free.app/api/Point', {
                    params: {
                        _limit: this.limit,
                        _page: this.page,
                    },
                })
                const newArr = response.data.map(item => ({
                    id: item.id,
                    name: item.name,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    typeId: item.typeId,
                    viewers: item.id * 10,
                }))
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.movies = newArr
                console.log(this.totalPages);
            } catch (error) {
                alert(error.message)
            } finally {
                this.isLoading = false
            }
        },
        changePageHandler(page) {
            this.page = page
            this.fetchMovie()
        },
    },
    mounted() {
        this.fetchMovie()
    },
    watch: {
        page() {
            this.fetchMovie()
        },
    },

}
</script>

<style>
.app{
    height: 100vh;
    color: #000;
}
.content{
    margin: 2rem;
    padding: 1.5rem;
    border-radius: 4px;
    background-color: #fcfaf5;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
.search-panel{
    /*margin-top: 2rem;*/
    /*padding: 1.5rem;*/
    /*background-color: #fcfaf5;*/
    /*border-radius: 4px;*/
    /*box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);*/
    /*box-sizing: border-box;*/
}
</style>