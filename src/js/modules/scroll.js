var map = require('../modules/map.js');

var scrollTop,
    windowHeight;

module.exports =  {
    init: function() {
        this.bindings();
        this.setValues();
        this.onScroll();
    },

    bindings: function() {
        $(window).scroll(function() {
            this.onScroll();
        }.bind(this));

        $(window).resize(function() {
            this.onScroll();
            this.setValues();
        }.bind(this));
    },

    setValues: function() {
        windowHeight = $(window).height();
    },

    onScroll: function() {
        scrollTop = $(window).scrollTop();

        $('.uit-section--slides').each(function(i, el) {
            var sectionTop = $(el).offset().top;
            var sectionBottom = sectionTop + $(el).outerHeight();
            var state;

            if (sectionTop > scrollTop) {
                state = 'is-future'
            } else if (scrollTop > sectionBottom - windowHeight) {
                state = 'is-past'
            } else {
                state = 'is-current'
                this.setActiveSlide(el);
            }

            $(el).removeClass('is-future is-past is-current').addClass(state);

        }.bind(this));
    },

    setActiveSlide: function(el) {
        $('.is-active').removeClass('is-active');

        var active = 0;

        $(el).find('.uit-slide').each(function(i, el) {
            if (scrollTop > $(el).offset().top - (windowHeight / 4)) {
                active = i;
            }
        }.bind(this));

        var $target = $(el).find('.uit-slide--' + active);

        $target.addClass('is-active');

        if ($target.hasClass('has-map')) {
            $(el).addClass('is-mapping');
            map.updateMap($target.parent().find('.uit-media__map').attr('id'), $target.data('map'))
        } else {
            $(el).removeClass('is-mapping');
        }
    }
};
