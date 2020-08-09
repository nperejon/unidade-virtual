<template>
    <div class="articles-by-category">
        <div class="header-home">
            <div class="category-icon"><i class="fa fa-folder-o"></i></div>
            <PageTitle sub="Avaliar Usuários" />
        </div>

        <ul>
            <li v-for="user in users" :key="user.id">
                <ChallengeUsers :user="user" :iddesafio="id" />
            </li>
        </ul>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import ChallengeUsers from './ChallengeUsers'

export default {
    name: 'ChallengeReadyUsers',
    components: { PageTitle, ChallengeUsers },
    data: function() {
        return {
            users: [],
            page: 1,
            loadMore: true,
            id: this.$route.params.id
        }
    },
    methods: {
        getUsers() {
            const url = `${baseApiUrl}/users`
            axios(url).then(res => {
                this.users = this.users.concat(res.data)
            })
        }
    },
    watch: {
        $route() {
            this.users = []
            this.getUsers()
        }
    },
    mounted(){
      this.getUsers()
    }
}
</script>

<style>
    .articles-by-category ul {
        list-style-type: none;
        padding: 0;
    }
    
    .header-home{
        background-image: url("../../assets/bg.png");
        background-position: center; 
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
    }

    .category-icon{
        margin-top: 10px;
        text-align: center;
    }

    .category-icon > i{
        padding: 30px;
        color: #FFF;
        font-size: 3.4em;
        background-color: #408f62ff;
        border-radius: 100px;
    }

    .header-home h1{
        padding-top: 50px;
        color: #FFF;
        font-weight: 700;
    }

    .header-home h2{
        color: #FFF;
        font-weight: 500;
        padding-bottom: 50px;
    }

    .stats{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 10px;
        margin-left: 20px;
    }
    
    .buttonLoad{
        background-color: #FFF;
        color: #4cc181ff;
        font-weight: bold;
        border: 0;
    }

    .buttonLoad:hover{
        background-color: rgb(51, 163, 102);
        color: #FFF;
        font-weight: bold;
        border: 0;
    }

</style>
