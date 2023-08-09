
class RandomQuote {
    constructor() {
        this.init();
    }

    init() {
        this.quoteContainer = document.querySelector('.quote-container');
        this.quote = document.querySelector('#quote');
        this.quoteButton = document.querySelector('#next-quote');
        this.author = document.querySelector('#author');

        this.quoteButton.addEventListener("click", this.getQuote);

        document.addEventListener('keyup', e => {
            if (e.code === 'Space') {
                this.getQuote();
            }
        });

        this.getQuote();
    }

    getQuote = async () => {
        const apiUrl = "/api/quotes/random";

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            this.quote.textContent = data.quote;
            this.author.textContent = data.author;

        } catch (error) {
            console.log(error);
            this.quote.textContent = "Server Error. Please try again later." + error;
        }
    };
}

const randomQuote = new RandomQuote();