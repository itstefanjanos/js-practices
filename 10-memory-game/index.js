(() => {
    const CLOCK_REFRESH_TIME = 80;
    const HOUR = 3600000;
    const MINUTE = 60000;
    const SECOND = 1000;
    const calculateHoursFromTimecode = (milliseconds) => Math.floor(milliseconds / HOUR).toString().padStart(2, '0'); 
    const calculateMinutesFromTimecode = (milliseconds) => Math.floor((milliseconds % HOUR) / MINUTE).toString().padStart(2, '0'); 
    const calculateSecondsFromTimecode = (milliseconds) => Math.floor((milliseconds % MINUTE) / SECOND).toString().padStart(2, '0'); 
    const calculateMillisecondsFromTimecode = (milliseconds) => (milliseconds % SECOND).toString().padStart(3, '0'); 
    const calculateLimitSign = (limit) => limit !== 0?'-':'';
    const getTimeString = (milliseconds, limit = 0) => {
        const millisecondsToShow = Math.abs(limit === 0 ? milliseconds : limit - milliseconds);
        return `${calculateLimitSign(limit)}${
            calculateHoursFromTimecode(millisecondsToShow)}:${
            calculateMinutesFromTimecode(millisecondsToShow)}:${
            calculateSecondsFromTimecode(millisecondsToShow)}.${
            calculateMillisecondsFromTimecode(millisecondsToShow)}`
    }
    const addOrUpdateTimeElement = (timeElement, elapsed, limit = 0, caption, id, position) => {
        if (timeElement === null) {
            timeElement = document.createElement('div');
            timeElement.classList.add('time');
            timeElement.id = id;
            if (position === 'prepend') {
                document.querySelector('.time-section').prepend(timeElement);
            } else if (position === 'append') {
                document.querySelector('.time-section').append(timeElement);
            }
        }
        timeElement.innerHTML = `${caption}<br/><time>${getTimeString(elapsed, limit)}</time>`;
    }
    const addOrUpdateBestTimeElement = (elapsed) => {
        const bestTimeElement = document.getElementById('best-time');
        addOrUpdateTimeElement(bestTimeElement, elapsed, 'Best', 'best-time', 'prepend');
    }
    const addOrUpdateActualTimeElement = (elapsed, limit = 0) => {
        const actualTimeElement = document.getElementById('actual-time');
        addOrUpdateTimeElement(actualTimeElement, elapsed, limit, 'Actual', 'actual-time', 'append');
    }
    const getBestTime = () => localStorage.getItem('best-milliseconds');
    const setBestTime = (time) => localStorage.setItem('best-milliseconds', time);

    const getTimeLimit = (numberOfCards) => 
        Math.round(0.0039 * numberOfCards**3
            - 0.1399 * numberOfCards**2
            + 11 * numberOfCards
            - 35.6765)*1000;

    const resetContainer = (containerElement) => {
        if (containerElement.childNodes.length !== 0) {
            containerElement.innerHTML = '';
        }
    }

    const showGameControllers = (message) => {
        document.querySelector('.game-controllers').style.display = '';
        document.querySelector('.message').innerText = message;
    }

    const hideGameControllers = () => {
        document.querySelector('.game-controllers').style.display = 'none';
    }

    const generateCards = (numberOfPairs) => {
        return (new Array(numberOfPairs * 2).fill(0)).map((card, index) => {
            const cardValue = Math.floor((index + 2) / 2);
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.value = cardValue;
            cardElement.innerHTML = `<div class='card-inner'><figure class='card-frontside'>${cardValue}</figure><figure class='card-backside'>card</figure></div>`;
            return cardElement;
        }).sort((a,b) => Math.random() - 0.5);
    }

    const setCardsContainerSize = (containerElement, sizeXAxis, sizeYAxis) => {
        containerElement.style.gridTemplateColumns = `repeat(${sizeXAxis}, 1fr)`;
        containerElement.style.gridTemplateRows = `repeat(${sizeYAxis}, 1fr)`;
    }

    const getSizeOfCards = () => {
        const sizeXAxis = +document.getElementById('size-x-axis').value === 0 ? 4 : document.getElementById('size-x-axis').value;
        const sizeYAxis = +document.getElementById('size-y-axis').value === 0 ? 4 : document.getElementById('size-y-axis').value;
        const numberOfPairs = Math.floor(sizeXAxis * sizeYAxis / 2);
        const numberOfCards = numberOfPairs * 2;
        
        return ({
            sizeXAxis,
            sizeYAxis,
            numberOfPairs,
            numberOfCards
        });
    }

    const setSizeOfCards = (sizeXAxis, sizeYAxis) => {
        document.getElementById('size-x-axis').value = sizeXAxis;
        document.getElementById('size-y-axis').value = sizeYAxis;
    }

    const getLimited = (numberOfCards) => (+document.forms[0].elements.timeLimit.value === 1) ? getTimeLimit(numberOfCards) : 0;

    const finishGame = (start, timer, finishTimeout, elapsedTime) => {
        const elapsedTime = new Date() - start;
        if (getBestTime() === null || elapsedTime < +getBestTime()) {
            setBestTime(elapsedTime);
            addOrUpdateBestTimeElement(elapsedTime);
        }
        showGameControllers('WIN!');
        addOrUpdateActualTimeElement(elapsedTime);
        if (finishTimeout != null) {
            clearTimeout(finishTimeout);
        }
        clearInterval(timer);
    };

    const markMatchedAndRemoveSelection = (selectedCardElements, isCardsMatched) => {
        [...selectedCardElements].forEach(selected => {
            if (isCardsMatched) {
                selected.classList.add('matched');
            }
            selected.classList.remove('selected');
        });
    };

    const checkCardsMatched = (containerElement, selectedCardElements, start, timer, finishTimeout, eventHandler) => {
        const isCardsMatched = selectedCardElements[0].dataset.value === selectedCardElements[1].dataset.value;
        containerElement.removeEventListener('click', eventHandler);
        setTimeout(() => {
            markMatchedAndRemoveSelection(selectedCardElements, isCardsMatched);

            if (document.querySelectorAll('.card:not(.matched)').length !== 0) {
                containerElement.addEventListener('click', eventHandler);
            } else {
                finishGame(start, timer, finishTimeout, elapsedTime);
            }
        }, isCardsMatched ? 0 : 1200);
    };

    const cardSelect = (containerElement, cardElement, start, timer, finishTimeout, eventHandler) => {
            cardElement.classList.add('selected');
            const selectedCardElements = document.querySelectorAll('.card.selected');
            if (selectedCardElements.length === 2) {
                checkCardsMatched(containerElement, selectedCardElements, start, timer, finishTimeout, eventHandler);
            }
    }

    const clickEvent = (containerElement, start, timer, finishTimeout, getEventHandler, event) => {
        if (event.target.closest('.card-backside')) {
            const card = event.target.closest('.card');
            cardSelect(containerElement, card, start, timer, finishTimeout, getEventHandler());
        }
    };

    const setTickTimer = (start, limit) => {
        return setInterval(() => {
            addOrUpdateActualTimeElement(new Date() - start, limit);
        }, CLOCK_REFRESH_TIME);
    }

    const setFinishTimeout = (limit, timer) => {
        if (limit === 0) {
            return null;
        }
        return setTimeout(() => {
            showGameControllers('Game Over!');
            addOrUpdateActualTimeElement(limit)
            clearInterval(timer);
            finishTimeout = null;
        }, limit);
    }

    let bestTime = document.getElementById('best-time');

    if (bestTime === null && getBestTime() !== null) {
        addOrUpdateBestTimeElement(bestTime, +getBestTime());
    }

    const startGame = (containerElement) => {
        if (!containerElement || !containerElement.nodeType || containerElement.nodeType !== 1) {
            return;
        }

        resetContainer(containerElement);

        const {sizeXAxis, sizeYAxis, numberOfPairs, numberOfCards} = getSizeOfCards();
        setSizeOfCards(sizeXAxis, sizeYAxis);


        const limit = getLimited(numberOfCards);
        
        setCardsContainerSize(containerElement, sizeXAxis, sizeYAxis);

        addOrUpdateActualTimeElement(0, limit);

        const start = new Date();
        const timer = setTickTimer(start, limit);

        let finishTimeout = setFinishTimeout(limit, timer);
        
        containerElement.append(...generateCards(numberOfPairs));
        let eventHandler = null;
        eventHandler = clickEvent.bind(null, containerElement, start, timer, finishTimeout, getEventHandler = () => eventHandler);
        containerElement.addEventListener('click', eventHandler);
    };

    const startButton = document.querySelector('.start-button');

    startButton.addEventListener('click', () => {
        const cardsContainer = document.querySelector('.cards-container');
        hideGameControllers();
        startGame(cardsContainer);
    });

})();