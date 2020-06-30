<template>
    <div>
        <h1>Lista de Usuários</h1>
        <hr>
        <el-table :data="users" style="width: 95%; margin: auto" >
            
                <el-table-column
                    prop="registerDate"
                    label="Inscrito em">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="Nome">
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="Idade">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="Email">
                </el-table-column>
                <el-table-column
                    prop="login"
                    label="Conta">
                </el-table-column>

                <el-table-column
                fixed="right"
                label="Editar"
                width="70">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle
                            @click.native.prevent="deleteUser(scope.$index, users)">
                        </el-button>
                    </template>
                </el-table-column>

                <el-table-column
                fixed="right"
                label="Deletar"
                width="70">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle
                            @click.native.prevent="deleteUser(scope.$index, users)">
                        </el-button>
                    </template>
                </el-table-column>
        </el-table>

        <hr>
        <br>

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
        deleteUser(index, users) {
            this.$confirm('Tem certeza que deseja deletar esse usuário permanentemente???', 'Warning', {
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            type: 'warning'
            }).then(() => {
                users.splice(index, 1);
                localStorage.setItem("users", JSON.stringify(this.users));
                this.$notify({
                    title: 'Success',
                    message: 'Usuário removido com sucesso!',
                    type: 'success'
                });
            }).catch(() => {
                this.$notify({
                title: 'Warning',
                message: 'Usuário não foi removido!',
                type: 'warning'
                });          
            });
        },
        loadUsers(){
            let userTemp = JSON.parse(localStorage.getItem("users"));
            if (!userTemp){
                console.log("Users vazio");
            } else {
                this.users = JSON.parse(localStorage.getItem("users"));
            }
        },

        /* deleteUser(index, users) {
            users.splice(index, 1);
            localStorage.setItem("users", JSON.stringify(this.users));
            this.$notify({
            title: 'Warning',
            message: 'Usuário removido com sucesso!',
            type: 'warning'
            });
        } */
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
.table-user {
    border-top: 1px solid gray;
    /* border: 1px solid black; */
    border-collapse: collapse;
    border-radius: 1px;
}

</style>