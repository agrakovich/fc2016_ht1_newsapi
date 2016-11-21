'use strict';
class NewsApplication {
    constructor(config) {
        this.newsUrl = config.newsUrl;
        this.newsElementId = config.newsElementId;
        this.isDebugMode = config.isDebugMode;
    }

    run(){
        fetch(this.newsUrl)
            .then(response => response.json())
            .then(jsonResponse => {
                let articlesHtml = '';
                this.isDebugMode && console.log(jsonResponse);

                if(jsonResponse.status === 'ok') {
                    if (jsonResponse.articles && jsonResponse.articles.length > 0) {
                        jsonResponse.articles = jsonResponse.articles.map(article => {
                            return this._getArticleProxy(article);
                        });
                        articlesHtml = HtmlHelper.getArticlesHtml(jsonResponse.articles);
                    } else {
                        articlesHtml = HtmlHelper.getInfoHtml('Sorry. Today there is no news =(');
                    }
                } else {
                    articlesHtml =  HtmlHelper.getErrorHtml('Sorry. Something wrong =(');
                    this.isDebugMode && console.error(jsonResponse.message);
                }
                HtmlHelper.fillElement(this.newsElementId, articlesHtml);
            })
            .catch( error => {
                HtmlHelper.fillElement(this.newsElementId,  HtmlHelper.getErrorHtml('Sorry. Something wrong =('));
                this.isDebugMode && console.error(error.message);
            });
    }

    _getArticleProxy(article){
        let proxy = new Proxy(article, {
            get(target, prop) {
                if (!target[prop]) {
                    console.warn(`Property: ${prop} does not exist in object.`, target);
                    return undefined;
                }
                if(prop == 'publishedAt'){
                    let date = new Date(target[prop]);
                    return date.toLocaleString()
                }
                return target[prop];
            }
        });
        return proxy;
    }
};