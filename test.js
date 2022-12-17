const a = (number) => {
  return new Promise(res => {
    setTimeout( () => {
      res(number);
    }, 1000)
  })
}
const b = (number) => {
  return new Promise(res => {
    setTimeout( () => {
      res(number);
    }, 1000)
  })
}


const total = async (x, y) => {
  try {
    const c = await Promise.all([a(x), b(y)])
    const plus = c.reduce((prev, cur) => {
      console.log(prev, cur)
      return prev + cur;
    })
    console.log(plus);
  } catch (error) {
    console.error(error)
  }

}
total(2, 3);