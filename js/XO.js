const body = document.querySelector("body")
const board = document.querySelector(".board")
const question = document.querySelector(".question")
const xOry = document.querySelector('.xOry')
const buttonX = document.querySelector(".buttonX")
buttonX.onclick = ()=> onUserChoozedPlayer("X")
const buttonY = document.querySelector(".buttonY")
buttonY.onclick = ()=> onUserChoozedPlayer("O")
const PlayerWin = document.createElement("p")
PlayerWin.classList.add("questionAnim")
PlayerWin.style.fontSize = "50px"
PlayerWin.style.textAlign = "center"
const resetButton = document.createElement("button")
resetButton.textContent = "Restart"
resetButton.classList.add("resetButton")
const scoreTheGame = document.createElement("p")
const placeQuestion = document.querySelector(".placeQuestion")
const placeQuestionP = document.querySelector(".placeQuestionP")
placeQuestionP.onclick = ()=> onOpenModal()
const modal = document.querySelector(".modal")
const modalQuestion = document.querySelector(".modalQuestion")
const placeInput = document.querySelector(".placeInput")
const placeButton = document.querySelector(".placeButton")
const modalInput = document.querySelector(".modalInput")
placeButton.onclick = ()=> onGoToNewBoard(boardPlaceValue)
let boardPlaceValue = 0

modalInput.oninput = function () {
        if(this.value.length > 2 ){ 
            this.value = this.value.slice(0,2)
        }
        boardPlaceValue = this.value
}
function onGoToNewBoard(num){
    if(num === 0 || num > 10 || num < 3 ){
        modalQuestion.classList.add("questionAnim")
        return
    }
    if(num[0] === '0'){
        modalQuestion.classList.add("questionAnim")
        return
    }
    modalInput.value = ''
    board.innerHTML = ""
    buildArr = []
    onbuildBoard((num*num)-1)
    placeQuestion.style.display = "block"
    modal.style.display = "none"
    modalQuestion.style.display = "none"
    placeButton.style.display = "none"
    question.style.display = "block"
    xOry.style.display = "flex"
    boardPlaceValue = 0
}
let buildArr = []

let playerSimbol = "";
let PcSimbol = ""

let counter  = false
let checker = false

let boardDeal = 8
let HowManyXOrY = 0
let boardRowLength = 0

