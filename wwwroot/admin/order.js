function fetchApi(apiUrl, method, body) {
    return fetch(apiUrl, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)

    });
}

function renderOrderTable() {
    return fetchApi("/api/Order", "GET").then(res => res.json()).then(data => {
        let allData = data.map(element => (
            `<tr>
                <td id="Id">${element.id}</td>
                <td>${element.username}</td>
                <td>${element.fullname}</td>
                <td>${element.address}</td>
                <td>${element.phone}</td>
                <td>${element.email}</td>
                <td>${element.shipping}</td>
                <td>${element.dateBill}</td>
                <td id="action">            
                    <button class="btn btn-primary btn-action-confirm 
                        ${element.status !== 0 ? "btn-success" : ""}" 
                        data-toggle="modal" 
                        data-target=${element.status === 0 ? "#confirm" : "#cancel"} 
                        id="${element.id}"
                    >
                    ${element.status === 0 ? "Confirm" : "Success"}
                    </button>
                </td>
                <td id="action">
                    <button class="btn btn-primary btn-action"><i class="fas fa-eye"></i> Watch</button>
                </td>
                </tr>
            `
        ));
        $("tbody").append(allData);
    })
}

async function confirmOrder(orderId) {
    let dataOrder;
    await fetchApi(`/api/Order/${orderId}`, "GET").then(res => res.json()).then(data => { dataOrder = data })
    $(".btn-save-order").click(async function () {
        dataOrder.status = 1;
        fetchApi(`/api/Order/${orderId}`, "PUT", dataOrder)
            .then(() => {
                // $(`#${orderId}`).removeClass("btn-action-confirm");
                // $(`#${orderId}`).addClass("btn-success");
                // $(`#${orderId}`).text("Success");
                window.location.reload()
            });
    })
}

async function cancelOrder(orderId) {
    let dataOrder;
    await fetchApi(`/api/Order/${orderId}`, "GET").then(res => res.json()).then(data => { dataOrder = data })
    $(".btn-cancel-order").click(async function () {
        dataOrder.status = 0;
        fetchApi(`/api/Order/${orderId}`, "PUT", dataOrder)
            .then(() => {
                // $(`#${orderId}`).addClass("btn-action-confirm");
                // $(`#${orderId}`).removeClass("btn-success");
                // $(`#${orderId}`).text("Confirm");
                window.location.reload()

            });
    })
}
// function fetchDataOrderDetail()
$(document).ready(async function () {
    await renderOrderTable();


    $(".fa-list").click(() => {
        $(".sidebar-wrapper").toggleClass("sidebar-toggle");
        $(".col-lg-10").toggleClass("col-lg-12")
    })

    $(".btn-success").click(function () {
        let orderId = $(this).parent().prevAll().filter("#Id").text();
        orderId = parseInt(orderId);
        cancelOrder(orderId);
    })

    $(".btn-action-confirm").click(function () {
        let orderId = $(this).parent().prevAll().filter("#Id").text();
        orderId = parseInt(orderId);
        confirmOrder(orderId);
    })

   
})