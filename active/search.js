// Define the search engines
const searchEngines = Object.freeze({
    Google: 'google.com/search?q=',
    Bing: 'bing.com/search?q=',
    DuckDuckGo: 'duckduckgo.com/?q=',
    Startpage: 'startpage.com/sp/search?query=',
});

// Set the default search engine
const defaultSearch = searchEngines['DuckDuckGo'];

// Function to handle search input
const search = (input, template = `https://${defaultSearch}%s`) => {
    try {
        return new URL(input) + '';
    } catch (e) {
        const url = new URL(`http://${input}`);
        if (url.hostname.indexOf('.') != -1) return url + '';
        return template.replace('%s', encodeURIComponent(input));
    }
};
