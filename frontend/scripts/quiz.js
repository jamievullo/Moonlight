const pickQuizParams = () => {
    const quizParamsElement = document.querySelector('body')
    const quizParams = `
    <div id="navbar"></div>
    ${navbar()}
    <form>
        <center>
                <h2>Please Select a Quiz Category and Difficulty to Get the Fun Started</h2>
            <select id="category">
                <option value="17">Science & Nature</option>
                <option value="18">Computers</option>
                <option value="22">Geography</option>
            </select>
            <select id="difficulty">
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <button type="submit" id="quiz-button">Submit</button>
        </center>
    </form>`;
    quizParamsElement.innerHTML = quizParams
    getSelection();
    backToPlanetsNavbarListener();
    astronomyPicOfDayListener();
    spaceStationLocationListener();

}

const getSelection = () => {
    const quizButton = document.getElementById('quiz-button')
    quizButton.addEventListener('click', e => {
        //e.preventDefault();
        //console.log(e)
        //sets variables to the values selected in dropdowns
        const category = document.getElementById('category').value
        const difficulty = document.getElementById('difficulty').value
        //pass user selected values into fetch url 'addSelections'
        const addSelections = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
        
        fetchQuiz(addSelections)
    })
}

const renderQuiz = () => {
    const bodyElement = document.querySelector('body')
    const quizElement = 
    `<div id="navbar"></div>
    ${navbar()}
    <div class="intro text-center">
        <div class="container">
            <h2 class="display-3 my-4">Science Quiz</h2>
        </div>
    </div>
    <div class="result py-4 d-none bg-light text-center">
        <div class="container lead">
            <p>You got <span class="text-primary display-4 p-3"> 0%</span>right!</p>
        </div>
    </div>
    <div class="quiz py-4">
        <div class="container">
            <h2 class="my-5">On with the questions...</h2>

            <form class="quiz-form"></form>

        </div>
    </div>
    <div class="text-center">
        <input id="results" type="submit" class="btn btn-light">
    </div>`;

    bodyElement.innerHTML = quizElement
    // fetchQuiz();
    //quizFormTemplate(); 
    checkResultsListener();
    listeners();  
}

class Question {
    constructor(question, number, correct_answer, incorrect_answers) {
    this.question = question,
    this.number = number
    this.correct_answer = correct_answer,
    this.incorrect_answers = incorrect_answers
    }

    correctAnswerHTML() {
        return ` 
        <div class="form-check my-2 text-white-50">
            <input type="radio" name="q${this.number}" value="correct">
            <label class="form-check-label">${this.correct_answer}</label>
        </div>`;
    }

    incorrectAnswerHTML() {
        const wrongAnswers = []
        this.incorrect_answers.map(ans => {
            const wrongAnsHTML = `<div class="form-check my-2 text-white-50">
                <input type="radio" name="q${this.number}" value="incorrect">
                <label class="form-check-label">${ans}</label>
            </div>`;
            wrongAnswers.push(wrongAnsHTML)
        })
        return wrongAnswers
    }

    combineAnswers() {
        const correct = this.correctAnswerHTML()
        const incorrect = this.incorrectAnswerHTML() 
        incorrect.push(correct)
        return incorrect    
    }
}

const shuffle = (array) => {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    // console.log(array);
    return array;
}

let questions = [];

const fetchQuiz = (addSelections) => {
    questions = [];
    fetch(addSelections)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        //console.log(data)
        let fetchResult = [...data.results]
        //console.log(data.results[0].correct_answer)
        //console.log(data.results[0].incorrect_answers)
        fetchResult.forEach(function (result, i) {
            questions.push(new Question(result.question, (i + 1), result.correct_answer, result.incorrect_answers))
        
        })
        renderQuiz();
        quizFormTemplate();
    })
}

const quizFormTemplate = () => {
    const quizElement = document.querySelector('.quiz-form')
    questions.forEach(q => {
        const aNsWeRs = q.combineAnswers()
        const quizForm = 
        `<div class="my-5">
        <p class="lead">${q.number}. ${q.question}?</p>
        ${shuffle(aNsWeRs)}
        `;
        quizElement.innerHTML += quizForm
    })
}

const checkResultsListener = () => {
    const form = document.getElementById('results');
    form.addEventListener('click', e => {
        //console.log(e)
        e.preventDefault();
        checkAnswers();
    })
}

const checkAnswers = () => {
    const form = document.querySelector('.quiz-form');
    const result = document.querySelector('.result')
    let score = 0;
    const userAnswers = [
        form.q1.value,
        form.q2.value,
        form.q3.value,
        form.q4.value,
        form.q5.value,
        form.q6.value,
        form.q7.value,
        form.q8.value,
        form.q9.value,
        form.q10.value
    ];
    //console.log(userAnswers)

    //check answers
    userAnswers.forEach((answer) => {
        if (answer === "correct") {
            //raises score by 10 for every correct answer
            score += 10;
        }
    })
    //scroll to top of page to see score animation
    scrollTo(0, 0);

    result.classList.remove('d-none');

    //score animation
    let output = 0;
    const timer = setInterval(() => {
        result.querySelector('span').textContent = `Your Score: ${output}%`;
        if (output === score) {
            clearInterval(timer);
        } else {
            output++;
        }
    }, 15);
};



//display questions in template
//randomize correct/incorrect answers for placement in template
//push correct answer value into array to compare to value of checked answer