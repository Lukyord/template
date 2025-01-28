/*::* DETECT *::*/
document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;

    function detectTouchEvents() {
        const isTouchSupported =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0;
        html.classList.toggle("touchevents", isTouchSupported);
        html.classList.toggle("no-touchevents", !isTouchSupported);
    }
    detectTouchEvents();

    function detectDevices() {
        const isDevice =
            /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/.test(
                navigator.userAgent
            );
        html.classList.toggle("is-device", isDevice);
    }
    detectDevices();
});

/*::* DETECT RESIZING *::*/
jQuery(document).ready(function ($) {
    onWindowResize(
        () => {
            $("html").removeClass("resizing");
        },
        300,
        true,
        () => {
            $("html").addClass("resizing");
        }
    );
});

/*::* HANDLE SCROLL *::*/
(function (window, document) {
    "use strict";
    const html = document.documentElement;
    let previousScrollY = 0;

    function pageScroll() {
        const currentScrollY = window.scrollY;
        const scrollDifference = previousScrollY - currentScrollY;
        if (currentScrollY <= 0) {
            html.classList.remove(
                "page-scrolling",
                "page-scrolling--up",
                "page-scrolling--down"
            );
        } else {
            html.classList.add("page-scrolling");
            if (scrollDifference > 0) {
                html.classList.add("page-scrolling--up");
                html.classList.remove("page-scrolling--down");
            } else {
                html.classList.add("page-scrolling--down");
                html.classList.remove("page-scrolling--up");
            }
        }
        previousScrollY = currentScrollY;
    }

    function mainScroll() {
        const bound = document.getElementById("main");
        if (bound) {
            const scrollTop = window.scrollY;
            const boundRect = bound.getBoundingClientRect();
            const boundTop = boundRect.top + scrollTop;
            const boundBottom = boundTop + boundRect.height;
            const windowHeight = window.innerHeight;
            const currentScrollOffset = scrollTop + windowHeight;
            if (scrollTop > boundTop) {
                html.classList.add("main-start");
            } else {
                html.classList.remove("main-start");
            }
            if (currentScrollOffset < boundBottom) {
                html.classList.add("main-start");
                html.classList.remove("main-end");
            } else {
                html.classList.remove("main-start");
                html.classList.add("main-end");
            }
        }
    }

    pageScroll();
    mainScroll();

    window.addEventListener("scroll", () => {
        pageScroll();
        mainScroll();
    });

    document.addEventListener("DOMContentLoaded", () => {
        pageScroll();
        mainScroll();
    });
})(window, document);

/*::* CLEAR TIMEOUT *::*/
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/*::* BLURRED UNLOADED IMAGES *::*/
jQuery(function ($) {
    if ($(".blurred-media").length) {
        $(".blurred-media").each(function () {
            const blurredImageDiv = $(this);
            const media = blurredImageDiv.find("img, video");

            if (media.length) {
                function loaded() {
                    blurredImageDiv.addClass("loaded");
                    var insideAnimation =
                        blurredImageDiv.find(".inside-animation");

                    if (insideAnimation.length) {
                        var animation = insideAnimation.data("animation");
                        insideAnimation.addClass("animate").addClass(animation);
                        $("html").scrollTop($("html").scrollTop() + 1);
                    }
                }

                media.each(function () {
                    const element = $(this);
                    if (element.is("img")) {
                        if (this.complete) {
                            loaded();
                        } else {
                            element.on("load", loaded);
                        }
                    }

                    if (element.is("video")) {
                        element.on("loadeddata", loaded);
                    }
                });
            } else {
                console.log(
                    "No img or video element found inside .blurred-image"
                );
            }
        });
    }
});

/*::* LOCATION HASH SCROLL *::*/
jQuery(document).ready(function ($) {
    const windowHeightOffset = $(window).outerHeight() / 4;
    const defaultHeaderHeight = $("#header-height").outerHeight();

    // Handle URL hash scrolling on page load with offset
    if (window.location.hash) {
        setTimeout(() => {
            const target = $(window.location.hash);
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - windowHeightOffset,
                    },
                    800,
                    "easeOutExpo"
                );
            }
        }, 100);
    }

    // Smooth scroll on click with offset
    $(document).on("click", ".link-scroll", function (event) {
        const targetId = this.hash;
        const target = targetId
            ? $(targetId)
            : $("[name=" + targetId.slice(1) + "]");

        // Check if .link-scroll has .top0 class
        const headerHeight = $(this).hasClass("top0") ? 0 : defaultHeaderHeight;

        if (target.length) {
            $("html, body").animate(
                {
                    scrollTop: target.offset().top - headerHeight,
                },
                800,
                "easeOutExpo"
            );
            event.preventDefault();
        }
    });
});

