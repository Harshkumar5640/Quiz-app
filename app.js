import quizQuestions from "./qus.js";

//---------------------------------------------

//shuffling them using fisher yatse algorithm
function shuffle(arr){
    let l = arr.length - 1;

    for (let i = l; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1)); // 0 to i
        let temp = arr[i];
        arr[i] = arr[r];
        arr[r] = temp;
    }
}
shuffle(quizQuestions);

//---------------------------------------------

//global
//select card from html 
let card=document.querySelector(".card");

//---------------------------------------------

//page no 1
//Show Instructions 
function showStart(){
    card.innerHTML="";
    card.innerHTML=`
    <div class="upp">
        <h2>Instructions</h2>
        <ul>
            <li>Each question has 4 options.</li>
            <li>You must select an answer before time runs out.</li>
            <li>Once selected, you cannot change your answer.</li>
            <li>The next question will appear automatically.</li>
        </ul>
        <button id="stbtn" class="stBtn">Start</button>
    </div>`;

    let btn=document.getElementById("stbtn");
    btn.addEventListener('click',()=>{
        console.log("btn clicked");
        g();
    });
    
}
showStart();

//---------------------------------------------

//page no 2
//create html structure for quiz 
function g(){
    card.innerHTML="";
    card.innerHTML=`
            <div class="timer">
                <p>00:<span id="timerText">10</span></p>
            </div>
            <h4 id="qus">
                this is qus
            </h4>
            <div class="lower">
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li> 
                </ul>
                
                
            </div>
            <div id=divbtn>
                <button class="stBtn" id="nextbtn">Next</button>
            </div>
            `
    game();

}

//---------------------------------------------

//global
let inc = 0;        // question index
let remainingTime = 10;//seconds
let answered=false;
let crrtCount=0;
let incrrtCount=0;
let unattempedCount=25;
let scr=0;

//---------------------------------------------

function game(){
    //selecting from g
    let qus = document.getElementById("qus");
    let lists = document.querySelectorAll("li");
    let timerText = document.getElementById("timerText");

    //helping function 
    function showQuestion(){

        let q = quizQuestions[inc];

        qus.textContent = q.question;

        //by creating dummyArray store the options and shuffle them then set to list
        let dummArr=[...q.options];
        shuffle(dummArr);

        let i = 0;
        lists.forEach(li=>{
            li.textContent = dummArr[i];
            li.style.color = "black"; // reset color
            i++;
        });
        answered=false;
        remainingTime = 10;
    }

    // -------- CLICK EVENT (ONLY ONCE) --------
    lists.forEach(li=>{
        li.addEventListener("click", ()=>{

            if(answered) return;
            answered=true;
            unattempedCount--;

            let q = quizQuestions[inc];

            if(li.textContent === q.answer){
                console.log("correct");
                li.style.color = "green";
                crrtCount++;
                scr+=10;
                console.log(crrtCount,"crrt");
            }else{
                console.log("incorrect");
                li.style.color = "red";
                incrrtCount++
                console.log(incrrtCount,"incrrt");
            
            }

        });
    });
    let nextbtn=document.getElementById("nextbtn");
    nextbtn.addEventListener("click",()=>{
        next();
    })


    // -------- NEXT QUESTION --------
    function next(){

        inc++;
        
        if(inc >= quizQuestions.length){
            console.log("Quiz Finished");
            showResult();
            stopInterval();
            return;
        }

        showQuestion();
    }
    // -------- TIMER --------
    let intervalId=setInterval(()=>{

        timerText.textContent = remainingTime;
        remainingTime--;

        if(remainingTime < 0){
            console.log("timeout");
            next();
        }

    },1000);
    function stopInterval(){
        clearInterval(intervalId);
        console.log("quiz fininshed");
    }
    // -------- INITIAL LOAD --------
    showQuestion();
}

//---------------------------------------------

//creating of function for show result (last page)
function showResult(){
    //select card div and empty it
    card.innerHTML="";
    card.innerHTML=`
    <div class="upp">
        <h3>SCORE</h3>
        <h1 id="scoreid">200</h1>
        <span>
            <img src="Assets/incrrt.png">
            Unattempted<span id="unCount">1</span>
        </span>
        <span>
            <img src="Assets/crrt.png">
            Correct<span id="crrtCount">1</span>
        </span>
        <span>
            <img src="Assets/incrrt.png">
            Incorrect<span id="incrrtCount"></span>
        </span>
    </div>
    `;
    scr=scr-(unattempedCount)*5;
    console.log(scr);
    let scrid=document.getElementById("scoreid");
    scrid.textContent=scr;

    let uc=document.getElementById("unCount");
    uc.textContent=unattempedCount;

    let cc=document.getElementById("crrtCount");
    cc.textContent=crrtCount;

    let ic=document.getElementById("incrrtCount");
    ic.textContent=incrrtCount;

    return;

}