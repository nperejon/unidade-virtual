<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Digite para filtar..."
                v-model="treeFilter" class="filter-field" />
        </div>
        <Tree :data="treeData" :options="treeOptions"
        :filter="treeFilter" ref="tree" />
        <div class="content-menu"></div>
        <div class="footer-logo"><img src="@/assets/logo_unidade_virtual.png" alt="Logo Unidade Virtual" class="logounidadevirtual" /></div>
    </aside>
</template>

<script>
import { mapState } from 'vuex'
import Tree from 'liquor-tree'
import { baseApiUrl } from '@/global'
import axios from 'axios'

//Função do vuex
//Responsável por mapear o atributo da store dentro do componente

export default {
    name: "Menu",
    components: { Tree },
    computed: mapState(['isMenuVisible']),
    data: function() {
        return {
            treeFilter: '',
            treeData: this.getTreeData(),
            treeOptions: {
                propertyNames: {
                    'text': 'name'
                },
                filter: {
                    emptyText: 'Categoria não encontrada'
                }
            }
        }
    },
    methods: {
        getTreeData() {
            const url = `${baseApiUrl}/categorias/tree`
            return axios.get(url).then(res => res.data)
        },
        onNodeSelect(node) {
            this.$router.push({
                name: 'articlesByCategory',
                params: { id: node.id }
            })

            if(this.$mq === 'xs' || this.$mq === 'sm') {
                this.$store.commit('toggleMenu', false)
            }
        }
    },
    mounted(){
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    }
}
</script>

<style>
    .menu{
        grid-area: menu;
        background-color: #212121;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap; /* Permite quebra de linha */
    }
    
    .footer-logo{
        padding: 15px;
    }

    .footer-logo > img{
        max-height: 45px;
    }

    .menu a,
    .menu a:hover{
        color: #FFF;
        text-decoration: none;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover{
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.has-child{
        filter: brightness(2)
    }

    .menu .menu-filter{
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #AAA;
    }

    .menu .menu-filter i{
        color: #AAA;
        margin-right: 10px;
    }

    .menu input{
        color: #CCC;
        font-size: 1rem;
        border: 0;
        outline: 0;
        width: 90%;
        background-color: transparent;
    }

    .tree-filter-empty{
        color: #CCC;
        margin-left: 20px;
        margin-bottom: 20px;
    }
</style>
