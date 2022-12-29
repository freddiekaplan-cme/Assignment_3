let character = {
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    charisma: 0,
    name: "",
    specialMove: "",
    specialMoveLine: "",
    specialMoveCount: 0,
    chosenQuote: "",
    selectQuote: ""
};

let events = {
    newPathMade: false,
    chestOpened: false,
    secondChestOpened: false,
    triggeredTrap: false,
    usedSpecial: false,
    moreThanOneSpecial: false,
    drinkingCider: false,
    killGoblin: false,
    killWarlock: false,
    killMinotaur: false,
    typingError: false,
    firstRiddleGuess: false
};

let wizard = [1, 2, 4, 3, "The Wizard", "Fireball", "You conjure a mighty FIREBALL!", 1, "'You chose wisely!'", "'I am cunning and full of tricks, sure to outwit the lurking fiends inside this malevolent maze and unravel any enigmas that might appear.'"];
let barbarian = [4, 3, 1, 2, "The Barbarian", "Berserk Attack", "You go into a fit of BERSERKER RAGE!", 1, "'Hrm, let's go.'", "'I'm strongk!'"];
let rogue = [2, 4, 2, 2, "The Rogue", "Storm of Daggers", "Moving at lightning speed, you hit everything around you with a STORM OF DAGGERS!", 1, "'What are we waiting for?'", "'What do you need? I'm versatile and good at many things, and I'm fast as the wind.'"];
let bard = [2, 1, 3, 4, "The Bard", "Death Note", "Strumming your harp, you find the power within to sing the highpitched and destructive DEATH NOTE!", 1, "'And so the journey begins fa-la-la-la!'", "'Let me tell you the tale about the brave, cunning and beloved bard!'"];
let hero = [7, 7, 7, 7, "The Amazing Hero", "Super Star Unbeatable Mega Attack Move", "Without brekaing a sweat you use your signature SUPER STAR UNBEATABLE MEGA ATTACK MOVE!", 7, "*Special Character Unlocked!*", "*Special Character Unlocked!*"];
let createCharNameFirst = ["A One-eyed", "A Mysterious", "A Weary", "A Tough-looking", "A Thin", "A Fat", "A Tall", "A Demented", "A Handsome", "A Scruffy Looking", " A Scrawny", "A Disgraced", "A Short", "A Lonely", "A Sneaky", "A Noble", "A Cunning", "A Kind-hearted", "A Well To Do", "A Generous", "A Resolute", "An Adventurous", "A Diabolical", "A Fiendish", "A Raging", "A Reserved", "A Sassy", "A Nervous", "An Old", "A Young", "A Cool and Collected", "A Ferocious", "A Vigilant", "An Ambitious", "A Concerned", "A Hilarious", "A Horned", "A Scarred", "A One-Armed", "A Tough", "A Rebellious", "An Up To No Good", "An Unkown", "A Smalltown"];
let createCharNameSecond = ["Cat", "Duke", "Single Mother", "Goblin", "Noble", "Playwright", "Bartender", "Warrior", "Web Developer", "Usurper to the Throne", "Heretic", "Farmhand", "Man", "Woman", "Knight", "Squire", "Paladin", "Elf", "Orc", "Soldier", "Monk", "Merchant", "Animal Wrangler", "Forestdweller", "Goatherder", "Smith", "Druid", "Shaman", "Half-Human", "Villager", "Statesman", "Court Jester", "Bandit", "Youngling", "Seafarer", "Pirate", "Swashbuckler", "Sell-sword", "Tough guy", "Princess", "Maiden", "Adventurer", "Ranger", "Guardsman", "Dancer"]
let randomSpecialText = ["You unleash your ", "You let loose your ", "You use your ", "You summon your ", "You bring forth your ", "You reveal your "];
let randomSpecialAdjective = ["awesome", "deadly", "fearsome", "epic", "astounding", "incredible", "massive", "powerful", "great", "thundering", "impressive", "forbidden", "mystic", "mysterious", "spectacular", "amazing"];
let randomSpecial = ["Flurry of Arrows", "Beast Within", "Sword Slash", "Martial Arts", "High Pitched Scream", "Wrestling Move", "Spinning Kick", "Dance of Venomous Veils", "Spear Hand impaler", "Ground Punch", "Really Hard Punch", "Steel Fist Attack", "Warhammer Smash", "Death Stare", "Headbutt", "Body Slam", "Jumping Kick", "Aura Explosion", "Biting", "Demon Conjuring", "Animal Companion", "Hidden Weapon", "Sneak Attack", "Throwing Stars", "Torch Fighting", "Fire Breathing", "Mind Shattering Riddle", "Explosive Potion Bottles", "Shield Push"];
let chapterTitle = "";
let chapters = [0];
let createAttr = [1, 1, 1, 1, 10];
let fallbackFunction = ["function", "prompt", "special console log", "function after special function", "After Special option"];
let riddleClues = 0;
let showText = [""];
let showTextCount = [0];
let textSpeed = [60];
let treasureBonus = 0;
let continueCount = 0;

const LINE = "--------------------"
const NO_MOVES_LEFT = "You have used up all your special moves.";
const CHECK_SPELLING = "Try again, check your spelling.";
const TREASURE_CHEST = ["A shiny sword", "An embroidered thinking cap", "A pair of swiftfoot boots", "A small box of exotic makeup", "A bottle with a mysterious elixir", "A flask of strong smelling cider"];
const goblin = [1, 1, 2];
const TREASURE_CHEST_ITEMS_TEXT = "As you move closer, the bottom of the chest opens up underneath! You have only time to grab one thing before they all fall down into the black nothingness. Success! You grab...";
const copyTextArea = document.getElementById("copy-achievements");
const treasureChestEffects = [
    chestSword, 
    chestCap, 
    chestBoots, 
    chestMakeup, 
    chestElixir, 
    chestCider
];

document.getElementById("start-button").onclick = function() {
    document.getElementById("messages").innerHTML = "";
    document.getElementById("messages").classList.add("hidden");
    document.getElementById("continue-game").classList.add("hidden");
    document.getElementById("answer-button").onclick = function() {
        chooseChar();
    }
    if (document.getElementById("start-button").classList.contains("reset")) {
        document.getElementById("game-text").innerHTML = "";
        return gameStart();
    } else {
        document.getElementById("start-button").classList.add("reset");
        document.getElementById("start-button").innerText = "RESET";
        return gameStart();
    }
}

document.getElementById("continue-game").onclick = function() {
    if (typeof fallbackFunction[0] === "function") {
        events.usedContinue = true;
        continueCount += 1;
        document.getElementById("player-answer").classList.remove("hidden");
        document.getElementById("answer-button").classList.remove("hidden");
        document.getElementById("messages").innerHTML = "";
        document.getElementById("messages").classList.remove("hidden");
        document.getElementById("answer-button").classList.remove("no-use");
        return fallbackFunction[0]();
    }
    else if (typeof continuePoint[0] === "function") {
        events.usedContinue = true;
        continueCount += 1;
        document.getElementById("player-answer").classList.remove("hidden");
        document.getElementById("answer-button").classList.remove("hidden");
        document.getElementById("messages").innerHTML = "";
        document.getElementById("messages").classList.remove("hidden");
        document.getElementById("answer-button").classList.remove("no-use");
        return continuePoint[0]();
    } else {
        gameStart();
    }
}


function onSpeedChange(event) {
    const selectedValue = event.target.value;
    if (selectedValue === "normal") {
        textSpeed[0] = 60;
    }
    if (selectedValue === "faster") {
        textSpeed[0] = 35;
    }
    if (selectedValue === "fastest") {
        textSpeed[0] = 15;
    }
  }

const speedMenu = document.getElementById('nav-speed');
speedMenu.addEventListener('change', onSpeedChange);

document.getElementById("nav-reset").onclick = function() {
    document.getElementById("game-text").innerHTML = "";
    document.getElementById("messages").innerHTML = "";
    document.getElementById("messages").classList.add("hidden");
    return gameStart();
}

