// 1

document.getElementById('hider').addEventListener('click', () => {
    document.getElementById('text').style.display = 'none';
});

// 2

document.getElementById('hider').addEventListener('click', function (){
    this.style.display = 'none';
});

// 3

// 1, 2

// 4

/*<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
  <style>
    #field {
      width: 200px;
      height: 150px;
      border: 10px solid black;
      background-color: #00FF00;
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }

    #ball {
      left: 0;
      top: 0;
      position: absolute;
      transition: all 1.5s;
    }
    
  </style>
</head>

<body style="height:2000px">

  Click on a field to move the ball there.
  <br>


  <div id="field">
    <img src="https://en.js.cx/clipart/ball.svg" id="ball"> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
  </div>

  <script>*/
    const field = document.getElementById('field'),
          ball = document.getElementById('ball');
    
    field.addEventListener('click', event => {
      const clickLeft = event.clientX - field.offsetLeft - field.clientLeft,
            clickTop = event.clientY - field.offsetTop - field.clientTop;
      ball.style.left = `${Math.max(0, Math.min(clickLeft - ball.width / 2, field.clientWidth - ball.width))}px`;
      ball.style.top = `${Math.max(0, Math.min(clickTop - ball.height / 2, field.clientHeight - ball.height))}px`;
    });
 /* </script>

</body>
</html>*/

// 5

/*<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
  <style>
    .open-icon, .close-icon {
      color: green;
    }
    .list-toggle {
      cursor: pointer
    }
    .hide {
      display: none;
    }
  </style>
</head>
<body>

  <div class="list-toggle"><span class="close-icon">▶</span><span class="open-icon hide">▼</span> Sweeties (click me)!</div>
  <ul class="hideable-list hide">
    <li>Cake</li>
    <li>Donut</li>
    <li>Honey</li>
  </ul>

  <script>*/
    const listToggle = document.querySelector('.list-toggle'),
          hideableList = document.querySelector('.hideable-list'),
          openIcon = document.querySelector('.open-icon'),
          closeIcon = document.querySelector('.close-icon');
    
    listToggle.addEventListener('click', () => {
      closeIcon.classList.toggle('hide');
      openIcon.classList.toggle('hide');
      hideableList.classList.toggle('hide');
    });
  /*</script>

</body>
</html>*/

// 6

// messages.css

/*
body {
  margin: 10px auto;
  width: 470px;
}

h3 {
  margin: 0;
  padding-bottom: .3em;
  font-size: 1.1em;
}

p {
  margin: 0;
  padding: 0 0 .5em;
}

.pane {
  background: #edf5e1;
  padding: 10px 20px 10px;
  border-top: solid 2px #c4df9b;
  position: relative;
}

.remove-button {
  font-size: 110%;
  color: darkred;
  top: 5px;
  right: 10px;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  position: absolute;
}

*/

/*
<!DOCTYPE HTML>
<html>

<head>
  <link rel="stylesheet" type="text/css" href="messages.css">
  <meta charset="utf-8">
</head>

<body>
  <div>
    <div class="pane">
      <h3>Horse</h3>
      <p>The horse is one of two extant subspecies of Equus ferus. It is an odd-toed ungulate mammal belonging to the taxonomic family Equidae. The horse has evolved over the past 45 to 55 million years from a small multi-toed creature, Eohippus, into the large, single-toed animal of today.</p>
    </div>
    <div class="pane">
      <h3>Donkey</h3>
      <p>The donkey or ass (Equus africanus asinus) is a domesticated member of the horse family, Equidae. The wild ancestor of the donkey is the African wild ass, E. africanus. The donkey has been used as a working animal for at least 5000 years.</p>
    </div>
    <div class="pane">
      <h3>Cat</h3>
      <p>The domestic cat (Latin: Felis catus) is a small, typically furry, carnivorous mammal. They are often called house cats when kept as indoor pets or simply cats when there is no need to distinguish them from other felids and felines. Cats are often valued by humans for companionship and for their ability to hunt vermin.
      </p>
    </div>
  </div>

  <script>*/
    const panes = [...document.getElementsByClassName('pane')],
          removeButton = document.createElement('button');
    
    removeButton.className = 'remove-button';
    removeButton.innerText = '[x]';

    panes.forEach(pane => {
      const paneRemoveButton = removeButton.cloneNode(true);
      pane.append(paneRemoveButton);
      paneRemoveButton.addEventListener('click', function() {
        this.parentElement.remove();
      });
    });
  /*</script>

</body>
</html>
*/

// 7

// style.css

/*.carousel-container {
    display: flex;
    align-items: center;
    background: #eee;
    padding: 10px;
    width: 460px;
    border-radius: 15px;
    border: 1px solid #bbb;
  }
  
  .arrow {
    padding: 0;
    background: #ddd;
    border-radius: 15px;
    border: 1px solid gray;
    font-size: 24px;
    line-height: 24px;
    height: 26px;
    color: #444;
    display: block;
  }
  
  .arrow:focus {
    outline: none;
  }
  
  .arrow:hover {
    background: #ccc;
    cursor: pointer;
  }
  
  .carousel-wrapper {
    height: 130px;
    width: 390px;
    overflow: hidden;
    margin: 0 10px;
  }
  
  ul {
    height: 130px;
    width: 9999px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 0;
    display: flex;
    transition: margin-left 300ms;
  }
  
  ul img {
    width: 130px;
    height: 130px;
    display: block; // removes extra space near images 
  }
  
  ul li {
    display: block; // removes extra space between list items 
  }*/

// index.html

