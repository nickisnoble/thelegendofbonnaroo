Parse.initialize('925qu3OQV7NK7DksVYwJSIdVvr8x5ZtLzEU5jg1i', 'yHldFlVEPsBCi6VY7WQbqEaGzuOun8ziZRHj4tvY');
var currentUser = Parse.User.current();
var maxLevel = 5;


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
        window.location = '/login';
    });

    $('#sign-up').click(function(){
        $('#sign-up').attr("disabled", "disabled");
        signUp(
            $('#username').text(),
            $('#password').text(),
            $('#email').text(),
            {
                success: function(user) {
                    window.location = '/current.html';
                    $('#sign-up').removeAttr("disabled");
                },
                error: function(user, error) {
                    alert(error.message);
                    $('#sign-up').removeAttr("disabled");
                }
            }
        )
    });

    $('#login').click(function(){
        $('#login').attr("disabled", "disabled");
        login(
            $('#username').text(),
            $('#password').text(),
            {
                success: function(user) {
                    window.location = '/current.html';
                    $('#login').removeAttr("disabled");
                },
                error: function(user, error) {
                    alert(error.message);
                    $('#login').removeAttr("disabled");
                }
            }
        )
    });
});

function signUp(username, password, email, callback){
    var user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);
    user.set('level', 0);
    user.signUp(null, callback);
}

function login(username, password, callback){
    Parse.User.logIn(username, password, callback);
}

function levelUp(){
    if(currentUser){
        currentUser.set('level', currentUser.get('level') + 1);
        currentUser.save();
        window.location = '/current.html';
    }
}

function getUserByUsername(username){
    var query = new Parse.Query(Parse.User);
    query.equalTo('username', username);
    query.find({
        success: function(user) {
            username = user[0].get('username');
        },
        error: function(error) {
            alert(error.message);
        }
    });
}


function getAllUsers(){
    var query = new Parse.Query(Parse.User);
    query.find({
        success: function(results) {
            users = [];
            for(var i = 0; i < results.length; i++){
                var user = {};
                user.username = results[i].get('username');
                users.push(user);
            }
        },
        error: function(error) {
            alert(error.message);
        }
    });
}
