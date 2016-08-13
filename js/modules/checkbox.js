document.querySelector('html').addEventListener('click', function(event) {
  if (event.target.closest('.checkbox-container')) {
    checkbox_container = event.target.closest('.checkbox-container');
    checkbox_container.classList.toggle('checked');
    var event = document.createEvent("HTMLEvents");
    event.initEvent("change", false, true);
    checkbox_container.dispatchEvent(event);
  }
});
