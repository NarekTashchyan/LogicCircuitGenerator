import { Simplify } from "./simplify.js";

document.addEventListener("DOMContentLoaded", function() {
  const simplifyButton = document.querySelector(".btn-primary");
  simplifyButton.addEventListener("click", simplifyEquation);
});

function simplifyEquation() {
  const equationInput = document.getElementById("boolean-equation");
  const equation = equationInput.value;

  let simplifiedExpression = Simplify.applyIdentityLaw(equation);
  simplifiedExpression = Simplify.applyDominationLaw(simplifiedExpression);
  simplifiedExpression = Simplify.applyIdempotentLaw(simplifiedExpression);
  simplifiedExpression = Simplify.applyComplementLaw(simplifiedExpression);
  simplifiedExpression = Simplify.applyDoubleNegationLaw(simplifiedExpression);
  simplifiedExpression = Simplify.applyCommutativeLaw(simplifiedExpression);
  simplifiedExpression = Simplify.applyAssociativeLaw(simplifiedExpression);
  simplifiedExpression = Simplify.applyDistributiveLaw(simplifiedExpression);
  simplifiedExpression = Simplify.applyDeMorgansLaw(simplifiedExpression);

  const operations = [...simplifiedExpression].filter(x => x != ' ');
  const first = [];
  const second = [];
  const third = [];
  const fourth = ['Q']
  operations.map((a, b) => {
    if (a == '!'){
      first.push(a);
      first.push(operations[b + 1]);
      operations.splice(b, 1);
    }
  });
  operations.map((a, b) => {
    if(a == '&'){
      second.push(operations[b - 1]);
      second.push(a);
      second.push(operations[b + 1]);
    }
  });
  operations.map((a, b) => {
    if(a == '|' || a == '^'){
      third.push(operations[b - 1]);
      third.push(a);
      third.push(operations[b + 1]);
    }
  });
  operations.map((a, b) => {
    if(a == 'Q'){
      fourth.push(a)
    }
  });

  const resultMessage = document.getElementById("result-message");
  resultMessage.innerHTML = "Simplified equation: " + simplifiedExpression;

  const gateContainer = document.createElement('div');
  gateContainer.classList.add('gate-container');
  resultMessage.appendChild(gateContainer);

  const gateImages = {
    '&': './AND.png',
    '|': './OR.png',
    '!': './NOT.png',
    '^': './XOR.png'
  };

  const displayGates = (gatesArray, columnClass) => {
    const columnContainer = document.createElement('div');
    columnContainer.classList.add(columnClass);
    gateContainer.appendChild(columnContainer);
  
    gatesArray.forEach((gate, gateIndex) => {
      const element = document.createElement('div');
      if (gateImages.hasOwnProperty(gate)) {
        const image = document.createElement('img');
        image.src = gateImages[gate];
        image.alt = gate;
        image.classList.add('logic-gate');
        image.style.width = '250px';
        if (gateIndex > 0) {
          image.dataset.from = gatesArray[gateIndex - 1];
        }
        if (gateIndex < gatesArray.length - 1) {
          image.dataset.to = gatesArray[gateIndex + 1];
        }
  
        element.appendChild(image);
      } else {
        const letter = document.createTextNode(gate);
        element.appendChild(letter);
      }
      columnContainer.appendChild(element);
    });
  };

  displayGates(first, 'first-column');
  displayGates(second, 'second-column');
  displayGates(third, 'third-column');
  displayGates(fourth, 'fourth-column')
  connectImagesWithLines();
}

function connectImagesWithLines() {
  const images = document.querySelectorAll('img.logic-gate');
  console.log(images)
  const svgContainer = document.getElementById("svg-container");

  console.log("Connecting images...");

  images.forEach((image) => {
    const rect = image.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const from = image.dataset.from;
    const to = image.dataset.to;

    if (from) {
      const fromImage = document.querySelector(`img[data-to="${from}"]`);
      if (fromImage) {
        const fromRect = fromImage.getBoundingClientRect();
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", fromRect.right);
        line.setAttribute("y1", y);
        line.setAttribute("x2", x);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "black");
        svgContainer.appendChild(line);
      }
    }

    if (to) {
      const toImage = document.querySelector(`img[data-from="${to}"]`);
      if (toImage) {
        const toRect = toImage.getBoundingClientRect();
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x);
        line.setAttribute("y1", y);
        line.setAttribute("x2", toRect.left);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "black");
        svgContainer.appendChild(line);
      }
    }
  });

  console.log("Connection completed.");
}





