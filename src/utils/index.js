import { useState, useEffect } from 'react';

/**
  * Récupération d'un url pour pouvoir récupérer des paramètre à l'interieur'
  * @param  {String} string
  * @returns  {String} 
  */
export const truncStr = (string, limit) => (string.length > limit
  ? `${string
    .trim()
    .substring(0, limit - 3)
    .trim()}...`
  : string);

/**
  * Récupération de la date pour changer son format et le mettre au format français
  * @param  {String} reviewDate
  * @returns  {String} reviewDateFormated
  */
export const formatDate = (reviewDate) => {
  const options = {
    day: 'numeric', month: 'numeric', year: 'numeric',
  };
  const timestamp = Date.parse(reviewDate);
  const timestampToDate = new Date(timestamp);
  const reviewDateFormated = timestampToDate.toLocaleDateString('fr-FR', options);
  return reviewDateFormated;
};

/**
  * Récupération de la durée d'un film pour mettre en format voulu
  * @param  {String} n
  * @returns  {String} `${rhours}h ${rminutes}min`
  */
export const timeConvert = (n) => {
  const num = n;
  const hours = (num / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return `${rhours}h ${rminutes}min`;
}

/**
  * function permettant de voir la largeur/hauteur de la page et de mettre ce que l'on souhaite
  * On peut changer les chiffres pour avoir le rapport qu'on souhaite
  */
export const useWindowSize = () => {
  const isSSR = typeof window !== "undefined";
  const [windowSize, setWindowSize] = useState({
    width: isSSR && window.innerWidth,
    height: isSSR ? 800 : window.innerHeight,
  });

  const changeWindowSize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  return windowSize;
}
