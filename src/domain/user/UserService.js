export default class UserService {

    loadUsers() {
        let userTemp = JSON.parse(localStorage.getItem("users"));
        if (!userTemp){
            console.log("Users vazio");
            return userTemp;
        } else {
            return this.usersReturn = JSON.parse(localStorage.getItem("users"));
        }
    }

    deleteUser(index, users) {
        let userTemp = JSON.parse(localStorage.getItem("users"));
        if (!userTemp){
            console.log("Users vazio");
            return userTemp;
        } else {
            users.splice(index, 1);
            localStorage.setItem("users", JSON.stringify(users));
            return users;
        }        
    }

    addUser(user){
        let userTemp = JSON.parse(localStorage.getItem("users"));
        
        if (!userTemp){
            userTemp = [];
            userTemp.push(user);
            localStorage.setItem("users", JSON.stringify(userTemp));
        } else {
            //userTemp = JSON.parse(localStorage.getItem("users"));
            userTemp.push(user);
            localStorage.setItem("users", JSON.stringify(userTemp));
        }
        console.log(userTemp);
    }

    getUser(id) {
        let userTemp = JSON.parse(localStorage.getItem("users"));

        return userTemp[id];
    }

    editUser(id, user) {
        let userTemp = JSON.parse(localStorage.getItem("users"));
        userTemp.splice(id, 1, user);
        localStorage.setItem("users", JSON.stringify(userTemp));

    }

}