/*::* HANDLE VIDEO SOURCE *::*/
function handleVideoSource() {
    function updateVideoSource(element) {
        const vdoSrc = element.dataset.vdoSrc;
        const vdoSrcset = element.dataset.vdoSrcset || "";
        const viewportWidth = window.innerWidth;
        element.setAttribute(
            "src",
            viewportWidth < 992 && vdoSrcset ? vdoSrcset : vdoSrc
        );
    }

    function initializeVideos() {
        document.querySelectorAll(".vdojs").forEach(updateVideoSource);
    }
    initializeVideos();
    let previousWidth = window.innerWidth;
    window.addEventListener("resize", () => {
        const currentWidth = window.innerWidth;
        if (currentWidth !== previousWidth) {
            initializeVideos();
            previousWidth = currentWidth;
        }
    });
}
handleVideoSource();

/*::* LENIS *::*/
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('#page [class*="-scroll"]').forEach((element) => {
        element.setAttribute("data-lenis-prevent", "");
    });
    const lenis = new Lenis({
        smooth: true,
        eventsTarget: document.querySelector("#page"),
    });
    lenis.scrollTo(0, { duration: 0 });
    lenis.on("scroll", (e) => {});
    const animate = (time) => {
        lenis.raf(time);
        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
});

/*::* ANIMATION *::*/
jQuery(document).ready(function ($) {
    $('.entry-fadeIn > *:not([class*="wp-block-"], ul, ol)').addClass(
        "animate fadeIn"
    );
    $(
        '.entry-fadeIn *:is([class*="wp-block-"]:not(.wp-block-heading)) > *:not([class*="wp-block-"], ul, ol), .entry-fadeIn *:is(li, .wp-block-heading, .wp-block-quote)'
    ).addClass("animate fadeIn");
    $(
        ".tab-content:not(.active), .accordion-container:not(.trigger-first) .accordion:not(.active) .entry-panel, .accordion-container.trigger-first > .accordion:not(:first-child) .entry-panel"
    )
        .find(".animate, .staggerSlide")
        .removeClass("animate fadeIn staggerSlide");

    var isWowInitialized = false;

    function pageAnimate() {
        if (
            !isWowInitialized &&
            $(".animate").length &&
            typeof WOW === "function"
        ) {
            var wow = new WOW({ boxClass: "animate" });
            wow.init();
            isWowInitialized = true;
        }

        if ($(".rellax").length) {
            new Rellax(".rellax", { center: true });
        }
    }

    function triggerScrollTriggerLogic() {
        var $staggerFade = $(".staggerFade");
        if ($staggerFade.length) {
            ScrollTrigger.batch($staggerFade, {
                start: "top 80%",
                end: "+=20%",
                scrub: true,
                invalidateOnRefresh: true,
                onEnter: (batch) =>
                    gsap.to(batch, {
                        duration: 1.5,
                        ease: "sine.out",
                        autoAlpha: 1,
                        stagger: 0.2,
                        overwrite: true,
                    }),
                onEnterBack: (batch) =>
                    gsap.to(batch, {
                        duration: 1.5,
                        ease: "sine.out",
                        autoAlpha: 1,
                        stagger: 0.2,
                        overwrite: true,
                    }),
            });
            gsap.set($staggerFade, { autoAlpha: 0 });
            ScrollTrigger.refresh();
        }

        var $staggerSlide = $(".staggerSlide");
        if ($staggerSlide.length) {
            ScrollTrigger.batch($staggerSlide, {
                start: "top 80%",
                end: "+=20%",
                scrub: true,
                invalidateOnRefresh: true,
                onEnter: (batch) =>
                    gsap.to(batch, {
                        duration: 1.5,
                        ease: "sine.out",
                        autoAlpha: 1,
                        x: 0,
                        stagger: 0.1,
                        overwrite: true,
                    }),
                onEnterBack: (batch) =>
                    gsap.to(batch, {
                        duration: 1.5,
                        ease: "sine.out",
                        autoAlpha: 1,
                        x: 0,
                        stagger: 0.1,
                        overwrite: true,
                    }),
            });
            gsap.set($staggerSlide, { autoAlpha: 0, x: "10vw" });
            ScrollTrigger.refresh();
        }

        var $staggerSlideRtl = $(".staggerSlideRtl");
        if ($staggerSlideRtl.length) {
            ScrollTrigger.batch($staggerSlideRtl, {
                start: "top 80%",
                end: "+=20%",
                scrub: true,
                invalidateOnRefresh: true,
                onEnter: (batch) =>
                    gsap.to(batch, {
                        duration: 1.5,
                        ease: "sine.out",
                        autoAlpha: 1,
                        x: 0,
                        stagger: 0.1,
                        overwrite: true,
                    }),
                onEnterBack: (batch) =>
                    gsap.to(batch, {
                        duration: 1.5,
                        ease: "sine.out",
                        autoAlpha: 1,
                        x: 0,
                        stagger: 0.1,
                        overwrite: true,
                    }),
            });
            gsap.set($staggerSlideRtl, { autoAlpha: 0, x: "-10vw" });
            ScrollTrigger.refresh();
        }

        var $animateShape = $(".animateShape");
        if ($animateShape.length) {
            $animateShape.each(function () {
                var $this = $(this);
                var $shapeLeft = $this.find(".shape-left");
                var $shapeCenter = $this.find(".shape-center");
                var $shapeRight = $this.find(".shape-right");

                gsap.set($shapeLeft, {
                    rotation: -45,
                    transformOrigin: "right center",
                    autoAlpha: 1,
                });
                gsap.set($shapeCenter, { autoAlpha: 0 });
                gsap.set($shapeRight, {
                    rotation: -45,
                    transformOrigin: "left center",
                    autoAlpha: 1,
                });

                ScrollTrigger.create({
                    trigger: $this,
                    start: "top 90%",
                    end: "+=10%",
                    scrub: true,
                    invalidateOnRefresh: true,
                    onEnter: () => {
                        if ($shapeLeft.length) {
                            gsap.to($shapeLeft, {
                                duration: 1,
                                ease: "sine.out",
                                rotation: 0,
                            });
                        }
                        if ($shapeRight.length) {
                            gsap.to($shapeRight, {
                                duration: 1,
                                ease: "sine.out",
                                rotation: 0,
                            });
                        }
                        if ($shapeCenter.length) {
                            gsap.to($shapeCenter, {
                                delay: 1,
                                duration: 1,
                                autoAlpha: 1,
                            });
                        }
                    },
                    onEnterBack: () => {
                        if ($shapeLeft.length) {
                            gsap.to($shapeLeft, {
                                rotation: 0,
                                duration: 1,
                                ease: "sine.out",
                            });
                        }
                        if ($shapeRight.length) {
                            gsap.to($shapeRight, {
                                rotation: 0,
                                duration: 1,
                                ease: "sine.out",
                            });
                        }
                        if ($shapeCenter.length) {
                            gsap.to($shapeCenter, {
                                duration: 1,
                                autoAlpha: 1,
                            });
                        }
                    },
                });
            });

            ScrollTrigger.refresh();
        }
    }

    if ($(window).scrollTop() === 0) {
        pageAnimate();
        triggerScrollTriggerLogic();
    } else {
        $("html, body").animate({ scrollTop: 0 }, function () {
            pageAnimate();
            triggerScrollTriggerLogic();
        });
    }
});

