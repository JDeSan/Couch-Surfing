document.addEventListener('DOMContentLoaded', function () {
 var questions = [
    {
      question: "What genre are you looking for?",
      options: ["Action", "Comedy", "Drama", "Sci-Fi", "Horror"]
    },
    {
      question: "Is this a movie or TV show?",
      options: ["Movie", "TV Show"]
    }
  ];
 var recommendations = {
    Action: {
      Movie: "Mad Max: Fury Road",
      "TV Show": "Stranger Things"
    },
    Comedy: {
      Movie: "The Grand Budapest Hotel",
      "TV Show": "Brooklyn Nine-Nine"
    },
    Drama: {
      Movie: "The Shawshank Redemption",
      "TV Show": "Breaking Bad"
    },
    Thriller: {
      Movie: "Blade Runner 2049",
      "TV Show": "Black Mirror"
    },
    Horror: {
      Movie: "Get Out",
      "TV Show": "The Haunting of Hill House"
    }
  };
 var apiKey = 'fbea72eb4emsh7cdc029ca5f108fp175751jsn2e9122100265'; 
 var rapidApiHost = 'movie-database-alternative.p.rapidapi.com';
 var startBtn = document.getElementById('start');
 var nextBtn = document.getElementById('next-btn');
 var quizContainer = document.getElementById('quiz');
 var questionContainer = document.getElementById('question-container');
 var optionsContainer = document.getElementById('options-container');
 var resultContainer = document.getElementById('result');
 var recommendationText = document.getElementById('recommendation');
  let currentQuestion = 0;
  let userAnswers = [];
  startBtn.addEventListener('click', startQuiz);
  nextBtn.addEventListener('click', nextQuestion);
  function startQuiz() {
    startBtn.style.display = 'none';
    quizContainer.style.display = 'block';
    showQuestion();
  }
  function showQuestion() {
   var question = questions[currentQuestion];
    questionContainer.innerHTML = `<p>${question.question}</p>`;
    optionsContainer.innerHTML = "";
    question.options.forEach((option, index) => {
      optionsContainer.innerHTML += `
        <input type="radio" name="answer" value="${option}" id="option${index + 1}">
        <label for="option${index + 1}">${option}</label><br>
      `;
    });
  }
  async function nextQuestion() {
   var selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
      alert('Please select an option');
      return;
    }
    userAnswers.push(selectedOption.value);
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      await showResult();
    }
  }
  async function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
   var genre = userAnswers[0];
   var type = userAnswers[1];
    try {
     var recommendation = await getMovieRecommendation(genre, type);
      recommendationText.innerHTML = recommendation;
    } catch (error) {
      console.error(error);
      recommendationText.innerHTML = 'An error occurred while fetching movie data.';
    }
  }
  async function getMovieRecommendation(genre, type) {
   //var apiUrl = `https://movie-database-alternative.p.rapidapi.com/${type.toLowerCase()}/${genre.toLowerCase()}`;
   var apiUrl = `https://movie-database-alternative.p.rapidapi.com/?s=${genre.toLowerCase()}&r=json&page=1`;
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': rapidApiHost,
        'X-RapidAPI-Key': apiKey
      }
    })
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
    })
   
  }
});