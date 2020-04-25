(function() {
  var opts = {
    imgurl: "",
    cw: 60,
    ch: 60,
    precision: 5,
    onSuccess: null,
    onError: null,
    eventinfo: {
      flag: false,
      left: 0,
      clipleft: 0,
      currentX: 0
    }
  };

  function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  }

  function createCaptchaBox(canvas) {
    var captchaBox = document.createElement("div");
    captchaBox.className = "captcha-box";
    captchaBox.style.width = canvas.width + "px";

    var canvasBox = document.createElement("div");
    canvasBox.className = "canvas-box";
    canvasBox.appendChild(canvas.cloneNode(true));
    canvasBox.appendChild(createResult());

    captchaBox.appendChild(canvasBox);
    captchaBox.appendChild(createDragBar());
    canvas.parentNode.replaceChild(captchaBox, canvas);
    return captchaBox;
  }

  function createDragBar() {
    var dragbar = document.createElement("div");
    dragbar.className = "captcha-dragbar";
    dragbar.innerHTML =
      '<div class="drag-track"></div><div id="drag-slider" class="drag-slider"></div><div class="drag-btn"><i id="drag-btn-close" class="close"></i><i id="drag-btn-refresh" class="refresh"></i></div>';
    return dragbar;
  }

  function createResult() {
    var result = document.createElement("div");
    result.id = "captcha-result";
    result.className = "captcha-result";
    return result;
  }

  function createCanvas(w, h) {
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    return canvas;
  }

  function clipPath(ctx, startx, starty) {
    startx = startx + 0.2;
    starty = starty + 0.2;

    var subw = parseInt((opts.cw - 1) / 6),
      subh = parseInt((opts.ch - 1) / 6),
      radius = Math.min(subw, subh),
      clipw = subw * 5 + 0.5,
      cliph = subh * 5 + 0.5;

    ctx.beginPath();
    ctx.moveTo(startx, starty);
    ctx.lineTo(startx + clipw, starty);
    ctx.lineTo(startx + clipw, starty + parseInt(cliph / 2) - radius);
    ctx.arc(
      startx + clipw,
      starty + parseInt(cliph / 2),
      radius,
      -Math.PI / 2,
      Math.PI / 2,
      false
    );
    ctx.lineTo(startx + clipw, starty + cliph);
    ctx.lineTo(startx + clipw - (parseInt(clipw / 2) - radius), starty + cliph);
    ctx.arc(
      startx + parseInt(clipw / 2),
      starty + cliph,
      radius,
      0,
      Math.PI,
      false
    );
    ctx.lineTo(startx, starty + cliph);
    ctx.lineTo(startx, starty);
    ctx.closePath();
  }

  function fillClip(canvas, startx, starty, alpha) {
    var ctx = canvas.getContext("2d");
    clipPath(ctx, startx, starty);

    ctx.fillStyle = "rgba(0,0,0, " + alpha + ")";
    ctx.fill();
  }

  function strokeClip(canvas, startx, starty) {
    var ctx = canvas.getContext("2d");
    clipPath(ctx, startx, starty);

    ctx.strokeStyle = "#fff";
    ctx.stroke();
  }

  function randomNum(min, max) {
    var rangeNum = max - min;
    var num = min + Math.round(Math.random() * rangeNum);
    return num;
  }

  function getStartPoint(w, h) {
    var padding = 10,
      startw = opts.cw + padding,
      starth = opts.ch + padding;
    if (w < startw * 2 || h < starth) return;

    var startPoint = {
      startx: randomNum(startw, w - startw),
      starty: randomNum(padding, h - starth)
    };
    return startPoint;
  }

  function eventInit(startx) {
    var slider = document.getElementById("drag-slider"),
      clipcanvas = document.getElementById("captcha-clipcanvas"),
      result = document.getElementById("captcha-result"),
      resultClass = result.className;

    opts.eventinfo.left = parseFloat(
      getComputedStyle(slider, null).getPropertyValue("left")
    );
    opts.eventinfo.clipleft = parseFloat(
      getComputedStyle(clipcanvas, null).getPropertyValue("left")
    );

    // var close = function() {};
    var reset = function() {
      var boxClassName = window.captchaBox.className;

      window.captchaBox.className += " shake";

      setTimeout(function() {
        slider.style.left = "10px";
        clipcanvas.style.left = "20px";

        opts.eventinfo.left = 10;
        opts.eventinfo.clipleft = 20;
      }, 500);
      setTimeout(function() {
        result.className = resultClass;
        window.captchaBox.className = boxClassName;
      }, 1500);
    };

    var moveStart = function(e) {
      opts.eventinfo.flag = true;
      if (e.touches) {
        opts.eventinfo.currentX = e.touches[0].clientX;
      } else {
        opts.eventinfo.currentX = e.clientX;
      }
    };
    var move = function(e) {
      if (opts.eventinfo.flag) {
        var disX;
        if (e.touches) {
          disX = e.touches[0].clientX - opts.eventinfo.currentX;
        } else {
          disX = e.clientX - opts.eventinfo.currentX;
        }
        slider.style.left = opts.eventinfo.left + disX + "px";
        clipcanvas.style.left = opts.eventinfo.clipleft + disX + "px";

        if (e.preventDefault) e.preventDefault();
        return false;
      }
    };
    var moveEnd = function(e) {
      console.log(e);
      if (opts.eventinfo.flag) {
        opts.eventinfo.flag = false;
        opts.eventinfo.left = parseFloat(
          getComputedStyle(slider, null).getPropertyValue("left")
        );
        opts.eventinfo.clipleft = parseFloat(
          getComputedStyle(clipcanvas, null).getPropertyValue("left")
        );

        if (Math.abs(startx - opts.eventinfo.left) <= opts.precision) {
          result.innerHTML = "��֤ͨ��";
          result.className = resultClass + " success";
          opts.onSuccess && opts.onSuccess();
        } else {
          result.innerHTML = "�϶����齫����ͼ����ȷƴ��";
          result.className = resultClass + " fail";

          reset();
          opts.onError && opts.onError();
        }
      }
    };

    slider.addEventListener("touchstart", moveStart);
    slider.addEventListener("mousedown", moveStart);
    slider.addEventListener("touchmove", move);
    slider.addEventListener("mousemove", move);
    document.addEventListener("touchend", moveEnd);
    document.addEventListener("mouseup", moveEnd);
  }

  var imgCaptcha = function(canvas, options) {
    for (var k in options) {
      /* eslint-disable */
      if (options.hasOwnProperty(k)) {
        opts[k] = options[k];
      }
      /* eslint-enable */
    }

    if (!canvas || !opts.imgurl) {
      console.error("verify params is error");
      return;
    }
    if (typeof canvas === "string") canvas = document.getElementById(canvas);
    if (canvas.tagName !== "CANVAS") {
      console.error("param canvas must be canvas");
      return;
    }

    window.captchaBox = createCaptchaBox(canvas);
    canvas = captchaBox.children[0].children[0];// eslint-disable-line
    canvas.className += canvas.className + " captcha-bg";

    var img = new Image();
    img.onload = function() {
      var w = canvas.width,
        h = canvas.height;

      var startPoint = getStartPoint(w, h);
      if (!startPoint) {
        console.error("can not get the start point");
        return;
      }
      var startx = startPoint.startx,
        starty = startPoint.starty;

      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      fillClip(canvas, startx, starty, 0.7);

      var sourceCanvas = createCanvas(w, h);
      var sctx = sourceCanvas.getContext("2d");
      sctx.drawImage(img, 0, 0, w, h);
      sctx.globalCompositeOperation = "destination-in";

      var destCanvas = createCanvas(opts.cw, opts.ch);
      fillClip(destCanvas, 0, 0, 1);

      sctx.drawImage(destCanvas, startx, starty);

      var clipCanvas = createCanvas(opts.cw, opts.ch);
      clipCanvas.id = "captcha-clipcanvas";
      clipCanvas.className = "captcha-clipcanvas";
      clipCanvas
        .getContext("2d")
        .putImageData(
          sctx.getImageData(startx, starty, opts.cw, opts.ch),
          0,
          0
        );

      strokeClip(clipCanvas, 0, 0);

      clipCanvas.style.top = starty + "px";
      captchaBox.appendChild(clipCanvas);// eslint-disable-line

      eventInit(startx);
    };

    opts.imgurl = isArray(opts.imgurl) ? opts.imgurl : [opts.imgurl];

    var urlIndex = Math.floor(Math.random() * opts.imgurl.length);
    img.src = opts.imgurl[urlIndex];
  };
  /* eslint-disable */
  if (typeof exports == "object") {
    module.exports = imgCaptcha;
  } else if (typeof define == "function" && define.amd) {
    define([], function() {
      return imgCaptcha;
    });
  } else if (window) {
    window.imgCaptcha = imgCaptcha;
  }
  /* eslint-enable */
})();
