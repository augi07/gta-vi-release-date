import { useLayoutEffect, useState } from 'react';
import SplitFlapDisplay from 'react-split-flap-display';

// A countdown moves downward. Putting the flaps in descending order means a
// normal tick (22 -> 21) advances one physical card instead of cycling 9 cards.
const COUNTDOWN_DIGITS = [' ', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];

type Props = {
  name: string;
  initialValue?: string;
  digits?: number;
};

export default function AirportFlap({ name, initialValue = '0', digits = 2 }: Props) {
  const [value, setValue] = useState(() => {
    if (typeof document !== 'undefined') {
      const currentValue = document.getElementById(name)?.getAttribute('aria-label');
      if (currentValue) return currentValue.padStart(digits, '0');
    }
    return initialValue.padStart(digits, '0');
  });

  useLayoutEffect(() => {
    const currentValue = document.getElementById(name)?.getAttribute('aria-label');
    if (currentValue) setValue(currentValue.padStart(digits, '0'));
    const update = (event: Event) => {
      const nextValue = (event as CustomEvent<string>).detail;
      setValue(nextValue.padStart(digits, '0'));
    };
    const eventName = `countdown:${name}`;
    window.addEventListener(eventName, update);
    return () => window.removeEventListener(eventName, update);
  }, [digits, name]);

  return (
    <SplitFlapDisplay
      className="airport-flap-display"
      aria-hidden="true"
      background="#111318"
      borderColor="#030405"
      borderWidth="3px"
      characterSet={COUNTDOWN_DIGITS}
      characterWidth=".68em"
      fontSize="1em"
      minLength={digits}
      padDirection="left"
      step={65}
      textColor="#eee9dc"
      value={value}
      withSound={false}
    />
  );
}
