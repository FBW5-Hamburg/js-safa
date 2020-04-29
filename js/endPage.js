window.onload = function () {
    const username = document.querySelector('#username')
    const saveScoreBtn = document.querySelector('#saveScoreBtn')
    const finalScore = document.querySelector('#finalScore')
    const mostRecentScore = localStorage.getItem('mostRecentScore')
    
    //localStorage.setItem('highScores',JSON.stringify([]))
    const highScores = JSON.parse(localStorage.getItem('highScores')) || []
    const max_high_scores = 5

    finalScore.innerText = mostRecentScore
    
    username.addEventListener('keyup',()=> {
        
        saveScoreBtn.disabled = !username.value
    })

    saveScoreBtn.addEventListener('click', (e) => {
        //onsole.log('clicked');
        e.preventDefault()
        const score = {
            score:mostRecentScore,
            name: username.value
        }
        highScores.push(score)
        highScores.sort((a,b) => b.score-a.score)
        highScores.splice(5)

        localStorage.setItem('highScores',JSON.stringify(highScores))

        console.log(highScores);
        // window.location.assign('./essai.html')
        window.location.assign("./startPage.html");
    })

    
    

      
    

}