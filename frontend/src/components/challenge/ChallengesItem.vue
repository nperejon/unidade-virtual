<template>
    <div class="challenge-item">
        <router-link v-if="challenge.status == 0" :to="{ name: 'challengeById', params: { id: challenge.id } }">
            <div class="challenge-item-image d-none d-sm-block">
                <img v-if="challenge.imageUrl" :src="challenge.imageUrl" height="125" width="125" alt="Challenge">
                <img v-else src="../../assets/challenge.png" height="125" width="125" alt="Challenge">
            </div>
            <div class="challenge-item-info">
                <h2>{{ challenge.name }}</h2>
                <p>{{ challenge.description }}</p>
                <span class="challenge-item-author">
                    <strong>Autor: </strong>{{ challenge.author }}
                </span>
            </div>
            <div class="buttonResolver"><button class="buttonR do">Resolver Desafio</button></div>
        </router-link>
        <router-link v-if="challenge.status == 1" :to="{ name: 'challengeById', params: { id: challenge.id } }">
            <div class="challenge-item-image d-none d-sm-block">
                <img v-if="challenge.imageUrl"
                    :src="challenge.imageUrl"
                    height="125" width="125" alt="Challenge">
                <img v-else
                    src="../../assets/challenge.png"
                    height="125" width="125" alt="Challenge">
            </div>
            <div class="challenge-number"><p>#{{ challenge.id }}</p></div>
            <div class="challenge-item-info">
                <h2>{{ challenge.name }}</h2>
                <p>{{ challenge.description }}</p>
                <span class="challenge-item-author">
                    <strong>Autor: </strong>{{ challenge.author }}
                </span>
            </div>
            <button class="buttonResolver">Resolvido</button>
        </router-link>
        <div class="item-all" v-if="challenge.status == -1" :to="{ name: 'challengeById' }">
            <div class="challenge-item-image d-none d-sm-block">
                <img v-if="challenge.imageUrl" :src="challenge.imageUrl" height="125" width="125" alt="Challenge">
                <img v-else src="../../assets/challenge.png" height="125" width="125" alt="Challenge">
            </div>
            <div class="challenge-item-info">
                <h2>{{ challenge.name }}</h2>
                <p>{{ challenge.description }}</p>
                <span class="challenge-item-author">
                    <strong>Autor: </strong>{{ challenge.author }}
                </span>
            </div>
            <div class="buttonResolver"><button class="buttonR">Tempo Expirado</button></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChallengeItem',
    props: ['challenge']
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
