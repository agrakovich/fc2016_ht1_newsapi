class HtmlHelper{

    renderHtml(literalSections, ...literalArguments) {
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

    fillElement(elementId, html){
        let element = document.getElementById(elementId);
        if(element){
            element.innerHTML = html;
        }
    }
}
