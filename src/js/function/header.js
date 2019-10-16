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