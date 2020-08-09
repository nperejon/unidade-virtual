<template>
    <div class="article-by-id">
        <div class="header-home">
        <div class="category-icon"><i class="fa fa-file-o"></i></div>
            <PageTitle 
            :main="article.name" :sub="article.description" />
        </div>
        <div class="article-content" v-html="article.content"></div>
    </div>
</template>

<script>
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack.js'
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'

export default {
    name: 'ArticleById',
    components: { PageTitle },
    data: function() {
        return {
            article: {}
        }
    },
    mounted() {
        const url = `${baseApiUrl}/artigos/${this.$route.params.id}`
        axios.get(url).then(res => this.article = res.data)
    },
    updated() {
        document.querySelectorAll('.article-content pre.ql-syntax').forEach(e => {
            hljs.highlightBlock(e)
        })
    }
}
</script>

<style>
    .article-content {
        background-color: #FFF;
        border-radius: 8px;
        padding: 50px;
    }

    .article-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: #FFF;
    }

    .article-content img {
        max-width: 100%;
    }

    .article-content :last-child {
        margin-bottom: 0px;
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
</style>
