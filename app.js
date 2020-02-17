$('button').click(function(){
    $('.instructions').hide();
    $('.sentenceP').show();
    $('.feedbackP').show();
    $('.targetKey').empty();
    
    // Global variables
    
    let sentences = ["We've always defined ourselves by the ability",
    "to overcome the impossible. And we count these moments.",
    "These moments when we dare to aim higher, to break barriers,",
    "to reach for the stars, to make the unknown known.",
    "We count these moments as our proudest achievements.",
    "But we lost all that. Or perhaps we've just forgotten",
    "that we are still pioneers. And we've barely begun.",
    "And that our greatest accomplishments cannot be behind us,",
    "because our destiny lies above us. -Interstellar"]
    
    let whichSent = 0;
    let score;
    const numberOfWords = 80;
    let seconds = 0;
    let minutes = 0;
    let isPlaying = true;
    let userSent;
    
    // Adds sentences to div#sentence
    $('.sentenceP').text(sentences[0]);
      
    
    // Playing the game
    setInterval(displayTime, 1000);
        // Event listeners for shift key up or down, shows upper keyboard
        $(document).keydown(function(e){
            if(event.keyCode==16){
                $('#keyboard-upper-container').show();
                $('#keyboard-lower-container').hide();
        
                if(event.keyCode==08){
                    backspace = true;
                    return backspace;
                }
                event.preventDefault();
            }
        });
        $(document).keyup(function(e){
            if(event.keyCode==16){
                $('#keyboard-upper-container').hide();
                $('#keyboard-lower-container').show();
                event.preventDefault();
            }
        });
    
        //Event listeners for keys pressed, highlights each key when pressed
        // Start keypress listener
        $(document).keypress(function(e){
            // Saves pressed key into target variable
            target = e.which;
            // Adds .pressed class to key to highlight
            $('#'+event.keyCode).addClass('pressed');
        });
        // End keypress listener
        
        // Start keyup listener
        $(document).keyup(function(){
        $('.key').removeClass('pressed');
        userSent = [$('input').val()];
        // Sends progress into displayFeedback
        displayFeedback(target);
        // Decides if at end of sentence, if true, load next sentence, if last sentence, initiate gameOver
        if(userSent[0]===sentences[whichSent]){
            whichSent++;
            if(whichSent>sentences.length-1){
                gameOver();
                return;
            }else{
                $('.sentenceP').text(sentences[whichSent]);
                $('.feedbackP').empty('span');
                $('.target-letterP').empty('span');
            }
            sentEnd = sentences[whichSent].length;
            presses=0;
            $('input').val('');
        }
        }); 
        
        
        // End keyup listener
    // Playing the game/
    
    // Checks for sentence progress
    function sentProgress(userSent){
        if(userSent[0]===sentences[whichSent]){
            return true;
        }else{
            return false;
        }
    }
    
    // Displays feedback
    function displayFeedback(){
        $('.feedbackP').text('');
        $('.feedbackP').css({'background-color': 'green', 'animation-name': 'progress', 'animation-duration': '480s'})
    };
    
    // Displays target value in div#target-letter
    function displayTime(){
        if(10>seconds){
            $('.targetKey').text(minutes+":0"+seconds);
        }
        else if(seconds>=59){
            minutes++;
            seconds=0;
            $('.targetKey').text(minutes+":"+seconds);
        } else {
            seconds++;
        $('.targetKey').text(minutes+":"+seconds);
        }
        seconds++;
        if(!(isPlaying)){
            clearInterval(displayTime);
            $('.targetKey').empty();
        }
    }

    // Game over
    function gameOver(){
        isPlaying = false;
        clearInterval(displayTime);
        minutes = minutes + (seconds*0.0166667);
        score = Math.round((numberOfWords/minutes));
        $('.sentenceP').hide();
        $('.feedbackP').hide();
        $('.targetKey').hide();
        $('input').val('');
        $('.instructions').show().text('Game Over  ' + 'Score: ' + score + 'wpm');
        $('.prompt-container').append($('<button class="btn btn-lg btn-primary mx-auto my-1">Try Again</button>'));
        $(document).off('keypress');
        // Reloads to initiate new game
        $('button').click(function(){
            location.reload(true);
        });
    }
    
    
    
    
    
    })