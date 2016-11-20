'use strict';
const config = {
    newsUrl: 'https://newsapi.org/v1/articles?source=bbc-news&apiKey=e4f61131ae2a4c888846c71d56ebb5c0',
    newsElementId: 'articles'
}
const app = {
    run: () => {
        fetch(config.newsUrl)
            .then(response => response.json())
            .then(jsonResponse => {
                var articlesHtml = ''
                if(jsonResponse.status === 'ok') {
                    if (jsonResponse.articles && jsonResponse.articles.length > 0) {
                        jsonResponse.articles.map(article => {
                            if (article.publishedAt) {
                                article.parsedDate = new Date(article.publishedAt)
                            }
                            articlesHtml += getArticleHtml(article)
                        })
                    } else {
                        articlesHtml = getInfoHtml('Sorry. Today there is no news =(')
                    }
                } else {
                    articlesHtml = getErrorHtml('Sorry. Something wrong =(')
                    console.log(jsonResponse.message)
                }
                fillElement(config.newsElementId, articlesHtml)
            })
            .catch( error => {
                fillElement(config.newsElementId, getErrorHtml('Sorry. Something wrong =('))
                console.log(error.message)
            })
    }
}

function getInfoHtml(infoMessage){
    return `<div class="info">
                <div class="label">Info:</div>
                <div class="message">${infoMessage}</div>
            </div>`
}
function getErrorHtml(errorMessage){
    return `<div class="error">
                <div class="label">Error:</div>
                <div class="message">${errorMessage}</div>
            </div>`
}
function getArticleHtml(article){
    return  `<div class="article">   
                            <div class="image"> 
                                <a href="${article.url}">
                                    <img src="${article.urlToImage}">
                                </a> 
                            </div>
                            <div class="asset">             
                                <a href="${article.url}">
                                    <h3>${article.title}</h3>                                    
                                    <p>${article.description}</p>
                                </a>
                                <div class="publishat">${article.parsedDate.toLocaleDateString()} ${article.parsedDate.toLocaleTimeString()}</div>
                                <div class="byline">${article.author}</div>
                            </div>
                        </div>`
}
function fillElement(elementId, html){
    var element = document.getElementById(elementId);
    if(element){
        element.innerHTML = html
    }
}