let isSmallScreen;
/*::* STYLING *::*/
jQuery(document).ready(function ($) {
    function pageStyle() {
        //header
        var header = $("#header");
        var headerNav = header.find(".header-nav");
        var languageSelect = header.find('*[data-tool="language"]');

        if (headerNav.length) {
            const headerHeight = headerNav.outerHeight();
            const headerNavRight =
                $(window).width() -
                (headerNav.offset().left + headerNav.outerWidth());

            $("html").css("--header-height", headerHeight + "px");
            $("html").css("--header-nav-right", headerNavRight + "px");
        }

        if (languageSelect.length) {
            const languageSelectWidth = languageSelect.outerHeight();
            $("html").css(
                "--language-select-height",
                languageSelectWidth + "px"
            );
        }

        if ($(window).width() < 992) {
            isSmallScreen = true;
        } else {
            isSmallScreen = false;
        }

        // MENU & SUBMENU HEIGHT
        if ($(window).width() < 1440) {
            let maxMenuHeight = 0;

            $(".menu, .menu .submenu-mb").each(function () {
                const elementHeight = $(this).outerHeight();
                if (elementHeight > maxMenuHeight) {
                    maxMenuHeight = elementHeight;
                }
            });

            $("html").css("--menu-height", `${maxMenuHeight}px`);
        }
    }

    onWindowResize(pageStyle);

    // Hover effect
    $(".js-link-hover").each(function () {
        var $this = $(this);
        $this
            .find("a")
            .on("mouseover", function () {
                $this.addClass("link-hover");
            })
            .on("mouseleave", function () {
                $this.removeClass("link-hover");
            });
    });
});

