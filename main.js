const texts = [
     "He sells seashells by the seashore.",
     "How can a clam cram in a clean cream can?",
     "I scream, you scream, we all scream for ice cream.",
     "I saw Susie sitting in a shoeshine shop.",
     "Susie works in a shoeshine shop. Where she shines she sits, and where she sits she shines.",
     "Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn't fuzzy, was he?",
     "Can you can a can as a canner can can a can?",
     "I have got a date at a quarter to eight; I'll see you at the gate, so don't be late.",
     "You know New York, you need New York, you know you need unique New York.",
     "Saw a kitten eating chicken in the kitchen.",
     "If a dog chews shoes, whose shoes does he choose?",
     "I thought I thought of thinking of thanking you.",
     "Peter Piper picked a peck of pickled peppers. A peck of pickled peppers Peter Piper picked. If Peter Piper picked a peck of pickled peppers? Where's the peck of pickled peppers Peter Piper picked?",
     "I slit the sheet, the sheet I slit, and on the slitted sheet I sit.",
     "Good blood, bad blood."
];
document.addEventListener("keydown", (event) => {
     switch (event.key){
          case 'Shift':
          case 'Control':
          case 'CapsLock':
          case 'Tab':
          case 'ArrowUp':
          case 'ArrowRight':
          case 'ArrowLeft':
          case 'ArrowDown':
          return;
     }
     input(event.key);
     console.log(event.key)
});

manytexts()
highlight(0)

var textoutput = '';
let wrong = 0;
let position = 0;
document.getElementById("wrongtyping").innerHTML = "Wrong: " + wrong;


function input(key) {

     let wrongtyping = document.getElementById("wrongtyping");

     if (textoutput[position] == key) {
          position += 1;
          setTimeout(highlight(position), 0); //highlight next letter
     } else {
          highlight(position)
          wrong += 1;
          wrongtyping.innerHTML = `Wrong: ${wrong}`;
     }

     if (position >= textoutput.length) {
          position = 0;
          setTimeout(manytexts, 0);
          alert("Finish")
          wrong = 0;
     }
}


function manytexts() {
     textoutput = texts[Math.round(Math.random() * (texts.length - 1))];

     document.getElementById("box").innerHTML = textoutput;
}

function highlight(index) {
     var text = textoutput; //get the id from html
     if (text[index] == " ") {
          text = text.substr(0, index) + "<span style='color: aqua'>" + "_" + "</span>" + text.substr(index + 1, text.length);
          $("#box").html(text);
     } else {
          text = text.substr(0, index) + "<span style='color: aqua'>" + text[index] + "</span>" + text.substr(index + 1, text.length);
          $("#box").html(text);
     }
     $("#box").html(text);
}
