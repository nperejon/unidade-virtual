<template>
        <div class="challenge-admin">
        <b-form>
            <input id="challenge-id" type="hidden" v-model="challenge.id" />
            <b-form-group label="Nome:" label-for="challenge-name">
                <b-form-input id="challenge-name" type="text"
                    v-model="challenge.name" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Nome do Desafio..." />
            </b-form-group>
            <b-form-group label="Descrição" label-for="challenge-description">
                <b-form-input id="challenge-description" type="text"
                    v-model="challenge.description" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Nome do Desafio..." />
            </b-form-group>
            <b-form-group v-for="index in camposTotais" :key="index" class="questions" label='Campo de Pergunta' label-for="challenge-question">
                <b-form-input class="challenge-question" type="text"
                    v-model="challenge['question_' + index ]" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe a Pergunta..." />          

                    <!-- Outras Perguntas -->
            </b-form-group>

            <b-form-group v-if="mode === 'save'" 
                label="Autor:" label-for="challenge-userId">
                <b-form-select id="challenge-userId"
                    :options="users" v-model="challenge.userId" />
            </b-form-group>

            <b-button variant="primary" v-if="mode === 'save'"
                @click="adicionarCampos()">Adicionar Campo</b-button>
            <b-button class="ml-2" variant="danger" v-if="mode === 'save'"
                @click="removerCampos()">Remover Campo</b-button><br/><br/>

            <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="challenges" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="danger" @click="loadChallenge(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'ChallengeAdmin',
    components: { VueEditor },
    data: function() {
        return {
            mode: 'save',
            challenge: {},
            challenges: [],
            camposTotais: 1,
            users: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        reset() {
            this.mode = 'save'
            this.challenge = {}
            this.loadChallenges()
            this.camposTotais = 1;
        },
        save() {
            const method = this.challenge.id ? 'put' : 'post'
            const id = this.challenge.id ? `/${this.challenge.id}` : ''
            axios[method](`${baseApiUrl}/desafios${id}`, this.challenge)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.challenge.id
            axios.delete(`${baseApiUrl}/desafios/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadChallenge(challenge, mode = 'save') {
            this.mode = mode
            axios.get(`${baseApiUrl}/desafios/${challenge.id}`).then(res => {
                    this.challenge = { 
                        id: res.data.info.id,
                        description: res.data.info.description,               
                        name: res.data.info.name,
                        imageUrl: res.data.info.imageUrl,
                    }
                    res.data.questions.forEach(n => {
                        this.challenge[`question_${n.questionNumber}`] = n.text
                    })
                    this.camposTotais = res.data.questions.length
                    console.log(this.challenge)
                })
        },
        loadChallenges() {
            const url = `${baseApiUrl}/desafios`
            axios.get(url).then(res => {
                this.challenges = res.data
            })
        },
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data.map(user => {
                    return { value: user.id, text: `${user.name} - ${user.email}` }
                })
            })
        },
        adicionarCampos(){
            if(this.camposTotais > 0){
                this.camposTotais++
            }
        },
        removerCampos(){
            if(this.camposTotais > 0){
                this.camposTotais = this.camposTotais - 1
            }
        }
    },
    mounted() {
        this.loadUsers()
        this.loadChallenges()
    }
}
</script>

<style>

</style>