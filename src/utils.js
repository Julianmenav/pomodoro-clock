export const formatUnixToMinutes = (ms) => {
  if(ms <= 0){return "00:00"}

  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds/60)

  let minutesStr = minutes.toString()
  let secondsStr = minutes < 1 ? seconds.toString() : (seconds - minutes * 60).toString()

  if (minutesStr.length === 1){minutesStr = '0' + minutesStr}
  if (secondsStr.length === 1){secondsStr = '0' + secondsStr}
  
  return minutesStr + ":" + secondsStr
}