/*::* FORM *::*/
jQuery(document).ready(function ($) {
    // Focusin and focusout for fields
    $(".field").focusin(function () {
        $(this).siblings().removeClass("focusin");
        $(this).addClass("focusin");
    });

    // Input handling
    var $formElements = $("input, textarea, select");

    function handleInputFocus() {
        $(this).closest(".input").addClass("filled");
    }

    function handleInputBlur() {
        $(this)
            .closest(".input")
            .toggleClass("filled", $(this).val().length > 0);
    }

    $formElements.focusin(handleInputFocus);
    $formElements.focusout(handleInputBlur);

    // CTA adjustment
    function updateCtaWidths() {
        $(".input").each(function () {
            var $button = $(this).find("> .cta");
            if ($button.length) {
                $(this)
                    .addClass("input--cta")
                    .css("--cta-width", Math.ceil($button.outerWidth()) + "px");
            }
        });
    }

    updateCtaWidths();
    $(window).resize(updateCtaWidths);

    // Autofill check
    setTimeout(function () {
        $formElements.each(function () {
            var $input = $(this);
            var isFilled =
                $input.val().length > 0 || $input.is(":-webkit-autofill");
            $input.closest(".input").toggleClass("filled", isFilled);
        });
    }, 100);

    // Select2 initialization
    function initializeSelect2(select) {
        select
            .select2({
                width: "100%",
                minimumResultsForSearch: -1,
                dropdownParent: select.closest(".select"),
                templateResult: function (item) {
                    if (item.loading) return item.text;
                    var term = query.term || "";
                    return markMatch(item.text, term);
                },
                language: {
                    searching: function (params) {
                        query = params;
                        return "Searching...";
                    },
                },
            })
            .on("select2:select", function () {
                $(this).closest(".input").addClass("filled");
            })
            .on("select2:unselect", function () {
                $(this).closest(".input").removeClass("filled");
            })
            .on("select2:open", function () {
                const $dropdown = $(".select2-dropdown");
                $dropdown.attr("data-lenis-prevent", "true");
            })
            .on("select2:close", function () {
                const $dropdown = $(".select2-dropdown");
                $dropdown.removeAttr("data-lenis-prevent");
            });
    }

    function markMatch(text, term) {
        var $result = $("<span></span>");
        var matchIndex = text.toUpperCase().indexOf(term.toUpperCase());

        if (matchIndex < 0) {
            return $result.text(text);
        }

        $result.text(text.substring(0, matchIndex));
        var $match = $('<span class="select2-rendered__match"></span>').text(
            text.substring(matchIndex, matchIndex + term.length)
        );
        $result.append($match).append(text.substring(matchIndex + term.length));

        return $result;
    }

    var query = {};

    $(".select").each(function () {
        var $this = $(this);
        var $select = $this.find(".select2");
        var $select2fixed = $this.find(".select2-fixed");

        initializeSelect2($select);
        initializeSelect2($select2fixed);

        $this.addClass("select2-parent");

        // Handle device-specific cases
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            $select
                .select2("destroy")
                .closest(".select")
                .removeClass("select2-parent");
        }

        $this.find("select").click(function () {
            $(this)
                .closest(".input")
                .toggleClass("filled", $(this)[0].selectedIndex >= 0);
        });
    });

    // Datepicker initialization
    if (!$("html").hasClass("is-device")) {
        $(".date-device")
            .attr("type", "text")
            .addClass("date")
            .removeClass("date-device");
    }
    if ($(".date-device").length) {
        $(".date-device").closest(".datepicker").addClass("datepicker-device");
    }
    if ($(".date").length) {
        var $inputDatepicker = $(".date");
        $inputDatepicker.datepicker({
            dateFormat: "dd/mm/yy",
            changeMonth: true,
            changeYear: true,
            showOn: "both",
            buttonText: "",
            onSelect: function (selectedDate, inst) {
                $(this).closest(".input").addClass("filled");
            },
        });
        $(window).on("resize", function () {
            $inputDatepicker.datepicker("hide");
            $inputDatepicker.blur();
        });
    }
});

