$(document).ready(function () {
    function toggleSideBar() {
        $(".fa-list").click(() => {
            $(".sidebar-wrapper").toggleClass("sidebar-toggle");
            $(".col-lg-10").toggleClass("col-lg-12")
        })

        // $("#action button").click(() => {
        //     $(this).hide();
        // })

        $("#action button").click(function () {
            $(this).toggleClass("btn-success");
            if ($(this).hasClass("btn-success")) {
                $(this).text("Success")
            } else {
                $(this).text("Confirm")
            }

        });

        if ($("tbody tr").length === 0) {
            $("tbody").append(`<div style="height: 100px">No Data</div>`)
        }

        $("#status").change(function () {
            alert("ss");
        })
    }

    function submitForm() {
        $(".form").change(function (e) {
            e.preventDefault();
            console.log(e.target.value);
        })

        $(".submit").click(function (e) {
            e.preventDefault();
            console.log($("#category").val());
        })
    }

    function editBook() {
        $(".btn-action").click(function () {
            fetch('/api/Book/3', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => response.json());
                alert("successaa")
        })
    }

    toggleSideBar();
    submitForm();
    editBook()
})