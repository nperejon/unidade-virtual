<template>
    <header class="header">
    <a class="toggle" @click="toggleMenu()" v-if="!hideToggle">
        <i class="fa fa-lg" :class="icon"></i>
    </a>
    <router-link to="/" class="title">
        <img src="@/assets/logo_4_regiao.png" alt="Logo Classe de Líderes" class="logoclassedelideres" />
    </router-link>
    <div v-if="!hideSearch" class="pesquisa-user">
        <input type="text" />
        <i class="fa fa-search"></i>
    </div>
    <UserDropdown v-if="!hideUserDropdown" />
    </header>
</template>

<script>
import UserDropdown from './UserDropdown'

export default {
    name: "Header",
    components: { UserDropdown },
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean,
        hideSearch: Boolean
    },
    computed: {
        icon(){
            return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
        },
        
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        }
    }
}
</script>

<style>
    .header{
        grid-area: header;
        background-color: #3aa973ff;
        display: flex;
        justify-content:space-around;
        align-items: center;
    }

    .pesquisa-user{
        background-color: #408f62ff;
        padding: 5px;
        border-radius: 10px;
        display: flex;
        align-items: center;
    }

    .pesquisa-user > input{
        background-color: #408f62ff;
        border: none;
        margin-left: 5px;
        color: #FFF;
    }

    .pesquisa-user > input:focus{
        outline: none;
    }

    .pesquisa-user > i{
        padding-left: 5px;
        padding-right: 5px;
        color: #FFF;
    }

    .title{
        flex-grow: 1; /* Título Cresce */
        text-align: center;
    }
    
    .title > img{
        max-height: 50px;
    }

    .title:hover{
        text-decoration: none;
        color: #FFF;
    }

    header.header > a.toggle{
        width: 60px;
        height: 100%;
        color: #FFF;
        justify-self: flex-start;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover{
        background-color: rgba(0, 0, 0, 0.2);
        color: #FFF;
    }
</style>