/*::* UPLOAD FILES *::*/
jQuery(document).ready(function ($) {
    var multipleSupport = typeof $("<input/>")[0].multiple !== "undefined",
        isIE = /msie/i.test(navigator.userAgent);

    $.fn.customFile = function () {
        return this.each(function () {
            var $this = $(this),
                $parent = $this.closest(".custom-file-upload"),
                placeholder = $parent.data("placeholder") || "",
                buttonText =
                    $parent.data("button") || '<i class="ic ic-upload"></i>',
                $file = $this.addClass("custom-file-upload-hidden"),
                $wrap = $('<div class="file-upload-wrapper">'),
                $input = $(
                    '<input type="text" class="file-upload-input" placeholder="' +
                        placeholder +
                        '" readonly />'
                ),
                $button = $(
                    '<div class="file-upload-action"><button type="button" class="file-upload-button">' +
                        buttonText +
                        "</button></div>"
                ),
                $label = $(
                    '<div class="file-upload-action"><label class="file-upload-button" for="' +
                        $file[0].id +
                        '">' +
                        buttonText +
                        "</label></div>"
                );

            $file.css({ position: "absolute", left: "-9999px" });

            $wrap
                .insertAfter($file)
                .append($file, $input, isIE ? $label : $button);

            $file.attr("tabIndex", -1);
            $button.attr("tabIndex", -1);

            $button.add($input).click(function () {
                $file.click();
            });

            $file.change(function () {
                var fileArr = $file[0].files,
                    filename = multipleSupport
                        ? Array.from(fileArr)
                              .map((file) => file.name)
                              .join(", ")
                        : $file.val().split("\\").pop();

                $input.val(filename).attr("title", filename).focus();
                $input.closest(".input").addClass("filled");
            });

            $input.on({
                blur: function () {
                    $file.trigger("blur");
                },
                keydown: function (e) {
                    if (e.which === 13) {
                        // Enter
                        $file.click();
                    } else if (e.which === 8 || e.which === 46) {
                        // Backspace or Delete
                        $file.val("").trigger("change");
                        $input.val("").removeClass("filled");
                    }
                },
            });
        });
    };

    if (!multipleSupport) {
        $(document).on("change", "input.customfile", function () {
            var $this = $(this),
                $wrap = $this.parent(),
                $inputs = $wrap
                    .siblings()
                    .find(".file-upload-input")
                    .filter(function () {
                        return !this.value;
                    });

            if (!$this.val() && !$inputs.length) {
                $wrap.remove();
            }
        });
    }

    $("input[type=file]").customFile();
});

/*::* ACCORDION *::*/
jQuery(function ($) {
    $(".accordion-container").each(function () {
        var $container = $(this);
        var $accordions = $container.find(".accordion");
        var windowHeight = $(window).outerHeight() / 4;

        $accordions.each(function () {
            var $accordion = $(this);
            var $parent = $accordion.parent();

            $accordion.find("> .entry-title").click(function () {
                var $thisTitle = $(this);
                var $thisParent = $thisTitle.parent();
                var $neighbors = $thisParent.siblings();
                var $neighborContents = $neighbors.find("> .entry-panel");
                var $thisPanel = $thisParent.find("> .entry-panel");

                if ($parent.hasClass("toggle")) {
                    $neighbors.removeClass("active");
                    $neighborContents.slideUp(200);

                    $thisParent.toggleClass("active");
                    $thisPanel.slideToggle(200);

                    setTimeout(function () {
                        var scrollTop = $thisPanel.is(":visible")
                            ? $thisParent.offset().top - windowHeight
                            : $thisParent.offset().top - windowHeight;

                        $("html, body").animate(
                            { scrollTop: scrollTop },
                            800,
                            "linear"
                        );
                    }, 250);
                } else {
                    $thisParent.toggleClass("active");
                    $thisPanel.slideToggle(200);
                }
            });
        });

        if ($container.hasClass("trigger-first")) {
            var $firstAccordion = $container.find("> .accordion:first-child");
            $firstAccordion.addClass("active");
            $firstAccordion.find("> .entry-panel").show();
        }
    });
});

