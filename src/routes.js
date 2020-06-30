import Home from './components/home/Home.vue';
import CreateAccount from './components/create-account/CreateAccount.vue';



export const routes = [
    { path:'', name:'home', component: Home, title: 'Home' },
    { path:'/createaccount', name:'createaccount', component: CreateAccount, title: 'Registrar' },
    { path:'*', component: Home }

//    { path:'', name:'home', component: Home, titulo: 'Home', menu: true},
//    { path:'/createaccount', name:'createaccount', component: CreateAccount, titulo: 'Cadastro', menu: true},
//    { path:'/createaccount/:id', name:'editaccount', component: CreateAccount, titulo: 'Cadastro', menu: false},
//    { path: '*', component: Home, menu: false}
];