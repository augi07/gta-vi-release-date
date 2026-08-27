const DIAGNOSTICS_VERSION = 'countdown-transition-2026-08-27-v1';

function animationDetails(element: Element | null) {
  if (!element || typeof element.getAnimations !== 'function') return [];
  return element.getAnimations().map((animation) => ({
    playState: animation.playState,
    currentTime: animation.currentTime,
    startTime: animation.startTime,
    effectTiming: animation.effect?.getComputedTiming()
  }));
}

function styleDetails(element: Element | null, pseudo?: string) {
  if (!element) return null;
  const style = getComputedStyle(element, pseudo);
  return {
    display: style.display,
    visibility: style.visibility,
    opacity: style.opacity,
    height: style.height,
    marginTop: style.marginTop,
    transform: style.transform,
    filter: style.filter,
    animationName: style.animationName,
    animationDuration: style.animationDuration,
    animationIterationCount: style.animationIterationCount,
    transitionDuration: style.transitionDuration
  };
}

export function logCountdownState(label: string, target: Date) {
  const countdown = document.getElementById('countdown');
  const button = document.getElementById('official-link');
  const hero = document.querySelector('.hero');
  const title = document.querySelector('.event-title');
  const logo = document.querySelector('.gta-logo');
  let savedPreferences: unknown = null;
  try {
    savedPreferences = JSON.parse(localStorage.getItem('gta6-preferences') || 'null');
  } catch {
    savedPreferences = 'invalid JSON';
  }

  console.groupCollapsed(`[countdown-debug] ${label}`);
  console.log('diagnostics', {
    version: DIAGNOSTICS_VERSION,
    url: location.href,
    host: location.host,
    timestamp: new Date().toISOString(),
    target: target.toISOString(),
    millisecondsRemaining: target.getTime() - Date.now(),
    bodyClasses: [...document.body.classList],
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    savedPreferences,
    stylesheets: [...document.styleSheets].map((sheet) => sheet.href).filter(Boolean)
  });
  console.log('timer', styleDetails(countdown), animationDetails(countdown));
  console.log('button', {
    text: button?.textContent?.trim(),
    href: button instanceof HTMLAnchorElement ? button.href : null,
    style: styleDetails(button),
    animations: animationDetails(button)
  });
  console.log('glow', {
    title: styleDetails(title),
    logo: styleDetails(logo),
    aura: styleDetails(hero, '::before'),
    titleAnimations: animationDetails(title),
    logoAnimations: animationDetails(logo)
  });
  console.groupEnd();
}

export function logCountdownSequence(target: Date) {
  logCountdownState('completion-start', target);
  requestAnimationFrame(() => logCountdownState('completion-first-frame', target));
  window.setTimeout(() => logCountdownState('completion-mid-fade-500ms', target), 500);
  window.setTimeout(() => logCountdownState('completion-handoff-1050ms', target), 1050);
  window.setTimeout(() => logCountdownState('completion-settled-2500ms', target), 2500);
  window.setTimeout(() => logCountdownState('completion-persistence-7000ms', target), 7000);
}