document.getElementById("copy-button").onclick = function() {
    copyResult();
}

function copyResult() {
    let copyText = document.getElementById("copy-achievements");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    function resetCopyButtonText() {
        document.getElementById("copy-button").innerText = "COPY YOUR STATS";
    }

    document.getElementById("copy-button").innerText = "COPIED 📋";
    setTimeout(resetCopyButtonText, 3000);
}

function createStr() {
    createAttr[0] = document.getElementById("player-answer").value;
    startFunction = [createStrAnswer, "Choose value for Strength:"];
    defaultStart();
}

function createStrAnswer() {
    createAttr[0] = document.getElementById("player-answer").value;
    if (createAttr[0] === "end") {
        createAttr[0] = 1;
        end();
    } else if (isNaN(createAttr[0])) {
        createAttr[0] = 1;
        startFunction[0] = setTimeout(createStr, 1500);
        startFunction[1] = "Please enter a number.";
        defaultStart();
    } else {
        if (createAttr[0] >= 1 && createAttr[0] <= createAttr[4] - createAttr[1] - createAttr[2] - createAttr[3]) {
            character.strength = createAttr[0];
            showText = ["* Strength: " + createAttr[0], defaultStart];
            startFunction[0] = createDexAnswer;
            startFunction[1] = "Choose value for Dexterity:";
            show();
        } else {
            createAttr[0] = 1;
            startFunction[0] = setTimeout(createStr, 1500);
            startFunction[1] = "Too low or high number, try again. (Should be between " + createAttr[0] + " and " + (createAttr[4] - (createAttr[1] + createAttr[2] + createAttr[3])) + ")";
            defaultStart();
            //show();
        }
    }
}

function createDex() {
    createAttr[1] = document.getElementById("player-answer").value;
    startFunction = [createDexAnswer, "Choose value for Dexterity:"];
    defaultStart();
}

function createDexAnswer() {
    createAttr[1] = document.getElementById("player-answer").value;
    if (createAttr[1] === "end") {
        createAttr[1] = 1;
        end();
    } else if (isNaN(createAttr[1])) {
        createAttr[1] = 1;
        startFunction[0] = setTimeout(createDex, 1500);
        startFunction[1] = "Please enter a number.";
        defaultStart();
    } else {
        if (createAttr[1] >= 1 && createAttr[1] <= createAttr[4] - createAttr[0] - createAttr[2] - createAttr[3]) {
            character.dexterity = createAttr[1];
            showText = ["* Dexterity: " + createAttr[1], defaultStart];
            startFunction[0] = createIntAnswer;
            startFunction[1] = "Choose value for Intelligence:";
            show();
        } else {
            createAttr[1] = 1;
            startFunction = [setTimeout(createDex, 1500), "Too low or high number, try again. (Should be between " + createAttr[1] + " and " + (createAttr[4] - createAttr[0] - createAttr[2] - createAttr[3]) + ")"];
            defaultStart();
        }
    }
}

function createInt() {
    createAttr[2] = document.getElementById("player-answer").value;
    startFunction = [createIntAnswer, "Choose value for Intelligence:"];
    defaultStart();
}

function createIntAnswer() {
    createAttr[2] = document.getElementById("player-answer").value;
    if (createAttr[2] === "end") {
        createAttr[2] = 1;
        end();
    } else if (isNaN(createAttr[2])) {
        createAttr[2] = 1;
        startFunction[0] = setTimeout(createInt, 1500);
        startFunction[1] = "Please enter a number.";
        defaultStart();
    } else {
        if (createAttr[2] >= 1 && createAttr[2] <= createAttr[4] - createAttr[0] - createAttr[1] - createAttr[3]) {
            character.intelligence = createAttr[2];
            createAttr[3] = createAttr[4] - createAttr[0] - createAttr[1] - createAttr[2];
            character.charisma = createAttr[3];
            startFunction[0] = createSpecialMove;
            startFunction[1] = "Special move:";
            showText.push("* Intelligence: " + createAttr[2], "* Charisma: " + createAttr[3], "What's the name of your special move?", defaultStart);
            show();
        } else {
            createAttr[2] = 1;
            startFunction = [setTimeout(createInt, 1500), "Too low or high number, try again. (Should be between " + createAttr[2] + " and " + (createAttr[4] - createAttr[0] - createAttr[1] - createAttr[3]) + ")"];
            defaultStart();
        }
    }
}

function createSpecialMove() {
    character.specialMove = document.getElementById("player-answer").value;
    (character.specialMove !== null ? character.specialMove = character.specialMove.charAt(0).toUpperCase() + character.specialMove.slice(1) : end());
    character.specialMoveCount = 1;
    createSpecialMoveLine();
    charChosen();
}

function createSpecialMoveLine() {
   // let upperCaseSpecialMove = character.specialMove.toUpperCase();
    character.specialMoveLine = randomSpecialText[Math.floor(Math.random() * randomSpecialText.length)] + randomSpecialAdjective[Math.floor(Math.random() * randomSpecialAdjective.length)] + " " + character.specialMove.toUpperCase() + "!";
}

function end() {
    document.getElementById("player-answer").classList.add("hidden");
    document.getElementById("answer-button").classList.add("hidden");
    document.getElementById("continue-game").classList.remove("hidden");
    document.getElementById("messages").innerHTML = "You ended the game. Press Continue to go on, or Reset for a new game.";
    showText[0] = "GAME OVER";
    show();
}

function specialUse() {
    character.specialMoveCount -= 1;
    (events.usedSpecial = true ? events.moreThanOneSpecial = true : events.usedSpecial = true);
    showText = [character.specialMoveLine];
    show();
}

function gameOver() {
    showText = ["You met your end " + deathBy, "GAME OVER"];
    show();
    document.getElementById("player-answer").classList.add("hidden");
    document.getElementById("answer-button").classList.add("hidden");
    document.getElementById("messages").classList.add("hidden");
    document.getElementById("continue-game").classList.remove("hidden");
    document.getElementById("messages").innerHTML = "";
}

function removeLastChild() {
    let section = document.getElementById("messages");
    let lastChild = section.lastElementChild;
    lastChild.remove();
}

function show() {
    document.getElementById("answer-button").classList.add("no-use");
    document.getElementById("player-answer").value = "";
    if (showTextCount[0] < showText[0].length) {
        document.getElementById("game-text").innerHTML += showText[0].charAt(showTextCount[0]);
            showTextCount[0]++;
            setTimeout(show, textSpeed);
            document.getElementById("game-text").scrollTop += 100;
    } else {
        if (typeof showText[0] === 'function') {
            document.getElementById("answer-button").classList.remove("no-use");
            return showText[0]();
        }
        else if (showTextCount[0] === 0 && showText.length === 1) {
            document.getElementById("answer-button").classList.remove("no-use");
            showText[0] = "";
        } else {
            showTextCount[0] = 0;
            document.getElementById("game-text").innerHTML += "<br><br>";
            document.getElementById("game-text").scrollTop += 100;
            document.getElementById("answer-button").classList.remove("no-use");
            if (showText.length === 1) {
                showText[0] = "";
            } else {
                document.getElementById("answer-button").classList.remove("no-use");
                showText.shift();
                show();
            }
        }
    }
}
let continuePoint = [gameStart];
function chapter(setContinue) {
    continuePoint[0] = setContinue;
    fallbackFunction[0] = setContinue;
    chapters[0] += 1;
    showText = ["CHAPTER " + chapters[0] + ":", chapterTitle, LINE]
    show();
}

let startFunction = [
    "button function", 
    "message"
];

const inputField = document.getElementById("player-answer");
const button = document.getElementById("answer-button");
inputField.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      button.click();
    }
});
  
function defaultStart() {
    showText = [""];
    document.getElementById("messages").innerHTML = startFunction[1];
    document.getElementById("answer-button").onclick = function() {
        startFunction[0]();
    };
    document.getElementById("answer-button").classList.remove("no-use");
}

