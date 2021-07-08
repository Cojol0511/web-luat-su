(function () {
    const BASE_URL = 'http://34.68.53.204'
    const INDEX_URL = BASE_URL + '/api/v1/movies/'
    const POSTER_URL = BASE_URL + '/posters/'
    const data = []

    const AUTH_URL = 'http://api.veneris.bitiland.com/api/lawyer/'

  
    const dataPanel = document.getElementById('data-panel')
    const searchForm = document.getElementById('search')
    const searchInput = document.getElementById('search-input')
  
    const pagination = document.getElementById('pagination')
    const ITEM_PER_PAGE = 8
    let paginationData = []
    
    //   New variable for view switch
    const modeSwitch = document.getElementById('modeSwitch')
    let cardMode = 'cardItem'
    let currentPage = 1
    let currentData = []
  
    // listen to data panel
    dataPanel.addEventListener('click', (event) => {
      if (event.target.matches('.btn-show-movie')) {
        showMovie(event.target.dataset.id)
      } else if (event.target.matches('.btn-add-favorite')) {
        addFavoriteItem(event.target.dataset.id)
      }
    })
    // Transfer the data from API to variable data
    axios.get(INDEX_URL).then((response) => {
      data.push(...response.data.results)
      getTotalPages(data)
      getPageData(1, data)
      currentData = data
    }).catch((err) => console.log(err))
  
    modeSwitch.addEventListener('click', event => {
      if (event.target.matches('.listItem')) {
        cardMode = 'listItem'
        getPageData(currentPage, currentData)
      } else if (event.target.matches('.cardItem')) {
        cardMode = 'cardItem'
        getPageData(currentPage, currentData)
      }
    })
  
  //   the format of two different modes
    function cardModeDisplay(data) {
      let htmlContent = ''
      data.forEach(function (item, index) {
        htmlContent += `
          <div class="col-sm-3 d-flex align-items-stretch">
                <div class="member">
                    <img class="card-img-top " src="/client/assets/img/team/team-1.jpg" alt="Card image cap">
                    <h4> Nguyen Van ${item.id} </h4>
                    <span>Luật sư</span>
                    <p>
                    Magni qui quod omnis unde et eos fuga et exercitationem. Odio veritatis perspiciatis quaerat qui aut aut aut
                    </p>
              <!-- "More" button -->
              <div class="card-footer">
                <a class="btn btn-warning btn-show-movie" href="/lawyer">Chi tiết</a>
                <!-- favorite button --> 
                <button class="btn btn-danger btn-add-favorite" data-id="${item.id}">+</button>
              </div>
            </div>
          </div>
        `
      })
      dataPanel.innerHTML = htmlContent
    }
  
    function listModeDisplay(data) {
      let htmlContent = `<ul class="list-group list-group-flush" style="width:100%;">`
      data.forEach(function (item, index) {
        htmlContent += `
        <li class="list-group-item d-flex justify-content-between align-items-center mx-3">Nguyen Van ${item.id}
          <div>
            <button class="btn btn-warning btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">
          More</button> 
            <button class="btn btn-danger btn-add-favorite" data-id="${item.id}">+</button>
          </div>
        </li>
        `
      })
      htmlContent += `</ul>`
      dataPanel.innerHTML = htmlContent
    }
  
  //   Detail information for items
    function showMovie(id) {
      // get elements
      const modalTitle = document.getElementById('show-movie-title')
      const modalImage = document.getElementById('show-movie-image')
      const modalDate = document.getElementById('show-movie-date')
      const modalDescription = document.getElementById('show-movie-description')
      // set request url
      const url = INDEX_URL + id
      console.log(url)
      // send request to show api
      axios.get(url).then(response => {
        const data = response.data.results
        console.log(data)
        // insert data into modal ui
        modalTitle.textContent = data.title
        modalImage.innerHTML = `<img src="${POSTER_URL}${data.image}" class="img-fluid" alt="Responsive image">`
        modalDate.textContent = `release at : ${data.release_date}`
        modalDescription.textContent = `${data.description}`
      })
    }
    
    // listen to search form submit event
    searchForm.addEventListener('keyup', event => {
      event.preventDefault()
      let results = []
      const regex = new RegExp(searchInput.value, 'i')
      results = data.filter(movie => movie.title.match(regex))
      getTotalPages(results)
      getPageData(1, results)
      currentData = results
    })
  
    function addFavoriteItem(id) {
      const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
      const movie = data.find(item => item.id === Number(id))
  
      if (list.some(item => item.id === Number(id))) {
        alert(`${movie.title} is already in your favorite list.`)
      } else {
        list.push(movie)
        alert(`Added ${movie.title} to your favorite list!`)
      }
      localStorage.setItem('favoriteMovies', JSON.stringify(list))
    }
  
    // Pagination
    function getTotalPages(data) {
      let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
      let pageItemContent = ''
      for (let i = 0; i < totalPages; i++) {
        pageItemContent += `
          <li class="page-item">
            <a style="color:#4f5a62;" class="page-link" href="javascript:;" data-page="${i + 1}">${i + 1}</a>
          </li>
        `
      }
      pagination.innerHTML = pageItemContent
    }
  
    // Pagination EventListener
    pagination.addEventListener('click', (event) => {
      currentPage = event.target.dataset.page
      if (event.target.tagName === 'A') {
        getPageData(event.target.dataset.page)
      }
    })
  
    function getPageData(pageNum, data) {
      paginationData = data || paginationData
      let offset = (pageNum - 1) * ITEM_PER_PAGE
      let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)
      if (cardMode == 'cardItem') {
        cardModeDisplay(pageData)
      } else {
        listModeDisplay(pageData)
      }
    }
  })()