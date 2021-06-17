
let viewModel = {
    msg: ko.observable(),
    msgLogin: ko.observable(),
    isLogin: ko.observable(false),
    username: ko.observable(),
    fullname: ko.observable(),
    address: ko.observable(),
    phone: ko.observable(),
    email: ko.observable(),
    amountCart: ko.observable(0)
};

ko.applyBindings(viewModel);

$(document).ready(function() {
    
    let url = "/api/Session/get";
    $.get(url, function (data) {
        if (data) {
            let user = JSON.parse(data);
            viewModel.isLogin(true);
            viewModel.username(user.Username);
            viewModel.fullname(user.Fullname);
            viewModel.address(user.Address);
            viewModel.phone(user.Phone);
            viewModel.email(user.Email);
        }
    });
    
    $("#form_register").submit(function (event) {
        if ($("#form_register").valid()) {
            let formData = {
                username: $("#uname_register").val(),
                password: $("#pwd_register").val()
            };
            $.ajax({
                type: "POST",
                url: "/api/Authenticate/register",
                data: JSON.stringify(formData),
                contentType: "application/json",
                dataType: "json",
                encode: true,
                success: function () {
                    login(formData);
                },
                error: function (jqXHR) {
                    let msg = JSON.parse(jqXHR.responseText).message;
                    viewModel.msg(msg);
                }
            });
        }
        event.preventDefault();
    });

    $("#login_form").submit(function (event) {
        if ($("#login_form").valid()) {
            let formData = {
                username: $("#uname_login").val(),
                password: $("#pwd_login").val()
            };

            login(formData);
            event.preventDefault();
        }
        event.preventDefault();
    });
});

function login(user) {
    $.ajax({
        type: "POST",
        url: "/api/Authenticate/login",
        data: JSON.stringify(user),
        contentType: "application/json",
        dataType: "json",
        encode: true,
        success: function (data) {
            localStorage.setItem("token", data.token);
            location.reload();
        },
        error: function () {
            viewModel.msgLogin("The username or password is incorrect");
        }
    });
}

initApp = function () {
    $("#update_form").submit(function (event) {
        console.log('Hello');
        event.preventDefault();
        let formData = {
            username: viewModel.username(),
            fullname: $("#fullname_update").val(),
            address: $("#address_update").val(),
            phone: $("#phone_update").val(),
            email: $("#email_update").val()
        };
        $.ajax({
            type: "PUT",
            url: "/api/User/" + viewModel.username(),
            headers: {"Authorization": 'Bearer ' + localStorage.getItem('token')},
            data: JSON.stringify(formData),
            dataType: "json",
            encode: true,
            contentType: "application/json",
            success: function () {
                location.reload();
            },
            error: function () {
                alert("Error");
            }
        })
    });
}

$("#form_register").validate({
    rules: {
        "username": {
            required: true,
            minlength: 6
        },
        "password": {
            minlength: 6
        },
        "re-password": {
            minlength: 6,
            equalTo: "#pwd_register"
        }
    }
});

$("#login_form").validate({
    rules: {
        "username": {
            required: true,
            minlength: 6
        },
        "password": {
            minlength: 6
        },
        "re-password": {
            minlength: 6,
            equalTo: "#pwd_register"
        }
    }
});

function logout() {
    $.get("/api/Session/logout", function(){
        localStorage.removeItem("token");
        location.reload();
    });
    
}