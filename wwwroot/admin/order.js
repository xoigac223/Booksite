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
    return fetchApi("/api/Order?page=1&pageSize=10", "GET").then(res => res.json()).then(data => {
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
                    <button class="btn btn-primary 
                        ${element.status !== 0 ? "btn-success" : "btn-action-confirm"}" 
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
                alert('.alert-success');
                setTimeout(() => { window.location.reload() }, 500);
            }).catch((err) => {
                alert('.alert-danger');

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
                alert('.alert-success');
                setTimeout(() => { window.location.reload() }, 500);
            }).catch((err) => {
                alert('.alert-danger');
            });
    })
}

function renderPagination() {
    return fetchApi("/api/Order", "GET").then(data => {
        let totalPage = Math.ceil(data.length / 10);
        let pagination = [];
        for (let i = 1; i < totalPage; i++) {
            pagination.push(`
				<li class="page-item page-item-number"><p class="page-link">${i + 1}</p></li>
			`)
        }
        $(".pagination").append(pagination);

    })
}

function alert(type) {
    $(type).slideDown();
    $(type).alert();
    // $('.alert').alert('close')
    setTimeout(() => { $(type).alert('close') }, 500);
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

    await renderPagination();
    $(".page-item-number").click(function () {
        $(".pagination li").removeClass("active");
        $(this).toggleClass("active");
        fetchApi(`/api/Search/book?page=${$(this).text()}&pageSize=10`, "GET").then(data => {
            renderBook(data);
        })
    })

})