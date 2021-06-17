function fetchApi(apiUrl, method, body) {
    return fetch(apiUrl, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)

    }).then(res => res.json())
}


function renderBook(Books) {
    $("#body-table tr").remove();
    let allBook = Books.map(book => (
        `<tr>
        <td id="Id">${book.id}</td>
        <td>${book.name}</td>
        <td id="action">
            <button class="btn btn-primary btn-action" data-toggle="modal" data-target="#editBook">Edit</button>
        </td>
        <tr>`
    ))
    $("#body-table").append(allBook);
}

function renderDataEdit(data) {
    $("#bookId").val(data.id);
    $("#name1").val(data.name);
}

function alert(type) {
    $(type).slideDown();
    $(type).alert();
    setTimeout(() => { $(type).alert('close') }, 500);
}


$(document).ready(async function () {
    await fetchApi("/api/Category", "GET")
        .then(data => {
            renderBook(data);
        }).then(() => {
            $(".btn-action").click(function () {
                let cateId = $(this).parent().prevAll().filter("#Id").text();
                cateId = parseInt(cateId);


                fetchApi(`/api/Category/${cateId}`, "GET")
                    .then(data => {
                        renderDataEdit(data);
                        $(".btn-save").click(function () {
                            data.name = $("#name1").val();
                            fetchApi(`/api/Category/${data.id}`, "PUT", data)
                            window.location.reload();
                        });

                    });
            })
            $(".btn-addCate").click(function () {
                let body = {
                    name: $("#name").val()
                }
                fetchApi(`/api/Category`, "POST", body)
                window.location.reload();
            });
        })
})


