<template>
    <div class="page-title">
        <h1><i v-if="icon" :class="icon"></i> {{ main }}</h1>
        <h2>{{ sub }}</h2>
        <hr>
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['icon', 'main', 'sub']
}
</script>

<style>
    .page-title h1{
        text-align: center;
        font-size: 1.4rem;
    }

    .page-title h2 {
        color: rgb(87, 87, 87);
        margin-top: 10px;
        font-size: 1.21rem;
        text-align: center;
    }
</style>
