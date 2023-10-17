import Popup from '../popup/popupClass';
import scrollHandler from './scroll';

const anchorsInit = (headerHeight: number, popups: Popup[]) => {
  const links = Array.from(
    document.querySelectorAll('.anchor') as NodeListOf<HTMLElement>
  );

  if (links.length === 0) {
    return;
  }

  links.forEach((link) => {
    scrollHandler(link, headerHeight, popups);
  });
};

export default anchorsInit;