/*::* TAB *::*/
jQuery(document).ready(function ($) {
    function showTab(elem) {
        var $tabContainer = $(elem).closest(".tab-container");
        $tabContainer.find(".tab-content").removeClass("active");
        $tabContainer.find(elem).addClass("active");

        if ($tabContainer.hasClass("scrolltop")) {
            setTimeout(function () {
                var scrollTop =
                    $tabContainer.offset().top -
                    $("#header-height").outerHeight() +
                    1;
                $("html, body").animate(
                    { scrollTop: scrollTop },
                    800,
                    "easeOutExpo"
                );
            }, 250);
        }
    }

    function selectDestroyMobile($obj) {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            $obj.select2("destroy");
            $obj.parent(".select").removeClass("select2-parent");
        }
    }

    $(".tab-container").each(function () {
        var $obj = $(this);
        var Select2Options = {
            width: "100%",
            minimumResultsForSearch: -1,
            dropdownParent: $obj.find("select.tab-select2").parents(".select"),
        };

        var $mySelect2 = $obj.find("select.tab-select2");
        $mySelect2.select2(Select2Options);
        $mySelect2.parents(".select").addClass("select2-parent");
        selectDestroyMobile($mySelect2);
    });

    $(
        '.tab-container .tab a:not([data-redirect]):not([href="javascript:;"])'
    ).click(function (e) {
        e.preventDefault();

        var $tabGroupParent = $(this).closest(".tab-container");
        var _id = $(this).attr("href");
        var $select = $tabGroupParent.find("select.tab-select2");

        $tabGroupParent.find(".tab a").removeClass("active");
        $tabGroupParent
            .find("select option")
            .prop("selected", false)
            .removeAttr("selected");
        $(this).addClass("active");
        showTab(_id);
        $tabGroupParent
            .find('select option[value="' + _id + '"]')
            .prop("selected", true)
            .attr("selected", true);
        $select.select2("destroy").select2({
            width: "100%",
            minimumResultsForSearch: -1,
            dropdownParent: $tabGroupParent
                .find("select.tab-select2")
                .parents(".select"),
        });
        selectDestroyMobile($select);
        $tabGroupParent
            .find(".select-value")
            .text($tabGroupParent.find("select option:selected").text());
    });

    function activateTabFromHash() {
        if (window.location.hash) {
            var targetHash = window.location.hash;
            var $tabLink = $(
                '.tab-container .tab a[href="' + targetHash + '"]'
            );
            if ($tabLink.length) {
                $tabLink.click();
            }
        }
    }
    activateTabFromHash();
    $(".tab-container .tab-content a").click(function () {
        activateTabFromHash();
    });
    $(window).on("hashchange", function () {
        activateTabFromHash();
    });

    $(".tab-container select.tab-select2").change(function () {
        var $tabContainer = $(this).closest(".tab-container");
        var selectedValue = $(this).val();
        $tabContainer.find(".tab a").removeClass("active");
        $tabContainer
            .find('.tab a[href="' + selectedValue + '"]')
            .addClass("active");
        showTab(selectedValue);
    });
});

/* FILTER */
jQuery(document).ready(function ($) {
    $(".func").each(function () {
        var _this = $(this);
        if (_this.find("> .func-panel").length) {
            _this
                .find(".select-value")
                .text(_this.find(".func-menu li.current-cat > a").text());

            _this.find("> .func-ctrl").on("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).parent().siblings().removeClass("enabled");
                $(this).parent().toggleClass("enabled");

                $(this)
                    .parent()
                    .siblings()
                    .find(".func-panel")
                    .fadeOut(100)
                    .removeClass("active");
                $(this)
                    .parent()
                    .find(".func-panel")
                    .fadeToggle(100)
                    .addClass("active");
            });
            $(".func-panel").click(function (e) {
                e.stopPropagation();
            });
            $(
                "body, .func-panel-close, .func-panel-overlay, .func-panel-ctrl *"
            ).click(function () {
                $(".func").removeClass("enabled");
                $(".func-panel").fadeOut(100).removeClass("active");
            });
        } else if (_this.find("select").length) {
            setTimeout(function () {
                _this
                    .find("select option:contains('Sort by')")
                    .html(function (_, html) {
                        return html.replace(/(Sort by)/g, "");
                    });

                var ele = _this;
                ele.find(".select-value").text(
                    ele.find("form select option:selected", this).text()
                );
                $(".select-value:contains('Sort by')").html(function (_, html) {
                    return html.replace(/(Sort by)/g, "<span>$1 : </span>");
                });

                ele.find("select").on("load change", function () {
                    ele.find(".select-value").text(
                        ele.find("form select option:selected", this).text()
                    );
                    $(".select-value:contains('Sort by')").html(function (
                        _,
                        html
                    ) {
                        return html.replace(/(Sort by)/g, "<span>$1 : </span>");
                    });
                });
            }, 100);
        }
    });
});

