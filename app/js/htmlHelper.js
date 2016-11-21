class HtmlHelper{

    static getInfoHtml(infoMessage){
        return this.renderHtml`<div class="info">
                    <div class="label">Info:</div>
                    <div class="message">${infoMessage}</div>
                </div>`;
    }

    static getErrorHtml(errorMessage){
        return this.renderHtml`<div class="error">
                    <div class="label">Error:</div>
                    <div class="message">${errorMessage}</div>
                </div>`;
    }

    static getArticlesHtml(articles){
        return articles.map(article => this.renderHtml`
            <article>
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
                    <div class="publishat">${article.publishedAt}</div>
                    <div class="byline">${article.author}</div>
                </div>
            </article>`).join("");
    }

    static renderHtml(literalSections, ...literalArguments) {
        let raw = literalSections.raw;
        let result = '';

        literalArguments.forEach((argument, i) => {
            result += raw[i];

            if(!argument) return;

            argument = argument
                .replace(/&/g, '&amp;')
                .replace(/>/g, '&gt;')
                .replace(/</g, "&lt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;")
                .replace(/`/g, "&#96;");

            result += argument;
        });
        result += raw[raw.length - 1];

        return result;
    }

    static fillElement(elementId, html){
        var element = document.getElementById(elementId);
        if(element){
            element.innerHTML = html;
        }
    }
}
