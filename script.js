let completed = [];
window.onload = () => {
  play();
  const canvas = document.querySelector("canvas")
  const jsConfetti = new JSConfetti({ canvas })
  function play(){
    trys = 0;
    let word = getRandom();
    let hint = word[1];
    word = word[0];
    if(wordInCompleted(word, completed)){
      play()
    } else {
      completed.push(word)
    }
    let o = document.getElementById("occurences");
    o.innerText = ""
    let letters = document.getElementById("letters")
    let arr = createArray(word.length, " _ ");
    letters.innerText = s(arr)
    document.getElementById("form").onsubmit = (e) => {
      e.preventDefault();
      trys++;
      let guess = document.getElementById("word");
      if(trys >= 10){
        letters.innerText = "Sorry, you ran out of trys the word was " + word;
        o.innerText = ""
        document.getElementById("submit").disabled = true;
        document.querySelector("#hint-btn").disabled = true;
        document.getElementById("word").disabled = true;
        playAgain();
      } else {
      if(guess.value.toLowerCase().trim() === word.toLowerCase()){
        letters.innerText = word;
        o.innerText = "You got the word!";
        document.getElementById("submit").disabled = true;
        document.querySelector("#hint-btn").disabled = true;
        document.getElementById("word").disabled = true;
        document.getElementById("oneletter").disabled = true;
        jsConfetti.addConfetti()
        playAgain();
      } 
      else if(guess.value.trim().length > 1){
        o.innerText = "This was not the word"
      } else{
        if(word.toLowerCase().includes(guess.value.toLowerCase().trim()[0])){
          o.innerText = "";
          for(let i = 0; i < arr.length; i++){
            let l = word.toLowerCase()
            if(guess.value.trim()[0].toLowerCase() == l[i]){
              arr[i] = word[i]
            }
          }
          letters.innerText = s(arr);
          if(letters.innerText == word){
            o.innerText = "You got the word!"
            document.getElementById("submit").disabled = true;
            document.querySelector("#hint-btn").disabled = true;
            document.getElementById("word").disabled = true;
            document.getElementById("oneletter").disabled = true;
            jsConfetti.addConfetti()
            playAgain();
          }
        } else {
          if(guess.value.trim()[0] != undefined){
            o.innerHTML = "No occurences of <b>" + guess.value.trim()[0] + "</b> in the hidden word"
          }
          else {
            o.innerText = ""
          }
        }
      }
      guess.value = ""
    }
  }
    document.querySelector("#hint-btn").onclick = () => {
      alert("Hint: \n" + hint)
    }
    document.getElementById("oneletter").onclick = () => {
      o.innerText = ""
      trys++;
      if(trys >= 10){
        letters.innerText = "Sorry, you ran out of trys the word was " + word;
        o.innerText = ""
        document.getElementById("submit").disabled = true;
        document.querySelector("#hint-btn").disabled = true;
        document.getElementById("word").disabled = true;
        playAgain();
      } else {
      let m = [];
      for(let k = 0; k < arr.length; k++){
        if(arr[k] == " _ "){
          m.push(k)
        }
      }
      m = m[Math.floor(Math.random() * m.length)];
      for(let n = 0; n < word.length; n++){
        if(word[n].toLowerCase() == word[m].toLowerCase()){
          arr[n] = word[n]
        }
      }
      letters.innerText = s(arr);
      if(letters.innerText == word){
        o.innerText = "You got the word!"
        document.getElementById("submit").disabled = true;
        document.querySelector("#hint-btn").disabled = true;
        document.getElementById("word").disabled = true;
        document.getElementById("oneletter").disabled = true;
        jsConfetti.addConfetti()
        playAgain();
      }
    }
    document.getElementById("oneletter").disabled = true;
    document.getElementById("oneletter").style.display = "none"
  }
  }
  document.querySelector("#instructions").onclick = (e) => {
    e.preventDefault();
    alert("Instructions \n 1.You will have 10 trys to get the word \n 2. Hints will cause you to lose 1 try \n 3. Press submit after typing the letter you think is in the hidden word \n 4. Type the word if you think you know it \n 5. Using the give me a letter button will cause you to lose 1 try")
  }
  function getRandom(){
    return words[Math.floor(Math.random() * words.length)]
  }
  function createArray(len, t){
    let arr = [];
    for(let i = 0; i < len; i++){
      arr.push(t)
    }
    return arr;
  }
  function s(a){
    let st = "";
    for(let i = 0; i < a.length; i++){
      st += a[i]
    }
    return st;
  }
  function playAgain(){
    let p = document.createElement("button");
    p.innerText = "Play again";
    document.getElementById("container").appendChild(p);
    p.onclick = () => {
      play();
      document.getElementById("container").removeChild(p);
      document.getElementById("submit").disabled = false;
      document.querySelector("#hint-btn").disabled = false;
      document.getElementById("word").disabled = false;
      document.getElementById("oneletter").disabled = false;
      document.getElementById("oneletter").style.display = "block"
    }
  }
  function wordInCompleted(word, completed){
    let s = false;
    for(let i = 0; i < completed.length; i++){
      if(word === completed[i]){
        s = true;
      }
      return s;
    }
  }
}