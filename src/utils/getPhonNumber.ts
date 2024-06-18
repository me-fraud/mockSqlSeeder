const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  }
export const getPhoneNumber = () => {
    let phone = '+7707'
    while (phone.length < 12) {
      phone = phone + getRandomInt(10).toString()
    }
    return phone
  }