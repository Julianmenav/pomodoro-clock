//Retorna la hora en formato mm:ss
export const getTimer = (timeLeft) => {
    const timeString = (n) => {
      let str = n.toString()
      if (str.length >= 2)
        return str.substring(0, 2);
      return "0" + str;
    }
    let minutes = timeLeft.toDate().getHours() >= 2 ? "60" : (
      timeString(timeLeft.toDate().getMinutes())
    )
    let seconds = timeString(timeLeft.toDate().getSeconds());
    return minutes + ":" + seconds
  }