function fetchApi(apiUrl, method, body) {
	return fetch(apiUrl, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body)

	}).then(res => res.json())
}

function caclTopSeller(bestsells) {
    let index = 0;
    let max = 0;
    for(let key in bestsells) {
        // $(`#progress1`).css("width", "50%");
        if(max < bestsells[key]) max = bestsells[key];
    }
    console.log(max);
    for(let key in bestsells) {
        let percent = bestsells[key]/max * 100;
        $(`#progress${index}`).css("width", `${percent}%`);
        $(`.book-name${index}`).text(key);
        $(`.customer${index}`).text(bestsells[key]);
        index++;
    }
}

function renderAll() {
    fetchApi("/api/Statistic").then(data => {
        $("#quantity-book").text(data.books);
        $("#quantity-category").text(data.categories);
        $("#quantity-order").text(data.ordes);
        $("#quantity-users").text(data.users);

        caclTopSeller(data.bestSells);

        renderTotalChart(data.sales);
    });
}

function renderTotalChart(dataChart) {
    const labels = [];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Total sales',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 15, 5, 2, 20, 30, 45],
        }]
    };

    for(let key in dataChart) {
        labels.unshift(key);
        data.datasets[0].data.unshift(dataChart[key]);
    }
   
   
    const config = {
        type: 'line',
        data,
        options: {}
    };

    var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}
$(document).ready(async function () {

    await renderAll();


    $(".fa-list").click(() => {
        $(".sidebar-wrapper").toggleClass("sidebar-toggle");
        $(".col-lg-10").toggleClass("col-lg-12")
    })

})

