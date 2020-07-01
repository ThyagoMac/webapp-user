import Home from './components/home/Home.vue';
import CreateAccount from './components/create-account/CreateAccount.vue';


export const routes = [
    { path:'', name:'home', component: Home, title: 'Home', menu: true },
    { path:'/createaccount', name:'createaccount', component: CreateAccount, title: 'Registrar', menu: true },
    { path:'/createaccount/:id', name:'altera', component: CreateAccount, title: 'Alterar', menu: false },
    { path:'*', component: Home, menu: false }
];