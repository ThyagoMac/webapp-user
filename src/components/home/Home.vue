<template>
    <div>
        <h1>Lista de Usuários</h1>

        <hr>
        <el-table :data="users" style="width: 95%; margin: auto" >
            
            <el-table-column
                sortable
                prop="registerDate"
                label="Inscrito em">
            </el-table-column>
            <el-table-column
                sortable
                prop="name"
                label="Nome">
            </el-table-column>
            <el-table-column
                sortable
                prop="age"
                label="Nascido Em">
            </el-table-column>
            <el-table-column
                sortable
                prop="email"
                label="Email">
            </el-table-column>
            <el-table-column
                sortable
                prop="login"
                label="Conta">
            </el-table-column>

            <el-table-column
            fixed="right"
            label="Editar"
            width="70">
                <!-- <router-link :to="{ name : 'createaccount' }"> -->
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle
                            @click.native.prevent="editUser(scope.$index)">
                        </el-button>
                    </template>
                <!-- </router-link> -->
            </el-table-column>

            <el-table-column
            fixed="right"
            label="Deletar"
            width="70"
            :formatter="formatter">
                <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" circle
                        @click.native.prevent="deleteUser(scope.$index, users)">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <hr>
        <br>
        <router-link :to="{name: 'createaccount'}">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
        </router-link>
        <!-- <el-button type="primary" icon="el-icon-edit" circle @click="loadUsers()"></el-button> -->
    </div>
</template>

<script>
import UserService from '../../domain/user/UserService.js';

export default {
    
    data() {
        return {
            users: [],
            tableData: [{
            date: '2016-05-03',
            name: 'zom',
            address: 'No. 189, Grove St, Los Angeles'
            }, {
            date: '2016-05-02',
            name: 'aom',
            address: 'No. 189, Grove St, Los Angeles'
            }, {
            date: '2016-05-04',
            name: 'com',
            address: 'No. 189, Grove St, Los Angeles'
            }, {
            date: '2016-05-01',
            name: 'bom',
            address: 'No. 189, Grove St, Los Angeles'
            }]
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
                this.users = this.service.deleteUser(index, users);
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
            this.users = this.service.loadUsers();
            /* let userTemp = JSON.parse(localStorage.getItem("users"));
            if (!userTemp){
                console.log("Users vazio");
            } else {
                this.users = JSON.parse(localStorage.getItem("users"));
            } */
        },
        editUser(index){
            this.$router.push({
                name: 'altera', params: { id: index }
            });
        },
        formatter(row) {
        return row.address;
        }
    },
    created() {
        this.service = new UserService();
        this.loadUsers();
    }
}
</script>

<style scoped>

</style>