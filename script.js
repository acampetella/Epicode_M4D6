const url = 'https://jsonplaceholder.typicode.com/users';
let totalData; //contiene tutti gli utenti
let actualData = []; //contiene gli utenti attuali, in base al filtro applicato


//funzione che recupera le info dall'API
async function getData(apiAddress) {
    await fetch(apiAddress).then(response => response.json()).then((result) => {
        totalData = result;
        console.log(totalData);
        totalData.forEach(item => actualData.push(item));
    }).catch((err) => { alert("Si è verificato il seguente errore: " + err); });
}

//funzione che mostra gli utenti attuali
function showUsers() {
    let row = document.querySelector('main > div.container > div.row');
    let col1 = document.createElement('div');
    col1.classList.add('col', 'col-3', 'col-xl-2', 'fw-bold', 'border', 'py-2');
    col1.innerText = 'Id';
    let col2 = document.createElement('div');
    col2.classList.add('col', 'col-3', 'col-xl-2', 'fw-bold', 'border', 'py-2');
    col2.innerText = 'Name';
    let col3 = document.createElement('div');
    col3.classList.add('col', 'col-3', 'col-xl-2', 'fw-bold', 'border', 'py-2');
    col3.innerText = 'Username';
    let col4 = document.createElement('div');
    col4.classList.add('col', 'col-xl-2', 'd-none', 'd-xl-block', 'fw-bold', 'border', 'py-2');
    col4.innerText = 'Email';
    let col5 = document.createElement('div');
    col5.classList.add('col', 'col-xl-2', 'd-none', 'd-xl-block', 'fw-bold', 'border', 'py-2');
    col5.innerText = 'Phone';
    let col6 = document.createElement('div');
    col6.classList.add('col', 'col-3', 'col-xl-2');
    row.append(col1, col2, col3, col4, col5, col6);
    actualData.forEach(item => {
        let col1 = document.createElement('div');
        col1.classList.add('col', 'col-3', 'col-xl-2', 'border', 'py-2');
        col1.innerText = item.id;
        let col2 = document.createElement('div');
        col2.classList.add('col', 'col-3', 'col-xl-2', 'border', 'py-2');
        col2.innerText = item.name;
        let col3 = document.createElement('div');
        col3.classList.add('col', 'col-3', 'col-xl-2', 'border', 'py-2');
        col3.innerText = item.username;
        let col4 = document.createElement('div');
        col4.classList.add('col', 'col-xl-2', 'd-none', 'd-xl-block', 'border', 'py-2');
        col4.innerText = item.email;
        let col5 = document.createElement('div');
        col5.classList.add('col', 'col-xl-2', 'd-none', 'd-xl-block', 'border', 'py-2');
        col5.innerText = item.phone;
        let col6 = document.createElement('div');
        col6.classList.add('col', 'col-3', 'col-xl-2');
        let anchor = document.createElement('a');
        anchor.href = 'user.html?id=' + item.id;
        anchor.target = '_blank';
        let button = document.createElement('button');
        button.type = 'button';
        button.classList.add('btn', 'btn-light');
        button.innerText = 'Details';
        anchor.append(button);
        col6.append(anchor);
        row.append(col1, col2, col3, col4, col5, col6);
    });
}

//funzione che cancella la tabella
function deleteTable() {
    let cols = document.querySelectorAll('main > div.container > div.row > div.col');
    cols.forEach(item => {
        item.remove();
    });
}

//funzione che applica il filtro agli utenti
function filter(event) {
    let inputText = document.getElementById('inputText').value.toLowerCase();
    if (inputText !== '') {
        let field = event.target.innerHTML.toLowerCase();
        actualData = getArray(inputText, field);
        if (actualData.length > 0) {
            deleteTable();
            showUsers();
            document.getElementsByTagName('input')[0].value = '';
        }
    }
       
}

//funzione che recupera gli utenti in base al filtro applicato
function getArray(value, field) {
    let array = [];
    totalData.forEach(item => {
        if (item[field].toLowerCase().includes(value)) {
            array.push(item);
        }
    });
    return array;
}

//funzione che imposta i listener
function setEventListener() {
    let listItems = document.getElementsByTagName('li');
    for(let item of listItems) {
        item.addEventListener('click', filter);
    }
    let nameListButton = document.getElementById('nameListButton');
    nameListButton.addEventListener('click', showNameList);
    let addressListButton = document.getElementById('addressListButton');
    addressListButton.addEventListener('click', showAddressList);
    let sortButton = document.getElementById('sortButton');
    sortButton.addEventListener('click', sort);
}

//funzione che recupera la lista dei nomi dai dati attuali
function getNameList() {
    let array = [];
    actualData.forEach(item => {
        array.push(item.name);
    });
    return array;
}

//funzione che restituisce la lista degli indirizzi degli utenti attuali in formato stringa
function getAddressList() {
    let array = [];
    actualData.forEach(item => {
        array.push(JSON.stringify(item.address));
    });
    return array;
}

//funzione che mostra in console l'array contenente la lista dei nomi degli utenti attuali
function showNameList() {
    console.log(getNameList());
}

//funzione che mostra in console l'array contenente la lista degli indirizzi realivi agli utenti attuali
function showAddressList() {
    console.log(getAddressList());
}

//funzione che innesca l'ordinamento degli utenti attuali
function sort() {
    let button = document.getElementById('sortButton');
    if (button.innerText.includes('ASC')) {
        sortActualData(true);
        button.innerText = 'Sort by Name\nDESC';
    } else {
        sortActualData(false);
        button.innerText = 'Sort by Name\nASC';
    }
    deleteTable();
    showUsers();
}

//funzione che esegue l'ordinamento in modo ascendente o discendente in base al parametro asc
function sortActualData(asc) {
    let value = 1;
    if (!asc) {
        value = -1;
    }
    actualData.sort((a, b) => {
        first = a.name.toLowerCase();
        second = b.name.toLowerCase();
        if (first > second) {
            return value;
        }
        if (first < second) {
            return -value;
        }
        return 0;
    });
}


//al caricamento della pagina...
window.addEventListener('load', async () => {
    await getData(url);
    setEventListener();
    showUsers();
});