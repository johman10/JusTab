var selects = document.querySelectorAll('.select');
for (var select of selects) {
  var selectList = select.querySelector('.list');
  var selectInput = select.querySelector('input');

  selectInput.addEventListener('focus', function(event) {
    var currentValue = document.querySelector('.select .list-item[data-value="' + this.value + '"]');
    currentValue.classList.add('selected');

    selectList.style.display = 'block';
    setListPostion(selectList, currentValue);
    if (selectList.scrollHeight > selectList.offsetHeight) {
      // If there is scroll-space
      selectList.scrollTop = currentValue.offsetTop;
    }
  });

  selectInput.addEventListener('keyup', function(event) {
    event.preventDefault();
  });

  selectInput.addEventListener('blur', function(event) {
    // Delay to prevent hide before click trigger
    setTimeout(function() {
      resetBackground(select);
      selectList.style.display = 'none';
    }, 100);
  });

  var listItems = selectList.querySelectorAll('.list-item')
  for (var listItem of listItems) {
    listItem.addEventListener('click', function(event) {
      resetBackground(select);
      selectInput.value = this.innerText;
      saveOptions();
      selectList.style.display = 'none';
    });
  }
}

function resetBackground(select) {
  var listItems = select.querySelectorAll('.list-item')
  for (var listItem of listItems) {
    listItem.classList.remove('selected');
  }
}

function setListPostion(selectList, option) {
  var newTop = parentIndex(option) * -option.offsetHeight - 21;
  selectList.style.top = newTop + 'px';
  if (selectList.getBoundingClientRect().top < selectList.closest('.options-window').getBoundingClientRect().top) {
    setListPostion(selectList, option.previousElementSibling);
  }
}

function parentIndex(element) {
  return [].indexOf.call(element.parentNode.children, element);
}
