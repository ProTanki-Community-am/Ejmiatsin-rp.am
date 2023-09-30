var x, i, j, l, ll, selElmnt, a, b, c;
x = document.getElementsByClassName('select');
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName('select')[0];
    ll = selElmnt.length;
    a = document.createElement('DIV');
    a.setAttribute('class', 'select-selected input placeholder');
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement('DIV');
    b.setAttribute('class', 'select-items select-hide');
    for (j = 1; j < ll; j++) {
        c = document.createElement('DIV');
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener('click', function(e) {
            a.classList.remove('placeholder');
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName('select')[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName('same-as-selected');
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute('class');
                    }
                    this.setAttribute('class', 'same-as-selected');
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener('click', function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle('select-hide');
        this.classList.toggle('select-arrow-active');
    });
}

function closeAllSelect(elmnt) {
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName('select-items');
    y = document.getElementsByClassName('select-selected');
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i);
        } else {
            y[i].classList.remove('select-arrow-active');
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add('select-hide');
        }
    }
}
document.addEventListener('click', closeAllSelect);
$(document).ready(function() {
    AOS.init();
    var prefs = {
        element: '.circlebar'
    };
    if ($('.circlebar').length) {
        $('.circlebar').each(function() {
            prefs.element = $(this);
            new Circlebar(prefs);
        });
    }
    $('.rating-tabs__item').on('click', function(e) {
        e.preventDefault();
        $(this).addClass('active');
        $(this).siblings('.active').removeClass('active');
        $('.rating-tab.active').slideToggle('slow').removeClass('active');
        $('.rating-tab[data-tab="' + $(this).data('tab-target') + '"]').slideToggle('slow').addClass('active');
    });
    $('.burger').click(function() {
        $(this).toggleClass('active');
        $('.nav').slideToggle();
    });
    if (window.outerWidth > 768) {
        let parallaxScenes = {};
        const scenes = document.querySelectorAll('.scene');
        scenes.forEach((el, i) => {
            parallaxScenes['el' + i] = new Parallax(el);
        });
    }
    $('.modal__close').on('click', function(e) {
        e.preventDefault();
        modalClose();
    });
    $('.modal').on('click', function(e) {
        if ($(e.target).hasClass('modal_active')) {
            modalClose();
        }
    });

    function modalClose() {
        $('body').css('overflow', 'auto');
        $('.modal').hasClass('modal_active') ? $('.modal').removeClass('modal_active') : $('.modal').addClass('modal_active');
        $('.modal__body').slideUp();
    }
    $('.modal-trigger').on('click', function(e) {
        e.preventDefault();
        $('body').css('overflow', 'hidden');
        let target = $(this).attr('modal-target');
        $('.modal').addClass('modal_active');
        $(target).slideDown();
    });
});

