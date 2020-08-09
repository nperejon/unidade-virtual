<template>
    <div class="challenge-item" v-if="doChallenge">
        <router-link :to=" '/avaliar/user/' + user.id + '/desafio/' + iddesafio">
            <div class="challenge-item-image d-none d-sm-block">
                <img src="../../assets/icon.png" height="125" width="125" alt="User">
            </div>
            <div class="challenge-item-info">
                <h2>{{ user.name }} {{ user.secondname }}</h2>
                <p>{{ user.nomeunidade }}</p>
            </div>
            <div class="buttonResolver"><button class="buttonR do">Avaliar</button></div>
        </router-link>
    </div>
</template>

<script>
import { baseApiUrl } from "@/global"
import axios from 'axios'

export default {
    name: 'ChallengeUsers',
    props: ['user', 'iddesafio'],
    data: function() {
        return {
            doChallenge: Boolean
        }
    },
    mounted(){
        const urlAnswers = `${baseApiUrl}/user/${this.user.id}/desafio/${this.iddesafio}`
        axios.get(urlAnswers).then(_ => this.doChallenge = true).catch(
            this.doChallenge = false
        )
    }
}
</script>

<style>
    .item-all{
        display: flex;
        justify-content: space-between;    
    }

    .challenge-item {
        margin: 10px;
        margin-bottom: 20px;
        padding: 20px;
        border-bottom: 1px solid #868b91ff;
    }

    .challenge-item a {
        display: flex;
        align-items: flex-start;
        text-decoration: none;
        color: #212121;
    }

    .challenge-item-info h2 {
        font-size: 1.7rem;
    }

    .challenge-item-image {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid rgb(241, 241, 241);
    }

    .challenge-item-image img {
        border-radius: 100px;
        border: 6px solid #212121;
    }

    .challenge-item-info {
        display: flex;
        align-self: stretch;
        flex-direction: column;
    }
    .challenge-item-info p {
        flex: 1;
        color: #212121;
        font-size: 1.1rem;
    }

    .buttonResolver{
        margin-left: auto;
    }

    button:focus {outline:0;}

    .buttonR{
        background-color: #aaaaaa;
        border: 0;
        border-radius: 25px;
        color: #FFF;
        padding: 13px;
        font-weight: bold;
        margin-top: 20px;
        padding-left: 15px;
        padding-right: 15px;
    }
    
    .do{
        background-color: #474747;
        cursor: pointer;
    }

    .do:hover{
        background-color: #303030; 
    }
</style>
