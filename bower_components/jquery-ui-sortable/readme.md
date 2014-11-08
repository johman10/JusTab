jQuery UI Sortable
========

This is a custom, standalone build of jQuery UI that includes the minimum code required to utilize sortables. It includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js and jquery.ui.sortable.js.

Usage
------

```html
<div class="sortable">
    <div class="sort-item"><i class="icon-sort"></i> Sort Item 1</div>
    <div class="sort-item"><i class="icon-sort"></i> Sort Item 2</div>
    <div class="sort-item"><i class="icon-sort"></i> Sort Item 3</div>
    <div class="sort-item"><i class="icon-sort"></i> Sort Item 4</div>
</div>
```

Call `sortable` on the parent element (`.sortable`) which contains the sorted elements (`.sort-item`). Specify the `axis`, `handle` and the `update` callback.

```javascript
('.sortable').sortable({
    items: '.sort-item',
    opacity: 0.7,
    axis: 'y',
    handle: 'i.icon-sort',
    update: function() {
        var data = $(this).sortable('serialize');
        console.log(data)
    }
});
```

Official Documentation / API
------

To see all of the available options and more examples, visit the [official documentation](http://jqueryui.com/sortable/) and the [official API](http://api.jqueryui.com/sortable/).
