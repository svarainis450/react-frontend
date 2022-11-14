import { useEffect, useState } from 'react';

export const useTimer = (time: number) => {
  const [timer, setTimer] = useState<Array<string | number | null>>([
    null,
    null,
    null,
  ]);

  useEffect(() => {
    let n: number = time;

    const timer = setInterval(() => {
      let hours: string | number = parseInt(`${(n % 86400) / 3600}`, 10);
      let minutes: string | number = parseInt(`${(n % 3600) / 60}`, 10);
      let seconds: string | number = parseInt(`${n % 60}`, 10);

      //   hours = hours < 10 ? hours : hours;
      //   minutes = minutes < 10 ? minutes : minutes;
      //   seconds = seconds;

      setTimer([hours, minutes, seconds]);

      n--;
      if (n < 0) {
        n = 0;
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return timer;
};
