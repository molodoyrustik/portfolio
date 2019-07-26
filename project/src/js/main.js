import preloader from'./modules/common/preloader';
import wow from'./modules/common/wow';
import mainMenu from'./modules/common/mainMenu';
import goButtons from'./modules/common/goButtons';
import scrollParallax from'./modules/common/scrollParallax';

import flipCard from'./modules/flipCard';
import mouseParallax from'./modules/mouseParallax';
import authForm from'./net/authForm';

import sidebar from'./modules/sidebar';
import blur from'./modules/blur';
import feedback from'./net/feedback';

import slider from'./modules/slider';

import gmap from'./modules/gmap';

// common
preloader.init();
wow.init();
mainMenu.init();
goButtons.init();
scrollParallax.init();

// index-page
authForm.init();
flipCard.init();
mouseParallax.init();

// works-page
slider.init();
blur.init();
feedback.init();

// blog-page
sidebar.init();

// about-page
gmap.init();