/*::* SLIDER *::*/
jQuery(document).ready(function ($) {
    function vdoData($this) {
        const videoSlides = $this.find("video[autoplay]");
        videoSlides.each(function () {
            const vdo = $(this);
            vdo[0].preload = "metadata";
            vdo[0].onloadedmetadata = function () {
                const vdoTime = (vdo[0].duration - 1) * 1000;
                vdo.closest(".swiper-slide").attr(
                    "data-swiper-autoplay",
                    vdoTime
                );
            };
        });
    }

    function handleResize($swiperElement) {
        // console.log("Resizing Swiper:", $swiperElement);
        $swiperElement[0].swiper.update();
    }

    if ($(".swiper.default").length) {
        $(".swiper.default").each(function () {
            const $this = $(this);
            const slideTotal = $this.find(".swiper-slide").length;

            const slidePagination = $this.find(".swiper-pagination")[0];
            const slidePaginationCustom = $this
                .find(".swiper-pagination")
                .hasClass("custom");
            const slideButtonNext = $this.find(".swiper-button-next")[0];
            const slideButtonPrev = $this.find(".swiper-button-prev")[0];

            const slideLoop = $this.hasClass("loop");
            const slideAutoplay = $this.hasClass("autoplay");
            const slidePause = $this.hasClass("pause");

            const autoPlayInterval = $this.data("autoplay-interval");

            // First, initialize vdoData to set data-swiper-autoplay
            vdoData($this);

            const swiper = new Swiper($this[0], {
                resistanceRatio: 0,
                spaceBetween: 0,
                pagination: {
                    el: slidePagination,
                    type: slidePaginationCustom ? "custom" : "bullets",
                    clickable: !slidePaginationCustom,
                    renderCustom: (swiper, current, total) =>
                        `<span class="current">${current}</span> / ${total}`,
                },
                navigation: {
                    nextEl: slideButtonNext,
                    prevEl: slideButtonPrev,
                },
                effect: $this.hasClass("fade") ? "fade" : "slide",
                fadeEffect: { crossFade: $this.hasClass("fade") },
                loop: slideLoop && slideTotal > 1,
                speed: 1000,
                autoplay: {
                    delay: autoPlayInterval ? autoPlayInterval : 4000,
                    disableOnInteraction: false,
                },
                on: {
                    init: function () {
                        const activeVideos = $this.find(
                            ".swiper-slide-active video[autoplay]"
                        );
                        activeVideos.each(function () {
                            this.play();
                            this.currentTime = 0;
                        });
                    },
                    resize: () => handleResize($this),
                    slideChangeTransitionStart: function () {
                        const activeVideos = $this.find(
                            ".swiper-slide-active video[autoplay]"
                        );
                        activeVideos.each(function () {
                            this.play();
                            this.currentTime = 0;
                        });
                    },
                    slideChangeTransitionEnd: function () {
                        const inactiveVideos = $this.find(
                            '.swiper-slide:not(".swiper-slide-active") video'
                        );
                        inactiveVideos.each(function () {
                            this.pause();
                            this.currentTime = 0;
                        });
                    },
                },
                init: false,
            });

            setTimeout(function () {
                swiper.init();
                swiper.autoplay.stop();

                if (slideAutoplay) swiper.autoplay.start();

                if (slidePause) {
                    $this
                        .on("mouseenter", () => swiper.autoplay.stop())
                        .on("mouseleave", () => swiper.autoplay.start());
                }
            }, 100);
        });
    }

    if ($(".swiper.auto").length) {
        $(".swiper.auto").each(function () {
            const $this = $(this);
            const slideTotal = $this.find(".swiper-slide").length;
            const slideLoop = $this.hasClass("loop");
            const slideAutoplay = $this.hasClass("autoplay");
            const slideCenterInsufficient = $this.hasClass("insufficient");

            const slidePagination = $this.find(".swiper-pagination")[0];
            const slidePaginationCustom = $this
                .find(".swiper-pagination")
                .hasClass("custom");
            const slideButtonNext =
                $this.find(".swiper-button-next")[0] ||
                $(".swiper-button-next")[0];
            const slideButtonPrev =
                $this.find(".swiper-button-prev")[0] ||
                $(".swiper-button-prev")[0];

            const slidesPerGroup = $this.data("slidespergroup");

            const swiper = new Swiper($this[0], {
                resistanceRatio: 0,
                spaceBetween: 0,
                grabCursor: true,
                pagination: {
                    el: slidePagination,
                    type: slidePaginationCustom ? "custom" : "bullets",
                    clickable: !slidePaginationCustom,
                },
                navigation: {
                    nextEl: slideButtonNext,
                    prevEl: slideButtonPrev,
                },
                effect: $this.hasClass("fade") ? "fade" : "slide",
                fadeEffect: { crossFade: $this.hasClass("fade") },
                loop: slideLoop && slideTotal > 1,
                speed: 2000,
                autoplay: {
                    delay: 8000,
                    disableOnInteraction: false,
                },
                slidesPerView: "auto",
                centeredSlides: $this.hasClass("centered-m"),
                centerInsufficientSlides: slideCenterInsufficient,
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                breakpoints: {
                    768: {
                        centeredSlides: $this.hasClass("centered"),
                        slidesPerGroup: slidesPerGroup || 1,
                    },
                },
            });

            setTimeout(function () {
                swiper.init();
                swiper.autoplay.stop();

                if (slideAutoplay) swiper.autoplay.start();
            }, 100);
        });
    }

    // Global debounce function is used, so no need to define it locally
});

