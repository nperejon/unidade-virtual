<template>
    <div class="user-dropdown" @click="toggleDropdown()">
        <div class="user-button">
            <span class="d-none d-sm-block">{{ user.name }}</span>
            <div class="user-dropdown-img">
            <img src="../../assets/icon.png" />
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-content"
        :class="{'hide-dropdown': !userDropdownVisible}">
            <router-link to="/admin" v-if="user.admin > 0">
                <i class="fa fa-server"></i>Administração
            </router-link>
            <router-link :to=" '/perfil/' + user.id" >
                <i class="fa fa-cogs"></i>Perfil
            </router-link>     
            <router-link to="/avaliardesafios" v-if="user.admin > 0">
                <i class="fa fa-university"></i>Avaliar Desafios
            </router-link>                 
            <router-link to="/desafios">
                <i class="fa fa-university"></i>Desafios
            </router-link>            
            <a href @click.prevent="logout" ><i class="fa fa-sign-out"></i>Sair</a>
        </div>
    </div>
</template>

<script>
import { userKey } from '@/global'
import { mapState } from 'vuex'

export default {
    name: 'UserDropdown',
    computed: mapState(['user', 'userDropdownVisible']),
    methods: {
        toggleDropdown(){
            this.$store.commit('toggleDropdown')
        },
        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({ name: 'auth' })
        }
    }
}
</script>

<style>
    .user-dropdown {
        position: relative;
        height: 100%;
        cursor: pointer;
        margin-left: 10px;
    }

    .user-button{
        display: flex;
        align-items: center;
        color: #FFF;
        font-weight: 500;
        height: 100%;
        padding: 0px 20px;
    }

    .user-dropdown:hover{
        background-color: rgba(0,0,0,0.2);
    }

    .user-dropdown-img{
        margin: 0px 10px;
    }

    .user-dropdown-img > img{
        max-height: 37px;
        border-radius: 5px;
    }

    .user-dropdown-content{
        position: absolute;
        right: 0px;
        background-color: #3aa973ff;
        min-width: 212px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 10px;
        z-index: 1;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        transition: visibility 0s, opacity 0.5 linear;
        cursor: pointer;
    }

    .user-dropdown-content i{
        padding: 10px;
    }

    .user-dropdown-content a{
        text-decoration: none;
        color: #FFF;
        padding: 10px;
    }

    .user-dropdown-content a:hover{
        background-color: rgba(0,0,0,0.1);
        text-decoration: none;
        color: #FFF;
    }

    .hide-dropdown{
        visibility: hidden;
        opacity: 0;
    }
</style>
