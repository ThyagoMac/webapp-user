<template>
    <div>
        <h1>Lista de Usuários</h1>
        <p>component Home.vue</p>
        <hr><br>

        <el-row :gutter="20">
            <el-col :span="4"><div class="grid-content bg-purple"></div>Data de Cadastro</el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div>Nome</el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div>Ano de Nascimento</el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div>Email</el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div>Login</el-col>
        </el-row>
        <ul class="lista-fotos">
            <li class="lista-fotos-item" v-for="user in users" :key="user.name">
                <p>{{user.name}}</p>
                

            </li>
        </ul>

        <hr><br>
        
        <div v-for=" user in users" :key="user.name"> {{user.name}}</div>
        <el-button type="primary" icon="el-icon-edit" circle @click="loadUsers()"></el-button>


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
    methods: {
        loadUsers(){
            let userTemp = JSON.parse(localStorage.getItem("users"));
            if (!userTemp){
                console.log("Users vazio");
            } else {
                this.users = JSON.parse(localStorage.getItem("users"));
            }
        }
    },
    mounted() {
       // this.loadUsers();        
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