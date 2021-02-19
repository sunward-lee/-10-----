// once
const once = function(fn) {
  return function(...args) {
    if (fn) {
      const ret = fn.apply(this, args);
      fn = null;
      return ret;
    }
  };
};
const list = document.getElementById("list");
const btns = list.querySelectorAll("button");
btns.forEach(btn => {
  btn.addEventListener(
    "click",
    once(e => {
      const target = e.target;
      setTimeout(() => {
        list.removeChild(target.parentNode);
      }, 800);
    })
  );
});

// throttle 节流
const throttle = function(fn, ms = 100) {
  let throttleTimer = null;
  return function(...args) {
    if (!throttleTimer) {
      const ret = fn.apply(this, args);
      throttleTimer = setTimeout(() => {
        throttleTimer = null;
      }, ms);
      return ret;
    }
  };
};

// debounce 节流
const debounce = function(fn, ms = 100) {
  let debounceTimer = null;
  return function(...args) {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
};

const panel = document.getElementById("panel");
panel.addEventListener(
  "mousemove",
  debounce(e => {
    const { x, y } = e;
    e.target.style.background = `linear-gradient(${y}deg, 
    hsl(0, 50%, 50%),
    hsl(${0.5 * x}, 50%, 50%))`;
  }, 500)
);
