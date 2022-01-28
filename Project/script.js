var seconds = 0;
var p1t;
var p2t;

var el = document.getElementById('seconds-counter');

function incrementSeconds() {
    seconds += 1;
    el.innerHTML = "<h3>" + seconds + " seconds</h3>";
}

 setInterval(incrementSeconds, 1000);


const quizData = [
    {
        question: "Who is the winner of the 2021 IPL?",
        a: "Kolkata Knight Riders",
        b: "Delhi Capitals",
        c: "Deccan Chargers",
        d: "Chennai Super Kings",
        correct: "d",
    },
    {
        question: "Who has the most Ballon d'Or?",
        a: "Cristiano Ronaldo",
        b: "Lionel Messi",
        c: "Johan Cruyff",
        d: "Robert Lewandowski",
        correct: "b",
    },
    {
        question: "As of 2021, what is the highest-grossing anime movie of all time?",
        a: "Demon Slayer: Mugen",
        b: "Your Name",
        c: "Spirited Away",
        d: "Howl's Moving Castle",
        correct: "a",
    },
    {
        question: "Who became the first person ever to amass one million Twitter followers?",
        a: "Justin Bieber",
        b: "Ashton Kutcher",
        c: "Jack Dorsey",
        d: "Walter White",
        correct: "b",
    },
    {
        question: "Who was the first woman President of India?",
        a: "Sumitra Mahajan",
        b: "Pratibha Devisingh",
        c: "Sarojini Naidu",
        d: "Indira Gandhi",
        correct: "b",
    },
];

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
const playerName = document.getElementById('playerName')

let currentQues = 0
let score1 = 0
let score2 = 0
let player = 1;
let status1 = [];
let status2 = [];


for(var i = 0; i < 5; i++) {
    status1.push("grey");
    status2.push("grey");
}  


loadQuiz();
submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    

          
    if (answer === quizData[currentQues].correct) {
        if (player === 1){
            score1++; 
            status1[currentQues] = "green";
        }
            
        else if (player === 2){
            score2++;
            status2[currentQues] = "green";
        }
    }

    else if (answer != null) {
        if (player === 1)
            status1[currentQues] = "red";

        else if (player === 2)
            status2[currentQues] = "red";
        
        }

        currentQues++;

        if (currentQues < quizData.length) {
            loadQuiz()
        } else if (currentQues === quizData.length && player === 1) {
            player++;
            alert('Player 2 Get Ready!')
            currentQues = 0
            p1t = seconds
            seconds = 0
            loadQuiz();
        }
        else {
            p2t = seconds
            let winner = score1 > score2 ? "Player 1 wins!" : "Player 2 wins!"
            if(score1 === score2) winner = p1t < p2t ? "Player 1 wins!" : "Player 2 wins!"

            quiz.innerHTML = `
                   
                    <div class="c1">
                    <center>
                    <marquee width="60%" direction="right" height="100px">
                    <h1> ${winner} </h1>
                    </marquee> 
                   
                    </center>
                    <h2>Player 1 answered ${score1}/${quizData.length} questions correctly</h2>
                    <h2>Time taken ${p1t} seconds </h2>
                    <center>
                    <div class = "center" >
                    <button class = "rbt ${status1[0]}"> 1 </button>
                    <button class = "rbt ${status1[1]}"> 2 </button>
                    <button class = "rbt ${status1[2]}"> 3 </button>
                    <button class = "rbt ${status1[3]}"> 4 </button>
                    <button class = "rbt ${status1[4]}"> 5 </button>
                  
                    </div>
                    </center>
                
               
                
                <h2>Player 2 answered ${score2}/${quizData.length} questions correctly</h2>
                <h2>Time taken ${p2t} seconds </h2>
                <center>
                <div class="center">
                    <button class = "rbt ${status2[0]}"> 1 </button>
                    <button class = "rbt ${status2[1]}"> 2 </button>
                    <button class = "rbt ${status2[2]}"> 3 </button>
                    <button class = "rbt ${status2[3]}"> 4 </button>
                    <button class = "rbt ${status2[4]}"> 5 </button>
                    
                </div>
                </center>

                
                <button onclick="location.reload()">Play Again!</button>
                <div class="c1">
            `
        }
    
})

function loadQuiz() {
    deselectAnswers()

    playerName.innerHTML = `Player ${player}`;
    const currentQuesData = quizData[currentQues]

    questionEl.innerText = currentQuesData.question
    a_text.innerText = currentQuesData.a
    b_text.innerText = currentQuesData.b
    c_text.innerText = currentQuesData.c
    d_text.innerText = currentQuesData.d
}

 
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false) 
}

function getSelected() {
    let answer

    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

