/* FUNCTION *****************************/

/**
 * Fonction qui regroupe le fetch
 * @param {String} link lien qui permet de savoir ce que l'on souhaite faire avec l'API
 * @returns retourne la réponse de l'API
 */

function fetchFunction(link) {
    const api_base_url = 'http://deckofcardsapi.com/api/deck/';
    const myInit = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return fetch(api_base_url + link, myInit)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                alert('Erreur serveur');
            }
        })
        .catch(function (error) {
            return error.message;
        })
}

/**
 * Création du Jeu de carte
 */
function createDeck() {
    return fetchFunction('new/shuffle/?deck_count=1')
}


// Click on "play"
function playGame() {
    console.log("PLAY GAME");
    step1(16).then(function (cardsResult) {
        return step2(cardsResult);
    }).then(function () {
        return step5();
    }).then(function () {
        return step6();
    }).then(function () {
        return choice();
    })
        .catch(function (error) {
            console.error(error)
        });
}

function step1(nbCard) { //pickCards
    console.log('step1')
    return fetchFunction(deckId + '/draw/?count=' + nbCard);
}

function step2(cardsResult) { // Promise to execute step2Bis, step3
    console.log('step2')
    return new Promise((resolve, reject) => {
        let App = JSON.parse(localStorage.getItem("App"));
        step2bis(App.Players[0], cardsResult.cards.slice(0, 4)).then(r => {
            step30(App.Players[0]).then(r => {
                step2bis(App.Players[1], cardsResult.cards.slice(4, 8)).then(r => {
                    step31(App.Players[0]).then(r => {
                        step2bis(App.Players[2], cardsResult.cards.slice(8, 12)).then(r => {
                            step32(App.Players[0]).then(r => {
                                step2bis(App.Players[3], cardsResult.cards.slice(12, 16)).then(r => {
                                    step33(App.Players[0]).then(r => {
                                        localStorage.setItem("App", JSON.stringify(App));
                                        resolve(true);
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

function step2bis(player, cards) { // Put cards into piles of players
    console.log('step2Bis')
    return new Promise((resolve, reject) => {
        let codes = "";
        cards.forEach(function (carte) {
            player.Carte.push(carte.code);
            codes += carte.code + ",";
        });
        codes = codes.slice(0, -1);
        fetchFunction(deckId + '/pile/' + player.Nom + '/add/?cards=' + codes).then(r => {
            resolve(true);
        })
    });
}

function step30(player) { // Create and display back cards of piles players
    console.log('step4')
    return new Promise((resolve, reject) => {
        let position = 0;
        player.Carte.forEach(function (card) {
            console.log(card)
            let element = document.getElementById('deckPlayer1');
            let image = document.createElement('img');
            image.className = 'currentCard';
            image.classList.add('hoverCard');
            image.src = './images/combo.jpg';
            image.dataset.code = card;
            image.style.cssText = 'width:150px';
            position++;
            element.appendChild(image);
            image.dataset.position = position;
        });
        localStorage.setItem("App", JSON.stringify(App));
        resolve(true)
    })
}

function step31(player) { // Create and display back cards of piles players
    console.log('step4')
    return new Promise((resolve, reject) => {
        let position = 0;
        player.Carte.forEach(function (card) {
            let element = document.getElementById('deckPlayer2');
            let image = document.createElement('img');
            image.className = 'currentCard';
            image.classList.add('hoverCard');
            image.src = './images/combo.jpg';
            image.dataset.code = card;
            image.style.cssText = 'width:150px';
            position++;
            element.appendChild(image);
            image.dataset.position = position;
        });
        localStorage.setItem("App", JSON.stringify(App));
        resolve(true)
    })
}

function step32(player) { // Create and display back cards of piles players
    console.log('step4')
    return new Promise((resolve, reject) => {
        let position = 0;
        player.Carte.forEach(function (card) {
            let element = document.getElementById('deckPlayer3');
            let image = document.createElement('img');
            image.className = 'currentCard';
            image.classList.add('hoverCard');
            image.src = './images/combo.jpg';
            image.dataset.code = card;
            image.style.cssText = 'width:150px';
            position++;
            element.appendChild(image);
            image.dataset.position = position;
        });
        localStorage.setItem("App", JSON.stringify(App));
        resolve(true)
    })
}

function step33(player) { // Create and display back cards of piles players
    console.log('step4')
    return new Promise((resolve, reject) => {
        let position = 0;
        player.Carte.forEach(function (card) {
            let element = document.getElementById('deckPlayer4');
            let image = document.createElement('img');
            image.className = 'currentCard';
            image.classList.add('hoverCard');
            image.src = './images/combo.jpg';
            image.dataset.code = card;
            image.style.cssText = 'width:150px';
            position++;
            element.appendChild(image);
            image.dataset.position = position;
        });
        localStorage.setItem("App", JSON.stringify(App));
        resolve(true)
    })
}


function step5() { // Revert two card on click
    return new Promise((resolve, reject) => {
        console.log('step5')
        let elements = document.querySelectorAll(".currentCard");
        let nbCardClick = 0;
        elements.forEach(function (elem) {
            elem.addEventListener('click', function () {
                if (nbCardClick < 2) {
                    nbCardClick++;
                    let dataCode = this.dataset.code;
                    this.src = "http://deckofcardsapi.com/static/img/" + dataCode + ".png";
                }
                if (nbCardClick == 2) {
                    document.querySelector('#btnValidCard').style.display = "flex"; // Show the btn to play the game when two card are revert
                }
            });
            resolve(true);
        });
    });
}

function step6() { // Revert face card to play the game
    return new Promise((resolve, reject) => {
        console.log('step6')
        document.querySelector('.chooseCard').style.display = "block";
        document.querySelector("#btnValidCard").addEventListener("click", function () {
            let cards = document.querySelectorAll(".currentCard");
            cards.forEach(function (elem) {
                elem.src = './images/combo.jpg';
            });
            document.querySelector('#btnValidCard').style.display = "none"; // Hide the btn to play the game when two card are revert
            document.querySelector('.centre').style.display = "flex"; // Show the center pickaxe and ben
            document.querySelector('.chooseCard').style.display = "none";
        });
        resolve(true)
    });
}

function step7() { // Pick one card in the deck
    // return new Promise((resolve, reject) => {
    //     document.getElementById('pioche').addEventListener('click', function () {
    document.querySelector('.chooseChange').style.display = "block";
    console.log('step7')
    let App = JSON.parse(localStorage.getItem("App"));
    step1(1).then(function (pile) {
        pile.cards.forEach(function (carte) {
            document.querySelector('.popUp').style.display = "flex";
            let element = document.querySelector('#popUpCarte');
            let image = document.createElement('img');
            image.src = carte.image;
            image.style.cssText = 'width:200px';
            element.appendChild(image);
            return App.Pioche.push(carte.code) // Rentre dans le tableau App la carte piocher
        })
        localStorage.setItem("App", JSON.stringify(App));
    })
    document.querySelector('#putBen').addEventListener('click', function () {
        step10().then(function () {
            return step9();
        });
    })
    document.querySelector('.currentCard').addEventListener('click', function () {
        step8().then(function () {
            return step9();
        });
    })
    //         resolve(true);
    //     });
    // });
}

function step8() { // Choose card to change in pile of player
    return new Promise((resolve, reject) => {
        console.log('step8')
        let App = JSON.parse(localStorage.getItem("App"));
        let elements = document.querySelectorAll(".currentCard");
        let cardPioche = App.Pioche[App.Pioche.length - 1];
        localStorage.setItem("App", JSON.stringify(App));
        elements.forEach(function (elem) {
            elem.addEventListener('click', function () {
                let App = JSON.parse(localStorage.getItem("App"));
                let position = this.dataset.position;
                App.Players[0].Carte.splice(position - 1, 1);
                App.Pioche.pop();
                fetchFunction(App.deckId + '/pile/' + App.Players[0].Nom + '/add/?cards=' + cardPioche);
                App.Players[0].Carte.splice(position - 1, 0, cardPioche);
                fetchFunction(App.deckId + '/pile/' + App.Defausse.Nom + '/add/?cards=' + this.dataset.code);
                App.Defausse.Carte.push(this.dataset.code);
                document.querySelector('.popUp').style.display = "none";
                let removeCard = document.querySelector('#popUpCarte img');
                removeCard.parentNode.removeChild(removeCard);
                localStorage.setItem("App", JSON.stringify(App));
                resolve(true);
            });
        });
    });
}

function step9() { // Delete the pick card and show the card in the ben 
    console.log('step9')
    return new Promise((resolve, reject) => {
        document.querySelector('.chooseChange').style.display = "none";
        return new Promise((resolve, reject) => {
            let App = JSON.parse(localStorage.getItem("App"));
            let ben = document.querySelector('#ben');
            let benCard = document.createElement('img');
            benCard.style.cssText = 'width:150px';
            let lastBenCard = App.Defausse.Carte[App.Defausse.Carte.length - 1];
            benCard.src = "http://deckofcardsapi.com/static/img/" + lastBenCard + ".png";
            benCard.classList.add("eventCardBen");
            ben.appendChild(benCard);
            localStorage.setItem("App", JSON.stringify(App));
            resolve(true);
        });
    });
}

function step10() { // Put the pick card of the deck into the ben
    return new Promise((resolve, reject) => {
        // let btnBen = document.querySelector('#putBen');
        // btnBen.addEventListener("click", function () {
        let App = JSON.parse(localStorage.getItem("App"));
        let cardPioche = App.Pioche[App.Pioche.length - 1];
        fetchFunction(App.deckId + '/pile/' + App.Defausse.Nom + '/add/?cards=' + cardPioche);
        App.Defausse.Carte.push(cardPioche);
        App.Pioche.pop();
        localStorage.setItem("App", JSON.stringify(App));
        let removeCard = document.querySelector('#popUpCarte img');
        removeCard.parentNode.removeChild(removeCard);
        document.querySelector('.popUp').style.display = "none";
        resolve(true);
    });
    // });
};

function step11() { //Pick the card of ben and draw
    // return new Promise((resolve, reject) => {
    console.log('step11')
    let elements = document.querySelector(".eventCardBen");
    elements.addEventListener('click', function () {
        document.querySelector('.chooseChange2').style.display = "block";
        let App = JSON.parse(localStorage.getItem("App"));
        document.querySelector('.popUp').style.display = "flex";
        document.querySelector('#putBen').style.display = "none";
        let element = document.querySelector('#popUpCarte');
        let image = document.createElement('img');
        let lastBenCard = App.Defausse.Carte[App.Defausse.Carte.length - 1];
        image.src = "http://deckofcardsapi.com/static/img/" + lastBenCard + ".png";
        image.style.cssText = 'width:200px';
        element.appendChild(image);
        localStorage.setItem("App", JSON.stringify(App));
        // resolve(true);
    });
    // });
}

function step12() { // replace card of step11 and change into App
    // return new Promise((resolve, reject) => {
    console.log('step12')
    let App = JSON.parse(localStorage.getItem("App"));
    let elements = document.querySelectorAll(".currentCard");
    let lastBenCard = App.Defausse.Carte[App.Defausse.Carte.length - 1];
    localStorage.setItem("App", JSON.stringify(App));
    elements.forEach(function (elem) {
        elem.addEventListener('click', function () {
            let App = JSON.parse(localStorage.getItem("App"));
            let position = this.dataset.position;
            let infoCodeCard = App.Players[0].Carte.splice(position - 1, 1);
            //fetchFunction(App.deckId + '/pile/' + App.Players[0].NomPile + '/add/?cards=' + lastBenCard);
            App.Players[0].Carte.splice(position - 1, 0, lastBenCard);
            //fetchFunction(App.deckId + '/pile/' + App.Defausse.Nom + '/add/?cards=' + this.dataset.code);
            document.querySelector('.popUp').style.display = "none";
            let removeCard = document.querySelector('#popUpCarte img');
            removeCard.parentNode.removeChild(removeCard);
            document.querySelector('#btnValidCard').style.display = "none";
            let ben = document.querySelector('#ben img');
            ben.parentNode.removeChild(ben);
            let benI = document.querySelector('#ben');
            let imgBen = document.createElement('img');
            imgBen.src = "http://deckofcardsapi.com/static/img/" + this.dataset.code + ".png";
            imgBen.style.cssText = 'width:150px';
            benI.appendChild(imgBen);
            this.dataset.code = lastBenCard;
            App.Defausse.Carte.pop();
            App.Defausse.Carte.push(infoCodeCard);
            document.querySelector('.chooseChange2').style.display = "none";
            localStorage.setItem("App", JSON.stringify(App));
            // resolve(true);
        });
    });
    // });
}

var slide = new Array("./images/progressOfTheGame.jpg", "./images/unfoldingOfROund.jpg", "./images/quickDiscard.jpg", "./images/roundEnd.jpg", "./images/scoringPoint.jpg", "./images/cardsPower.jpg", "./images/cardsValue.jpg");
var numero = 0;

function ChangeSlide(sens) {
    numero = numero + sens;
    if (numero < 0) {
        numero = slide.length - 1;
    }
    if (numero > slide.length - 1) {
        numero = 0;
    }
    document.getElementById("slide").src = slide[numero];
    if (numero != 0) {
        document.getElementById('precedent').style.display = "inline";
        document.getElementById('suivant').style.display = "inline";
    }
    if (numero == 0) {
        document.getElementById('precedent').style.display = "none";
    }
    if (numero == 6) {
        document.getElementById("suivant").style.display = "none";
        document.getElementById("btnJouer").style.display = "block"; // Ajout du btn Jouer sur la dernière slide
    }
}

function choice() {
    return new Promise((resolve, reject) => {
        document.getElementById('pioche').addEventListener('click', function () {
            step7();
        });
        document.querySelector('.eventCardBen').addEventListener('click', function () {
            step11();
        })
        resolve(true)
    });
}
