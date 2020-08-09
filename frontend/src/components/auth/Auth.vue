<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo_unidade_virtual.png" width="200" alt="Logo" />

            <input v-if="showSignup" v-model="user.name" type="text" placeholder="Nome">
            <input v-if="showSignup" v-model="user.secondname" type="text" placeholder="Sobrenome">
            <input v-model="user.email" name="email" type="text" placeholder="E-mail">
            <input v-if="showSignup" v-model="user.nomeunidade" type="text" placeholder="Nome da Unidade">
            <input v-if="showSignup" v-model="user.clube" type="text" placeholder="Nome do Clube">
            <input v-model="user.password" name="password" type="password" placeholder="Senha">
            <input v-if="showSignup" v-model="user.confirmPassword"
                type="password" placeholder="Confirme a Senha">

            <button v-if="showSignup" @click="signup">Cadastrar</button>
            <button v-else @click="signin">Login</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
                <span v-else>Não tem cadastro? Registre-se aqui!</span>
            </a>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function() {
        return {
            showSignup: false,
            user: {}
        }
    },
    methods: {
        signin() {
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({ path: '/' })
                })
                .catch(showError)
        },
        signup() {
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showSignup = false
                })
                .catch(showError)
        }
    }
}
</script>

<style>
    body{
        background-color: #4cc181ff;
    }

    .auth-content{
        background-color: #4cc181ff;
        height: 100%;
    }

    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        width: 350px;
        padding: 35px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-modal > img{
        margin-bottom: 50px;
    }

    .auth-modal input {
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
        background-color: transparent;
        border: 0;
        border-bottom: #aed8c1ff solid 2px;
        color: #FFF;
        padding-top: 20px;
    }

    .auth-modal button {
        align-self: flex-end;
        background-color: #a4ceb7ff;
        border-radius: 5px;
        color: #184740ff;
        width: 100%;
        border: 0;
        padding: 10px;
    }

    .auth-modal a {
        margin-top: 35px;
        color: #FFF;
        outline: 0;
        text-decoration: none;
    }

    .auth-modal > ::-webkit-input-placeholder {
        color: #8adfacff;
        font-family: 'Roboto';
        font-size: 0.9em;
        text-transform: uppercase;
    }

    .auth-modal > :-moz-placeholder {
        color: #8adfacff;
        font-family: 'Roboto';
        font-size: 0.9em;
        text-transform: uppercase;
        font-weight: bold;
    }

    .auth-modal > ::-moz-placeholder {
        color: #8adfacff;
        font-family: 'Roboto';
        font-size: 0.9em;
        text-transform: uppercase;
        font-weight: bold;
    }

    .auth-modal > :-ms-input-placeholder {  
        color: #8adfacff;
        font-family: 'Roboto';
        font-size: 0.9em;
        text-transform: uppercase;
        font-weight: bold;
    }

    .auth-modal > input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: 0;
  -webkit-text-fill-color: #FFF;
  transition: background-color 5000s ease-in-out 0s;
}

</style>