function gameStart() {
    createAttr = [1, 1, 1, 1, 10];
    Object.keys(events).forEach(key => {
        events[key] = false;
    });
    riddleClues = 0;
  	treasureBonus = 0;
    showTextCount[0] = 0;
    chapterTitle = "";
    chapters = [0];
    character.specialMoveCount = 1;
    continueCount = 0;
    startFunction = [openMessageAndAnswer];
    document.getElementById("player-answer").value = "";
    document.getElementById("title").classList.add("hidden");
    document.getElementById("copy-button").classList.add("hidden");

    function titleDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
          dd='0'+dd;
        } 
        if(mm<10) 
        {
          mm='0'+mm;
        } 
        today = yyyy+'-'+mm+'-'+dd;
    
        
        copyTextArea.innerHTML = "Labyrinth Game" + "&#13;&#10;" + today + "&#13;&#10;" + "&#13;&#10;";
        }
    titleDate();

    document.getElementById("game-text").classList.remove("hidden");
    document.getElementById("start-button").classList.add("no-use");
    //document.getElementById("nav-reset").classList.remove("hidden");
    document.getElementById("nav-title").classList.remove("hidden");
    chapterTitle = "The Labyrinth";
    chapter(gameStart);
    showText.push(
        "You stand before the entrance of a mysterious labyrinth, filled with danger - but also hidden treasures...", 
        "CHOOSE YOUR ADVENTURER:", 
        LINE, 
        wizard[4] + ":",
        wizard[9],
        rogue[4] + ":",
        rogue[9],
        bard[4] + ":",
        bard[9],
        barbarian[4] + ":",
        barbarian[9],
        openMessageAndAnswer
    );
}   

function openMessageAndAnswer() {
    document.getElementById("messages").classList.remove("hidden");
    document.getElementById("answers").classList.remove("hidden");
    document.getElementById("player-answer").classList.remove("hidden");
    document.getElementById("answer-button").classList.remove("hidden");
    document.getElementById("answer-button").classList.remove("no-use");
    document.getElementById("start-button").classList.remove("no-use");
    document.getElementById("instruction").classList.add("hidden");
    document.getElementById("messages").innerHTML = "Choose a character from the list:<br>'Wizard', 'Rogue', 'Bard' or 'Barbarian'.<br><br>You can also write 'create' to make your own character or 'random' to generate a unique one.";
}

document.getElementById("answer-button").onclick = function() {
    chooseChar();
}

function chooseChar() {
    let chooseCharacter = document.getElementById("player-answer").value;
    (chooseCharacter !== null ? chooseCharacter = chooseCharacter.toLowerCase() : chooseCharacter = null);
    let concatArray = [];

    if (chooseCharacter === "wizard" || chooseCharacter === "the wizard") {
        const chosenCharacter = concatArray.concat(wizard);
        assignCharValues(chosenCharacter);
    } 
    else if (chooseCharacter === "rogue" || chooseCharacter === "the rogue") {
        const chosenCharacter = concatArray.concat(rogue);
        assignCharValues(chosenCharacter);
    } 
    else if (chooseCharacter === "bard" || chooseCharacter === "the bard") {
        const chosenCharacter = concatArray.concat(bard);
        assignCharValues(chosenCharacter);
    } 
    else if (chooseCharacter === "barbarian" || chooseCharacter === "the barbarian") {
        const chosenCharacter = concatArray.concat(barbarian);
        assignCharValues(chosenCharacter);
    } 
    else if (chooseCharacter === "special") {
        const chosenCharacter = concatArray.concat(hero);
        assignCharValues(chosenCharacter);
    } 
    else if (chooseCharacter === "create") {
        function createYourOwnCharacter() {
            startFunction[0] = createAttributes;
            startFunction[1] = "Choose your name:";
            showText[0] = LINE
            showText[1] = "CREATE YOUR OWN CHARACTER";
            showText[2] = "Start with your name.";
            showText[3] = defaultStart;
            show();
            
            function createAttributes() {
                character.name = document.getElementById("player-answer").value;
                showText[0] = "Name: " + character.name;
                showText[1] = LINE;
                showText[2] = "You have " + createAttr[4] + " points for your four attributes";
                showText[3] = "* Strength";
                showText[4] = "* Dexterity";
                showText[5] = "* Intelligence";
                showText[6] = "* Charisma";
                showText[7] = "Each attribute must be at least " + createAttr[0] + ".";
                showText[8] = defaultStart;
                show();
                startFunction[0] = createStrAnswer;
                startFunction[1] = "Choose value for Strength:";
            };
        };
        return createYourOwnCharacter();
    } 
    else if (chooseCharacter === "random") {
        randomCharacter();
    } 
    else if (chooseCharacter === "end" || chooseCharacter === null) {
        end();
    } else {
        document.getElementById("messages").innerHTML += "<p>" + CHECK_SPELLING + "</p>"
        document.getElementById("player-answer").value = "";
        return setTimeout(removeLastChild, 5000);
    }
}
    
function assignCharValues(chosenCharacter) {
    character.strength = chosenCharacter[0];
    character.dexterity = chosenCharacter[1];
    character.intelligence = chosenCharacter[2];
    character.charisma = chosenCharacter[3];
    character.name = chosenCharacter[4];
    character.specialMove = chosenCharacter[5];
    character.specialMoveLine = chosenCharacter[6];
    character.specialMoveCount = chosenCharacter[7];
    character.chosenQuote = chosenCharacter[8];
    character.selectQuote = chosenCharacter[9];
    charChosen();
}

function randomCharacter() {
    createAttr = [1, 1, 1, 1, 10];
    character.name = createCharNameFirst[Math.floor(Math.random() * createCharNameFirst.length)] + " " + createCharNameSecond[Math.floor(Math.random() * createCharNameSecond.length)];
    character.random = "yes";
    createAttr[0] = createAttr[0] + (Math.floor(Math.random() * (createAttr[4] - createAttr[1] - createAttr[2] - createAttr[3])));
    createAttr[1] = createAttr[1] + (Math.floor(Math.random() * (createAttr[4] - createAttr[0] - createAttr[2] - createAttr[3])));
    createAttr[2] = createAttr[2] + (Math.floor(Math.random() * (createAttr[4] - createAttr[0] - createAttr[1] - createAttr[3])));
    createAttr[3] = createAttr[4] - createAttr[0] - createAttr[1] - createAttr[2];
    createAttr.pop();

    function shuffleArray(createAttr) {
        createAttr.sort(() => Math.random() - 0.5);
    }

    shuffleArray(createAttr);
    character.strength = createAttr[0];
    character.dexterity = createAttr[1];
    character.intelligence = createAttr[2];
    character.charisma = createAttr[3];
    character.specialMoveCount = 1;
    character.specialMove = randomSpecial[Math.floor(Math.random() * randomSpecial.length)];
    createSpecialMoveLine();
    startFunction = [charChosen, "Ready to start, 'yes' or 'no'?<br>'No' will generate a new character."];
    showText = [
        LINE,
        character.name,
        "* Strength: " + character.strength,
        "* Dexterity: " + character.dexterity,
        "* Intelligence: " + character.intelligence,
        "* Charisma: " + character.charisma,
        "* Special move: " + character.specialMove,
        character.chosenQuote,
        defaultStart,
        ];
        show();

}

function charChosen() {
    if (character.random === "yes") {
        randomStartOver = document.getElementById("player-answer").value;
        (randomStartOver !== null ? randomStartOver = randomStartOver.toLowerCase() : randomStartOver = null);
        if (randomStartOver === "no") {
            randomCharacter();
        } else if (randomStartOver === "end") {
            end();
        } else {
            enter();
        }
    } else {
        showText = [
        LINE,
        character.name,
        "* Strength: " + character.strength,
        "* Dexterity: " + character.dexterity,
        "* Intelligence: " + character.intelligence,
        "* Charisma: " + character.charisma,
        "* Special move: " + character.specialMove,
        character.chosenQuote,
        LINE,
        enter
        ];
        show();
    } 
}  