function Circlebar(prefs) {
    this.element = $(prefs.element);
    this.element.append('<div class="spinner-holder-one animate-0-25-a"><div class="spinner-holder-two animate-0-25-b"><div class="loader-spinner" style=""></div></div></div><div class="spinner-holder-one animate-25-50-a"><div class="spinner-holder-two animate-25-50-b"><div class="loader-spinner"></div></div></div><div class="spinner-holder-one animate-50-75-a"><div class="spinner-holder-two animate-50-75-b"><div class="loader-spinner"></div></div></div><div class="spinner-holder-one animate-75-100-a"><div class="spinner-holder-two animate-75-100-b"><div class="loader-spinner"></div></div></div>');
    this.value, this.maxValue, this.counter, this.dialWidth, this.size, this.fontSize, this.fontColor, this.skin, this.triggerPercentage, this.type, this.timer;
    var attribs = this.element[0].dataset,
        that = this;
    this.initialise = function() {
        that.value = parseInt(attribs.circleStarttime) || parseInt(prefs.startTime) || 0;
        that.maxValue = parseInt(attribs.circleMaxvalue) || parseInt(prefs.maxValue) || 60;
        that.counter = parseInt(attribs.circleCounter) || parseInt(prefs.counter) || 1000;
        that.dialWidth = parseInt(attribs.circleDialwidth) || parseInt(prefs.dialWidth) || 5;
        that.size = attribs.circleSize || prefs.size || '150px';
        that.fontSize = attribs.circleFontsize || prefs.fontSize || '20px';
        that.fontColor = attribs.circleFontcolor || prefs.fontColor || 'rgb(135, 206, 235)';
        that.skin = attribs.circleSkin || prefs.skin || ' ';
        that.triggerPercentage = attribs.circleTriggerpercentage || prefs.triggerPercentage || false;
        that.type = attribs.circleType || prefs.type || 'timer';
        that.element.addClass(that.skin).addClass('loader');
        that.element.find('.loader-bg').css('border-width', that.dialWidth + 'px');
        that.element.find('.loader-spinner').css('border-width', that.dialWidth + 'px');
        that.element.css({
            width: that.size,
            height: that.size
        });
        that.element.find('.loader-bg .circle-text').css({
            'font-size': that.fontSize,
            color: that.fontColor
        });
    };
    this.initialise();
    this.renderProgress = function(progress) {
        progress = Math.floor(progress);
        var angle = 0;
        if (progress < 25) {
            angle = -90 + (progress / 100) * 360;
            that.element.find('.animate-0-25-b').css('transform', 'rotate(' + angle + 'deg)');
            if (that.triggerPercentage) {
                that.element.addClass('circle-loaded-0');
            }
        } else if (progress >= 25 && progress < 50) {
            angle = -90 + ((progress - 25) / 100) * 360;
            that.element.find('.animate-0-25-b').css('transform', 'rotate(0deg)');
            that.element.find('.animate-25-50-b').css('transform', 'rotate(' + angle + 'deg)');
            if (that.triggerPercentage) {
                that.element.removeClass('circle-loaded-0').addClass('circle-loaded-25');
            }
        } else if (progress >= 50 && progress < 75) {
            angle = -90 + ((progress - 50) / 100) * 360;
            that.element.find('.animate-25-50-b, .animate-0-25-b').css('transform', 'rotate(0deg)');
            that.element.find('.animate-50-75-b').css('transform', 'rotate(' + angle + 'deg)');
            if (that.triggerPercentage) {
                that.element.removeClass('circle-loaded-25').addClass('circle-loaded-50');
            }
        } else if (progress >= 75 && progress <= 100) {
            angle = -90 + ((progress - 75) / 100) * 360;
            that.element.find('.animate-50-75-b, .animate-25-50-b, .animate-0-25-b').css('transform', 'rotate(0deg)');
            that.element.find('.animate-75-100-b').css('transform', 'rotate(' + angle + 'deg)');
            if (that.triggerPercentage) {
                that.element.removeClass('circle-loaded-50').addClass('circle-loaded-75');
            }
        }
    };
    this.textFilter = function() {
        var percentage = 0,
            date = 0,
            text = that.element.find('.circle-text');
        if (that.type == 'timer') {
            that.timer = setInterval(function() {
                if (that.value < that.maxValue) {
                    that.value += parseInt(that.counter / 1000);
                    percentage = (that.value * 100) / that.maxValue;
                    that.renderProgress(percentage);
                    text[0].dataset.value = that.value;
                    date = new Date(null);
                    date.setSeconds(that.value);
                    text.html(date.toISOString().substr(11, 8));
                } else {
                    clearInterval(that.timer);
                }
            }, that.counter);
        }
        if (that.type == 'progress') {
            function setDeceleratingTimeout(factor, times) {
                var internalCallback = (function(counter) {
                    return function() {
                        if (that.value < that.maxValue && that.value < 1000) {
                            that.value += 1;
                            that.renderProgress(that.value);
                            text[0].dataset.value = that.value;
                            text.html(Math.floor(that.value));
                            setTimeout(internalCallback, ++counter * factor);
                        }
                    };
                })(times, 0);
                setTimeout(internalCallback, factor);
            }
            setDeceleratingTimeout(0.1, 100);
        }
    };
    this.textFilter();
    this.setValue = function(val) {
        text = that.element.find('.circle-text');
        that.value = val;
        that.renderProgress(that.value);
        text[0].dataset.value = that.value;
        text.html(that.value);
    };
}
(function($) {
    $.fn.Circlebar = function(prefs) {
        prefs.element = this.selector;
        new Circlebar(prefs);
    };
})(jQuery);
if ($('#circle-1').length) {
    new Circlebar({
        element: '#circle-1',
        type: 'progress',
        maxValue: '47',
        size: 56,
        fontSize: '16px',
        fontColor: '#181818'
    });
}
if ($('#circle-2').length) {
    new Circlebar({
        element: '#circle-2',
        type: 'progress',
        maxValue: 65,
        size: 56,
        fontSize: '16px',
        fontColor: '#181818'
    });
}
$(document).ready(function() {
    $(window).resize(function() {
        mobProfileToggle();
    });
});
mobProfileToggle();

function mobProfileToggle() {
    if ($(window).width() < 992) {
        $('.user__info .user__list').prepend($('.user__circle-list'));
    } else {
        $('.user__circles-wrap').append($('.user__circle-list'));
    }
}
document.addEventListener('DOMContentLoaded', donateFunction);

