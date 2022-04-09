const fetch = require('cross-fetch');

module.exports = class Quote {
  author;
  quote;

  constructor(row) {
    this.author = row.author ?? row[0].character;
    this.quote = row.content ?? row.en ?? row[0].quote;
  }
  static getQuotes() {
    const links = [
      'https://programming-quotes-api.herokuapp.com/quotes/random',
      'https://futuramaapi.herokuapp.com/api/quotes/1',
      'https://api.quotable.io/random',
    ];
    const quotesArray = Promise.all(links.map((link) => fetch(link)))
      .then((quotes) => Promise.all(quotes.map((quote) => quote.json())))
      .then((funnyQuotes) => {
        return funnyQuotes.map((row) => new Quote(row));
      });
    return quotesArray;
  }
};
