$(document).ready(function() {

    // VARIABLES ==========================

    // STATIC ARRAYS
    var sportsArray = ["curling","futsal","lawn_bowling","hang_gliding","ice_hockey","rock_climbing","cricket","wind surfing","cross country","lacrosse"];
    var presidentsArray = ["barack_obama","abraham_lincoln","theodore_roosevelt","john_kennedy","george_washington","thomas_jefferson","harry_truman","james_monroe","andrew_jackson"];
    var jazzGreatsArray = ["duke_ellington","john_coltrane","charlie_parker","thelonius_monk","dave_brubeck","bill_evans","oscar_peterson","louis_armstrong","art_tatum"];
    var naturesFuryArray = ["hurricane","earthquake","typhoon","volcano","flash_flood","monsoon","blizzard","tornado","forest_fire"];
    var categoryArray = [sportsArray,presidentsArray,jazzGreatsArray,naturesFuryArray];
    var textArray = { "Sports":"0","Presidents":"1","Jazz Greats":"2","Nature's Fury":"3" };
    var hangingManArray = ["man_gray.png","man_brace.png","man_head.png","man_body.png","man_one_arm.png","man_both_arms.png","man_one_leg.png","man_hung.png"]
    var messagesArray = ["You got this!","What's that thing for?","Gulp!","You got the answer yet?","Oh jeez!","Mommy!","Any last wishes?","You're a goner!"]

    // Variables keeping score when a game is won or lost
    var wins = 0;
    var losses = 0;
    var wonFlag = false;
    var lostFlag = false;

    // vars and arrays for when category is selected
    var secretWord = "";
    var catText = "";
    var catIndex = 0;
    var displayString = "";
    var displayArray = [];
    var wordArray = [];

    var guess = ""; // key user pressed
    var wrongArray = []; //built as user presses wrong keys
    var notit = 0; // keeps track of wrong guesses until game is won or lost

    // var for displaying category secret word underscores
    var rightText = "";

    // folder path for scaffolding images
    var img = "assets/images/";
    var filepath = "";

// FUNCTIONS ========================

    // function to generate the random index number for the categoryArray item selected by the user
    function makeSecretWord (catArray,index) {
        randomIndex = catArray[index][Math.floor(Math.random() * catArray[index].length)];
        return randomIndex;
    }

    // function to build the secret array to display the characters on the webpage
    function makeSecretArray (secretArray,pageArray,myWord) {
    for ( i = 0 ; i < myWord.length ; i++ ) {
        secretArray.push(myWord.charAt(i));
        pageArray.push("_");
        }
        return pageArray;
    } // end makeSecretArray

    // function to write the secretWord underscores to the Guess box               
    function displaySecretUnderscores (secretArray) {
        var rightText = document.getElementById("right-text");
        var rightString = secretArray.join(" ");
        rightText.textContent = rightString;
    }

    // function to build and compare user's guessed word to the secret word to determine if game is won
    function makeSecretString (word) {
        pageString = word.charAt(0);
        for ( i = 1 ; i < word.length ; i++ ) {
            pageString = pageString + " " + word.charAt(i);
        }
        return pageString;
    }

    // function to clear text inserted on the webpage and initialize specific vars to clear screen and continue
    function initDisplay() {
        $("#right-text").text("");
        $("#wrong-text").text("");
        $("#messages").text("");
        $("#current-category").empty();
        $("#hanging-man").attr("src","assets/images/man_gray.png");
        wonFlag = false;
        lostFlag = false;
        displayArray = [];
        wrongArray = [];
        secretWord = "";
        notit = 0;
        }
    
    // function to play audio sound for winning or losing a game
    var iWon = document.getElementById("won-audio");
    var iLost = document.getElementById("lost-audio");
    function playWonAudio() {
        iWon.play();
    }
    function playLostAudio() {
        iLost.play();
    }


// ================ CATEGORY BUTTON DROPDOWN CLICK EVENT

    // select category
    $(".dropdown-menu a").click(function() {

        // initialize when category is selected
        initDisplay();

        // get category text and index from click event
        catText = $(this).text();
        catIndex = $(this).attr("id");
        // write pulldown text and array index to #current-category and #user-select attribute
        $("#current-category").html("<h4 id='user-select'>" + catText + "</h4>");
        $("#user-select").attr("cat-index",catIndex);

        // make secret word and add it to a new attribute at #user-select
        secretWord = makeSecretWord (categoryArray,catIndex);
        $("#user-select").attr("secret-word",secretWord);
        // secretWord = $("#user-select").attr("secret-word"); // redundant, but used for testing

    // BUILD SECRET STRING FOR DISPLAY ONSCREEN (with underscores)

        // get secretWord from HTML attribute
        secretWord = $("#user-select").attr("secret-word");
        console.log(secretWord); // if you have to know
        displayArray = makeSecretArray(wordArray,displayArray,secretWord);

        // display initial word onscreen
        displaySecretUnderscores(displayArray);

    });  // end of click on categories event


// ================ ONKEYUP EVENT CAPTURING USER CHARACTERS TYPED


    document.onkeyup = function(event) {

    // initialize variables

        // don't allow input if there is no secretWord, i.e., was initialized after a game
        if (secretWord.length < 1) {
            alert("Please select a category for a new word.")
        } else 
        // else allow user key entry        
        {
            // assign the key pressed and initialize variables
            guess = event.key;
            gotit = 0;

            // create the secret word string for the window
            for ( i = 0 ; i < secretWord.length ; i++ ) {
                if (secretWord.charAt(i) === guess ) {
                    displayArray[i] = guess; 
                    gotit++;
                } // end if
            } // end for

            // if the character is not in the secret word and not in the wrongArray...
            // add it to wrong guesses array for display in the window
            if ( gotit < 1 && wrongArray.indexOf(guess) == -1 ) {
                wrongArray.push(guess);
                ++notit;
                // a switch statement below to update the image and insert comments
                switch(notit) {
                    case 1:
                        filepath = img + hangingManArray[1];
                        $("#hanging-man").attr("src",filepath);
                        $("#messages").text(messagesArray[1]);
                    break;
                    case 2:
                        filepath = img + hangingManArray[2];
                        $("#hanging-man").attr("src",img + hangingManArray[2]);
                        $("#messages").text(messagesArray[2]);
                    break;
                    case 3:
                        filepath = img + hangingManArray[3];
                        $("#hanging-man").attr("src",img + hangingManArray[3]);
                        $("#messages").text(messagesArray[3]);
                    break;
                    case 4:
                        filepath = img + hangingManArray[4];
                        $("#hanging-man").attr("src",img + hangingManArray[4]);
                        $("#messages").text(messagesArray[4]);
                    break;
                    case 5:
                        filepath = img + hangingManArray[5];
                        $("#hanging-man").attr("src",img + hangingManArray[5]);
                        $("#messages").text(messagesArray[5]);
                    break;
                    case 6:
                        filepath = img + hangingManArray[6];
                        $("#hanging-man").attr("src",img + hangingManArray[6]);
                        $("#messages").text(messagesArray[6]);
                    break;
                    case 7:
                        filepath = img + hangingManArray[7];
                        $("#hanging-man").attr("src",img + hangingManArray[7]);
                        $("#messages").text(messagesArray[7]);
                        losses++;
                        notit = 0;
                        $("#losses").text(losses);
                        lostFlag = true;
                    break;
                    default: 
                        filepath = img + hangingManArray[7];
                        $("#hanging-man").attr("src",img + hangingManArray[0]);
                        $("#messages").text(messagesArray[7]);
                        notit = 0;
                } // end switch
            } // end notit if

            // DISPLAY CHARACTER ON PAGE - EITHER RIGHT OR WRONG                    
            // set vars for document.GetElementById
            var rightText = document.getElementById("right-text");
            var wrongText = document.getElementById("wrong-text");

            // join the arrays to display in the document
            var rightString = displayArray.join(" ");
            var wrongString = wrongArray.join(" ");

            // generate the text and pass to the HTML page
            rightText.textContent = rightString;
            wrongText.textContent = wrongString;

            //check if the onscreen word matches the correct one and user wins
            var secretDisplay = makeSecretString(secretWord);
            var userDisplay = $("#right-text").text();
            // play audio if user wins
            if ( userDisplay === secretDisplay ) {
                wins++;
                wonFlag = true;
                $("#wins").text(wins);
                playWonAudio();
                initDisplay();
            } // end if

            // play audio file if game was lost
            if (lostFlag === true) {
                playLostAudio();
                initDisplay();
            }
        } // end if secretWord
    } // end of onkeyup function
}); // end of document.ready
