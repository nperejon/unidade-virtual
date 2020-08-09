<template>
    <div class="challenge-by-id" v-if="!hasAnswers">
        <div class="header-home">
        <div class="category-icon"><i class="fa fa-file-o"></i></div>
            <PageTitle 
            :main="challengeToUser.name" :sub="challengeToUser.description" />
        </div>
            <b-form class="responder-desafio">
                <b-form-group v-for="index in camposTotais" :key="index">
                <label class="titulo-pergunta">{{ index }} - {{ challengeToUser.questions[index - 1] }}</label>
                <b-form-input class="resposta-desafio" type="text" v-model="answer['answer_' + index ]" required />
                </b-form-group>
            </b-form>

            <div class="btn-res"><button variant="primary" class="enviar-desafio" @click="save">Enviar</button></div>
    </div>

    <div class="challenge-by-id" v-else>
        <div class="header-home">
        <div class="category-icon"><i class="fa fa-file-o"></i></div>
            <PageTitle 
            :main="challengeToUser.name" :sub="challengeToUser.description" />
        </div>
            <b-form class="responder-desafio center">
                <b-form-group v-for="index in camposTotais" :key="index">
                <label class="titulo-pergunta big">{{ index }} - {{ challengeToUser.questions[index - 1] }}</label>
                <p class="resposta-pergunta"><b>Sua Resposta:</b> {{ answersReady[index - 1] }}</p>
                </b-form-group>
            </b-form>

            <div class="btn-res"><button variant="primary" class="enviar-desafio" @click="retornar">Retornar</button></div>
    </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global"
import { mapState } from 'vuex'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import Vue from 'vue'

export default {
    name: 'ChallengeById',
    computed: mapState(['user']),
    components: { PageTitle },
    data: function() {
        return {
            challengeToUser: {},
            camposTotais: 0,
            answer: {},
            answersReady: new Array(),
            hasUndefined: false,
            hasAnswers: Boolean
        }
    },
    mounted() {
        const urlAnswers = `${baseApiUrl}/user/${this.user.id}/desafio/${this.$route.params.id}`
        axios.get(urlAnswers).then(res => {
            res.data.questions.forEach(n => {
                this.answersReady.push(n.answer)
                this.hasAnswers = true
            })
        }).catch(
            this.hasAnswers = false
        )

        const url = `${baseApiUrl}/desafios/${this.$route.params.id}`
        axios.get(url).then(res => {
            this.challengeToUser = {
                id: res.data.info.id,
                name: res.data.info.name,
                description: res.data.info.description,
                questions: new Array()
            }
            res.data.questions.forEach(n => {
                this.challengeToUser.questions.push(n.text)
            })
            this.camposTotais = this.challengeToUser.questions.length;
        })
    },
    methods: {
        save() {
            for(let i = 0; i < this.camposTotais; i++){
                if(this.answer[`answer_${i + 1}`] == undefined || this.answer[`answer_${i + 1}`] == ''){
                    this.hasUndefined = true;
                }else{
                    this.hasUndefined = false;
                }
            }
            const method = 'post'
            this.answer.userId = this.user.id
            const id = this.challengeToUser.id
                if(!this.hasUndefined){
                axios[method](`${baseApiUrl}/responder/desafio/${id}`, this.answer)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.$router.push({ path: '/' })
                    })
                    .catch(showError)
                }else{
                    Vue.toasted.global.defaultError({ msg : "Não foram preenchidos todos os campos de resposta." })
                }
        },
        retornar() {
            this.$router.push({ path: '/desafios' })
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

    .responder-desafio{
        margin: 20px;
    }

    .titulo-pergunta{
        font-size: 1.1em;
    }

    .btn-res{
        display: flex;
        justify-content: center;
    }

    .enviar-desafio{
        border: 0;
        background-color: #408f62ff;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFF;
        border-radius: 5px;
        padding: 5px;
        width: 30%;
        cursor: pointer;
        margin-bottom: 20px;
        font-weight: bold;
        font-size: 1.2em;
    }

    .enviar-desafio:hover{
        background-color: rgb(52, 117, 80);
    }

    .resposta-pergunta{
        font-size: 1.1em;
        text-align: center;
    }

    .center{
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .big{
        font-size: 1.3em;
    }
</style>
