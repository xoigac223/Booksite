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
	$("#category1 option").remove();
	$("#category option").remove();

	let categoriesClone = [...categories];
	let allCate = categoriesClone.map(category => (
		`<option value=${category.id}>${category.name}</option>`
	))
	categories.forEach((category, index) => {
		selectCategory && selectCategory.forEach(selectCategory => {
			category.id === selectCategory.id && (allCate[index] = `<option value=${category.id} selected>${category.name}</option>`);
		})
	});

	$("#category1").append(allCate);
	$("#category").append(allCate);

}

function renderDataEdit(data, category) {
	console.log(typeof `${data.imageUrl}`);
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

}

function addCategory(categoriesSelect, book) {
	let arrayCurrentBookId = [...book.categories].map(item => item.id);
	categoriesSelect.forEach(cateSelectedId => {
		cateSelectedId = parseInt(cateSelectedId);
		if (arrayCurrentBookId.indexOf(cateSelectedId) < 0) {
			body = {
				category: cateSelectedId,
				book: book.id
			}
			fetchApi("/api/CategoryBook", "POST", body);
		}
		// })
	})
	arrayCurrentBookId.forEach(deleteId => {
		if(categoriesSelect.indexOf(deleteId.toString()) < 0) {
			fetchApi(`/api/CategoryBook/${deleteId}/${book.id}`, "DELETE");
		}
	})
}


$(document).ready(async function () {
	//call api category
	let categories;
	await fetchApi("/api/Category", "GET")
		.then(data => {
			categories = data;
		})
	renderCategories(categories)

	// call api book
	await fetchApi("/api/book", "GET")
		.then(data => {
			renderBook(data);
		}).then(() => {
			$(".btn-action").click(function () {
				let bookId = $(this).parent().prevAll().filter("#Id").text();
				bookId = parseInt(bookId);


				fetchApi(`/api/Book/${bookId}`, "GET")
					.then(data => {
						renderDataEdit(data, categories);
						$("#data").submit(function (event) {
							var formData = new FormData($(this)[0]);

							$.ajax({
								url: `/api/Book/${data.id}`,
								type: 'PUT',
								data: formData,
								processData: false,
								contentType: false,
								cache: false,
								success: async function () {
									await addCategory($("#category1").val(), data);
									window.location.reload();
								},
							});
							event.preventDefault();
						});

					});
			})

		})

		$("#add").submit(function (event) {
			var formData = new FormData($(this)[0]);

			$.ajax({
				url: `/api/Book/${data.id}`,
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false,
				cache: false,
				success: async function (data) {
					await addCategory($("#category").val(), data);
					window.location.reload();
				},
			});
			event.preventDefault();
		});

	// $("#action button").click(() => {
	//     $(this).hide();
	// })

	// $("#action button").click(function () {
	// 	$(this).toggleClass("btn-success");
	// 	if ($(this).hasClass("btn-success")) {
	// 		$(this).text("Success")
	// 	} else {
	// 		$(this).text("Confirm")
	// 	}

	// });

	// if ($("#body-table tr").length === 0) {
	//     $("tbody").append(`<div style="height: 100px">No Data</div>`)
	// }







	// $("#data").submit(function (event) {

	// 	// var formData = $(this).serialize();
	// 	// $.ajax({
	// 	// 	url: `/api/Book/${data.id}`,
	// 	// 	type: 'PUT',
	// 	// 	data: formData,

	// 	// 	success: function (data) {
	// 	// 		alert(data)
	// 	// 	},

	// 	// });
	// 	event.preventDefault();
	// 	// return false;
	// });


})