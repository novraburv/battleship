function Ship (size) {
  let HP = size

  function getHP () {
    return HP
  }

  function hit () {
    HP--
  }

  return { getHP, hit }
}

export { Ship }
