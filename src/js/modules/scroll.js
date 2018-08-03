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

        $('.uit-section--media').each(function(i, el) {
            var sectionTop = $(el).offset().top;
            var sectionBottom = sectionTop + $(el).outerHeight();
            var state;

            if (sectionTop > scrollTop) {
                state = 'is-future'
            } else if (scrollTop > sectionBottom - windowHeight) {
                state = 'is-past'
            } else {
                state = 'is-active'
            }

            $(el).removeClass('is-future is-past is-active').addClass(state);

        }.bind(this));
    }
};
