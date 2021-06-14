let viewModel = {
    msg: ko.observable(),
    msgLogin: ko.observable(),
    isLogin: ko.observable(false),
    username: ko.observable(),
    fullname: ko.observable(),
    address: ko.observable(),
    phone: ko.observable(),
    email: ko.observable()
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
                location.reload();
            },
            error: function (jqXHR) {
                let msg = JSON.parse(jqXHR.responseText).message;
                viewModel.msg(msg);
            }
        });

        login(formData);

        event.preventDefault();
    });

    $("#login_form").submit(function (event) {

        let formData = {
            username: $("#uname_login").val(),
            password: $("#pwd_login").val()
        };

        login(formData);
        event.preventDefault();
    });

    $("#update_form").submit(function (event) {

        // let formData = {
        //     username: viewModel.username(),
        //     fullname: $("#fullname_update").val(),
        //     address: $("#address_update").val(),
        //     phone: $("#phone_update").val(),
        //     email: $("#email_update").val()
        // };
        //
        // $.ajax({
        //     type: "PUT",
        //     url: "/api/User/" + viewModel.username(),
        //     data: JSON.stringify(formData),
        //     contentType: "application/json",
        //     dataType: "json",
        //     encode: true,
        //     success: function () {
        //         location.reload();
        //     },
        //     error: function () {
        //         alert("Error!");
        //     }
        // });

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