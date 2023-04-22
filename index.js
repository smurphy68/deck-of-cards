class Card {
    constructor(suit, faceValue, position) {
        this._suit = suit
        this._faceValue = faceValue
        this._position = position
        switch (faceValue) {
            case 11: this._picture = "J";
                break;
            case 12: this._picture = "Q";
                break;
            case 13: this._picture = "K"
                break;
            case 14: this._picture = "A";
                break;
            default: break
        }
    }
    get suit() {
        return this._suit
    }
    get faceValue() {
        return this._faceValue
    }
    get picture() {
        if (this._picture) {
            return this._picture
        }
        return false
    }
    get position() {
        return this._position
    }
}

let cardsInOrder = [];
const suits = ["&clubs;", "&spades;", "&hearts;", "&diams;"];
let count = 0;
for (let i = 0; i <= suits.length; i++) {
    for (let j = 2; j <= 14; j++) {
        cardsInOrder[count] = new Card(suits[i % 4], j, count);
        count += 1;
    };
};

const toggle = (e) => {
    const hand = document.getElementById("hand");
    const board = document.getElementById("board");
    const card = e.target.parentNode;
    if (card.parentNode === board) {
        hand.appendChild(card);
        card.setAttribute("class", "hand-card");
    } else if (card.parentNode === hand) {
        board.appendChild(card);
        card.setAttribute("class", "board-card");
    }
}

let board = document.getElementById("board");
cardsInOrder.forEach((e) => {
    let tempDiv = document.createElement("div");
    tempDiv.setAttribute("id", `${e.position}`);
    tempDiv.setAttribute("name", `${e.suit}-${e.faceValue}`);
    tempDiv.setAttribute("class", "board-card");

    tempDiv.addEventListener("click", (e) => {
        toggle(e) // toggle also used elsewhere
    })

    let topLeftTempDiv = document.createElement("div");
    topLeftTempDiv.setAttribute("id", `${e.suit}-${e.faceValue}-blsymbol`);
    topLeftTempDiv.setAttribute("name", `${e.suit}-${e.faceValue}-blsymbol`);
    topLeftTempDiv.setAttribute("class", "tl-number");
    if (e.picture) {
        topLeftTempDiv.innerHTML = e.picture
    } else {
        topLeftTempDiv.innerHTML = e.faceValue
    }

    let middleTempDiv = document.createElement("div");
    middleTempDiv.setAttribute("id", `${e.suit}-${e.faceValue}-symbol`);
    middleTempDiv.setAttribute("name", `${e.suit}-${e.faceValue}-symbol`);
    middleTempDiv.setAttribute("class", "suit")
    middleTempDiv.innerHTML = e.suit

    let bottomRightTempDiv = document.createElement("div");
    bottomRightTempDiv.setAttribute("id", `${e.suit}-${e.faceValue}-tlsymbol`);
    bottomRightTempDiv.setAttribute("name", `${e.suit}-${e.faceValue}-tlsymbol`);
    bottomRightTempDiv.setAttribute("class", "br-number");
    if (e.picture) {
        bottomRightTempDiv.innerHTML = e.picture
    } else {
        bottomRightTempDiv.innerHTML = e.faceValue
    }

    tempDiv.appendChild(topLeftTempDiv)
    tempDiv.appendChild(middleTempDiv)
    tempDiv.appendChild(bottomRightTempDiv)
    board.appendChild(tempDiv)
})

const shuffleElements = (parentId) => {
    const parentElement = document.getElementById(parentId);
    if (!parentElement) {
        console.error(`Parent element with ID '${parentId}' not found.`);
        return;
    }
    const childElements = Array.from(parentElement.children);
    if (childElements.length === 0) {
        return
    }
    childElements.forEach((childElement) => {
        parentElement.removeChild(childElement);
    });
    shuffleArray(childElements);
    childElements.forEach((childElement) => {
        parentElement.appendChild(childElement);
    });
}

//helper function
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const orderElements = (parentId) => {
    const parentElement = document.getElementById(parentId)
    if (!parentElement) {
        console.error(`Parent element with ID '${parentId}' not found.`);
        return;
    }
    const childElements = Array.from(parentElement.children);
    if (childElements.length === 0) {
        return;
    };
    childElements.sort((a, b) => {
        if (parseInt(a.id) < parseInt(b.id)) {
            return -1;
        };
        if (parseInt(a.id) > parseInt(b.id)) {
            return 1;
        };
        return 0;
    });

    console.log(childElements)

    childElements.forEach((childElement) => {
        parentElement.removeChild(childElement);
    });

    childElements.forEach((childElement) => {
        parentElement.appendChild(childElement);
    });
};
