<template>
    <div>
        <h1>Lista de Usuários</h1>
        <hr>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="Date"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="Name"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="Address">
            </el-table-column>
        </el-table>
        <hr>
        <br>
        <hr><br>

        <el-row :gutter="20">
            <el-col :span="4"><div class=""></div>Data de Cadastro</el-col>
            <el-col :span="4"><div class=""></div>Nome</el-col>
            <el-col :span="4"><div class=""></div>Ano de Nascimento</el-col>
            <el-col :span="4"><div class=""></div>Email</el-col>
            <el-col :span="4"><div class=""></div>Login</el-col>
        </el-row>
        <el-row v-for="user in users" :key="user.name">
            <hr>
            <el-col :span="4"><div class=""></div>{{user.registerDate}}</el-col>
            <el-col :span="4"><div class=""></div>{{user.name}}</el-col>
            <el-col :span="4"><div class=""></div>{{user.age}}</el-col>
            <el-col :span="4"><div class=""></div>{{user.email}}</el-col>
            <el-col :span="4"><div class=""></div>{{user.login}}</el-col>
            
        </el-row>

        <hr><br>
        <el-button type="primary" icon="el-icon-edit" circle @click="loadUsers()"></el-button>


    </div>
</template>

<script>
export default {
    
    data() {
        return {
            users: [],
            tableData: [{
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }, {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }, {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }, {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }]
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