function onbuildBoard(number){

for (let i = 0; i <= number; i++) {
    const place = document.createElement("div")
    place.classList.add("place")
    board.appendChild(place)
    buildArr[i] = {...buildArr[i],place,sssimbol:""}
    place.onclick = ()=> addSimbol(place,i)
}
onSearchA()
board.style.setProperty('grid-template-columns', 'repeat(' + boardRowLength + ', '+ 100/boardRowLength +'%)');
board.style.setProperty('grid-template-rows', 'repeat(' + boardRowLength + ', '+ 100/boardRowLength +'%)');
if (number > 24) {
    for (let m = 0; m < buildArr.length; m++) {
        buildArr[m].place.style.fontSize = "xx-large"
    }
}
}
onbuildBoard(boardDeal)
function onUserChoozedPlayer (value){
    playerSimbol = value
    question.style.display = "none"
    xOry.style.display = "none"
    placeQuestion.style.display = "none"
}
function addSimbol (div,id){
    checker = false
   
    if(playerSimbol === ""){
        question.classList.add("questionAnim")
        return
    }
    if ( buildArr[id].sssimbol === "") {
        buildArr[id].sssimbol = playerSimbol
        let simbol = document.createElement("p")
        simbol.textContent = buildArr[id].sssimbol
        div.appendChild(simbol)
        HowManyXOrY++
    }else{
        return
    }
    if(playerSimbol === "X"){
        PcSimbol = "O"
    }else{
        PcSimbol = "X"
    }
    onCheckHorizontal()
    onCheckVertical()
    onCheckDiagonal()
    if (!counter) {
        onwalkPC()
        onCheckHorizontal()
        onCheckVertical()
        onCheckDiagonal()
    }else{
        body.appendChild(resetButton)
        resetButton.onclick = () => onRestart(resetButton)
        let playerSimbol = "";
        return
    }

    if (HowManyXOrY === boardRowLength*boardRowLength && !checker) {
            PlayerWin.textContent = "The Game was over in a DRAW !!!!!"
            body.appendChild(PlayerWin)
            body.appendChild(resetButton)
            resetButton.onclick = () => onRestart(resetButton)
            let playerSimbol = "";
    } 
}
function onRestart (rButton){
        rButton.remove()
        question.style.display = "block"
        question.classList.remove( "questionAnim")
        xOry.style.display = "flex"
        playerSimbol = ""
        placeQuestion.style.display = "block"
        HowManyXOrY = 0
        if (PlayerWin) {
            PlayerWin.remove()
        }
        if(counter){
           counter = false
        }
        for (let i = 0; i < buildArr.length; i++) {
            const el = buildArr[i];
            buildArr.sssimbol = ""
            if(el.place.firstChild){
                el.place.firstChild.remove()
            }
            buildArr = []
            board.innerHTML = ""
            onbuildBoard(boardDeal)
        }
}
function onCheckHorizontal() {
    onSearchA()
        let i = 0
        while (i < boardRowLength*boardRowLength) {
            onCheckRowOrColumn(i,i+boardRowLength,false) 
            i = i+boardRowLength
        }
}
function onCheckVertical(){
    onSearchA()
    for (let i = 0; i < boardRowLength; i++) {
        onCheckRowOrColumn(i,buildArr.length,true) 
    }    
}
function onCheckRowOrColumn(start,end,isOnVertical = false){
    if (counter) {
        return
    }
    let CheckPlacesArr = []
    let PlayerSimbolPlaces = 0
    let PcSimbolPlaces = 0

    if(isOnVertical){
        for (let j = start; j < buildArr.length ; j = j+boardRowLength) {
                    if(buildArr[j].sssimbol){
                        CheckPlacesArr += buildArr[j].sssimbol
                    }
                }
    }else{ 
        for (let j = start; j < end ; j++) {
            if(buildArr[j].sssimbol){
                CheckPlacesArr += buildArr[j].sssimbol
            }
    }
    }

    for (let l = 0; l < CheckPlacesArr.length; l++) {
            if (CheckPlacesArr[l] === playerSimbol) {
                PlayerSimbolPlaces++
            }else if(CheckPlacesArr[l] === PcSimbol){
                PcSimbolPlaces++
            }
    }

    if(isOnVertical && (PlayerSimbolPlaces === boardRowLength || PcSimbolPlaces === boardRowLength)){
        for (let p = start; p < buildArr.length; p = p+boardRowLength) {
                buildArr[p].place.firstChild.style.color = "red"
              }
              inTimeWhenPlayerWinn(start)
    }else if (!isOnVertical && (PlayerSimbolPlaces === boardRowLength || PcSimbolPlaces === boardRowLength)) {
      for (let p = start; p < end; p++) {
        buildArr[p].place.firstChild.style.color = "red"
      }
              inTimeWhenPlayerWinn(start)
    }
    return
}
function onCheckDiagonal(){
    onSearchA()
        onCheckDiagnolColumns(boardRowLength,0)  
        onCheckDiagnolColumns(boardRowLength,boardRowLength-1)        
}
function onCheckDiagnolColumns(boardRowLength,start) {
    if (counter) {
        return
    }
    let CheckPlacesArr = []
    let PlayerSimbolPlaces = 0
    let PcSimbolPlaces = 0
   
    if(start !== 0){
        for (let x = start; x <= start*boardRowLength ; x = x+(boardRowLength-1)) {
            if(buildArr[x].sssimbol){
                CheckPlacesArr += buildArr[x].sssimbol
            }
        }
    }else{
        for (let j = start; j <= (boardRowLength+1)*boardRowLength-1 ; j = j+(boardRowLength+1)) {
        if(buildArr[j].sssimbol){
            CheckPlacesArr += buildArr[j].sssimbol
        }
    }
}
    for (let l = 0; l < CheckPlacesArr.length; l++) {
        if (CheckPlacesArr[l] === playerSimbol) {
            PlayerSimbolPlaces++
        }else if(CheckPlacesArr[l] === PcSimbol){
            PcSimbolPlaces++
        }
}
if (start === 0 && (PlayerSimbolPlaces === boardRowLength || PcSimbolPlaces === boardRowLength)) {
    for (let p = start; p <= (PcSimbolPlaces+1)*PcSimbolPlaces-1 ; p=p+(PcSimbolPlaces+1)) {
      buildArr[p].place.firstChild.style.color = "red"
    }
    inTimeWhenPlayerWinn(start)
}else if(start !== 0 && (PlayerSimbolPlaces === boardRowLength || PcSimbolPlaces === boardRowLength)){
    for (let p = start; p <= start*boardRowLength ; p=p+(boardRowLength-1)) {
        buildArr[p].place.firstChild.style.color = "red"
      }
      inTimeWhenPlayerWinn(start)
}
}
function onwalkPC(){
   
    let arr = []
    for (let i = 0; i < buildArr.length; i++) {
     if (buildArr[i].sssimbol === "") {
        arr.push(buildArr[i])
      } 
    }
    let  RandomNumber = Math.floor(Math.random() * arr.length)
    if(arr.length < 1){
            return
    }
    if (arr[RandomNumber].sssimbol === "") {
        let simbol = document.createElement("p")
        arr[RandomNumber].sssimbol = PcSimbol
        simbol.textContent = PcSimbol
        arr[RandomNumber].place.appendChild(simbol)
        HowManyXOrY++
    }
    
}
function onSearchA(){
    for (let i = 1; i < buildArr.length; i++) {
        if(buildArr.length / i === i){
            boardRowLength = i
        }        
    }
}
function inTimeWhenPlayerWinn(start){
    counter = true
    PlayerWin.textContent = buildArr[start].sssimbol + "  Win the Game"
    body.appendChild(PlayerWin)
    checker = true
    body.appendChild(resetButton)
    resetButton.onclick = ()=> onRestart(resetButton)
     for (let k = 0; k < buildArr.length; k++) {
            const el = buildArr[k];
            el.place.onclick = NaN
        }
}
function onOpenModal (){
    placeQuestion.style.display = "none"
    modal.style.display = "flex"
    modalQuestion.style.display = "block"
    placeButton.style.display = "block"
    question.style.display = "none"
    xOry.style.display = "none"
}
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
