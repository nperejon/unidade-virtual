<template>
    <div class="admin-pages">
        <div class="header-home">
            <div class="adm-icon"><i class="fa fa-cogs"></i></div>
            <PageTitle main="Administração"
                sub="Administração do Sistema" />
        </div>
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Artigos" active>
                        <ArticleAdmin />
                    </b-tab>
                    <b-tab title="Categorias">
                        <CategoryAdmin />
                    </b-tab>
                    <b-tab title="Usuários">
                        <UserAdmin />
                    </b-tab>
                    <b-tab title="Desafios">
                        <ChallengeAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle'
import ArticleAdmin from './ArticleAdmin'
import CategoryAdmin from './CategoryAdmin'
import ChallengeAdmin from './ChallengeAdmin'
import UserAdmin from './UserAdmin'

export default {
    name: "AdminPages",
    components: { PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin, ChallengeAdmin }
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

    .adm-icon{
        margin-top: 10px;
        text-align: center;
    }

    .adm-icon > i{
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
