var html = '';

function run() {
    var items = document.getElementsByTagName("*");
    for (var i = 0, len = items.length; i < len; i++) {
        var el: Element = items[i];
        var style = getComputedStyle(el);
        if(isVisible(style) || hasText(el)) {
            let cords = getCoords(el);
            if(cords.width > 0 && cords.height > 0) {
                html += 
                '<div style="' +
                    'position: absolute;' + 
                    'z-index:' + style.zIndex + ';' +
                    'font-size:' + style.fontSize + ';' +
                    'border-top:' + style.borderTop + ';' +
                    'border-bottom:' + style.borderBottom + ';' +
                    'border-left:' + style.borderLeft + ';' +
                    'border-right:' + style.borderRight + ';' +
                    'background:' + (style.background || '').replace(new RegExp('"', 'g'), '\'') + ';' + 
                    'border:' + style.border + ';' +
                    'top:' + cords.top + ';' +
                    'left:' + cords.left + ';' +
                    'width:' + cords.width + ';' + 
                    'height:' + cords.height + '">' + 
                    el.textContent + 
                '</div>'
            }
        }
    }
    let wnd = window.open("about:blank", "", "_blank");
    if(wnd) {
        wnd.document.write(html);
    }
}

function isVisible(style: CSSStyleDeclaration) {
    if ((style.display === 'none') || (style.visibility === 'hidden')) {
        return false;
    }

    if(style.backgroundImage !== 'none' || style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        return true;
    }

    if(hasBorders(style)) {
        return true;
    }

    return false;
}

function hasBorders(style: CSSStyleDeclaration) {
    return style.borderTopWidth !== '0px' || style.borderBottomWidth !== '0px' || style.borderLeftWidth !== '0px' || style.borderRightWidth !== '0px';
}

function hasText(elem: Element) {
    return elem.innerHTML === elem.textContent;
}

function getCoords(elem: Element) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { 
        top: Math.round(top), 
        left: Math.round(left),
        width: box.width,
        height: box.height
    };
}