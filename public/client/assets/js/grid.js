const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";

const LAWYER_URL = "http://api.veneris.bitiland.com/api/lawyer/";

let searchData = [];

const dataPanel = document.getElementById("data-panel");
const searchForm = document.getElementById("search");
const searchBtn = document.getElementById("submit-search");
const searchInput = document.getElementById("search-input");

const pagination = document.getElementById("pagination");

const ITEM_PER_PAGE = 8;
let paginationData = [];

//   New variable for view switch
const modeSwitch = document.getElementById("modeSwitch");
let cardMode = "cardItem";
let currentPage = 1;
let currentData = [];
let targetPage = 1;

// listen to data panel
dataPanel.addEventListener("click", (event) => {
  if (event.target.matches(".btn-show-movie")) {
    showMovie(event.target.dataset.id);
  } else if (event.target.matches(".btn-add-favorite")) {
    addFavoriteItem(event.target.dataset.id);
  }
});
// Transfer the data from API to variable data

/*
    $.ajax(
      {
          url : LAWYER_URL,
          type: "GET",
          contentType: 'application/json',
          success:function(response) 
          {
            console.log(response);
            data.push(...response);
              //data: return data from server
              //alert("The server says: " + response);
              //document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
            getTotalPages(data);
            getPageData(1, data);
            currentData = data;
            //checkCookie();       
          },
          error: function(response) 
          {
            console.log("Unsucessful");
            console.log(response);
              //if fails   
              //alert('it didnt work');   
          }
      });
    */
/*
    axios.get(LAWYER_URL).then((response) => {
      data.push(...response.data)
      getTotalPages(data)
      getPageData(1, data)
      currentData = data
    }).catch((err) => console.log(err))
    */

modeSwitch.addEventListener("click", (event) => {
  if (event.target.matches(".listItem")) {
    cardMode = "listItem";
    getPageData(currentPage, currentData);
  } else if (event.target.matches(".cardItem")) {
    cardMode = "cardItem";
    getPageData(currentPage, currentData);
  }
});

function getSpecialize(i) {
  var specialize = "";
  switch (i) {
    case "1":
      specialize = "Dân sự";
      break;
    case "2":
      specialize = "Hình sự";
      break;
    case "3":
      specialize = "KDTM";
      break;
    default:
      specialize = "khác";
      break;
  }

  return specialize;
}

//   the format of two different modes
function cardModeDisplay(data) {
  let htmlContent = "";
  data.forEach(function (item, index) {
    const id = ratingValue(String(index), item.Rating);
    console.log(id);
    specialize = getSpecialize(item.Specialize);
    htmlContent +=
      `
          <div class="col-sm-3 d-flex align-items-stretch">
                <div class="member">
                    <img class="card-img-top " src="/client/assets/img/team/team-1.jpg" alt="Card image cap">
                    <h4> ${item.LastName} ${item.FirstName} </h4>
                    <span>Luật sư</span>
                    <p> Lĩnh vực ${specialize}</p>
                  <div class="rating_class">
                    <input disabled type="radio" id="star5_${index}" name="rating__${index}" value="5"` +
      (id === "star5_" + index ? "checked" : "") +
      `/>
                    <label class = "full" for="star5_${index}" title="Awesome - 5 stars"></label>
                    
                    <input disabled type="radio" id="star4half_${index}" name="rating__${index}" value="4 and a half" ` +
      (id === "star4half_" + index ? "checked" : "") +
      ` />
                    <label class="half" for="star4half_${index}" title="Pretty good - 4.5 stars"></label>
                    
                    <input disabled type="radio" id="star4_${index}" name="rating__${index}" value="4"` +
      (id === "star4_" + index ? "checked" : "") +
      `/>
                    <label class = "full" for="star4_${index}" title="Pretty good - 4 stars"></label>
                    
                    <input disabled type="radio" id="star3half_${index}" name="rating__${index}" value="3 and a half" ` +
      (id === "star3half_" + index ? "checked" : "") +
      ` />
                    <label class="half" for="star3half_${index}" title="Meh - 3.5 stars"></label>
                    
                    <input disabled type="radio" id="star3_${index}" name="rating__${index}" value="3" ` +
      (id === "star3_" + index ? "checked" : "") +
      ` />
                    <label class = "full" for="star3_${index}" title="Meh - 3 stars"></label>
                    
                    <input disabled type="radio" id="star2half_${index}" name="rating__${index}" value="2 and a half"  ` +
      (id === "star2half_" + index ? "checked" : "") +
      ` />
                    <label class="half" for="star2half_${index}" title="Kinda bad - 2.5 stars"></label>
                    
                    <input disabled type="radio" id="star2_${index}" name="rating__${index}" value="2" ` +
      (id === "star2_" + index ? "checked" : "") +
      ` />
                    <label class = "full" for="star2_${index}" title="Kinda bad - 2 stars"></label>
                    
                    <input disabled type="radio" id="star1half_${index}" name="rating__${index}" value="1 and a half" ` +
      (id === "star1half_" + index ? "checked" : "") +
      `/>
                    <label class="half" for="star1half_${index}" title="Meh - 1.5 stars"></label>
                    
                    <input disabled type="radio" id="star1_${index}" name="rating__${index}" value="1" ` +
      (id === "star1_" + index ? "checked" : "") +
      `/>
                    <label class = "full" for="star1_${index}" title="Sucks big time - 1 star"></label>
                    
                    <input disabled type="radio" id="starhalf_${index}" name="rating__${index}" value="half" ` +
      (id === "starhalf_" + index ? "checked" : "") +
      ` />
                    <label class="half" for="starhalf_${index}" title="Sucks big time - 0.5 stars"></label>
                </div>
              <!-- "More" button -->
              <div class="card-footer">
                <a class="btn btn-warning btn-show-movie" href='/lawyerList?lawyerID=${item.LawyerID}'>Chi tiết</a>
                <!-- favorite button --> 
                <!-- <button class="btn btn-danger btn-add-favorite" data-id="${item.LawyerID}"> Theo dõi </button> -->
              </div>
            </div>
          </div>
        `;
  });
  dataPanel.innerHTML = htmlContent;
}

