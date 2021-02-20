// implements the "can't click me" button.

const link = document.getElementById('fun');

function isInBox(x, y, top, bottom, left, right) {
  return x >= left && x <= right && y >= top && y <= bottom;
}

function randomNumberInRange(min, max) {
  return (Math.random() * (max - min)) + min;
}

function jumpLink(width, height) {
  setTimeout(() => {
    // stop the marquee animation if we're going to be
    // jumping this thing around the screen
    link.classList.add('jumpy');

    Object.assign(link.style, {
      position: 'fixed',
      top: `${randomNumberInRange(12, window.innerHeight - 12)}px`,
      left: `${randomNumberInRange(12, window.innerWidth - 12)}px`,
    });
  }, 200);
}

link.addEventListener('mouseover', evt => {
  // for mouse position
  const {pageX, pageY} = evt;
  // for link position
  const {top, bottom, left, right, width, height} = link.getBoundingClientRect();

  // It seems like Chrome (and maybe others) have a bug where pageX, pageY
  // are off by less than one (by a fraction of a number) from the actual
  // bounding box of the element it mouseover-'d. the padding of 2 around
  // these dimensions accounts for this bug.
  const args = [pageX, pageY, top - 2, bottom + 2, left - 2, right + 2].map(val => Math.floor(val));
  if (isInBox(...args)) {
    jumpLink(width, height);
  }

});

link.addEventListener('touchstart', evt => {
  evt.target.click();
})
