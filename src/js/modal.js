/**
 *	@class Modal. Create and manage modal windows
 *  @requires: floats.
 *	@return Public Object.
 */

ui.modal = function(conf){
	var that = ui.floats(); // Inheritance
	
	// Global configuration
	conf.$trigger = $(conf.element);
	conf.closeButton = true;
	conf.classes = 'box';
	conf.position = {
		fixed:true
	};
	conf.publish = that.publish;
	
	
	// Privated methods
	var show = function(event){
		dimmer.on();
		that.show(event, conf);
		$('.ch-modal .btn.close, .closeModal').bind('click', hide);
		conf.$trigger.blur();

        return conf.publish; // Returns publish object
	};

	var hide = function(event){
		dimmer.off();
		that.hide(event, conf);
        return conf.publish; // Returns publish object
	};
	
	var position = function(){
		ui.positioner(conf.position);
		return conf.publish; // Returns publish object
	}


	// Dimmer
	var dimmer = {
		on: function(){
			$('<div>').bind('click', hide).addClass('ch-dimmer').css({height:$(window).height(), display:'block', zIndex:ui.utils.zIndex++}).hide().appendTo('body').fadeIn();
			/*ui.positioner({
				element: $('.ch-dimmer'),
				fixed: true,
				points: 'lt lt'
			});*/
			//$('.ch-dimmer').fadeIn();
		},
		off: function(){
			$('div.ch-dimmer').fadeOut('normal', function(){ $(this).remove(); });
		}
	};
	

	// Events
	conf.$trigger
		.css('cursor', 'pointer')
		.bind('click', show);
		
    // Create the publish object to be returned
    conf.publish.uid = conf.id;
    conf.publish.element = conf.element;
    conf.publish.type = "modal";
    conf.publish.content = (conf.content) ? conf.content : ((conf.ajax === true) ? (conf.$trigger.attr('href') || conf.$trigger.parents('form').attr('action')) : conf.ajax);
    conf.publish.show = function(){ return show($.Event()) };
    conf.publish.hide = function(){ return hide($.Event()) };
    conf.publish.position = position;

	return conf.publish;

};
