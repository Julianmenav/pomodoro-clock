import { useEffect, useState } from "react";


export const useHiddenMenu = () => {
  const [isMenuHidden, setIsMenuHidden] = useState(true);

  useEffect(() => {
    if(!isMenuHidden){
      document.addEventListener('click', backgroundClick);
    } 
    return () => {
      document.removeEventListener('click', backgroundClick);
    }
  }, [isMenuHidden])

  const backgroundClick = (e) => {
    if (!e.target.closest('.noHideMenu')){
      setIsMenuHidden(true);
    }
  }

  return [isMenuHidden, setIsMenuHidden]
}
