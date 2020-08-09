<template>
    <div class="articles-by-category">
        <div class="header-home">
            <div class="category-icon"><i class="fa fa-folder-o"></i></div>
            <PageTitle 
            :main="category.name" sub="Categoria" />
        </div>

      <ul>
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article="article" />
            </li>
        </ul>
        <div class="load-more">
            <button v-if="loadMore"
                class="buttonLoad btn btn-lg"
                @click="getArticles">Carregar Mais Artigos</button>
        </div>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import ArticleItem from './ArticleItem'

export default {
    name: 'ArticlesByCategory',
    components: { PageTitle, ArticleItem },
    data: function() {
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {
        getCategory() {
            const url = `${baseApiUrl}/categorias/${this.category.id}`
            axios(url).then(res => this.category = res.data)
        },
        getArticles() {
            const url = `${baseApiUrl}/categorias/${this.category.id}/artigos?page=${this.page}`
            axios(url).then(res => {
                this.articles = this.articles.concat(res.data)
                this.page++

                if(res.data.length === 0) this.loadMore = false
            })
        }
    },
    watch: {
        $route(to) {
            this.category.id = to.params.id
            this.articles = []
            this.page = 1
            this.loadMore = true

            this.getCategory()
            this.getArticles()
        }
    },
    mounted(){
      this.category.id = this.$route.params.id
      this.getCategory()
      this.getArticles()
    }
}
</script>

<style>
    .articles-by-category ul {
        list-style-type: none;
        padding: 0;
    }

    .articles-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
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
