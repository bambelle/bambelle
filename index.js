let listDiv = document.querySelector("#list");
let trello = {
	table: "t2odWxQ2",
	list: "7rvnrYzX"
}

async function dlList() {
	let list = await get("cards", trello.list)
	
	list = JSON.parse(list.desc);
	
	let repos = "";
	for (let repo of list.repos) {
		repos += `
		<a href="${repo.url}">${repo.name}</a><br>
		`;
	}
	listDiv.innerHTML += repos;
}

dlList();



async function get(action, id)
{
	let url = `https://api.trello.com/1/${action}/${id}/`;

	try {
		const raw = await fetch(url, {
			method: 'GET',
			headers: {
				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
			}
		});
		return raw.json();
	}
	catch (e) {
		console.error(e);
	}
	return null;
}