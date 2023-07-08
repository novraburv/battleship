function Ship(size) {
  let HP = size;

  function getHP() {
    return HP;
  }

  function isSunk() {
    return HP === 0 ? true : false
  }

  function hit() {
    HP--;
  }

  return { getHP, isSunk, hit };
}

export { Ship };
