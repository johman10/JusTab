document.querySelector('body').addEventListener('click', function(event) {
  var coreItem = event.target.closest('.core-item')
  if (coreItem) {
    var collapseItem = coreItem.nextSibling;
    var expanded = coreItem.classList.contains('expanded')
    var coreItemIcon = coreItem.querySelector('.core-item-icon');

    if (collapseItem.classList.contains('core-collapse')) {
      var allCoreItems = document.querySelectorAll('.core-item.expanded');
      var allCoreCollapse = document.querySelectorAll('.core-collapse.expanded');

      for(var loopCoreItem of allCoreItems) {
        loopCoreItem.classList.remove('expanded');
      }

      for(var loopCoreCollapse of allCoreCollapse) {
        loopCoreCollapse.classList.remove('expanded');
      }

      if (!expanded) {
        coreItem.classList.add('expanded');
        collapseItem.classList.add('expanded');
      }
    }
  }
});
