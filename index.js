const search = async () => {
    const queryWord = document.getElementById('queryWord').value;

    if (!queryWord) {
    return alert('Please enter a query word');
    }

    document.getElementById('search-button').innerHTML = 'Searching...'
    const page = document.getElementById('page').value;

    const pageNumber = page ? parseInt(page) : 1;

    const response = await fetch(`https://api.unsplash.com/search/photos?query=${queryWord}&client_id=_H3lSAxGzHIOeQyncZVVMcoi-TQQJaTik7-nGuyepYM&per_page=12&order_by=relevant&page=${pageNumber}`);
    document.getElementById('search-button').innerHTML = 'Search'
    const data = await response.json();

    if (data.results && data.results.length > 0) {
        let content = data.results.map(({ description, alt_description, links, urls }) => {
            const refinedDescription = description ? description : 'No Description';
            const shortenedDescription = refinedDescription.length > 25 ? `${refinedDescription.slice(0, 25)}...` : refinedDescription
        return `
        <div class='album'>
            <a href=${urls.regular} target="_blank" rel="noreferrer">
                <img src=${urls.regular} alt=${alt_description} />
                <div class="tooltip">
                    <span>${shortenedDescription}</span>
                    <span class="tooltiptext">${description || 'No description found'}</span>
                    </div>
            </a>
            <a href=${links.download} download>
                Download
            </a>
        </div>
        `
    }).join('');
    document.getElementById('banner').innerHTML = '';
    document.getElementById('content').innerHTML = content;
    } else {
        document.getElementById('content').innerHTML = '';
        document.getElementById('banner').innerHTML = 'No photos found';
    }
}

