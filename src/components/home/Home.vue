<template>
    <div>
        <h1>Lista de Usuários</h1>
        <div class="filter">

        <el-input
            placeholder="Filtro"
            v-model="filterName"
            clearable>
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        </div>
        <p>{{filterName}}</p>
        <hr>
        
        <el-table :data="users.filter(data => !filterName || data.name.toLowerCase().includes(filterName.toLowerCase()))" style="width: 95%; margin: auto" >
            
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
                            @click.native.prevent="editUser(scope.$index, users)">
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
            filterName: ''
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
        editUser(index, user){
            console.log(index);
            console.log(user);
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
    .filter {
        text-align: right;
        width: 20%;

    }
</style>