import { templates, select, classNames } from '../settings.js';

class Home {
  constructor(element) {
    const thisHome = this;

    thisHome.render(element);
    thisHome.initWidget();
    thisHome.initLink();
  }

  render(element) {
    const thisHome = this;

    const generateHTML = templates.homePage();

    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.wrapper.innerHTML = generateHTML;
  }

  initWidget() {
    // eslint-disable-next-line
    const thisHome = this;
    let elem = document.querySelector('.main-carousel');
    // eslint-disable-next-line
    let flkty = new Flickity(elem, {
      cellAlign: 'left',
      contain: true,
      autoPlay: true,
      adaptiveHeight: true,
      prevNextButtons: false,
      draggable: '>1',
    });
  }

  initLink() {
    const thisHome = this;

    thisHome.homeLinks = document.querySelectorAll(select.nav.homeLinks);
    thisHome.pages = document.querySelector(select.containerOf.pages).children;
    thisHome.navLinks = document.querySelectorAll(select.nav.links);

    for (let link of thisHome.homeLinks) {
      link.addEventListener('click', function (event) {
        event.preventDefault;

        const clickedElement = this;
        const id = clickedElement.getAttribute('href');

        thisHome.activatePage(id);
      });
    }
  }

  activatePage(pageId) {
    const thisHome = this;

    for (let page of thisHome.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for (let link of thisHome.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );

    }
  }
}

export default Home;