function charChosenStats() {
    showText = [
        LINE,
        character.name,
        "* Strength: " + character.strength,
        "* Dexterity: " + character.dexterity,
        "* Intelligence: " + character.intelligence,
        "* Charisma: " + character.charisma,
        "* Special move: " + character.specialMove,
        "* Special moves left: " + character.specialMoveCount,
        LINE
    ];
    show(); 
}

function defaultElse() {
    if (fallbackFunction[1] === "special") {
        if (character.specialMoveCount > 0) {
            character.specialMoveCount -= 1;
            (events.usedSpecial === true ? events.moreThanOneSpecial = true : events.usedSpecial = true);
            showText[0] = character.specialMoveLine;
            showText[1] = fallbackFunction[2];
            showText[2] = fallbackFunction[3];
            show();
            if (fallbackFunction[4] === "newPathMade") {
                events.newPathMade = true;
            } else if (fallbackFunction[4] === "secondChestOpened") {
                events.secondChestOpened = true;
            } else if (fallbackFunction[4] === "chestOpened") {
                events.chestOpened = true;
            } else if (fallbackFunction[4] === "chooseChest") {
                chooseChest();
            } else if (fallbackFunction[4] === "hallwayTrap") {
                events.triggeredTrap = true;
            } else if (fallbackFunction[4] === "killGoblin") {
                events.killGoblin = true;
            } else if (fallbackFunction[4] === "killWarlock") {
                events.killWarlock = true;
            } else if (fallbackFunction[4] === "killMinotaur") {
                events.killMinotaur = true;
            } else if (fallbackFunction[4] === "glaive") {
                character.strength += 2;
                character.dexterity += 2;
                character.charisma += 2;
                treasureBonus += 2;
            }
        } else {
            showText[0] = NO_MOVES_LEFT;
            showText[1] = fallbackFunction[0];
            show();
        }
    } else if (fallbackFunction[1] === "end" || fallbackFunction[1] === null) {
        end();
    }
    else if (fallbackFunction[1] === "stats") {
        charChosenStats();
    } else {
        events.typingError = true;
        fallbackFunction[0]();
        document.getElementById("messages").innerHTML += "<p>" + CHECK_SPELLING + "</p>"
        document.getElementById("player-answer").value = "";
        return setTimeout(removeLastChild, 5000);
    }
}

function enter() {
    startFunction[0] = enterAnswer;
    startFunction[1] = "Do you want to enter the labyrinth, yes or no?";
    defaultStart();
}

function enterAnswer() {
    startFunction[0] = enter;
    startFunction[1] = "Choose your path: 'Left' or 'right'";
	let charEnter = document.getElementById("player-answer").value;
    (charEnter !== null ? charEnter = charEnter.toLowerCase() : charEnter = null);
    if (charEnter === "yes") {
        document.getElementById("player-answer").value = "";
        startFunction[0] = choosePathAnswer;
        startFunction[1] = "Choose your path: 'Left' or 'right'";
        chapterTitle = "No Way Back";
        chapter(choosePath);
        showText[3] = "With a torch in your hand, you enter the cavernous opening into the labyrinth. Who knows what horrors might dwell inside the dark...";
        showText[4] = "As you go on in through a narrow tunnel you suddenly hear a loud noise behind you. An ornate iron gate is blocking the opening - you're trapped! You can only continue forward into the labyrinth."
        showText[5] = "The path splits into two. Which way do you take, left or right?";
        showText[6] = defaultStart;
        show();
    } else if (charEnter === "no") {
        deathBy = "at old age, surrounded by friends and family. Your last words were 'Thank goodness I never went into that dreadful labyrinth.'"
        gameOver();
    } else {
        fallbackFunction[0] = enter;
        fallbackFunction[1] = charEnter;
        fallbackFunction[2] = "Too bad no one was around to witness this!";
        fallbackFunction[3] = enter;
        defaultElse();
    }
}

function choosePath() {
    startFunction[0] = choosePathAnswer;
    startFunction[1] = "Choose your path: 'Left' or 'right'";
    defaultStart();
}

function choosePathAnswer() {
    document.getElementById("messages").innerText = "Choose your path: 'Left' or 'right'";
    let path = document.getElementById("player-answer").value;
    (path !== null ? path = path.toLowerCase() : path = null);
    if (path === "left") {
        leftPath();
    } else if (path === "right") {
        rightPath();
    } else {
        fallbackFunction[0] = choosePath;
        fallbackFunction[1] = path;
        fallbackFunction[2] = "You've created a new opening in the wall, straight into the labyrinth. Cautiously, you continue onward.";
        fallbackFunction[3] = hallwayStart;
        fallbackFunction[4] = "newPathMade";
        defaultElse();
    }
}

function leftPath() {
    chapterTitle = "A Brush with Death";
    chapter(leftPath);
    startFunction = [leftPathAnswer, "Choose: 'Fight', 'Flee' or 'Talk'."]
    showText.push("You walk down a curved and narrow path. The low ceiling almost hits your head.", "As you make a sharp turn you hear something rustling in the dark.", "Suddenly - a hostile goblin appears! It's holding a crooked knife and seems eager to use it.", "Do you want to fight, flee or talk?", defaultStart);
    show();
}

function leftPathAnswer() {
    let goblinEncounter = document.getElementById("player-answer").value;
    (goblinEncounter !== null ? goblinEncounter = goblinEncounter.toLowerCase() : goblinEncounter = null);
    if (goblinEncounter === "fight") {
        goblinFight();
    } else if (goblinEncounter === "flee") {
        if (character.dexterity > goblin[1]) {
            showText = ["You try to run back through the labyrinth...", "...and lose the wily goblin. Phew!", "You once again stand where the path splits into two. Which way do you take, left or right?", choosePath];
            show();
        } else {
            deathBy = "in a dark tunnel, with a crooked knife buried deep n your back."
            showText = ["You try to run back through the labyrinth...", "...unsuccessfully."];
            gameOver();
        }
    } else if (goblinEncounter === "talk") {
        if (character.charisma > goblin[2]) {
            showText = ["You try to talk to the goblin and persuade it to let you pass unharmed in exchange for some of the treasure you are sure to find inside the labyrinth...", "...and the greedy goblin agrees! He let's you go on in without any trouble.", hallwayStart];
            show();
        } else {
            showText = ["You try to talk to the goblin and persuade it to let you pass unharmed in exchange for some of the treasure you are sure to find inside the labyrinth...", "...but the goblin doesn't want to hear it and attacks!", goblinFight];
            show();
        }
    } else {
        fallbackFunction[0] = leftPath;
        fallbackFunction[1] = goblinEncounter;
        fallbackFunction[2] = "The goblin is very dead.";
        fallbackFunction[3] = hallwayStart;
        fallbackFunction[4] = "killGoblin";
        defaultElse();
    }
}

function goblinFight() {
    showText[0] = "You fight the goblin...";
    showText[1] = goblinFightOutcome;
    show();
}

function goblinFightOutcome() {
    if (character.strength > goblin[0]) {
        events.killGoblin = true;
        showText[0] = "...and WIN! Huzza!";
        showText[1] = "You leave the body behind you and take a turn around a corner.";
        showText[2] = hallwayStart;
        show();
    } else {
        deathBy = "at the hand of a lowly goblin.";
        showText[0] = "...unsuccessfully.";
        showText[1] = gameOver;
        show();
    }
}

function rightPath() {
    chapterTitle = "An Unexpected Windfall";
    chapter(rightPath);
    startFunction = [rightPathAnswer, "What do you do? 'Go', 'search' or 'leave'?"];
    showText.push("You enter a dusty old room. You have trouble seeing what's inside this dark and cursed chamber. What do you do?", "Go on into the darkness, stop and search around or leave?", defaultStart);
    show();
}

