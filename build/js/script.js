document.addEventListener("DOMContentLoaded", function() {

    if( document.querySelector( '.header .header__nav_item' ) ) {
    
        // start anchor header
        var allAnchor = [].slice.call(document.querySelectorAll('a.scroll-to'));
        allAnchor.forEach( function (item) {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const blockID = this.getAttribute('href');
                document.querySelector(blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
        // end anchor header
    
    }
    
    // if( window.innerWidth < 769 ) {
    
        // start toggle+nav mobile
        document
            .querySelector( '.header .header__toggle' )
            .addEventListener( 'click', function () {
            if( this.classList.contains( 'header__toggle--active' ) ) {
                this.classList.remove( 'header__toggle--active' );
                this.nextElementSibling.setAttribute( 'style', 'display: none' );
            } else {
                this.classList.add( 'header__toggle--active' );
                this.nextElementSibling.setAttribute( 'style', 'display: block' );
            }
        });
        // end toggle+nav mobile
    
    // }
    if( document.querySelector( '.form .form__input input' )) {
    
        // start input animation placeholder
        var allInp = [].slice.call(document.querySelectorAll( '.form .form__input input' ));
        allInp.forEach( function (item) {
            item.addEventListener( 'focus', function () {
                var prevElem = this.previousElementSibling;
                if (prevElem.classList.contains('input__placeholder')) {
                    prevElem.classList.add('input__placeholder--active');
                }
            });
            item.addEventListener('focusout', function (e) {
                var prevElem = this.previousElementSibling;
                if (e.target.value.length > 0) {
                    return this;
                } else {
                    prevElem.classList.remove('input__placeholder--active');
                }
            });
        });
        // end input animation placeholder
    
    }
    
    if( document.querySelector( '.form .form__select' )) {
    
        // start add years
        var allSelectDrop = [].slice.call(document.querySelectorAll('.form .form__select .select__drop' ));
        allSelectDrop.forEach( function ( item ) {
            var yearMin = +item.getAttribute('data-year-min');
            var yearMax = +item.getAttribute('data-year-max');
            var wrapItemsList = item.firstElementChild;
            var a = yearMax - yearMin;
            for( a; a >= 0; a-- ) {
                var div = document.createElement( 'div' );
                div.classList.add( 'select__drop_item' );
                div.innerText = yearMin + a;
                wrapItemsList.appendChild( div );
            }
        });
        // end add years
    
        // start open-close select
        var allSelectTitle = [].slice.call(document.querySelectorAll('.form .form__select .select__title' ));
        allSelectTitle.forEach( function (item) {
            item.addEventListener('click', function () {
                var wrapElem = this.parentNode;
                if (wrapElem.classList.contains('select--active')) {
                    wrapElem.classList.remove('select--active');
                } else {
                    wrapElem.classList.add('select--active');
                }
            });
        });
        // end open-close select
    
        // start add value select
        var allSelectDropItem = [].slice.call(document.querySelectorAll( '.form .form__select .select__drop_item'));
        allSelectDropItem.forEach( function( item ) {
            var titleElem = item.parentNode.parentNode.previousElementSibling.firstElementChild;
            var wrapElem = item.parentNode.parentNode.parentNode;
            item.addEventListener( 'click', function () {
                var itemText = item.innerText;
                if( !titleElem.classList.contains( 'select__title_value--active' ) ) {
                    titleElem.classList.add('select__title_value--active');
                }
                titleElem.innerHTML = itemText;
                wrapElem.classList.remove( 'select--active' );
            });
        });
        // end add value select
    
    }
    
    if( document.querySelector( '.form .range__progress' ) ) {
    
        // start form range
        var allRanger = [].slice.call(document.querySelectorAll( '.form .range'));
        allRanger.forEach(function (item) {
            item.addEventListener( 'click', function (e) {
                clickProgress(this, e);
            });
        });
        function clickProgress( el, e ) {
            var wrapOffsetLeft = el.offsetLeft;
            var clickPosition = e.pageX;
            var styLeft = clickPosition - wrapOffsetLeft;
            el.lastElementChild.setAttribute( 'style', 'left: ' + styLeft + 'px' );
            el.firstElementChild.nextElementSibling.lastElementChild.setAttribute( 'style', 'left: ' + styLeft + 'px' );
        }
        // end form range
    
    }

});