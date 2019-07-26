import sidebar from'./sidebar';
import sidebarToggle from'./sidebarToggle';
import sidebarActiveClass from'./sidebarActiveClass';
import sidebarTransition from'./sidebarTransition';

export default {
  init() {
    sidebar();
    sidebarToggle();
    sidebarActiveClass();
    sidebarTransition();
  }
}