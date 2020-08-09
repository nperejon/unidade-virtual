<template>
    <footer class="footer">
        <span>Clube de Líderes 4 Região. Todos os direitos reservados.</span>
        <img src="@/assets/logos_footer.png" />
    </footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style>
    .footer{
        grid-area: footer;
        background-color: #efefef;
        color: #212121ff;
        font-weight: 700;
        font-size: 0.8em;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
        padding-bottom: 20px;
        padding-left: 20px;
    }

    .footer > img{
        max-height: 40px;
        margin-left: 20px;
    }
</style>
