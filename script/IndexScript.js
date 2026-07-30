const display = document.querySelector('.result');
const calcbuttons = document.querySelector('.buttons');

calcbuttons.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  buttonClick(btn);
});

window.addEventListener('keydown', (e) => {
    let keyboard =e.key;
    if (keyboard === 'Enter') {keyboard = '=';
    }else if (keyboard === 'Backspace'){ keyboard = 'Del';
    }else if (keyboard === '*') keyboard = 'x';
    const btn = Array.from(calcbuttons.querySelectorAll('button')).find(
      (button) => button.textContent.trim() === keyboard
    );

    if (!btn) return;
    buttonClick(btn);
  }
);

const calcStorage = {
  accumulator: null,
  operator: null,
};

function buttonClick(btn) {
  const val = btn.textContent.trim();

  if (!isNaN(val)) {
    if (display.value === '0') {
      display.value = val;
    } else {
      display.value += val;
    }
    return;
  }

  switch (val) {
    case '+':
    case '-':
    case 'x':
    case '/':
     let valorAtual = parseFloat(display.value);
    if (calcStorage.operator) {
      if (calcStorage.operator === '+') calcStorage.accumulator += valorAtual;
      else if (calcStorage.operator === '-') calcStorage.accumulator -= valorAtual;
      else if (calcStorage.operator === 'x') calcStorage.accumulator *= valorAtual;
      else if (calcStorage.operator === '/') calcStorage.accumulator /= valorAtual;
    } else {
      calcStorage.accumulator = valorAtual;
    }
      calcStorage.operator = val;
      display.value = '0';
      break;

    case '.':
      if (!display.value.includes('.')) {
        display.value += '.';
      }
      break;

    case 'C':
      display.value = '0';
      calcStorage.accumulator = null;
      calcStorage.operator = null;
      break;

    case 'Del':
      if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
      } else {
        display.value = '0';
      }
      break;

    case '=':
      if (calcStorage.accumulator !== null && calcStorage.operator !== null) {
        let secondNum = parseFloat(display.value);
        let result = calculate(calcStorage.accumulator, secondNum, calcStorage.operator);
        display.value = result;
        calcStorage.accumulator = null;
        calcStorage.operator = null;
      }
      break;

    default:
      break;
  }
}

function calculate(first, second, operator) {
  switch (operator) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case 'x':
      return first * second;
    case '/':
      return second !== 0 ? first / second : 'Really?';
    default:
      return second;
  }
}