/*<!DOCTYPE html>

<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="style.css">
</head>

<body>

  <!-- create your markup and styles -->
  <div class="carousel-container">
    <button class="arrow arrow-left">⇦</button>
    <div class="carousel-wrapper">
      <ul class="carousel">
        <li><img src="https://en.js.cx/carousel/1.png"></li>
        <li><img src="https://en.js.cx/carousel/2.png"></li>
        <li><img src="https://en.js.cx/carousel/3.png"></li>
        <li><img src="https://en.js.cx/carousel/4.png"></li>
        <li><img src="https://en.js.cx/carousel/5.png"></li>
        <li><img src="https://en.js.cx/carousel/6.png"></li>
        <li><img src="https://en.js.cx/carousel/7.png"></li>
        <li><img src="https://en.js.cx/carousel/8.png"></li>
        <li><img src="https://en.js.cx/carousel/9.png"></li>
        <li><img src="https://en.js.cx/carousel/10.png"></li>
      </ul>
    </div>
    <button class="arrow arrow-right">⇨</button>
  </div>

  <script>*/
    const arrowLeft = document.getElementsByClassName('arrow-left')[0],
          arrowRight = document.getElementsByClassName('arrow-right')[0],
          carouselElements = document.querySelectorAll('.carousel li'),
          carousel = document.getElementsByClassName('carousel')[0];
    arrowLeft.addEventListener('click', () => {
      const margin = Math.max((carouselElements.length - 3) * -130, parseInt(getComputedStyle(carousel).marginLeft) - 390);
      console.log(margin);
      carousel.style.marginLeft = `${margin}px`;
    });
    arrowRight.addEventListener('click', () => {
      const margin = Math.min(0, parseInt(getComputedStyle(carousel).marginLeft) + 390);
      carousel.style.marginLeft = `${margin}px`;
    });/*
  </script>

</body>
</html>*/

// https://javascript.info/event-delegation

// 1

document.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON' && event.target.classList.contains('remove-button')) {
      event.target.parentElement.remove();
    }
});

// 2

/* 
<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
</head>
<style>
  .list-element:hover {
    color: green;
    cursor: pointer;
  }
</style>
<body>

  <ul class="tree" id="tree">
    <li>Animals
      <ul>
        <li>Mammals
          <ul>
            <li>Cows</li>
            <li>Donkeys</li>
            <li>Dogs</li>
            <li>Tigers</li>
          </ul>
        </li>
        <li>Other
          <ul>
            <li>Snakes</li>
            <li>Birds</li>
            <li>Lizards</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>Fishes
      <ul>
        <li>Aquarium
          <ul>
            <li>Guppy</li>
            <li>Angelfish</li>
          </ul>
        </li>
        <li>Sea
          <ul>
            <li>Sea trout</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>

  <script>*/
    const tree = document.getElementById('tree'),
          listItems = document.getElementsByTagName('li');
    [...listItems].forEach(listItem => {
      const elementContainer = document.createElement('span');
      listItem.firstChild.data = listItem.firstChild.data.trim();
      elementContainer.classList.add('list-element');
      elementContainer.append(listItem.firstChild);
      listItem.prepend(elementContainer);
    });
    tree.addEventListener('click', event => {
      if (event.target.classList.contains('list-element')) {
        if (event.target.nextSibling) {
            event.target.nextSibling.hidden = !event.target.nextSibling.hidden;
        }
      }
    });/*
  </script>

</body>
</html>
*/

// 3

const grid = document.getElementById('grid');
grid.addEventListener('click', event => {
    if (event.target.tagName === 'TH') {
        const sortedRows = [...grid.querySelectorAll('tbody tr')].
            sort(
                (firstElement, secondElement) => 
                event.target.dataset.type === 'number'
                    ? parseInt(firstElement.children[event.target.cellIndex].innerText.trim())
                        - parseInt(secondElement.children[event.target.cellIndex].innerText.trim()) 
                    : firstElement.children[event.target.cellIndex].innerText
                        .localeCompare(secondElement.children[event.target.cellIndex].innerText)),
                gridBody = grid.tBodies[0];
        gridBody.append(...sortedRows);
    
    }
});

// 4

document.addEventListener('mouseover', event => {
    if (event.target.dataset.tooltip !== undefined) {
      const tooltip = document.createElement('div');
      tooltip.innerHTML = event.target.dataset.tooltip;
      tooltip.classList.add('tooltip');
      event.target.insertAdjacentElement('beforebegin', tooltip);
      const top = Math.max(0, event.target.offsetTop - tooltip.offsetHeight - 5),
            left = Math.max(0, event.target.offsetLeft + event.target.offsetWidth / 2 - tooltip.offsetWidth / 2);
      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
    }
  });
  document.addEventListener('mouseout', event => {
    if (event.target.dataset.tooltip !== undefined) {
      event.target.previousSibling.remove();
    }
  });

// https://javascript.info/default-browser-action

// 1

/*<script>*/
  function handler(event) {
    event.preventDefault();
    alert( "..." );
  }/*
</script>

<a href="https://w3.org" onclick="handler(event)">the browser will go to w3.org</a>*/

// 2

document.getElementById('contents').addEventListener('click', event => {
    const anchor = event.path.find(element => element.tagName === 'A');

    if (anchor !== undefined && !confirm(`Leave for ${anchor.origin}?`)) {
      event.preventDefault();
    }
    
});

// 3

document.getElementById('thumbs').addEventListener('click', event => {
    const imageAnchor = event.path.find(element => element.tagName === 'A');
    if (imageAnchor !== undefined) {
      event.preventDefault();
      document.getElementById('largeImg').src = imageAnchor.href;
      document.getElementById('largeImg').alt = imageAnchor.title;
    }
});