function donateFunction() {
    document.querySelector('#money').addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
    });
    var donateForm = document.querySelector('.donate-form');
    if (!!donateForm) {
        donateForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validate(this)) {
                let ajax_link = window.location.protocol +
                    '//' +
                    window.location.host +
                    '/donate_api/ajax.php?ajax_pay=check';
                let request = new XMLHttpRequest();
                let formData = new FormData(this);
                request.open('POST', ajax_link);
                request.addEventListener('readystatechange', function() {
                    if (this.readyState == 4 && this.status == 200) {
                        let res = JSON.parse(this.response);
                        if (res.result === 'ok') {
                            window.location.href = res.link;
                        } else {
                            document.querySelector('#name').classList.add('error');
                        }
                    }
                });
                request.send(formData);
            }
        });
    }

    function preparePayment(form, payment) {
        let ajax_link = window.location.protocol +
            '//' +
            window.location.host +
            '/donate_api/multy.php';
        let userName = form.querySelector("input[name='name']").value;
        let userMoney = form.querySelector("input[name='money']").value;
        let paymentId = payment.getAttribute('id');
        if (paymentId == 'interkassa') {
            var interForm = document.querySelector('#interkassa-form');
            interForm.querySelector("input[name='ik_pm_no']").value = userName;
            interForm.querySelector("input[name='ik_am']").value = userMoney;
            interForm.submit();
        }
        if (paymentId == 'enot') {
            let formData = 'userMoney=' +
                userMoney +
                '&userName=' +
                userName +
                '&paymentId=' +
                paymentId;
            let request = new XMLHttpRequest();
            request.open('POST', ajax_link);
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.addEventListener('readystatechange', function() {
                if (this.readyState == 4 && this.status == 200) {
                    let res = JSON.parse(this.response);
                    if (res.status == true) {
                        window.location.href = res.data;
                    }
                }
            });
            request.send(formData);
        }
        if (paymentId == 'kapusta') {
            let formData = 'userMoney=' +
                userMoney +
                '&userName=' +
                userName +
                '&paymentId=' +
                paymentId;
            let request = new XMLHttpRequest();
            request.open('POST', ajax_link);
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.addEventListener('readystatechange', function() {
                if (this.readyState == 4 && this.status == 200) {
                    let res = JSON.parse(this.response);
                    if (res.status == true) {
                        window.location.href = res.data;
                    }
                }
            });
            request.send(formData);
        }
    }
    var donateMultyForm = document.querySelector('.donate-multy');
    if (!!donateMultyForm) {
        donateMultyForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validate(this)) {
                var paymentIems = document.querySelectorAll('.payment-item');
                if (!!paymentIems) {
                    paymentIems.forEach(function(item, idx) {
                        item.addEventListener('click', function() {
                            preparePayment(donateMultyForm, item);
                        });
                    });
                }
                document.querySelector('#modal-payments').style.opacity = '1';
                document.querySelector('#modal-payments').style.pointerEvents = 'auto';
            }
        });
    }
    var modalClose = document.querySelector('.modal-payment-close');
    if (!!modalClose) {
        modalClose.addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelector('#modal-payments').style.opacity = '0';
            document.querySelector('#modal-payments').style.pointerEvents = 'none';
        });
    }
    var donateInterForm = document.querySelector('.donate-interkassa');
    if (!!donateInterForm) {
        donateInterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validate(this)) {
                donateInterForm.querySelector("input[name='ik_pm_no']").value = donateInterForm.querySelector('#name').value;
                donateInterForm.querySelector("input[name='ik_am']").value = donateInterForm.querySelector('#money').value;
                donateInterForm.submit();
            }
        });
    }
}

function validate(form) {
    let name = form.querySelector('#name');
    let server = form.querySelector('#server');
    let money = form.querySelector('#money');
    let privacy = form.querySelector('#privacy');
    let formIsCorrect = true;
    if (name.value.length <= 6) {
        name.classList.add('error');
        formIsCorrect = false;
    } else {
        let nameTest = name.value.match(/.*_.*/gu);
        if (!!nameTest) {
            name.classList.remove('error');
        } else {
            name.classList.add('error');
            formIsCorrect = false;
        }
    }
    if (server.value.length <= 3) {
        document.querySelector('.select-selected').classList.add('error');
        formIsCorrect = false;
    } else {
        document.querySelector('.select-selected').classList.remove('error');
    }
    if (money.value.length <= 1) {
        money.classList.add('error');
        formIsCorrect = false;
    } else {
        money.classList.remove('error');
    }
    if (privacy.checked !== true) {
        document.querySelector('.checkbox__mark').classList.add('error');
        formIsCorrect = false;
    } else {
        document.querySelector('.checkbox__mark').classList.remove('error');
    }
    return formIsCorrect;
}
$(document).ready(function() {
    $('svg.radial-progress').each(function(index, value) {
        $(this).find($('circle.complete')).removeAttr('style');
    });
    $('svg.radial-progress').each(function(index, value) {
        percent = $(value).data('percentage');
        radius = $(this).find($('circle.complete')).attr('r');
        circumference = 2 * Math.PI * radius;
        strokeDashOffset = circumference - (percent * circumference) / 100;
        $(this).find($('circle.complete')).animate({
            'stroke-dashoffset': strokeDashOffset
        }, 1250);
    });
});