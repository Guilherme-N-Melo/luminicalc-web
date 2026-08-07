const display = document.querySelector('.result');
const calcbuttons = document.querySelector('.buttons');
const darktheme = document.querySelector('.theme');

calcbuttons.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  buttonClick(btn);
});

window.addEventListener('keydown', (e) => {
  let keyboard = e.key;

  if (keyboard === 'Enter') keyboard = '=';
  if (keyboard === 'Backspace') keyboard = 'Del';
  if (keyboard === '*') keyboard = 'x';
  if (keyboard === 'r') keyboard = '√';
  if (keyboard === 'p') keyboard = '%';
  if (keyboard === 'Escape') keyboard = 'C';

  const btn = Array.from(calcbuttons.querySelectorAll('button')).find(
    (button) => button.textContent.trim() === keyboard
  );

  if (btn) {
    e.preventDefault();
    buttonClick(btn);
  }
});

function buttonClick(btn) {
  if (!btn) return;

  const val = btn.textContent.trim();

  if (display.value === 'Error') {
    display.value = '0';
  }

  if (val === 'C') {
    display.value = '0';
    return;
  }

  if (val === 'Del') {
    if (display.value.length > 1) {
      display.value = display.value.slice(0, -1);
    } else {
      display.value = '0';
    }
    return;
  }

  if (val === '=') {
  try {
    let expression = display.value;
    expression = expression.replaceAll('x', '*');
    expression = expression.replaceAll('^', '**');
    expression = expression.replaceAll('√', 'Math.sqrt');
    expression = expression.replaceAll('%', '/100*'); 

    display.value = eval(expression);
  } catch (error) {
    display.value = 'Error';
  }
  return;
}

  if (val === '√') {
    if (display.value === '0') {
      display.value = '√(';
    } else {
      display.value += '√(';
    }
    return;
  }

  if (val === '()') {
    const openCount = display.value.split('(').length - 1;
    const closeCount = display.value.split(')').length - 1;

    if (openCount > closeCount) {
      display.value += ')';
    } else {
      if (display.value === '0') {
        display.value = '(';
      } else {
        display.value += '(';
      }
    }
    return;
  }

  const operators = ['+', '-', 'x', '/', '%', '^'];

  if (display.value === '0') {
  if (val === '-') {
    display.value = '-';
  } else if (operators.includes(val)) {
    display.value += val;
  } else {
    display.value = val;
  }
    } else {
      display.value += val;
    }
}

const savedTheme = localStorage.getItem('darkmode');
if (savedTheme === 'true') {
  document.body.classList.add('darkmode');
  if (darktheme) darktheme.checked = true;
} else {
  document.body.classList.remove('darkmode');
  if (darktheme) darktheme.checked = false;
}

if (darktheme) {
  darktheme.addEventListener('change', () => {
    if (darktheme.checked) {
      document.body.classList.add('darkmode');
      const blackLogo = document.querySelector('.luminicalc-logo');
      blackLogo.src = 'img/white-luminicalc-logo.png';
      localStorage.setItem('darkmode', 'true');
    } else {
      const whiteLogo = document.querySelector('.luminicalc-logo');
      whiteLogo.src = 'img/black-luminicalc-logo.png';
      document.body.classList.remove('darkmode');
      localStorage.setItem('darkmode', 'false');
    }
  });
}
