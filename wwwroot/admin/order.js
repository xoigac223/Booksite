function fetchApi(apiUrl, method, body) {
	return fetch(apiUrl, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body)

	}).then(res => res.json())
}

// function fetchDataOrderDetail()
$(document).ready(async function () {
    await fetchApi("/api/OrderDetail", "GET").then(data => console.log(data))
})