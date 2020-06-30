<template>
    <div>
        <h1>Novo Usuário</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="25%" class="user-form" size="medium">
            <el-form-item label="Nome Completo" prop="name">
                <el-input v-model="ruleForm.name" ></el-input>
            </el-form-item>
            <el-form-item label="Idade" prop="age">
                <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
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
  export default {
    data() {
        var checkName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('Nome obrigatório'));
            }else {
                let noLetters = /^[A-Za-z]+$/;

                let validName = value.match(noLetters);

                if(validName){
                    callback(new Error('Nome possui caracteres inválidos OU falta o sobre nome'));
                }else{
                    callback();
                }
            }
        };
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('Idade obrigatória'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('Apenas números'));
                } else {
                    if (value < 18) {
                    callback(new Error('Precisa ser maior de idade'));
                    } else {
                    callback();
                    }
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('Um password é necessário'));
            } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
/* 
            $('#senha').bind('keyup', function () {
        var pass = $(this).val();
        var forca = 0;

        if (pass.length > 10) {
            forca = forca + 25;
        }

        var box = new RegExp(/[a-z]/i);
        if (box.test(pass)) {
            forca = forca + 25;
        }

        var box = new RegExp(/[0-9]/i);
        if (box.test(pass)) {
            forca = forca + 25;
        }

        var box = new RegExp(/[^a-z0-9]/i);
        if (box.test(pass)) {
            forca = forca + 25;
        }

        if (forca == 25) {

            $('#forca').removeClass().addClass('pessima').html("Péssima");
        }
        if (forca == 50) {
            $('#forca').removeClass().addClass('ruim').html("Ruim");
        }
        if (forca == 75) {
            $('#forca').removeClass().addClass('boa').html("Aceitavel");
        }
        if (forca == 100) {
            $('#forca').removeClass().addClass('otima').html("Excelente");
        }
    });
     */




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
        users: [],
        rules: {
            name: [
                { required: true, validator: checkName, trigger: 'blur' }
            ],
            age: [
                { required: true, validator: checkAge, trigger: 'blur' }
            ],
            email: [
                { message: 'Insira seu email aqui', trigger: 'blur' },
                { required: true, type: 'email', message: 'Email inválido', trigger: ['blur', 'change'] }
            ],
            login: [
                { required: true }
            ],
            pass: [
                { required: true, validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { required: true, validator: validatePass2, trigger: 'blur' }
            ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let userTemp = JSON.parse(localStorage.getItem("users"));
            var data = new Date();
            this.ruleForm.registerDate = (data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear());
            
            if (!userTemp){
                this.users.push(this.ruleForm);
                localStorage.setItem("users", JSON.stringify(this.users));
            } else {
                this.users = JSON.parse(localStorage.getItem("users"));
                this.users.push(this.ruleForm);
                localStorage.setItem("users", JSON.stringify(this.users));
            }
            
            console.log(this.users);
            this.resetForm('ruleForm');
            this.$notify({
            title: 'Success',
            message: 'Novo usuário cadastrado com sucesso!',
            type: 'success'
            });
            //alert('Novo usuário cadastrado com sucesso!');
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
    }
  }
</script>

<style scoped>

</style>