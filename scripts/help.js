let howToPlayText = "<p>To begin, <strong>press the start button</strong> and then write answers in a textbox. Submit by clicking the <strong>Answer button</strong> or pressing Enter.</p><p>Press the <strong>Reset button</strong> to start over.</p><p>You can adjust the text speed by choosing an option in the list at the top of the page, <strong>Fast Text</strong>.";
let writingAnswersText = "<p>Answer the game with <strong>single word answers</strong>. Your options are usually available to you in a box above the textfield. Make sure to <strong>spell correctly</strong>, the game should let you know if it didn't recognize your answer.</p><p>Remember, you start out with one special move which you can execute by typing <strong>special</strong>, even if it isn't among the options in the prompt. You can also end the game by writing <strong>end</strong>.</p>";
let examplesText = "<p>wizard<br>create<br>3<br>yes<br>sword<br>special<br>fight<br>end</p>";
let createCharText = "<p>At the start of the game you have the option to create your own character by writing <strong>create</strong> instead of choosing one of the characters.</p><p>You will be prompted to give a <strong>name</strong> for your character, assign values to your four <strong>attributes</strong> and name your <strong>special move</strong>. Both name and special move can be as long as you like, and is not limited to a single word or lowercase letters. The attributes are assigned with <strong>numbers</strong> 1-7, with a total sum of 10. The game will help you calculate your attributes.</p>";
let randomCharText = "<p>At the start of the game you have the option to generate a random character by writing <strong>random</strong> instead of choosing one of the characters.</p><p>You'll be asked if you are happy with your character and ready to begin the game. If you are, write <strong>yes</strong>. If not, write <strong>no</strong> and a new character will be generated for you.</p>";
let musicText = "<p>You can enhance your experience by adding music. Press the Music button at the top.</p><p>A YouTube player will open at the bottom of the page and a couple of controls will appear next to the Music button. You can switch tracks and pause/play.</p><p>Please note that depending on your web browser the autoplay and play/pause button might not work and you'll have to manually start the video. You'll still be able to stop the player by pressing the Music button, and be able to switch tracks.</p><p>The music consists of selected tracks from the <a href='https://www.youtube.com/@TheDungeonSynthArchives' target='_blank'>Dungeon Synth Archives</a> YouTube page.</p><p>The embedded YouTube player might cause some error messages to show up in the console.</p>";
let helpHeadlines = Array.from(document.getElementsByClassName("help-bar-headline"));

function helpOpen() {
    document.getElementById("help-bar").style.bottom = "0";
    document.getElementById("help-button").onclick = function() {
        helpClose()
    };
}

function helpClose() {
    document.getElementById("help-bar").style.bottom = "-100%";
    document.getElementById("help-button").onclick = function() {
        helpOpen()
    };
}

helpHeadlines.forEach(function(headline) {
    headline.addEventListener("click", resetHeadlineColors);
})

function resetHeadlineColors() {
    for (let i = 0; i < helpHeadlines.length; i++) {
        helpHeadlines[i].classList.remove("active");
    }
}

function howToPlay() {
    document.getElementById("show-text").innerHTML = howToPlayText;
    document.getElementById("help-play").classList.add("active");
}

function writingAnswers() {
    document.getElementById("show-text").innerHTML = writingAnswersText;
    document.getElementById("help-answers").classList.add("active");
}

function exampleAnswers() {
    document.getElementById("show-text").innerHTML = examplesText;
    document.getElementById("help-examples").classList.add("active");
}
/*
function helpCreate() {
    document.getElementById("show-text").innerHTML = createCharText;
    document.getElementById("help-create").classList.add("active");
}

function helpRandom() {
    document.getElementById("show-text").innerHTML = randomCharText;
    document.getElementById("help-random").classList.add("active");
}

function helpMusic() {
    document.getElementById("show-text").innerHTML = musicText;
    document.getElementById("help-music").classList.add("active");
}
*/
document.getElementById("help-button").onclick = function() {
    helpOpen()
};
document.getElementById("help-play").onclick = function() {
    howToPlay()
};
document.getElementById("help-answers").onclick = function() {
    writingAnswers()
};
document.getElementById("help-examples").onclick = function() {
    exampleAnswers()
};
/*
document.getElementById("help-create").onclick = function() {
    helpCreate()
};
document.getElementById("help-random").onclick = function() {
    helpRandom()
};
document.getElementById("help-music").onclick = function() {
    helpMusic()
};*/
document.getElementById("help-close").onclick = function() {
    helpClose()
};