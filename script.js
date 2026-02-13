let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let mode = 'exam'; // 'exam', 'practice', 'all'
let userAnswers = []; // Speichert {questionId, selectedIndices[], correctIndices[]}

// Startet das Quiz basierend auf dem Modus
function startQuiz(selectedMode) {
    mode = selectedMode;
    const countInput = document.getElementById('question-count').value;
    let limit = 1000;

    // Alle Fragen mischen
    let shuffled = [...questionsData].sort(() => 0.5 - Math.random());

    if (mode === 'exam') {
        limit = parseInt(countInput) || 12;
    } else if (mode === 'practice') {
        limit = shuffled.length; // Endlos
    } else {
        limit = shuffled.length; // Alle
    }

    currentQuestions = shuffled.slice(0, limit);
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];

    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    document.getElementById('result-screen').classList.remove('active');

    if(mode === 'practice') {
        document.getElementById('current-score').style.display = 'block';
    } else {
        document.getElementById('current-score').style.display = 'none';
    }

    showQuestion();
}

function showQuestion() {
    const q = currentQuestions[currentQuestionIndex];
    document.getElementById('question-number').innerText = `Frage ${currentQuestionIndex + 1} / ${currentQuestions.length}`;
    document.getElementById('question-text').innerHTML = q.question;
    
    // Progress Bar
    const progress = ((currentQuestionIndex) / currentQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;

    const optionsDiv = document.getElementById('answer-options');
    optionsDiv.innerHTML = '';
    
    // Antworten mischen
    // Wir speichern den originalen Index, um Korrektheit zu prüfen
    let optionsWithIndex = q.options.map((opt, index) => ({...opt, origIndex: index}));
    optionsWithIndex.sort(() => 0.5 - Math.random());

    optionsWithIndex.forEach((opt, displayIndex) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.innerHTML = opt.text;
        div.onclick = () => toggleSelection(div, opt.origIndex);
        div.dataset.origIndex = opt.origIndex; // Für Auswertung
        optionsDiv.appendChild(div);
    });

    // Reset Buttons/Feedback
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('next-btn').style.display = 'inline-block';
    
    // Im Prüfungsmodus Button Text anpassen
    if (mode === 'exam') {
        document.getElementById('next-btn').innerText = (currentQuestionIndex === currentQuestions.length - 1) ? 'Prüfung beenden' : 'Nächste Frage';
        // Remove onClick for check, use direct next
        document.getElementById('next-btn').onclick = nextQuestionExam;
    } else {
        document.getElementById('next-btn').innerText = 'Auflösen & Weiter';
        document.getElementById('next-btn').onclick = checkAndNextPractice;
    }
}

function toggleSelection(div, index) {
    // Wenn schon Feedback da ist (Practice Modus aufgelöst), nichts mehr ändern
    if (document.getElementById('feedback').style.display === 'block' && mode === 'practice') return;

    // Mehrfachauswahl erlauben
    div.classList.toggle('selected');
}

// Logik für Übungsmodus: Erst prüfen, Feedback zeigen, dann Next
function checkAndNextPractice() {
    const btn = document.getElementById('next-btn');
    const feedback = document.getElementById('feedback');
    const q = currentQuestions[currentQuestionIndex];
    
    // Wenn Button "Weiter" sagt (nach Auflösung)
    if (btn.innerText === 'Nächste Frage') {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
        } else {
            finishQuiz();
        }
        return;
    }

    // Auswerten
    const selectedDivs = document.querySelectorAll('.option.selected');
    const selectedIndices = Array.from(selectedDivs).map(d => parseInt(d.dataset.origIndex));
    
    // Richtige Indizes finden
    const correctIndices = q.options.map((o, i) => o.correct ? i : -1).filter(i => i !== -1);
    
    // Check: Sind genau die richtigen ausgewählt?
    // Einfacher Vergleich: Sortierte Arrays vergleichen
    selectedIndices.sort();
    correctIndices.sort();
    
    const isCorrect = JSON.stringify(selectedIndices) === JSON.stringify(correctIndices);
    
    // Visuelles Feedback
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(div => {
        const idx = parseInt(div.dataset.origIndex);
        if (q.options[idx].correct) {
            div.classList.add('correct'); // Grün
        } else if (div.classList.contains('selected')) {
            div.classList.add('incorrect'); // Rot (nur wenn falsch ausgewählt)
        }
    });

    if (isCorrect) {
        score++;
        feedback.innerHTML = "Richtig! <br>" + (q.note || "");
        feedback.style.color = "var(--correct-text)";
        feedback.style.backgroundColor = "var(--correct)";
    } else {
        feedback.innerHTML = "Leider falsch. Siehe grüne Markierungen. <br>" + (q.note || "");
        feedback.style.color = "var(--wrong-text)";
        feedback.style.backgroundColor = "var(--wrong)";
    }
    feedback.style.display = 'block';
    document.getElementById('current-score').innerText = `Punkte: ${score}`;

    btn.innerText = 'Nächste Frage';
}

// Logik für Prüfungsmodus: Speichern und direkt weiter
function nextQuestionExam() {
    const q = currentQuestions[currentQuestionIndex];
    const selectedDivs = document.querySelectorAll('.option.selected');
    const selectedIndices = Array.from(selectedDivs).map(d => parseInt(d.dataset.origIndex));
    const correctIndices = q.options.map((o, i) => o.correct ? i : -1).filter(i => i !== -1);

    // Antwort speichern
    userAnswers.push({
        question: q,
        selected: selectedIndices,
        correct: correctIndices
    });

    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    let totalScore = 0;
    const reviewDiv = document.getElementById('review-list');
    reviewDiv.innerHTML = '';

    // Wenn Practice, ist Score schon live berechnet. Wenn Exam, jetzt berechnen.
    if (mode === 'exam' || mode === 'all') {
        // Exam mode calculation based on stored answers
        // Oder 'all' wenn es wie Exam behandelt wird
        userAnswers.forEach((ans, idx) => {
            ans.selected.sort();
            ans.correct.sort();
            const isCorrect = JSON.stringify(ans.selected) === JSON.stringify(ans.correct);
            if (isCorrect) totalScore++;

            // Review erstellen (nur falsche oder alle?)
            const div = document.createElement('div');
            div.className = 'review-item ' + (isCorrect ? 'good' : 'bad');
            
            let status = isCorrect ? "Richtig" : "Falsch";
            let correctText = ans.question.options.filter(o => o.correct).map(o => o.text).join(', ');
            
            div.innerHTML = `<strong>${idx+1}. ${ans.question.question}</strong><br>
                             Dein Status: ${status}<br>
                             <span style="color:green">Richtig wäre: ${correctText}</span>`;
            reviewDiv.appendChild(div);
        });
        document.getElementById('final-score').innerText = `${totalScore} / ${currentQuestions.length}`;
        
        let percentage = (totalScore / currentQuestions.length) * 100;
        let msg = "";
        if (percentage >= 80) msg = "Super gemacht! Bereit für die Prüfung.";
        else if (percentage >= 50) msg = "Ganz okay, aber üb noch ein bisschen.";
        else msg = "Da fehlt noch etwas Übung.";
        document.getElementById('score-text').innerText = msg;

    } else {
        // Practice Modus Result
        document.getElementById('final-score').innerText = `${score} / ${currentQuestions.length}`;
        document.getElementById('score-text').innerText = "Training beendet.";
    }
}