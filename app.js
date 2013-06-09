Parse.initialize('925qu3OQV7NK7DksVYwJSIdVvr8x5ZtLzEU5jg1i', 'yHldFlVEPsBCi6VY7WQbqEaGzuOun8ziZRHj4tvY');
var currentUser = Parse.User.current();


$(document).ready(function(){

    if (currentUser) {
        $('.loggedOut').hide();
        $('.loggedIn').show();
    } else {
        $('.loggedOut').show();
        $('.loggedIn').hide();
    }

    $('#sign-out').click(function(){
        Parse.User.logOut();
        window.location = '/';
    });
});

function isLoggedIn(){
    return currentUser != null;
}

function signUp(username, password, email){
    var user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);

    user.signUp(null, {
        success: function(user) {
            window.location = '/';
        },
        error: function(user, error) {
            alert(error.message);
        }
    });
}


function Login(username, password){
    Parse.User.logIn(username, password, {
        success: function(user) {
            window.location = '/';
        },
        error: function(user, error) {
            alert(error.message);
        }
    });
}
