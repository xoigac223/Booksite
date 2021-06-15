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
	let allBook = Books.map(book => (
		`<tr>
        <td id="Id">${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}</td>
        <td>${book.status}</td>
        <td>${book.pages}</td>
        <td>${book.author}</td>
        <td>${book.publisher}</td>
        <td>${book.publishingYear}</td>
        <td id="action">
            <button class="btn btn-primary btn-action" data-toggle="modal" data-target="#editBook">Edit</button>
        </td>
        <tr>`
	))
	$("#body-table").append(allBook);
}

function renderCategories(categories, selectCategory) {
	console.log(categories, selectCategory)
	$("#category1 option").remove();
	let categoriesClone = [...categories];
	let allCate = categoriesClone.map(category => (
		`<option value=${category.id}>${category.name}</option>`
	))
	categories.forEach((category, index) => {
		selectCategory && selectCategory.forEach(selectCategory => {
			console.log(category, selectCategory.id)
			category.id === selectCategory.id && (allCate[index] = `<option value=${category.id} selected>${category.name}</option>`);
		})
	});
	console.log(allCate);

	$("#category1").append(allCate);
}

function renderDataEdit(data, category) {
	$("#bookId").val(data.id);
	$("#name1").val(data.name);
	$("#price1").val(data.price);
	$("#status1").val(data.status);
	$("#pages1").val(data.pages);
	$("#author1").val(data.author);
	renderCategories(category, data.categories)
	$("#publisher1").val(data.publisher);
	$("#publish-year1").val(data.publishingYear);
	$("#description1").val(data.description);
	$("#details1").val(data.details);
	$("#imgage-url1").val(data.imageUrl);
	// $("#")
	// $(".btn-save").click(function (e) {
	// 	let reader = new FileReader();
	// 	reader.readAsDataURL($('#imgage-url1')[0].files[0]);
	// 	const book = {
	// 		id: parseInt($("#bookId").val()),
	// 		name: $("#name1").val(),
	// 		price: parseInt($("#price1").val()),
	// 		status: parseInt($("#status1").val()),
	// 		pages: parseInt($("#pages1").val()),
	// 		author: $("#author1").val(),
	// 		publisher: $("#publisher1").val(),
	// 		publishingYear: $("#publish-year1").val(),
	// 		description: $("#description1").val(),
	// 		details: $("#details1").val(),
	// 		imageFile: reader.result,
	// 	}
	// 	fetchApi(`/api/Book/${data.id}`, "PUT", book).then(data => console.log(data))
	// 		.catch((err) => console.log(err))
	// 	$("#imgage-url").files;
		
	// 	console.log(URL.createObjectURL($('#imgage-url1')[0].files[0]));
	// })

	$("form#data").submit(function (event) {
		var formData = new FormData(this);
		console.log(formData);
		$.ajax({
			url: `/api/Book/${data.id}`,
			type: 'PUT',
			data: formData,
			
			// success: function (data) {
			// 	alert(data)
			// },
		
		});
		
		event.preventDefault();
		
		return false;
	});

}
$(document).ready(async function () {
	//call api category
	let categories;
	await fetchApi("/api/Category", "GET")
		.then(data => {
			categories = data;
			// fetchApi(`/api/Book/${}`)
			console.log(categories)
			// renderCategories(categories);
		})

	// call api book
	await fetchApi("/api/book", "GET")
		.then(data => {
			renderBook(data);
			$(".btn-action").click(function () {
				let bookId = $(this).parent().prevAll().filter("#Id").text();
				bookId = parseInt(bookId);
				fetchApi(`/api/Book/${bookId}`, "GET")
					.then(data => {
						renderDataEdit(data, categories);
					});

			})
		});



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

	// if ($("#body-table tr").length === 0) {
	//     $("tbody").append(`<div style="height: 100px">No Data</div>`)
	// }

	$("#status").change(function () {
		alert("ss");
	})



	$(".form").change(function (e) {
		e.preventDefault();
		console.log(e.target.value);
	})

	$(".submit").click(function (e) {
		e.preventDefault();
		console.log($("#category").val());
	})





})