function rightPathAnswer() {
    let roomChoice = document.getElementById("player-answer").value;
    (roomChoice !== null ? roomChoice = roomChoice.toLowerCase() : roomChoice = null);
    if (roomChoice === "search") {
        if (character.intelligence > 1) {
            startFunction = [rightPathAnswerOpenChest, "Look? 'Yes' or 'no'?"];
            showText = ["You search the room to the best of your ability...","...and find something. It looks like a large, old chest.", "Do you want to take a closer look?", defaultStart];
            show();      
        } else {
            showText = ["...but find absolutely nothing. Dissatisfied you leave the room in a hurry.", "You once again stand where the path splits into two. Which way do you take, left or right?", choosePath];
            show();
        }
    } else if (roomChoice === "go") {
        showText = ["You walk into the darkness. With the help of your torch you see that it's not possible to continue further. As you reach the wall you hit your foot on something heavy.", "You feel the floor starting to collapse in front of you! You need to grab on to something or you'll fall down into the pitchblack darkness...", fallingGrab];
        show();
    } else if (roomChoice === "leave") {
        showText = ["You leave the room and go back from where you came.", "You once again stand where the path splits into two. Which way do you take, left or right?", choosePath];
    document.getElementById("messages").innerHTML = "'Left' or 'right'?"
        show();
    } else {
        fallbackFunction[0] = rightPath;
        fallbackFunction[1] = roomChoice;
        fallbackFunction[2] = "The room is totally wrecked. You see a now broken old chest. You look inside.";
        fallbackFunction[3] = chooseChest;
        fallbackFunction[4] = "chestOpened";
        defaultElse();
    }
}

function randomChestOpen() {
    if (events.chestOpened === true) {
        showText = ["It's epmpty and has a hole in the bottom. You leave the room.", "You once again stand where the path splits into two. Which way do you take, left or right?", choosePath];
        show();
    } else {
        showText = ["As you carefully pry the chest open from a distance and peek inside and are astounded - It's filled with treasure!", randomChest];
        show();
    }
}

function fallingGrab() {
    startFunction = [fallingGrabAnswer, "'Grab' or 'fall'?"];
    defaultStart();
}

function fallingGrabAnswer() {
    let roomFall = document.getElementById("player-answer").value;
    let fallSuccess = "You manage to get back up from the gaping hole in the floor!\n\nYou get out of the room as fast as you can.";
    (roomFall !== null ? roomFall = roomFall.toLowerCase() : roomFall = null);
    if (roomFall === "grab") {
        if (character.dexterity > 3) {
            showText = [fallSuccess, "You once again stand where the path splits into two. Which way do you take, left or right?", choosePath];
            show();
        } else {
            showText = ["You're too slow and tumble down the hole!", gameOver];
            deathBy = "at the rock hard bottom of the dungeon floor after a terrible fall."
            show();
        }
    } else if (roomFall === "fall") {
        showText = ["You let go and tumble down into the depths of the unknown.", gameOver];
        deathBy = "at your own hand by dropping down onto the rock hard bottom of a dungeon floor."
        show();
    } else {
        fallbackFunction[0] = fallingGrab;
        fallbackFunction[1] = roomFall;
        fallbackFunction[2] = fallSuccess;
        fallbackFunction[3] = choosePath;
        fallbackFunction[4] = "chestOpened";
        defaultElse();
    }
}

function grabEnd() {
    events.chestOpened = true;
    showText = ["You think to yourself that surely there must be more treasure in here somewhere.", "You once again stand where the path splits into two. Which way do you take, left or right?", choosePath];
    show();
}

function randomChest() {
    showText = [TREASURE_CHEST_ITEMS_TEXT, treasureChestEffects[Math.floor(Math.random() * treasureChestEffects.length)]];
    show();
}

function chestSword() {
    character.strength += 1;
    treasureBonus += 1;
    showText = [TREASURE_CHEST[0] + "! You leave the room with a new sense of power.", grabEnd];
    show();
}

function chestCap() {
    character.intelligence += 1;
    treasureBonus += 1;
    showText = [TREASURE_CHEST[1] + "! You carefully put it on your head. You leave the room with clear thoughts.", grabEnd];
    show();
}
function chestBoots() {
    character.dexterity += 1;
    treasureBonus += 1;
    showText = [TREASURE_CHEST[2] + "! You put them on and leave the room with renewed speed.", grabEnd];
    show();
}
function chestMakeup() {
    character.charisma += 1;
    treasureBonus += 1;
    showText = [TREASURE_CHEST[3] + "! You leave the room looking better than ever.", grabEnd];
    show();
}
function chestElixir() {
    character.specialMoveCount += 1;
    showText = [TREASURE_CHEST[4] +"! You drink it and leave the room feeling extra special.", grabEnd];
    show();
}
function chestCider() {
    events.drinkingCider = true;
    character.strength -= 1;
    character.dexterity -= 1;
    character.intelligence -= 1;
    character.charisma -= 1;
    showText = [TREASURE_CHEST[5] + "! You pop the cork and drink all of it. As refreshing as it tasted, you leave the room feeling quite woozy.", grabEnd];
    show();
}
function chooseChest() {
    showText = ["It's filled with treasure! Your spirit is lifted while you glance at all the rare items it contains:", chooseChestItems];
    show();
}
function chooseChestItems() {
    startFunction = [chooseChestAnswer, "'Yes' or 'no'?"];
    showText = [
        TREASURE_CHEST[0],
        TREASURE_CHEST[1],
        TREASURE_CHEST[2],
        TREASURE_CHEST[3],
        TREASURE_CHEST[4],
        TREASURE_CHEST[5],
    ];
    showText.push("Do you want to take something from the chest?", defaultStart);
    show();
}
function chooseChestAnswer() {
    let chooseChestTake = document.getElementById("player-answer").value;
    (chooseChestTake !== null ? chooseChestTake = chooseChestTake.toLowerCase() : chooseChestTake = null);
    if (chooseChestTake === "yes") {
        startFunction = [chooseChestGrabItem, "What will you grab?<br>'Sword', 'cap', 'boots', 'makeup', 'elixir' or 'cider'?"];
        showText = [TREASURE_CHEST_ITEMS_TEXT, "Which will it be? The Sword, cap, boots, makeup, elixir or cider?", defaultStart];
        show();
    }
    else if (chooseChestTake === "no") {
        showText = ["You hesitate for a moment and all the glittering contents of the chest falls down through a hole underneath.", "You leave the room empty handed.", grabEnd];
        show();
    } else {
        defaultElse();
    }
}

function chooseChestGrabItem() {
    let grabItem = document.getElementById("player-answer").value;
    (grabItem !== null ? grabItem = grabItem.toLowerCase() : grabItem = null);
    switch (grabItem) {
        case "sword":
            treasureChestEffects[0]();
            break;
        case "cap":
            treasureChestEffects[1]();
            break;
        case "boots":
            treasureChestEffects[2]();
            break;
        case "makeup":
            treasureChestEffects[3]();
            break;
        case "elixir":
            treasureChestEffects[4]();
            break;
        case "cider":
            treasureChestEffects[5]();
            break;
        case "end":
            end();
            break;
        case "special":
            if (character.specialMoveCount > 0) {
                specialUse();
                showText = ["You didn't manage to grab any items. You leave the room empty handed.", grabEnd];
                show();
            } else {
                showText = [NO_MOVES_LEFT, chooseChest];
                show();
            };
            break;
        default:
            events.typingError = true;
            showText = [CHECK_SPELLING, chooseChest];
            show();
    }
}

function rightPathAnswerOpenChest() {
    let openChest = document.getElementById("player-answer").value;
    (openChest !== null ? openChest = openChest.toLowerCase() : openChest = null);
    if (openChest === "yes") {
        randomChestOpen();
    } else if (openChest === "no") {
        showText = ["You leave the suspicous chest alone and exit the room.", "You once again stand where the path splits into two. Which way do you take, left or right?", choosePath];
        show();
    } else {
        fallbackFunction[0] = rightPath;
        fallbackFunction[1] = openChest;
        fallbackFunction[2] = "The chest breaks open.";
        fallbackFunction[3] = chooseChest;
        fallbackFunction[4] = "chooseChest";
        defaultElse();
    }
}

