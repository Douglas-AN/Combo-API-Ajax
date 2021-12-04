if (localStorage.getItem("App") === null) {
    var App = {
        deckId: 0,
        nbCard: 52,
        cardRemaining: 0,
        Players: [],
        Defausse: {
            Nom: 'Defausse',
            NomPile: '',
            Carte: [],
        },
        Pioche: [],
    };
}
else {
    var App = JSON.parse(localStorage.getItem("App"));
}

var deckId = App.deckId;
localStorage.setItem("App", JSON.stringify(App));

document.getElementById("playGame").addEventListener("click", function () { // Commencer à jouer
    document.querySelector('.Players').style.display = "none";
    this.style.display = 'none';
    let App = JSON.parse(localStorage.getItem("App"));
    let playerName = document.getElementsByName("Players[]");

    playerName.forEach(function (element) {
        if (element.value.trim().length > 1) {
            let Player = { Nom: '', Carte: [] };
            Player.Nom = element.value.trim();
            App.Players.push(Player); // Recupère les nom des joueurs pour les mettre dans le tableau APP
        }
    });
    localStorage.setItem("App", JSON.stringify(App));

    if (localStorage.getItem("deckId") === null) { //recupère le deckId et le stocke dans le localStorage
        createDeck().then(function (deck) {
            deckId = deck.deck_id;
            localStorage.setItem('deckId', deckId);
            App.deckId = deckId;
            localStorage.setItem("App", JSON.stringify(App));
        }).then(function () {
            playGame();
        }).catch(function (error) {
            console.error(error)
        })
    }
    else {
        deckId = localStorage.getItem("deckId");
    }
});

document.getElementById('btnJouer').addEventListener('click', function () {
    document.getElementById('slider').style.display = "none";
    document.getElementById('jeu').style.display = "block";
    document.querySelector('h1').style.display = "block";
    document.getElementById("btnJouer").style.display = "none";
    document.getElementById("playGame").style.display = "block";
    document.querySelector(".Players").style.display = "block";
});

document.getElementById('reset').addEventListener('click', function () { // Reset le localStorage
    localStorage.clear();
});
