(() => {
    
    const getTimeString = (milliseconds, limit = 0) => {
            const millisecondsToShow = Math.abs(limit === 0 ? milliseconds : limit - milliseconds);
            return `${limit !== 0?'-':''}${Math.floor(millisecondsToShow / 3600000).toString().padStart(2, '0')}:${
                Math.floor((millisecondsToShow % 3600000) / 60000).toString().padStart(2, '0')}:${
                Math.floor((millisecondsToShow % 60000) / 1000).toString().padStart(2, '0')}.${
                (millisecondsToShow % 1000).toString().padStart(3, '0')}`
          },
          addOrUpdateBestTimeElement = (bestTime, elapsed) => {
            if (bestTime === null) {
                bestTime = document.createElement('div');
                bestTime.classList.add('time');
                bestTime.id = 'best-time';
                document.querySelector('.time-section').prepend(bestTime);
            }
            bestTime.innerHTML = `Best<br/><time>${getTimeString(elapsed)}</time>`;
          }, 
          getBestTime = () => localStorage.getItem('best-milliseconds'),
          setBestTime = (time) => localStorage.setItem('best-milliseconds', time);

    let bestTime = document.getElementById('best-time');

    if ( bestTime === null && getBestTime() !== null) {
        addOrUpdateBestTimeElement(bestTime, +getBestTime());
    }

    const startGame = (containerElement) => {
        if (!containerElement || !containerElement.nodeType || containerElement.nodeType !== 1) {
            return;
        }

        if ( containerElement.childNodes.length !== 0) {
            containerElement.innerHTML = '';
        }

        const sizeXAxis = +document.getElementById('size-x-axis').value === 0 ? 4 : document.getElementById('size-x-axis').value,
              sizeYAxis = +document.getElementById('size-y-axis').value === 0 ? 4 : document.getElementById('size-y-axis').value,
              size = Math.floor(sizeXAxis * sizeYAxis / 2), 
              numberOfCards = size * 2;
        document.getElementById('size-x-axis').value = sizeXAxis;
        document.getElementById('size-y-axis').value = sizeYAxis;


        const limit = (+document.forms[0].elements.timeLimit.value === 1) 
            ? Math.round(0.0039 * numberOfCards**3
                - 0.1399 * numberOfCards**2
                + 11 * numberOfCards
                - 35.6765)*1000 : 0;
        
        containerElement.style.gridTemplateColumns = `repeat(${sizeXAxis}, 1fr)`;
        containerElement.style.gridTemplateRows = `repeat(${sizeYAxis}, 1fr)`;

        let actualTime = document.getElementById('actual-time');
        
        if ( actualTime === null ) {
            actualTime = document.createElement('div');
            actualTime.classList.add('time');
            actualTime.id = 'actual-time';
            actualTime.innerHTML = 'Actual<br/><time>00:12:13.567</time>';
            document.querySelector('.time-section').append(actualTime);
        }

        const start = new Date(),
            timer = setInterval(() => {
                actualTime.innerHTML = `Actual<br/><time>${getTimeString(new Date() - start, limit)}</time>`;
            }, 80);

        let finishTimeout = null; 
        
        if (limit !== 0) {
            finishTimeout = setTimeout(() => {
                document.querySelector('.game-controllers').style.display = '';
                document.querySelector('.message').innerText = 'Game Over!';
                actualTime.innerHTML = `Actual<br/><time>${getTimeString(limit)}</time>`;
                clearInterval(timer);
            }, limit);
        }
        
        const clickEvent = event => {
            if (event.target.closest('.card-backside')) {
                
                const card = event.target.closest('.card');
                card.classList.add('selected');

                const selecteds = document.querySelectorAll('.card.selected');
                
                if (selecteds.length === 2) {
                    const isSameCards = selecteds[0].dataset.value === selecteds[1].dataset.value;
                    containerElement.removeEventListener('click', clickEvent);
                    setTimeout(() => {
                        [...selecteds].forEach(selected => {
                            if (isSameCards) {
                                selected.classList.add('matched');
                            }
                            selected.classList.remove('selected');
                        });
                        if (document.querySelectorAll('.card:not(.matched)').length !== 0) {
                            containerElement.addEventListener('click', clickEvent);
                        } else {
                            const elapsedTime = new Date() - start;
                            if (getBestTime() === null || elapsedTime < +getBestTime()) {
                                setBestTime(elapsedTime);
                                addOrUpdateBestTimeElement(document.getElementById('best-time'), elapsedTime);
                            }
                            document.querySelector('.game-controllers').style.display = '';
                            document.querySelector('.message').innerText = 'WIN!';
                            actualTime.innerHTML = `Actual<br/><time>${getTimeString(elapsedTime)}</time>`;
                            if (finishTimeout != null) {
                                clearTimeout(finishTimeout);
                            }
                            clearInterval(timer);
                        }
                        
                    }, isSameCards?0:1200);
                }
            }

        };

        const cards = (new Array(size * 2).fill(0)).map((card, index) => {
            const cardValue = Math.floor((index + 2) / 2),
                  cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.value = cardValue;
            cardElement.innerHTML = `<div class='card-inner'><figure class='card-frontside'>${cardValue}</figure><figure class='card-backside'>card</figure></div>`;
            return cardElement
        }).sort((a,b) => Math.random() - 0.5);
        
        containerElement.append(...cards);
        containerElement.addEventListener('click', clickEvent);
    };

    const startButton = document.querySelector('.start-button');

    startButton.addEventListener('click', () => {
        const cardsContainer = document.querySelector('.cards-container');
        document.querySelector('.game-controllers').style.display = 'none';
        startGame(cardsContainer);
    });
    

})();