function hallwayStart() {
    startFunction = [hallwayStartAnswer, "Do you continue forward? 'Yes' to go on, 'no' to go back."];
    chapterTitle = "The Hallway"
    chapter(hallwayStart);
    showText.push("You delve deeper into the winding tunnels and come across a long hallway. Do you continue forward?", defaultStart);
    show();
}

function hallwayStartAnswer() {
    let hallwayGoOn = document.getElementById("player-answer").value;
    (hallwayGoOn !== null ? hallwayGoOn = hallwayGoOn.toLowerCase() : hallwayGoOn = null);
    if (hallwayGoOn === "yes") {
        showText = ["You go on.", riddleWarlock];
        show();
    } else if (hallwayGoOn === "no") {
        showText = ["You go back.", hallwayTrap];
        show();
    } else {
        fallbackFunction[0] = hallwayStart;
        fallbackFunction[1] = hallwayGoOn;
        fallbackFunction[2] = "All the commotion reveals a hidden trap behind you.";
        fallbackFunction[3] = riddleWarlock;
        fallbackFunction[4] = "hallwayTrap";
        defaultElse();
    }
}

function hallwayTrap() {
    chapterTitle ="Heads up";
    chapter();
    events.triggeredTrap = true;
    startFunction = [hallwayTrapAnswer, "'Jump' Jump out of the way.\n'Grab' Grab the spears before they hit you."];
    showText.push("While heading back through the dark tunnel you suddenly feel the walls rumble. You've triggered a trap! Spears plummet from the stone ceiling above your head. Can you avoid them in time?", defaultStart);
    show();
}

function hallwayTrapAnswer() {
    spearTrap = document.getElementById("player-answer").value;
    (spearTrap !== null ? spearTrap = spearTrap.toLowerCase() : spearTrap = null);
    if (spearTrap === "jump") {
        if (character.dexterity > 2) {
            showText = ["You manage to jump out of the way of the spears, escaping a certain death. The trap blocks your exit. Only one way to go now...", riddleWarlock];
            show();
        } else {
            function spearTrapDeath() {
                deathBy = "impaled by a devious spear trap.";
                showText = ["You are too slow and unable to escape the spears", gameOver];
                show();
            }
            spearTrapDeath();
        }
    } 
    else if (spearTrap === "grab") {
        if (character.strength > 3) {
            showText = ["Somehow you manage to catch and hold the spears of the trap, keeping them from impaling you. With this feat of strength you're able to escape the trap with your life, but as you release the trap it closes and seals off your path back. Only one way to go now...", riddleWarlock];
            show();
        } else {
            spearTrapDeath();
        }
    } else {
        fallbackFunction[0] = hallwayTrap;
        fallbackFunction[1] = spearTrap;
        fallbackFunction[2] = "You break the spears and the trap falls down with pieces of the wall and blocks your way, but you survived. Only one way to go now...";
        fallbackFunction[3] = riddleWarlock;
        fallbackFunction[4] = "hallwayTrap";
        defaultElse();
    }
}

function riddleWarlock() {
    startFunction = [riddleWarlockAnswer, "How do you approach the shadowy figures? 'Attack' Go in swinging. 'Sneak' Approach as carefully as possible. 'Talk' Make yourself known and strike up a conversation."]
    showText = ["The hallway keeps on going and for a while you feel like it will never end. Finally you see some dim light up ahead and you make out two shadowy figures. How do you approach?", defaultStart];
    show();
}

function riddleWarlockAnswer() {    
    let warlockAppproach = document.getElementById("player-answer").value;
    (warlockAppproach !== null ? warlockAppproach = warlockAppproach.toLowerCase() : warlockAppproach = null);
    if (warlockAppproach === "attack") {
        if (character.strength > 4) {
            events.killWarlock = true;
            showText = ["You let out a warcry and attack! You strike with all your might towards the larger of the two figures - it looks like a massive golem. Hitting it's body feels like cutting into a living wall...", "...but you crack the the rock hard, slightly human shaped body and it silently crumbles over the smaller person next to it, who lets out a shriek. All that remain now is a large pile of rubble.", afterHallway];
            show();
        } else {
            deathBy = "burned to a crisp by a magic fireball while fighing a golem.";
            showText = ["You let out a warcry and attack! You strike with all your might towards the larger of the two figures - it looks like a massive golem. Hitting it's body feels like cutting into a living wall...", "...and your surprise attack isn't enough to slay this stoic stone golem. The cloaked figure next to him utters words your mind can't process and suddenly your body is enveloped in flames.", gameOver];
            show();
        }
    } 
    else if (warlockAppproach === "sneak") {
        if (character.dexterity > 3) {
            riddleClues += 1;
            showText = ["You sneak very close without being seen and make out a large, blocky figure next a smaller one, who seems to be draped in cloaks and holding a crooked staff. He's muttering something about numbers, you try to remember what you hear if it turns out to be important.", riddle];
            show();
        } else {
            showText = ["You try your best to approach without a sound but you are quickly discovered.", riddle];
            show();
        }
    } 
    else if (warlockAppproach === "talk") {
        if (character.charisma > 3) {
            riddleClues += character.charisma - 3;
            showText = ["You call out a greeting and try to strike up a conversation with the mysterious duo in the dark...", "...and the smaller one seems quite chatty and starts to mutter and ramble in a croaking voice. He speaks about numbers and riddles. You don't really understand it but try to keep him talking and remember as much of it as you can. There is also a much larger figure next to him who doesn't utter a word.", riddle];
            show();
        } else {
            showText = ["You call out a greeting and try to strike up a conversation with the mysterious duo in the dark...", "...but you only get a short reply back: 'We've been expecting you ... Come closer!'", riddle];
            show();
        }
    } else {
        fallbackFunction[0] = riddleWarlock;
        fallbackFunction[1] = warlockAppproach;
        fallbackFunction[2] = "You decimate both figures. The larger one, a massive stone golem, is now in pieces. The smaller one looks like a shriveled old man in a cloak - it must've been a devious warlock!\n\nYou step over the remains and go on.";
        fallbackFunction[3] = afterHallway;
        fallbackFunction[4] = "killWarlock";
        defaultElse();
    }
}