function listModeDisplay(data) {
  let htmlContent = `<ul class="list-group list-group-flush" style="width:100%;">`;
  data.forEach(function (item, index) {
    htmlContent += `
        <li class="list-group-item d-flex justify-content-between align-items-center mx-3"> ${item.LastName} ${item.FirstName}
          <div>
            <a class="btn btn-warning btn-show-movie" href='/lawyerList?lawyerID=${item.LawyerID}'>Chi tiết</a>
            <!-- <button class="btn btn-danger btn-add-favorite" data-id="${item.LawyerID}">+</button> -->
          </div>
        </li>
        `;
  });
  htmlContent += `</ul>`;
  dataPanel.innerHTML = htmlContent;
}

//   Detail information for items
function showMovie(id) {
  // get elements
  const modalTitle = document.getElementById("show-movie-title");
  const modalImage = document.getElementById("show-movie-image");
  const modalDate = document.getElementById("show-movie-date");
  const modalDescription = document.getElementById("show-movie-description");
  // set request url
  const url = INDEX_URL + id;
  console.log(url);
  // send request to show api
  axios.get(url).then((response) => {
    const data = response.data.results;
    console.log(data);
    // insert data into modal ui
    modalTitle.textContent = data.title;
    modalImage.innerHTML = `<img src="${POSTER_URL}${data.image}" class="img-fluid" alt="Responsive image">`;
    modalDate.textContent = `release at : ${data.release_date}`;
    modalDescription.textContent = `${data.description}`;
  });
}

// SearchBtn
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let results = [];

  const regex = new RegExp(searchInput.value, "i");
  results = data.filter((lawyer) => String(lawyer.FirstName).match(regex));
  // console.log(results.length);

  if (results.length == 0) {
    searchInput.value = "";
  } else if (searchInput.value == "") {
    getTotalPages(data);

    getPageData(targetPage, data);
  } else {
    searchData = results;
    console.log(searchData);

    if (targetPage != 1) {
      targetPage = 1;
    }

    getTotalPages(searchData);

    getPageData(targetPage, searchData);
  }
});

// listen to search form submit event
/*
    searchForm.addEventListener('keyup', event => {
      event.preventDefault()
      let results = []
      console.log(searchInput.value)
      const regex = new RegExp(searchInput.value, 'i')
      results = data.filter(lawyer => lawyer.FirstName.match(regex))
      console.log(resutls);
      getTotalPages(results)
      getPageData(1, results)
      currentData = results
    })
    */

function addFavoriteItem(id) {
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const movie = data.find((item) => item.id === Number(id));

  if (list.some((item) => item.id === Number(id))) {
    alert(`${movie.title} is already in your favorite list.`);
  } else {
    list.push(movie);
    alert(`Added ${movie.title} to your favorite list!`);
  }
  localStorage.setItem("favoriteMovies", JSON.stringify(list));
}

// Pagination
function getTotalPages(data) {
  let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1;
  let pageItemContent = "";
  for (let i = 0; i < totalPages; i++) {
    pageItemContent += `
          <li class="page-item">
            <a style="color:#4f5a62;" class="page-link" href="javascript:;" data-page="${
              i + 1
            }">${i + 1}</a>
          </li>
        `;
  }
  pagination.innerHTML = pageItemContent;
}

// Pagination EventListener
pagination.addEventListener("click", (event) => {
  currentPage = event.target.dataset.page;
  if (event.target.tagName === "A") {
    getPageData(event.target.dataset.page);
  }
});

function getPageData(pageNum, data) {
  paginationData = data || paginationData;
  let offset = (pageNum - 1) * ITEM_PER_PAGE;
  let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE);
  if (cardMode == "cardItem") {
    cardModeDisplay(pageData);
  } else {
    listModeDisplay(pageData);
  }
}

function ratingValue(index, rating) {
  var r = 0;
  var f = 0;

  if (rating) {
    r = rating / 2;
    f = ~~r; //Tương tự Math.floor(r)
  }

  id = "star" + f + (r % f ? "half" : "") + "_" + index;

  return id;

  // console.log(id);

  //id && (document.getElementById(id).checked = !0)
  /*
      var selection = document.querySelector(id) !== null;

      if (selection){
        console.log(id);
        //document.getElementById(id).checked = !0
      }
      //id && (document.getElementById(id).checked = !0)
  */
}
