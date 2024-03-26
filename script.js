let search = document.querySelector("input");
let movieList = document.querySelector(".movie-list");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let pages = document.querySelector(".page");

let page = 1;
let MovieL = [];
function debounce(fn, delay) {
    let timer;
    return function () {
        page=1;
        if (timer) clearInterval(timer);
        timer = setTimeout(() => {
            fn();
        }, delay);
    }
}
async function fetchApi() {
    let response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=161d4e6d&s=${search.value}&page=${page}`);
    let data = await response.json();
    console.log(data);
    MovieL = [];
    MovieL.push(data);
    movieList.innerHTML = "";
    displayresult();
    let totalPage=Math.ceil(MovieL[0].totalResults/10);
    pages.innerText = `${page} of ${totalPage} `;
    pages.style.display = "inline";
    prev.style.display = "inline";
    next.style.display = "inline";
}
search.addEventListener('input', debounce(fetchApi, 1000));
function displayresult() {
    // console.log(MovieL.length);
    // console.log(MovieL[0]);
    MovieL[0].Search.forEach((ele) => {
        let div = document.createElement("div");
        div.innerHTML = `
        <h2>${ele.Title}</h2>
        <img src="${ele.Poster}">
        <p> (${ele.Year})</p>`;
        // console.log(ele);
        movieList.appendChild(div);
        div.style.width="21%";
    })
}
function prevPage() {

    console.log(page);
    page--
    movieList.innerHTML = "";
    fetchApi();
}
function nextPage() {
    let end = MovieL[0].totalResults;
    page++;
        movieList.innerHTML = "";
        fetchApi();
}
// if (page <= 1) {
//     prev.disabled = "true";
// }

prev.addEventListener('click', prevPage);
next.addEventListener('click', nextPage);
