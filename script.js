'use strict';

//Gotta target div tags ids to manipulate them in the DOM
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show loading
function showLoadingSpinner() {
    loader.hidden = false; //loader is not hidden, being shown
    quoteContainer.hidden = true;
}

//Hide loading 
function completeLoadingSpinner() {
    if(!loader.hidden) //if loader is NOT hidden...
    quoteContainer.hidden = false;
    loader.hidden = true; //loader is hidden,not being shown
}

//Show New Quote
function newQuote() {
    //loading();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    //console.log(quote);

    //Check if author field is blank,or if author is NOT there, replace blank space with the word "Unknown"
    if (!quote.author) {
        authorText.textContent = 'Unknown';

    } else {
        authorText.textContent = quote.author;
    }
    //sets value of textContent,passes
    //string in that is then shown as an element
    //just getting author(quote.author), not entire quote object

    //Check Quote Length to add css styling changes
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    completeLoadingSpinner();
}


//Get Quotes From API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl); // response wont populate until it fetches from api
        //otherwise, without await, response will just be undefined
        apiQuotes = await response.json(); //taking json response and making it
        // into json object
        //just a series of strings from web server if we dont make response into json object
        newQuote(); //able to grab a new quote since it's fetched data from api at this point
        console.log(apiQuotes);
        throw new Error('oops')
    } catch (error) {
        //Catch Error Here
        console.log(error)
    }
}


//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.
        textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');//allows us to open twitter
    //window with twitter url
    //with a different tab
}

//event listeners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

getQuotes();

