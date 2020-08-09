<template>
    <div class="home">
        <div class="header-home">
            <div class="novidades-icon"><i class="fa fa-newspaper-o"></i></div>
            <PageTitle main="Novidades"
                sub="Atualizações do Sistema" />
        </div>
        <div class="stats">
                <Estatistica title="Desafios" :value="stat.challenges" 
                    color="#FFF" />
                <Estatistica title="Categorias" :value="stat.categories" 
                    color="#FFF" />
             <Estatistica title="Artigos" :value="stat.articles" 
                    color="#FFF" />
             <Estatistica title="Usuários" :value="stat.users" 
                   color="#FFF" />
        </div>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle'
import Estatistica from '@/components/home/Estatistica'
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
    name: 'Home',
    components: { PageTitle, Estatistica },
    data: function() {
        return {
            stat: {}
        }
    },//data é função que retorna um obj
    methods: {
        getStats() {
            axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
        }
    },
    mounted() {
        this.getStats()
    }
}
</script>

<style>
    .header-home{
        background-image: url("../../assets/bg.png");
        background-position: center; 
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
    }

    .novidades-icon{
        margin-top: 10px;
        text-align: center;
    }

    .novidades-icon > i{
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
</style>
