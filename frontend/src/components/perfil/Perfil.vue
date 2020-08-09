<template>
    <div class="perfil">
        <div class="header-home">
            <div class="novidades-icon"><img src="@/assets/icon.png" alt="Imagem de Perfil"></div>
            <PageTitle main="Perfil"
                :sub="userInfo.name + ' ' + userInfo.secondname" />
        </div>

        <div class="sobre"><h1>Informações da unidade</h1><p class="unidade">Unidade {{ userInfo.unidade }}</p>
            <div class="values">
                <span class="info-text-value">Desafios Resolvidos</span>
                <span class="info-value">{{ userInfo.desafiosresolvidos }}</span>
            </div>
            <div class="values">
                <span class="info-text-value">Pontos de Experiência</span>
                <span class="info-value">{{ userInfo.experiencia }}</span>
            </div>
            <div class="values">
                <span class="info-text-value">Habilidade de Gestão de Unidade</span>
                <span class="info-value">{{ userInfo.gestaodegrupo }}</span>
            </div>
            <div class="values">
                <span class="info-text-value">Habilidade de Arte de Acampar</span>
                <span class="info-value">{{ userInfo.artedeacampar }}</span>
            </div>
            <div class="values">
                <span class="info-text-value">Habilidade de Liderança</span>
                <span class="info-value">{{ parseInt(userInfo.lideranca) }}</span>
            </div>
        </div>

        <div class="sobre"><h1>Barra de Progresso</h1>
            <div class="progresso" v-bind:style="{ width: parseInt(userInfo.desafiosresolvidos) + 1 + '%'}"></div>
        </div>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle'
import { baseApiUrl } from "@/global"
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: 'Perfil',
    computed: mapState(['user']),
    components: { PageTitle },
    mounted(){
        const url = `${baseApiUrl}/users/${this.$route.params.id}`
            axios.get(url).then(res => {
                console.log(res.data)
                this.userInfo = {
                    name: res.data.name,
                    secondname: res.data.secondname,
                    clube: res.data.clube,
                    unidade: res.data.nomeunidade,
                    email: res.data.email,
                    lideranca: res.data.lideranca,
                    gestaodegrupo: res.data.gestaodegrupo,
                    experiencia: res.data.experiencia,
                    artedeacampar: res.data.artedeacampar,
                    desafiosresolvidos: res.data.desafiosresolvidos,
                    habilidades: res.data.habilidades
                }
                if(res.data.admin == 0){
                    this.userInfo.admin = "Líder"
                }else if(res.data.admin == 1){
                    this.userInfo.admin = "Moderador"
                }else if(res.data.admin == 3){
                    this.userInfo.admin = "Administrador"
                }else if(res.data.admin == 2){
                    this.userInfo.admin = "Diretor"
                }else if(res.data.admin == 4){
                    this.userInfo.admin = "Regional"
                }
            })

    },
    data: function() {
        return {
            userInfo: {}
        }
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
        margin-bottom: 10px;
    }

    .novidades-icon{
        margin-top: 10px;
        text-align: center;
    }

    .novidades-icon > img{
        border-radius: 150px;
        width: 150px;
        height: 150px;
    }

    .header-home{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .header-home h1{
        padding-top: 50px;
        color: #FFF;
        font-weight: 500;
        font-size: 1em;
    }

    .header-home h2{
        color: #FFF;
        font-weight: 500;
        padding-bottom: 50px;
        font-weight: bold;
        font-size: 1.5em;
    }

    .header-home p{
        color: #FFF;
        font-size: 1.2em;
        font-weight: 700;
    }

    .sobre{
        display: flex;
        border-radius: 8px;
        margin: 20px;
        background-color: #4cc181ff;
        color: #FFF;
        padding: 20px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
        flex-direction: column;
        margin-bottom: 50px;
    }

    .sobre h1{
        padding-left: 10px;
        font-weight: 500;
        text-align: center;
        font-weight: bold;
        font-size: 1.1em;
        text-transform: uppercase;
        margin-bottom: 20px;
    }


    .sobre p{
        padding-left: 10px;
        font-weight: 500;
        text-align: center;
        font-weight: bold;
        font-size: 1.1em;
    }

    .values {
        display: flex;
        justify-content: space-between;
    }


    .info-value{
        color: #399661ff;
        font-weight: 700;
    }

    .progresso{
        background-color: #FFF;
        height: 50px;
    }
</style>
