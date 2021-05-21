var slideshow;

customElements.define('slideshow-renderer', class extends HTMLElement {
  connectedCallback() {
    const slideshowelement = this;
    const slideshowrenderer = this.attachShadow({mode: 'open'});
    var slideshowcss = document.createElement('style');
    slideshowcss.setAttribute('type', 'text/css');
    slideshowcss.innerHTML = `
      #slideshow {
        display: flex;
        position: absolute;
        flex-wrap: nowrap;
        width: `+this.style.width+`;
        height: `+this.style.height+`;
      }

      slideshow-controls button {
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        -o-appearance: none;
        appearance: none;
        background: transparent;
        transform: translate(0px,-46%);
        position: absolute;
        outline: none;
        border: none;
        cursor: pointer;
        top: 50%;
        z-index: 4;
      }

      slideshow-slide {
        transition: opacity .2s ease-in;
      }
      
      slideshow-slide img {
        position: absolute;
        height: 100%;
        width: `+this.style.width+`;
        z-index: 1;
      }
    `;
    var slideshowmain = document.createElement('div');
    slideshowmain.id = 'slideshow';
    slideshowrenderer.appendChild(slideshowcss);
    slideshowrenderer.appendChild(slideshowmain);
    slideshow = slideshowrenderer.querySelector('#slideshow');
    function searchImage(directory, number, first) {

      var dirpath;
      if (directory.slice(-1) == '/') {
        dirpath = directory;
      } else {
        dirpath = directory+'/';
      }

      var imgpath = dirpath+String(number)+'.jpg';
      $.ajax({
        url: imgpath,
        type: 'GET',
      })
      .done(()=>{
        createImage(imgpath, number, first);
      })
      .fail(()=>{
        var imgpath = dirpath+String(number)+'.jpeg';
        $.ajax({
          url: imgpath,
          type: 'GET',
        })
        .done(()=>{
          createImage(imgpath, number, first);
        })
        .fail(()=>{
          var imgpath = dirpath+String(number)+'.jpe';
          $.ajax({
            url: imgpath,
            type: 'GET',
          })
          .done(()=>{
            createImage(imgpath, number, first);
          })
          .fail(()=>{
            var imgpath = dirpath+String(number)+'.png';
            $.ajax({
              url: imgpath,
              type: 'GET',
            })
            .done(()=>{
              createImage(imgpath, number, first);
            })
            .fail(()=>{
              var imgpath = dirpath+String(number)+'.webp';
              $.ajax({
                url: imgpath,
                type: 'GET',
              })
              .done(()=>{
                createImage(imgpath, number, first);
              })
              .fail(()=>{
                var imgpath = dirpath+String(number)+'.bmp';
                $.ajax({
                  url: imgpath,
                  type: 'GET',
                })
                .done(()=>{
                  createImage(imgpath, number, first);
                })
                .fail(()=>{
                  var imgpath = dirpath+String(number)+'.tif';
                  $.ajax({
                    url: imgpath,
                    type: 'GET',
                  })
                  .done(()=>{
                    createImage(imgpath, number, first);
                  })
                  .fail(()=>{
                    var imgpath = dirpath+String(number)+'.tiff';
                    $.ajax({
                      url: imgpath,
                      type: 'GET',
                    })
                    .done(()=>{
                      createImage(imgpath, number, first);
                    })
                    .fail(()=>{
                      var imgpath = dirpath+String(number)+'.gif';
                      $.ajax({
                        url: imgpath,
                        type: 'GET',
                      })
                      .done(()=>{
                        createImage(imgpath, number, first);
                      })
                      .fail(()=>{
                        displayError();
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    }

    function createImage(imgpath, number, first) {
      var slide = document.createElement('slideshow-slide');
      slide.setAttribute('data-source', imgpath);
      slide.setAttribute('data-number', number);
      if (number != first) {
        slide.style.opacity = '0';
      } else {
        slide.style.opacity = '1';
      }
      slideshow.appendChild(slide);
    }

    function displayError() {
      console.error('Error: Unable to load image');
    }

    var i;
    for (i = 0; i < Number(this.getAttribute('amount')); i++) {
      searchImage(this.getAttribute('directory'), Number(i+1), this.getAttribute('first'));
    }

    var controls = document.createElement('slideshow-controls');
    slideshow.appendChild(controls);


    try {
      customElements.define('slideshow-controls', class extends HTMLElement {
        connectedCallback() {
          if (this.parentElement == slideshow) {
            var prev = document.createElement('button');
            prev.innerHTML = `<svg viewBox="0 0 494 494" style="transform: rotateZ(90deg)rotateY(35deg); padding: 0px 2px; height: 50px; width: 50px;"><path style="stroke-width: 40; fill: white;" d="M 247.00,387.80 C 238.15,387.80 229.29,384.42 222.54,377.67 222.54,377.67 10.13,165.26 10.13,165.26 -3.38,151.75 -3.38,129.84 10.13,116.33 23.64,102.83 45.54,102.83 59.06,116.33 59.06,116.33 247.00,304.29 247.00,304.29 247.00,304.29 434.94,116.34 434.94,116.34 448.45,102.83 470.36,102.83 483.86,116.34 497.38,129.85 497.38,151.75 483.86,165.27 483.86,165.27 271.46,377.68 271.46,377.68 264.70,384.42 255.85,387.80 247.00,387.80 Z"></path></svg>`;
            prev.onclick = () => {
              var currentslide = slideshow.querySelector('slideshow-slide[style="opacity: 1;"]').getAttribute('data-number');
              if (currentslide != '1') {
                slideshow.querySelector('slideshow-slide[style="opacity: 1;"]').style.opacity = '0';
                slideshow.querySelector('slideshow-slide[data-number="'+Number(Number(currentslide)-1)+'"]').style.opacity = '1';
              } else {
                if (slideshowelement.getAttribute('loop') != null) {
                  slideshow.querySelector('slideshow-slide[style="opacity: 1;"]').style.opacity = '0';
                  slideshow.querySelector('slideshow-slide[data-number="'+Number(slideshowelement.getAttribute('amount'))+'"]').style.opacity = '1';
                }
              }
            };
            prev.style.left = '0px';
            this.appendChild(prev);
            var next = document.createElement('button');
            next.innerHTML = `<svg viewBox="0 0 494 494" style="transform: rotateZ(-90deg)rotateY(35deg); padding: 0px 2px; height: 50px; width: 50px;"><path style="stroke-width: 40; fill: white;" d="M 247.00,387.80 C 238.15,387.80 229.29,384.42 222.54,377.67 222.54,377.67 10.13,165.26 10.13,165.26 -3.38,151.75 -3.38,129.84 10.13,116.33 23.64,102.83 45.54,102.83 59.06,116.33 59.06,116.33 247.00,304.29 247.00,304.29 247.00,304.29 434.94,116.34 434.94,116.34 448.45,102.83 470.36,102.83 483.86,116.34 497.38,129.85 497.38,151.75 483.86,165.27 483.86,165.27 271.46,377.68 271.46,377.68 264.70,384.42 255.85,387.80 247.00,387.80 Z"></path></svg>`;
            next.onclick = () => {
              var currentslide = slideshow.querySelector('slideshow-slide[style="opacity: 1;"]').getAttribute('data-number');
              if (currentslide != slideshowelement.getAttribute('amount')) {
                slideshow.querySelector('slideshow-slide[style="opacity: 1;"]').style.opacity = '0';
                slideshow.querySelector('slideshow-slide[data-number="'+Number(Number(currentslide)+1)+'"]').style.opacity = '1';
              } else {
                if (slideshowelement.getAttribute('loop') != null) {
                  slideshow.querySelector('slideshow-slide[style="opacity: 1;"]').style.opacity = '0';
                  slideshow.querySelector('slideshow-slide[data-number="'+Number(1)+'"]').style.opacity = '1';
                }
              }
            };
            next.style.right = '0px';
            this.appendChild(next);
          }
        }
      });
      customElements.define('slideshow-slide', class extends HTMLElement {
        connectedCallback() {
          if (this.parentElement == slideshow) {
            var image = document.createElement('img');
            image.src = this.getAttribute('data-source');
            this.appendChild(image);
          }
        }
      });
    }
    catch (err) {
      console.error('Error: Something is wrong');
    }

  }
});