function fetchApi(apiUrl, method, body) {
    return fetch(apiUrl, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)

    }).then(res => res.json())
}

function renderOrderTable() {
    fetchApi("/api/Order", "GET").then(data => {
        let allData = data.map(element => (
            `<tr>
                <td>${element.id}</td>
                <td>${element.username}</td>
                <td>${element.fullname}</td>
                <td>${element.address}</td>
                <td>${element.phone}</td>
                <td>${element.email}</td>
                <td>${element.shipping}</td>
                <td>${element.dateBill}</td>
                <td id="action">
                    <button class="btn btn-primary btn-action">Confirm</button>
                </td>
                <td id="action">
                    <button class="btn btn-primary btn-action">Watch details</button>
                </td>
                </tr>
            `
        ));
        $("tbody").append(allData);
    })
}
// function fetchDataOrderDetail()
$(document).ready(async function () {
    await renderOrderTable();


    $(".fa-list").click(() => {
        $(".sidebar-wrapper").toggleClass("sidebar-toggle");
        $(".col-lg-10").toggleClass("col-lg-12")
    })
})