import accordionInit from './accordion/init';
import anchorsInit from './anchor/init';
import appearInit from './appear/init';
import marqueeInit from './marquee/init';
import initPopups from './popup/init';
import scrollBarInit from './scrollbar';
import submenuToggle from './submenu/init';

export const init = () => {
  scrollBarInit();
  submenuToggle();
  marqueeInit();
  accordionInit();

  appearInit();

  // const header = document.querySelector('.header') as HTMLElement;
  // // const headerHeight = header ? header.offsetHeight : 0;
  // let isScrolled = false;

  // if (header) {
  //   if (window.scrollY > 20) {
  //     header.classList.add('scrolled');
  //     isScrolled = true;
  //   }

  //   window.addEventListener('scroll', () => {
  //     if (window.scrollY > 20 && !isScrolled) {
  //       header.classList.add('scrolled');
  //       isScrolled = true;
  //       return;
  //     }

  //     if (window.scrollY <= 20 && isScrolled) {
  //       header.classList.remove('scrolled');
  //       isScrolled = false;
  //     }
  //   });
  // }

  const popups = initPopups();

  anchorsInit(0, popups);

  const formArr = document.querySelectorAll('form');
  const hasError = false;

  if (formArr.length !== 0) {
    formArr.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const inputs = Array.from(
          form.querySelectorAll('input, textarea') as NodeListOf<
            HTMLInputElement | HTMLTextAreaElement
          >
        );

        popups.forEach(({ timeline, isThanks, isError }) => {
          if (isThanks && !hasError) {
            timeline?.play();

            if (inputs.length !== 0) {
              inputs.forEach((inputProp) => {
                const input = inputProp;
                console.log(input, input.value);

                // if (input.type === 'tel') {
                //   return;
                // }

                input.value = '';
              });
            }

            // if (inputMaskArray) {
            //   inputMaskArray.forEach((inputMaskProp) => {
            //     const inputMask = inputMaskProp;
            //     inputMask.value = '';
            //     inputMask.updateValue();
            //   });
            // }
          } else if (isError && hasError) {
            timeline?.play();
          } else {
            timeline?.reverse();

            setTimeout(() => {
              document.querySelector('html')?.classList.add('lock');
              document.querySelector('body')?.classList.add('lock');
            }, 300);
          }
        });
      });
    });

    // document.addEventListener(
    //   'wpcf7mailsent',
    //   function () {
    //     popups.forEach(({ timeline, isThanks, isError }) => {
    //       if (isThanks && !hasError) {
    //         timeline?.play();

    //         formArr.forEach((form) => {
    //           const inputs = Array.from(
    //             form.querySelectorAll('input, textarea') as NodeListOf<
    //               HTMLInputElement | HTMLTextAreaElement
    //             >
    //           );

    //           if (inputs.length !== 0) {
    //             inputs.forEach((inputProp) => {
    //               const input = inputProp;
    //               if (input.type === 'tel') {
    //                 return;
    //               }
    //               input.value = '';
    //             });
    //           }

    //           if (inputMaskArray) {
    //             inputMaskArray.forEach((inputMaskProp) => {
    //               const inputMask = inputMaskProp;
    //               inputMask.value = '';
    //               inputMask.updateValue();
    //             });
    //           }
    //         });
    //       } else if (isError && hasError) {
    //         timeline?.play();
    //       } else {
    //         timeline?.reverse();

    //         setTimeout(() => {
    //           document.querySelector('html')?.classList.add('lock');
    //           document.querySelector('body')?.classList.add('lock');
    //         }, 300);
    //       }
    //     });
    //   },
    //   false
    // );
  }
};
