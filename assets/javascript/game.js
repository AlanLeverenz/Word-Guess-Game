
$(document).ready(function() {

    // STATIC ARRAYS
    var sportsArray = ["curling","futsal","lawn_bowling","hang_gliding","ice_hockey","rock_climbing","cricket","wind surfing","cross country","lacrosse"];
    var presidentsArray = ["barack_obama","abraham_lincoln","theodore_roosevelt","john_kennedy","george_washington","thomas_jefferson","harry_truman","james_monroe","andrew_jackson"];
    var jazzGreatsArray = ["duke_ellington","john_coltrane","charlie_parker","thelonius_monk","dave_brubeck","bill_evans","oscar_peterson","louis_armstrong","art_tatum"];
    var naturesFuryArray = ["hurricane","earthquake","typhoon","volcano","flash_flood","monsoon","blizzard","tornado","forest_fire"];
    var chooseCategoryArray = ["choose a category"];
    var categoryArray = [sportsArray,presidentsArray,jazzGreatsArray,naturesFuryArray];
    var textArray = { "Sports":"0","Presidents":"1","Jazz Greats":"2","Nature's Fury":"3" };
    var hangingManArray = ["man_gray.png","man_brace.png","man_head.png","man_body.png","man_one_arm.png","man_both_arms.png","man_one_leg.png","man_hung.png"]
    var messagesArray = ["You got this!","What's that thing for?","Gulp!","You got the answer yet?","Oh jeez!","Don't screw this up now!","Mommy!","You're a goner!"]

    // Persistent variables that only initialize on reload
    var wins = 0;
    var losses = 0;

    // FUNCTIONS

    // initialize variables, clear text onscreen, and reset hangman image
    var secretIndex = 0;
    var secretWord = "";
    var catText = "";
    var catIndex = 0;
    var displayString = "";
    var displayArray = [];
    var wordArray = [];
    var rightText = "";
    var wrongText = "";
    var rightString = "";
    var wrongString = "";
    var secretDisplay = "";
    var userDisplay = "";
    var displayArray = [];
    var wordArray = [];

    // make function to build the array - associate with category pulldown selection
    function makeSecretWord (catArray,index) {
        secretIndex = catArray[index][Math.floor(Math.random() * catArray.length)];
        return secretIndex;
    }

    // function to build display string from secret word to compare to word on display (with underscores)
    function makeSecretString (word) {
        displayString = word.charAt(0);
        for ( i = 1 ; i < word.length ; i++ ) {
            displayString = displayString + " " + word.charAt(i);
        }
        return displayString;
    }

    // function to clear the window text
    function initDisplay() {
        $("#right-text").text("");
        $("#wrong-text").text("");
        $("#messages").text("");
        $("#current-category").empty();
        $("#hanging-man").attr("src","assets/images/man_gray.png");
        }
    
    // function to initialize vars
    function initVars() {

    }

// ================ CATEGORY BUTTON DROPDOWN SELECT EVENT

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

        console.log("catText: " + catText);
        console.log("catIndex: " + catIndex);

        // make secret word and add it to a new attribute at #user-select
        secretWord = makeSecretWord (categoryArray,catIndex);
        $("#user-select").attr("secret-word",secretWord);
        secretWord = $("#user-select").attr("secret-word");
        console.log("Secret word = " + secretWord);

    // BUILD SECRET STRING FOR DISPLAY ONSCREEN (with underscores)

        displayArray = [];
        wordArray = [];

        // function to build the wordArray and rightArray to display the characters on the page
        function makeSecretArray (thisArray,pageArray,myWord) {
        for ( i = 0 ; i < myWord.length ; i++ ) {
            thisArray.push(myWord.charAt(i));
            pageArray.push("_");
            }
            return pageArray;
        } // end makeSecretArray

        // get secretWord from HTML attribute
        secretWord = $("#user-select").attr("secret-word");

        makeSecretArray(wordArray,displayArray,secretWord);
        console.log("displayArray = " + displayArray);
        console.log("wordArray = " + wordArray);

    });  // end of click on categories event


// ================ ONKEYUP EVENT CAPTURING USER CHARACTERS TYPED

    // initialize variables
    var guess = "";
    var wrongArray = []; //built as user presses wrong keys
    var notit = 0;
    var wonFlag = false;
    var lostFlag = false;

    document.onkeyup = function(event) {
        // assign the key pressed and initialize variables
        var guess = event.key;
        var img = "assets/images/";
        var filepath = "";
        var gotit = 0;

        // create the secret word string for the window
        for ( i = 0 ; i < secretWord.length ; i++ ) {
            if (secretWord.charAt(i) === guess ) {
                displayArray[i] = guess; 
                gotit++;
            } // end if
        } // end for

        // if the character is not in the secret word and not in the wrongArray...
        // add it to wrong guesses array for display in the window
        // run a switch statement to replace image and insert comments
        if ( gotit < 1 && wrongArray.indexOf(guess) == -1 ) {
            wrongArray.push(guess);
            notit++;
            console.log("notit = " + notit);
            switch(notit) {
                case 1:
                    filepath = img + hangingManArray[1];
                    $("#hanging-man").attr("src",filepath);
                    $("#messages").text(messagesArray[1]);
                    console.log("src filepath = " + filepath);
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
                    $("#losses").text(losses);
                    lostFlag = true;
                break;
                default: 
                    filepath = img + hangingManArray[7];
                    $("#hanging-man").attr("src",img + hangingManArray[0]);
                    $("#messages").text(messagesArray[7]);
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
        if ( userDisplay === secretDisplay ) {
            wins++;
            wonFlag = true;
            $("#wins").text(wins);
            alert("Hey, you won!");
        } // end if

        // post alert if game was lost
        if (lostFlag === true) {
            alert("Yup, you're a goner!");
        }
        // initialize displayed text when a game is won or lost
        if (wonFlag === true || lostFlag === true) {
            initDisplay();
        } // end if

    } // end of onkeyup function

    // function to play audio sound for winning a game
    // function play() {
    //    var audio = document.getElementById("audio");
    //    audio.play();
    // }

}); // end of document.ready