function riddle() {
    let randomNumber = Math.floor(Math.random() * 15) + 1;
    let clues = character.intelligence += riddleClues;
    let lowNumber = (randomNumber - (Math.floor(Math.random() * (7 - clues) + 3)));
    let highNumber = (randomNumber + (Math.floor(Math.random() * (7 - clues) + 3)));
    (lowNumber < 0 ? lowNumber = 0 : lowNumber);
    (highNumber <= randomNumber ? highNumber = randomNumber + 1 : highNumber);
    (lowNumber >= randomNumber ? lowNumber = randomNumber - 1 : lowNumber);

    startFunction = [riddleStart, "What's your first guess? (Use a number.)"];
    chapterTitle = "The Warlock's Riddle"
    chapter(riddle);
    showText.push("You reach the end of the hallway and before you looms a huge humanoid stone golem. It looks like a crude statue but you notice the blocky head slowly moving to watch your every move.", "Next to it you find an old man covered in dark robes and chains adorned with runes. He's holding a staff filled with cryptic inscriptions. This must be a devious warlock!", "He speaks with a rough and raspy voice: 'One wants two pass and look four treasure, yes? Hee hee! You have to answer my riddle in guesses three! What number am I thinking of?'", "After careful consideration, you come to a couple of conclusions:", "The number should be higher than " + lowNumber + " and lower than " + highNumber + ".", defaultStart);
    show();

    function riddleStart() {
        let riddleAnswerOne = document.getElementById("player-answer").value;
        (riddleAnswerOne === null ? riddleAnswerOne = "end" : riddleAnswerOne);
        (isNaN(riddleAnswerOne) ? riddleAnswerOne = riddleAnswerOne.toLowerCase() : riddleAnswerOne);
        if (parseInt(riddleAnswerOne) === randomNumber) {
            firstRiddleGuess = true;
            showText =["You answer " + riddleAnswerOne + ".", riddleAnswerCorrect];
            show();
        } 
        else if (parseInt(riddleAnswerOne) < randomNumber) {
            showText = ["You answer " + riddleAnswerOne + ".", "The Warlock: 'Hee hee! WRONG!!! It's higher! HIGHER! One guess gone... What's your next one?'", riddleAnswerOneWrong];
            show();
        } 
        else if (parseInt(riddleAnswerOne) > randomNumber) {
            showText = ["You answer " + riddleAnswerOne + ".", "The Warlock: 'Lower, lower, looooooweeer... Guess again. Heee haaa!'", riddleAnswerOneWrong];
            show();
        } else {
            fallbackFunction[0] = riddleStart;
            fallbackFunction[1] = riddleAnswerOne;
            riddleFallback();
        }
    }

    function riddleFallback() {
        fallbackFunction[2] = "You decimate both of them. The stone golem is now a pile of rubble and and the warlock... well he won't be a problem any longer.\n\nYou step over the remains and go on.";
        fallbackFunction[3] = afterHallway;
        fallbackFunction[4] = "killWarlock";
        defaultElse();
    }

    function riddleAnswerOneWrong() {
        startFunction = [riddleAnswerOneWrongAnswer, "What's your next guess? (Use a number.)"];
        defaultStart();
    }

    function riddleAnswerOneWrongAnswer() {
        let riddleAnswerTwo = document.getElementById("player-answer").value;
        (riddleAnswerTwo === null ? riddleAnswerTwo = "end" : riddleAnswerTwo);
        (isNaN(riddleAnswerTwo) ? riddleAnswerTwo = riddleAnswerTwo.toLowerCase() : riddleAnswerTwo);
        if (parseInt(riddleAnswerTwo) === randomNumber) {
            showText = ["You answer " + riddleAnswerTwo + ".", riddleAnswerCorrect];
            show();
        } else if (parseInt(riddleAnswerTwo) < randomNumber) {
            showText = ["You answer " + riddleAnswerTwo + ".", "The Warlock: 'Ha ha haaaaaaaaa! Wrong AGAIN! The answer is higher! Just one last chance left...'", riddleAnswerTwoWrong];
            show();
        } else if (parseInt(riddleAnswerTwo) > randomNumber) {
            showText = ["You answer " + riddleAnswerTwo + ".", "The Warlock: 'Wrooooong... LOWER LOWER LOWER! Hee hee hee! Almost out of guesses now...'", riddleAnswerTwoWrong];
            show();
        } else {
            fallbackFunction[0] = riddleAnswerOneWrong;
            fallbackFunction[1] = riddleAnswerTwo;
            riddleFallback();
        }
    }

    function riddleAnswerCorrect() {
        showText = ["The Warlock: 'You are correct!? H-how did you ever figure this out? I... guess you can pass.'", "The Warlock looks even more shriveled than before and gestures for you to go on through the opening behind him.", afterHallway];
        show();
    }

    function riddleAnswerTwoWrong() {
        startFunction = [riddleAnswerTwoWrongAnswer, "What's your last guess? (Use a number.)"];
        defaultStart();
    }

    function riddleAnswerTwoWrongAnswer() {
        let riddleAnswerThree = document.getElementById("player-answer").value;
        (riddleAnswerThree === null ? riddleAnswerThree = "end" : riddleAnswerThree);
        (isNaN(riddleAnswerThree) ? riddleAnswerThree = riddleAnswerThree.toLowerCase() : riddleAnswerThree);
        if (riddleAnswerThree === "special" || riddleAnswerThree === "end" || isNaN(riddleAnswerThree)) {
            function riddleAnswerThreeFallback() {
                fallbackFunction[0] = riddleAnswerTwoWrong;
                fallbackFunction[1] = riddleAnswerThree;
                riddleFallback();
            }
            riddleAnswerThreeFallback();
        } else if (parseInt(riddleAnswerThree) === randomNumber) {
            riddleAnswerCorrect();
        } else if (parseInt(riddleAnswerThree) !== randomNumber) {
            deathBy = "burned to a crisp by a fireball."
            showText = ["The Warlock: 'Oh... oh... oh noooo!!! WRONG again! Ha ha heee hee! I'm afraid I can't let you pass... Instead you shall DIEEE!!!'", "The enormous stone golem suddenly takes hold of you and starts to squeeze. The warlock mutters under his breath, points his staff towards you. He summons a huge fireball and sends it your way.", gameOver];
            show();
        } else {
            riddleAnswerThreeFallback();
        }
    }
}

function afterHallway() {
    let minotaur = ["answer"];
    startFunction = [minotaurPrompt, "What do you do? 'Fight', 'Flee', 'search' or 'talk'"];
    chapterTitle ="Bullseye"
    chapter(afterHallway);
    showText.push("You enter a huge, cavernous chamber. Something is glimmering in a corner - gold!", "You've found the treasure! But your joy is shortlived. As you start to fill up your bags with coins and golden trinkets, you notice the sound of hoofs approaching.", "The fearsome minotaur, terror of the labyrinth, has found you!", "What do you do?", defaultStart);
    show();

    function minotaurDeath() {
        deathBy = "at the hands and horns of the horrendous minotaur.";
        gameOver();
    }

    function minotaurEscape() {
        minotaur[0] = document.getElementById("player-answer").value;
        (minotaur[0] !== null ? minotaur[0] = minotaur[0].toLowerCase() : minotaur[0] = null);
        if (minotaur[0] === "fight") {
            if (character.strength > 2) {
                treasureBonus += (character.strength - 3);
                events.killMinotaur = true;
                showText = ["You clash with the minotaur and after a longdrawn fight you stand victorious!", "Exhausted you grab whatever treasure you can carry and head up a staircase.", gameWin];
                show();
            } else {
                showText = ["You clash with the minotaur but despite your best efforts you're no match for the impossibly muscular and violent minotaur.", minotaurDeath];
                show();
            }
        } 
        else if (minotaur[0] === "flee") {
            if (character.dexterity > 2) {
                treasureBonus += (character.dexterity - 3);
                showText = ["You run around the chamber, avoiding the minotaur. Exhausted you finally find a staircase and sprint upwards.", gameWin];
                show();
            } else {
                showText = ["You try to run away with your treasure but get hit in the back by the minotaur's deadly horns.", minotaurDeath];
                show();
            }
        } 
        else if (minotaur[0] === "talk") {
            if (character.charisma > 2) {
                treasureBonus += (character.charisma - 3);
                showText = ["You tell the minotaur you're it's friend and try to calm it like you would a wild animal.", "While you don't seem to get the minotaur to go away you are able to calm it down or confuse it so you slowly can make it up a staircase.", gameWin];
                show();
            } else {
                showText = ["Your attempts are only met with grunts and and roars and you are run over and trampled by the large minotaur.", minotaurDeath];
                show();
            }
        } else {
            fallbackFunction[0] = minotaurEscape;
            fallbackFunction[1] = minotaur[0];
            fallbackFunction[2] = "After an epic fight you slay the minotaur with your signature move! Wounded and exhausted you grab whatever treasure you can carry and head up a staircase.";
            fallbackFunction[3] = gameWin;
          	fallbackFunction[4] = "killMinotaur";
            defaultElse();
        }
    }

    function minotaurPrompt() {
        startFunction = [minotaurPromptAnswer, "What do you do? 'Fight', 'Flee', 'Search' or 'talk'", defaultStart];
    }

    function minotaurPromptAnswer() {
        minotaur[0] = document.getElementById("player-answer").value;
        (minotaur[0] !== null ? minotaur[0] = minotaur[0].toLowerCase() : minotaur[0] = null);
        if (minotaur[0] === "search") {
            if (character.intelligence > 2) {
                startFunction = [minotaurPromptSearch, "Which do you take? 'Sword', 'Boots', Makeup' or 'Cider'."]
                showText = ["Hastily you rummage through the treasure for something that can aid you.", "You find: " + TREASURE_CHEST[0] + ".", TREASURE_CHEST[2] + ".", TREASURE_CHEST[3] + ".", TREASURE_CHEST[5] + ".", "Which do you take?", defaultStart];
                show();
            } else {
                showText = ["You look around you for something useful but before you do the minotaur rushes straight into you, horns first.", minotaurDeath];
                show();
            }
        } 
        else if (minotaur[0] === "fight" || minotaur[0] === "flee" || minotaur[0] === "search" || minotaur[0] === "talk" || minotaur[0] === "special" || minotaur[0] === "end") {
            minotaurEscape();
        } else {
            fallbackFunction[0] = minotaurPrompt;
            fallbackFunction[1] = minotaur[0];
            defaultElse();
        }
    }

    function minotaurPromptSearch() {
        let minotaurItem = document.getElementById("player-answer").value;
        (minotaurItem !== null ? minotaurItem = minotaurItem.toLowerCase() : minotaurItem = null);
        events.secondChestOpened = true;

        if (minotaurItem === "sword") {
            character.strength += 1;
            treasureBonus += 1;
            showText = ["You take the sword in your hand and feel powerful.", "The Minotaur is upon you! What do you do now?", minotaurPromptSearchAnswers];
            show();
        } 
        else if (minotaurItem === "boots") {
            character.dexterity += 1;
            treasureBonus += 1;
            showText = ["You put on the boots and feel all jumpy.", "The Minotaur is upon you! What do you do now?", minotaurPromptSearchAnswers];
            show();
        } 
        else if (minotaurItem === "makeup") {
            character.charisma += 1;
            treasureBonus += 1;
            showText = ["You put on the makeup. You look really good.", "The Minotaur is upon you! What do you do now?", minotaurPromptSearchAnswers];
            show();
        } 
        else if (minotaurItem === "cider") {
            events.drinkingCider = true;
            character.strength -= 1;
            character.dexterity -= 1;
            character.intelligence -= 1;
            character.charisma -= 1;
            showText = ["You take the cider and drink all of it. You feel woozy.", "The Minotaur is upon you! What do you do now?", minotaurPromptSearchAnswers];
            show();
        } else {
            fallbackFunction[0] = minotaurPrompt;
            fallbackFunction[1] = minotaurItem;
            fallbackFunction[2] = "You find the legendary Krull Glaive! You feel filled with epic power.";
            fallbackFunction[3] = minotaurPromptSearchAnswers;
            fallbackFunction[4] = "glaive";
            defaultElse();
        }
    }

    function minotaurPromptSearchAnswers() {
        startFunction = [minotaurEscape, "What do you do now? 'Fight', 'flee', or 'talk'"];
        defaultStart();
    }
}

