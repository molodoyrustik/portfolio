var $ = require('jquery');

export default {
  init() {
    var tabs = $('.tabs');
    var tabsItems = tabs.find('.tabs__item');
    var tabsButtons = tabs.find('.tabs__button');
    var tabsContent = $('.tabs-content')

    tabsButtons.on('click', (e) => {
      e.preventDefault();
      tabsItems.removeClass('tabs__item--active')

      var current = $(e.target);
      var parent = current.parent('.tabs__item');
      parent.addClass('tabs__item--active');
      var dataTab = parent.data('tab');
      var items = tabsContent.find('.tabs-content__item')
      var currentItem = items.find(`[data-tab='${dataTab}']`)
      items.removeClass('tabs-content__item--active');
      items.each((index, elem) => {
        if ($(elem).data('tab') === dataTab) {
          $(elem).addClass('tabs-content__item--active');
        }
      })
    })
  }
}