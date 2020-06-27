const mainNews = document.querySelector('.mainNews__content');
const sideNews = document.querySelector('.sideNews__content');

//  URLs
const mainUrl = 'https://renemorozowich.com/wp-json/wp/v2/posts';
const sideUrl = 'https://renemorozowich.com/wp-json/wp/v2/posts?categories=33';
const mediaUrl = 'https://renemorozowich.com/wp-json/wp/v2/media/';

// GetData
const getData = (urlMedia, urlMain, urlSide) => {
    let data = []
    fetch(urlMedia)
        .then(response => response.json())
        .then(res => {
            data.push({ type: 'media', data: res })
            if (data.length == 3) {
                mainNewsToPage(data)
            }
        })
    fetch(urlMain)
        .then(response => response.json())
        .then(res => {
            data.push({ type: 'main', data: res })
            if (data.length == 3) {
                mainNewsToPage(data)
            }
        })
    fetch(urlSide)
        .then(response => response.json())
        .then(res => {
            data.push({ type: 'latest', data: res })
            if (data.length == 3) {
                mainNewsToPage(data)
            }
        })
}
getData(mediaUrl, mainUrl, sideUrl)

// get Zero if date < 10
const getZero = (num) => {
    if (num == 0) {
        return num + '0';
    } else if (num > 0 && num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}

const mainNewsToPage = data => {
    let dataPosts = [],
        dataSide = [],
        dataImg = [];
    // Data Filter
    for (let i = 0; i < data.length; i++) {
        if (data[i].type == "main") {
            dataPosts = data[i].data;
        } else if (data[i].type == "media") {
            dataImg = data[i].data;
        } else {
            dataSide = data[i].data;
        }
    }

    // Posting Main News
    dataPosts.map((PostElem, PostIndex) => {
        // DATE FROM POST
        let postFullDate = new Date(PostElem.date);
        let postDate = getZero(postFullDate.getDate());
        let postMonth = getZero(postFullDate.getMonth());
        let postYear = postFullDate.getFullYear();


        dataImg.map((MediaElem, MediaIndex) => {
            // CUTTING WORDS
            let postDesc = PostElem.excerpt.rendered;
            let postDescCut = postDesc.slice(0, 200); // Количество обрезаемых слов
            let postDescCutted = postDescCut.split(' ');
            postDescCutted.splice(postDescCutted.length - 1, 1);
            postDescCut = postDescCutted.join(' ');
            if (PostElem.id === MediaElem.post) {
                mainNews.innerHTML += `
                <div class="mainNews__item">
                    <p class="mainNews__category">Category: ${PostElem.categories[0]}</p>
                    <img src="${MediaElem.source_url}"/>
                    <div >
                        <a href="#"> ${PostElem.title.rendered}</a>
                        <div class="mainNews__caption">
                            ${postDescCut + ' ...' + '</p>'}
                            <div>
                                <time>${postDate}.${postMonth}.${postYear}</time>
                                <p>author:${PostElem.author}</p>
                            </div>
                        </div>
                    </div>
                </div>                 
                `
            }
        })
    })


    // Posting Side News
    dataSide.map((e, i) => {
        let postFullDate = new Date(e.date);
        let postDate = getZero(postFullDate.getDate());
        let postMonth = getZero(postFullDate.getMonth());
        let postYear = postFullDate.getFullYear();

        sideNews.innerHTML +=
            `
            <div class="sideNews__item">
                <p>Categ: ${e.categories[0]}</p>
                <a href="#">${e.title.rendered}</a>
                <div class="item-caption">
                    <time>${postDate}.${postMonth}.${postYear}</time>
                    <p>author:${e.author}</p>
                </div>
            </div>
             `
    })
}

// MORE NEWS

const moreNewsBtn = document.querySelector('#moreNews');

moreNewsBtn.addEventListener('click', () => {
    moreNewsBtn.innerHTML = 'Loading...'
    getMoreNews(mediaUrl, mainUrl)
    event.preventDefault()
})

const getMoreNews = (urlMedia, urlMain) => {
    let data = []
    fetch(urlMedia)
        .then(response => response.json())
        .then(res => {
            data.push({ type: 'media', data: res })
            if (data.length == 2) {
                moreNewsToPage(data)
            }
        })
    fetch(urlMain)
        .then(response => response.json())
        .then(res => {
            data.push({ type: 'main', data: res })
            if (data.length == 2) {
                moreNewsToPage(data)
            }
        })
}

const moreNewsToPage = data => {
    moreNewsBtn.innerHTML = 'show more'
    let dataPosts = [],
        dataImg = [];

    // Data Filter
    for (let i = 0; i < data.length; i++) {
        if (data[i].type == "main") {
            dataPosts = data[i].data;
        } else if (data[i].type == "media") {
            dataImg = data[i].data;
        } else {
            dataSide = data[i].data;
        }
    }
    let moreNews = dataPosts.filter((item, index) => index < 6);

    console.log(moreNews)

    moreNews.map((PostElem, PostIndex) => {
        // DATE FROM POST
        let postFullDate = new Date(PostElem.date);
        let postDate = getZero(postFullDate.getDate());
        let postMonth = getZero(postFullDate.getMonth());
        let postYear = postFullDate.getFullYear();

        dataImg.map((MediaElem, MediaIndex) => {
            // CUTTING WORDS
            let postDesc = PostElem.excerpt.rendered;
            let postDescCut = postDesc.slice(0, 200); // Количество обрезаемых слов
            let postDescCutted = postDescCut.split(' ');
            postDescCutted.splice(postDescCutted.length - 1, 1);
            postDescCut = postDescCutted.join(' ');
            if (PostElem.id === MediaElem.post) {
                mainNews.innerHTML += `
                <div class="mainNews__item">
                    <p class="mainNews__category">Category: ${PostElem.categories[0]}</p>
                    <img src="${MediaElem.source_url}"/>
                    <div >
                        <a href="#"> ${PostElem.title.rendered}</a>
                        <div class="mainNews__caption">
                            ${postDescCut + ' ...' + '</p>'}
                            <div>
                                <time>${postDate}.${postMonth}.${postYear}</time>
                                <p>author:${PostElem.author}</p>
                            </div>
                        </div>
                    </div>
                </div>                 
                `
            }
        })
    })

}