/*::* FANCY BOX *::*/
jQuery(document).ready(function ($) {
    if ($('[data-fancybox="gallery"]').length) {
        Fancybox.bind('[data-fancybox="gallery"]', {
            mainClass: "",
            animated: true,
            wheel: false,
            hideScrollbar: false,
            idle: false,
            Hash: false,
            Thumbs: false,
            Toolbar: false,
            contentClick: false,
            dragToClose: false,
            showClass: false,
            compact: false,
            closeButton: true,
            on: {
                loaded: (fancybox) => {
                    const nav = document.querySelector(".fancybox__nav");
                    if (nav) {
                        const slides =
                            document.querySelectorAll(".fancybox__slide");
                        slides.forEach((slide) => {
                            // Caption
                            const caption =
                                slide.querySelector(".fancybox__caption");
                            if (caption) {
                                const existingNav =
                                    slide.querySelector(".fancybox__nav");
                                if (!existingNav) {
                                    const navClone = nav.cloneNode(true);

                                    const footer =
                                        document.createElement("div");
                                    footer.classList.add(
                                        "fancybox__content__footer"
                                    );

                                    footer.appendChild(caption);
                                    footer.appendChild(navClone);

                                    slide.appendChild(footer);
                                }
                            }

                            const closeButton = slide.querySelector(
                                ".f-button.is-close-btn"
                            );

                            if (closeButton) {
                                closeButton.parentNode.removeChild(closeButton);

                                slide.appendChild(closeButton);
                            }
                        });
                    }
                },
            },
        });
    }
});

/*::* MAGNIFIC POPUP *::*/
jQuery(document).ready(function ($) {
    $(".open-popup-modal").magnificPopup({
        type: "inline",
        preloader: false,
        closeOnBgClick: true,
        mainClass: "popup-style popup-style-modal",
        showCloseBtn: true,
        closeBtnInside: true,
        removalDelay: 300,
        callbacks: {
            open: function () {
                $("html").addClass("plugin-mfp-enabled");
            },
            close: function () {
                $("html").removeClass("plugin-mfp-enabled");
            },
        },
    });
});

/*::* HEADER *::*/
jQuery(document).ready(function ($) {
    // MENU CONTROL TOGGLE
    $(".header-menu-ctrl > .menu-ctrl")
        .off("click")
        .on("click", function () {
            $("html").toggleClass("header-menu-enabled no-scroll");
            $(this).toggleClass("active");

            $('.header-menu *[class*="-scroll"]').animate({ scrollTop: 0 });
        });

    // LINK SCROLL OR PANEL OVERLAY CLICK HANDLING
    $(".header-menu .link-scroll, .header-menu .panel-overlay")
        .off("click")
        .on("click", function () {
            $("html").removeClass("header-menu-enabled no-scroll");
            $(".header-menu-ctrl > .menu-ctrl").removeClass("active");

            $('.header-menu *[class*="-scroll"]').animate({ scrollTop: 0 });
        });
});

/*::* FOOTER *::*/
jQuery(document).ready(function ($) {});
