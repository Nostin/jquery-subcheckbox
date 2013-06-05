(function($) {
 $.fn.checkbox_category_dropdown = function(options) {
   var settings = $.extend({
     selectAll   : 'select-all'
   }, options);

   var selector = this;
   setup();

   /*hover in events*/
   $('.ccd-main-list-item-wrap', selector).mouseenter(function () {
      $(this).parents('li.ccd-main-item').find('ul.ccd-sub-list').show();
      $(this).parents('li.ccd-main-item').find('ul.ccd-sub-list-values').hide();
   });
   $('ul.ccd-sub-list-values', selector).mouseenter(function () {
      $(this).parents('li.ccd-main-item').find('ul.ccd-sub-list').show();
      $(this).hide();
   });
   /*end hover-ins*/
   /*hover out events*/
   $('li.ccd-main-item', selector).mouseleave(function () {							
      empty_and_refill_subvalues($(this));
   });
   /*end hover outs*/
   
   $('ul.ccd-sub-list input', selector).change(function() {
      if($(this).is(':checked')) {
         $(this).parents('li.ccd-main-item').find('.ccd-main-list-item-wrap input').prop('checked', true);
		
         if($(this).hasClass(settings.selectAll)) {
            $(this).parents('ul.ccd-sub-list').find('li input').prop('checked', false);
            $(this).prop('checked', true);
         }
         else {
            $(this).parents('ul.ccd-sub-list').find('li input.'+settings.selectAll).prop('checked', false);
         }
      }

      //if all the subcheckboxes are unchecked, uncheck the main one
      if($(this).parents('ul.ccd-sub-list').find('li input:checked').length == 0) {
		$(this).parents('li.ccd-main-item').find('div.ccd-main-list-item-wrap input').prop('checked', false);
	  }
   });
						
   $('li.ccd-main-item .ccd-main-list-item-wrap input', selector).change(function() {
      $subListWrapper = $(this).parents('li.ccd-main-item').find('ul.ccd-sub-list');
      if($(this).is(':checked') === false) {
         $('input', $subListWrapper).prop('checked', false);
      }
      else {
         //if no subitems are checked and there is an "all", check it
		 if ($('input:checkbox:checked', $subListWrapper).length === 0) {
		     $('input.'+settings.selectAll, $subListWrapper).prop('checked', true);
		 }
      }
   });
   
   function setup() {
      $('li ul', selector).addClass('ccd-sub-list');
	  
      $('li', selector).addClass('ccd-main-item');
      $('ul.ccd-sub-list li', selector).removeClass('ccd-main-item');

      $('li.ccd-main-item input', selector).addClass('ccd-wrapme');
      $('li.ccd-main-item label', selector).addClass('ccd-wrapme');
      $('ul.ccd-sub-list li input', selector).removeClass('ccd-wrapme');
      $('ul.ccd-sub-list li label', selector).removeClass('ccd-wrapme');

      $('li.ccd-main-item', selector).each(function() {
         $('.ccd-wrapme', $(this)).wrapAll('<div class="ccd-main-list-item-wrap" />');
      });
      $('.ccd-wrapme', selector).removeClass('ccd-wrapme');

      $('ul.ccd-sub-list', selector).after('<ul class="ccd-sub-list-values"></ul>');
      $('li.ccd-main-item ul.ccd-sub-list', selector).hide();
	  $('li.ccd-main-item', selector).each(function() {
           empty_and_refill_subvalues($(this));
      });
   }
   
   function empty_and_refill_subvalues($mainListItem) {
      $subList = $mainListItem.find('ul.ccd-sub-list');
      $subListValues = $mainListItem.find('ul.ccd-sub-list-values');

      $subListValues.empty();
      $('li', $subList).each(function() {
	     $chegger = $(this).find('input').is(':checked');
	     if($chegger) {
		     $subListValues.append('<li><p>'+ $(this).find('label').text() +'</p></li>');
	     }
      });

      $subList.hide();
      $subListValues.show();
   }
 }
}(jQuery));