function gameWin() {
    document.getElementById("player-answer").classList.add("hidden");
    document.getElementById("answer-button").classList.add("hidden");
    document.getElementById("messages").innerHTML = "";
    document.getElementById("messages").classList.add("hidden");
    let treasure = Math.floor(Math.random() * 3 + 1) + treasureBonus;
    (treasure < 0 ? treasure = 1 : treasure);
    chapterTitle = "The End";
    chapter();
    showText.push("Hooray! After a steep climb up a winding staircase you emerge through a hidden exit in a shrubbery. You stand in the brisk morning air and watch the sun paint the landscape in gold.", "You can hardly believe it...", " You survived the labyrinth!", "GAME OVER", LINE, achievements);
    show();

    function achievements() {
        copyTextArea.textContent += character.name;
        copyTextArea.innerHTML += "&#13;&#10;";
        copyTextArea.textContent += "S:" + character.strength + " D:" + character.dexterity + " I:" + character.intelligence + " C:" + character.charisma;
        copyTextArea.innerHTML += "&#13;&#10;";

        showText = ["ACHIEVEMENTS", "👑 You got this much treasure: " + treasure + " kilograms."];
        copyTextArea.textContent += "👑 Treasure: " + treasure + "kg.";
        copyTextArea.innerHTML += "&#13;&#10;"; 
        
        if (events.usedSpecial === false) {
            showText.push("💪 Hard Mode! You played the whole game without using any special moves.");
            copyTextArea.textContent += "💪 Hard Mode, no special moves.";
            copyTextArea.innerHTML += "&#13;&#10;"; 
        }
        
        if (events.moreThanOneSpecial === true) {
            showText.push("⭐ Specialist! You used more than one special move.");
            copyTextArea.textContent += "⭐ Specialist, more than one special move.";
            copyTextArea.innerHTML += "&#13;&#10;"; 
        }

        if (chapters <= 6) {
            showText.push("🏃 Speedrun! You made it through as fast as possible.");
            copyTextArea.textContent += "🏃 Speedrun, fastest possible way.";
            copyTextArea.innerHTML += "&#13;&#10;"; 
        }

        if (chapters >= 10) {
            showText.push("📖 Voracious Reader! You played through a lot chapters.");
            copyTextArea.textContent += "📖 Voracious Reader, played many chapters.";
            copyTextArea.innerHTML += "&#13;&#10;"; 
        }

        if (events.chestOpened === true && events.secondChestOpened === true) {
            showText.push("💎 Treasure Hunter! You found more than one chest.");
            copyTextArea.textContent += "💎 Treasure Hunter, more than one chest found.";
            copyTextArea.innerHTML += "&#13;&#10;";  
        }

        if (events.firstRiddleGuess === true) {
            showText.push("🧠 Big Brain! You solved the Warlock riddle on your first try.");
            copyTextArea.textContent += "🧠 Big Brain, solved the riddle on first try.";
            copyTextArea.innerHTML += "&#13;&#10;";  
        }

        if (events.triggeredTrap === true) {
            showText.push("♾️ Unkillable! You survived a deadly trap.");
            copyTextArea.textContent += "♾️ Unkillable, survived a trap.";
            copyTextArea.innerHTML += "&#13;&#10;";  
        }

        if (events.killGoblin === true && events.killMinotaur === true && events.killWarlock === true) {
            showText.push("⚔️ Fighter! You killed all your enemies.");
            copyTextArea.textContent += "⚔️ Fighter, kill all enemies.";
            copyTextArea.innerHTML += "&#13;&#10;";
        }

        if (events.killGoblin === false && events.killMinotaur === false && events.killWarlock === false) {
            showText.push("☮️ Pacifist! You didn't kill any enemies.");
            copyTextArea.textContent += "☮️ Pacifist, no kills.";
            copyTextArea.innerHTML += "&#13;&#10;";
        }

        if (events.drinkingCider === true) {
            showText.push("🍺 Cheers! You drank some cider.");
            copyTextArea.textContent += "🍺 Cheers! Cider drinkng.";
            copyTextArea.innerHTML += "&#13;&#10;";
        }

        if (events.typingError === false) {
            showText.push("✅ Typist! You didn't make any spelling mistakes.");
            copyTextArea.textContent += "✅ Typist, no typos.";
            copyTextArea.innerHTML += "&#13;&#10;";
        }

        if (continueCount === 0) {
            showText.push("🗿 Old School! You didn't use the Continue function.");
            copyTextArea.textContent += "🗿 Old School, didn't use Continue.";
            copyTextArea.innerHTML += "&#13;&#10;";
        }

        if (continueCount > 2) {
            showText.push("🔁 No retreat, no surrender! You used the Continue function A LOT.");
            copyTextArea.textContent += "🔁 No retreat, no surrender! Used Continue many times.";
            copyTextArea.innerHTML += "&#13;&#10;";
        }
        
        copyTextArea.innerHTML += "&#13;&#10;";
        copyTextArea.innerHTML += "&#13;&#10;";
        copyTextArea.innerHTML += "freddiekaplan.se/labyrinth";
        
        function removeCopyHidden() {
            document.getElementById("copy-button").classList.remove("hidden");
        }
        showText.push(removeCopyHidden);
        show();
    }
}