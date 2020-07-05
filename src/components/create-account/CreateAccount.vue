<template>
    <div>
        <h1>Novo Usuário</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="25%" class="user-form" size="medium">
            <el-form-item label="Nome Completo" prop="name">
                <el-input v-model="ruleForm.name" ></el-input>
            </el-form-item>
            <el-form-item label="Data de Nascimento" prop="age">
            
                <el-date-picker
                style="width: 100%"
                v-model="ruleForm.age"
                type="date"
                placeholder="Data de Nascimento"
                format="dd/MM/yyyy"
                value-format="dd-MM-yyyy"
                :picker-options="pickerOptions"
                :default-value="checkDate">
                </el-date-picker>
            
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input v-model="ruleForm.email" placeholder="exemplo@gmail.com"></el-input>
            </el-form-item>
            <el-form-item label="Apelido" prop="login">
                <el-input v-model="ruleForm.login"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Repita Password" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" size="large" >Cadastrar</el-button>
                <el-button @click="resetForm('ruleForm')" size="large">Desfazer</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import UserService from '../../domain/user/UserService.js';

  export default {
    data() {
        var checkName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('Nome obrigatório'));
            }else {
                //let noLetters = /^[A-Za-z]+$/;
                let noLetters = /^([A-Z]+[a-z]+\s)*[A-Z]+[a-z]+$/;

                let validName = !value.match(noLetters);

                if(validName){
                    callback(new Error('Nome possui caracteres inválidos OU falta o sobre nome'));
                }else{
                    callback();
                }
            }
        }
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('Data de Nascimento obrigatória'));
            } else {
                callback();
            }
        }

        var checkEmail = (rule, value, callback) =>{
            let userTemp = JSON.parse(localStorage.getItem("users"));
            if (!value) {
                return callback(new Error('Email obrigatório'));
            } else if (this.id){
                userTemp[this.id].email = '';
                for (let i=0; userTemp.length > i; i++){
                    if(userTemp[i].email == this.ruleForm.email){
                        return callback(new Error('Email já utilizado. Tente outro'));
                    }
                }
            } else {  
                for (let i=0; userTemp.length > i; i++){
                    if(userTemp[i].email == this.ruleForm.email){
                        return callback(new Error('Email já utilizado. Tente outro'));
                    }
                }
            }
            callback();
        }

        var checkLogin = (rule, value, callback) => {
            let userTemp = JSON.parse(localStorage.getItem("users"));
            if (!value) {
                return callback(new Error('Login obrigatório'));
            } else if (this.id){
                userTemp[this.id].login = '';
                for (let i=0; userTemp.length > i; i++){
                    if(userTemp[i].login == this.ruleForm.login){
                        return callback(new Error('Login já utilizado. Tente outro apelido'));
                    }
                }
            }
            else {
                for (let i=0; userTemp.length > i; i++){
                    if(userTemp[i].login == this.ruleForm.login){
                        return callback(new Error('Login já utilizado. Tente outro apelido'));
                    }
                }
            }
            callback();
        }

        var validatePass = (rule, value, callback) => {
            let lowerCase = new RegExp(/[a-z]/i);
            let upperCase = new RegExp("[A-Z]");
            let specialChar = new RegExp(/[^a-z0-9]/i);
            let number = new RegExp(/[0-9]/i);
            
            if (value === '') {
                callback(new Error('Um password é necessário'));
            } else if (value.length < 6) {
                callback(new Error('O password é precisa conter mais que 6 dígitos'));
            } else if (!number.test(value)){
                callback(new Error('O password precisa conter pelo menos 1 número'));
            } else if (!lowerCase.test(value)) {
                callback(new Error('O password precisa conter pelo menos 1 dígitos em minúsculo'));
            } else if (!upperCase.test(value)){
                callback(new Error('O password precisa conter pelo menos 1 dígito em maiúsculo'));
            } else if (!specialChar.test(value)){
                callback(new Error('O password precisa conter pelo menos 1 caractere especial (@, !, #) '));
            } 
            else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Repita o password'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('Password incorreto!!! Repita o mesmo password'));
            } else {
                callback();
            }
        };
      return {
        ruleForm: {
            name: '',
            age: '',
            email: '',
            login: '',
            pass: '',
            checkPass: '',
            registerDate: ''
        },
        checkDate: {},
        id: this.$route.params.id ,
        users: [],
        rules: {
            name: [
                { required: true, validator: checkName, trigger: 'blur' }
            ],
            age: [
                { required: true, validator: checkAge, trigger: 'blur' }
            ],
            email: [
                { required: true, validator: checkEmail, trigger: ['blur', 'change'] },
                { type: 'email', message: 'Email inválido', trigger: ['blur', 'change'] },
            ],
            login: [
                { required: true, validator: checkLogin }
            ],
            pass: [
                { required: true, validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { required: true, validator: validatePass2, trigger: 'blur' }
            ],
        },
        pickerOptions: {
          disabledDate(time) {
            let date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7 * 939)
            return time.getTime() > date;
          }
        },
 
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.id){
                //this.users = this.ruleForm;
                this.service.editUser(this.id, this.ruleForm);
                this.$notify({
                title: 'Success',
                message: 'Usuário alterado com sucesso!',
                type: 'success'
                });
            } else {
                let data = new Date();
                this.ruleForm.registerDate = (data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear());
                //this.users = this.ruleForm;
                this.service.addUser(this.ruleForm);
                //this.resetForm('ruleForm');  <--- reseta o formulario se for ficar na mesma pagina!!!
                this.$notify({
                title: 'Success',
                message: 'Novo usuário cadastrado com sucesso!',
                type: 'success'
                });
            }
            this.$router.push({ name: 'home' }); //<--Leva para home!
            
          } else {

            this.$notify.error({
            title: 'Error',
            message: 'Não foi possível cadastrar cheque se há algum erro.',
            type: 'error'
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {

        this.checkDate = new Date();
        this.checkDate.setTime(this.checkDate.getTime() - 3600 * 1000 * 24 * 7 * 939)

        this.service = new UserService();

        if(this.id){
            let user = this.service.getUser(this.id);
            this.ruleForm = user;
        }
    }
  }
</script>

<style scoped>
.user-form {
    width: 85%;
    margin: auto;
}
</style>
