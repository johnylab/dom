const $ = (query, context = document) => [...context.querySelectorAll(query)];

const render = (node, settings = {}) => {
    if (node instanceof Array) {
        return node.map((el) => render(el, settings));
    }

    const element = typeof node === 'string'
        ? document.createElement(node)
        : node;

    if (!(element instanceof Node)) {
        return null;
    }

    const {
        attr, style, children, events, ...props
    } = settings;

    if (attr) {
        Object.entries(attr).forEach(([key, val]) => {
            element.setAttribute(key, val);
        });
    }
    if (props) {
        Object.entries(props).forEach(([key, val]) => {
            element[key] = val;
        });
    }
    if (style) {
        Object.entries(style).forEach(([key, val]) => {
            element.style[key] = val;
        });
    }
    if (children instanceof Array) {
        children.forEach((kid) => {
            element.appendChild(kid);
        });
    }
    if (events) {
        Object.entries(events).forEach(([key, val]) => {
            element.addEventListener(key, val);
        });
    }

    return element;
};

const wrapElement = (wrappedElement, wrapper) => {
    wrappedElement.insertAdjacentElement('beforeBegin', wrapper);
    wrapper.appendChild(wrappedElement);
};

const show = (element) => element.removeAttribute('hidden');

const hide = (element) => element.setAttribute('hidden', true);

$.wrapElement = wrapElement;
$.render = render;
$.show = show;
$.hide = hide;

export default $;
