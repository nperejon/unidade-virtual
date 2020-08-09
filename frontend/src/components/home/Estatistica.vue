<template>
    <div class="stat">
            <span class="stat-title">{{ title }}</span>
            <div class="values">
                <span class="stat-text-value">Totais</span>
                <span class="stat-value">{{ value }}</span>
            </div>
    </div>
</template>

<script>
export default {
    name: 'Estatísticas',
    props: ['title', 'value', 'icon', 'color'],
    computed: {
        style() {
            return "color: " + (this.color || "#000")
        }
    }
}
</script>

<style>
    .stat {
        flex: 1;
        display: flex;
        border-radius: 8px;
        margin-right: 20px;
        margin-bottom: 20px;
        background-color: #4cc181ff;
        color: #FFF;
        padding: 20px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
        flex-direction: column;
    }

    .stat-title{
        padding-left: 10px;
        font-weight: 500;
        text-transform: uppercase;
        text-align: center;
        font-weight: bold;
        font-size: 1.1em;
    }

    .values {
        display: flex;
        justify-content: space-between;
    }

    .stat-value{
        color: #399661ff;
        font-weight: 700;
    }
</style>
