const mainNews = document.querySelector('.mainNews__content');
const sideNews = document.querySelector('.sideNews__content');

const mainUrl = 'https://renemorozowich.com/wp-json/wp/v2/posts';
const sideUrl = 'https://renemorozowich.com/wp-json/wp/v2/posts?categories=33';
const mediaUrl = 'https://renemorozowich.com/wp-json/wp/v2/media/';


const getData = (urlMedia, urlMain, urlSide) => {
    let data = []
    fetch(urlMedia)
        .then(response => response.json())
        .then(res => {
            data.push(res)
            if (data.length == 3) {
                mainNewsToPage(data)
            }

        })
        .then(
            fetch(urlMain)
        )
    fetch(urlMain)
        .then(response => response.json())
        .then(res => {
            data.push(res)
            if (data.length == 3) {
                mainNewsToPage(data)
            }
        })
    fetch(urlSide)
        .then(response => response.json())
        .then(res => {
            data.push(res)
            if (data.length == 3) {
                mainNewsToPage(data)
            }
        })
    return data

}

const mainNewsToPage = data => {
    console.log(data)
}
getData(mediaUrl, mainUrl, sideUrl)