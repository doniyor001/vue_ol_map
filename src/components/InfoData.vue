<template>
    <div class="box">
        <p class="fs-3 text-upercase">All Lists: {{ allMoviesCount }}</p>
    </div>
</template>

<script>
export default {
    name: "DataInfo",
    props:{
        allMoviesCount:{
            type:Number,
            required:true,
        }
    },
}
</script>

<style scoped>
.box{
    margin: 2rem;
    padding: 1.5rem;
    border-radius: 4px;
    background-color: #fcfaf5;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>