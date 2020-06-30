<template>
    <div>
        <h1>Lista de Usuários</h1>
        <p>component Home.vue</p>

    </div>
</template>

<script>
export default {
    
    data() {
        return {
            users: []
        }
    },
    computed: {

    },
    created() {
        
        users = JSON.parse(localStorage.getItem("users"));
        console.log(users);
        
    }



    /* 
    var hoje = new Date().toDateString();
    var data2 = new Date('07/04/2017').toDateString();

    console.log(hoje)
    console.log(data2)

    if (hoje > data2) {
    console.log('Hoje é maior que data2')
    } else if (hoje == data2) {
    console.log('Hoje é igual a data2')
    } else {
    console.log('Hoje é menor que data2')
    } 
    */
}
</script>

<style scoped>

</style>