'use client';
import { MouseEventHandler } from "react";
import useTheme from '../hooks/useTheme';

const ThemeToggle = (props: { className?: string }) => {
  const [theme, setTheme] = useTheme('dark');
  const isDark = theme !== 'light';

  return (
    <div className={`relative flex flex-row max-w-fit max-h-fit gap-x-3 border-[1px] border-base-300 px-2 py-1 rounded-2xl overflow-hidden ${props.className || ''}`}>
      <div className="absolute h-full w-full inset-0 bg-base-100 z-[-1] opacity-25"></div>
      <DarkIcon className={isDark ? "text-violet-700" : ''} onClick={isDark ? undefined : () => setTheme('dark')}/>
      <LightIcon className={isDark ? '' : "text-amber-500"} onClick={isDark ? () => setTheme('light') : undefined}/>
    </div>
  );
}

const LightIcon = (props: { onClick?: MouseEventHandler<SVGSVGElement>; className?: string; }) => (
  <svg
    onClick={props.onClick}
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ` + (props.className || '')}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const DarkIcon = (props: { onClick?: MouseEventHandler<SVGSVGElement>; className?: string; }) => (
  <svg
    onClick={props.onClick}
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ` + (props.className || '')}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

export default ThemeToggle;