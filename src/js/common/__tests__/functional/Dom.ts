//https://github.com/airbnb/enzyme/issues/341   
declare const global;
const jsdom = require('jsdom').jsdom;

export const bootstrap = () => {
    const doc = jsdom('<!doctype html><html><body></body></html>')
    global.document = doc
    global.window = doc.defaultView
}

export const teardown = () => {
    jsdom('');
}

