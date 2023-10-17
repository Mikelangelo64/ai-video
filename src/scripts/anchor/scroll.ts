import Popup from '../popup/popupClass';

const closePopupsHandler = (popups: Popup[]) => {
  if (popups.length === 0) {
    return;
  }

  popups.forEach(({ timeline, openButtons }) => {
    if (timeline && timeline.progress > 0) {
      timeline.reverse();

      openButtons.forEach((openBtn) => {
        openBtn.classList.remove('_opened');
      });
    }
  });
};

export const scrollBannerHandler = (headerHeight: number) => {
  const bannerArray = document.querySelectorAll<HTMLElement>('.banner');

  if (bannerArray.length === 0) {
    return;
  }

  bannerArray.forEach((banner) => {
    const nextElement = banner.nextElementSibling as HTMLElement | null;
    const buttonArray =
      banner.querySelectorAll<HTMLButtonElement>('.banner__down');

    if (buttonArray.length === 0 || !nextElement) {
      return;
    }

    buttonArray.forEach((button) => {
      button.addEventListener('click', (evt) => {
        evt.preventDefault();

        window.scrollTo({
          top: nextElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      });
    });
  });
};

const scrollHandler = (
  link: HTMLElement,
  headerHeight: number,
  popups: Popup[]
) => {
  const sectionName = link.dataset.goto;
  if (!sectionName) {
    return;
  }

  const section = document.querySelector(
    `${sectionName}`
  ) as HTMLElement | null;
  if (!section) {
    return;
  }

  link.addEventListener('click', (evt) => {
    evt.preventDefault();

    closePopupsHandler(popups);

    window.scrollTo({
      top: section.offsetTop - headerHeight,
      behavior: 'smooth'
    });
  });
};

export default scrollHandler;
