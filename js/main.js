("use strict");

const forms = [...document.querySelectorAll("form")];
const body = document.querySelector("body");
const inputTel = [...document.querySelectorAll(".input-tel")];
const files = {
  presentation: "Презентация Volna_Residence.pdf",
  plan: "План территории Volna Residences.pdf",
  album:
    "https://drive.google.com/drive/folders/1ZV0Wn8dpMVpJ_Vi0TvWwTMWS50pgOeCR",
  docs: "https://drive.google.com/drive/folders/1ZUCapcGLnM3ZCQrU_hiMIGHbpi_Jusz9",
};

function IsSafari() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("safari") != -1) {
    if (ua.indexOf("chrome") > -1) {
      return "chrome"; // Chrome
    } else {
      return "safari"; // Safari
    }
  }
}

const locationToFiles = (path) => {
  if (IsSafari() === "safari") {
    location.href = "thank.html";
  } else {
    var myWindow = window.open("", "", "height=100%,width=100%");
    myWindow.location.href = path;
    location.href = "thank.html";
  }
};

const downloadPDF = (path) => {
  const promise = new Promise((resolve) => {
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", path);
    downloadLink.setAttribute("download", path);
    downloadLink.click();
    resolve(path);
  });

  promise.then((path) => {
    if (IsSafari() === "safari") {
      location.href = "thank.html";
    } else {
      var myWindow = window.open("", "", "height=100%,width=100%");
      myWindow.location.href = path;
      location.href = "thank.html";
    }
  });
};

// $(".input-tel").inputmask({ mask: "+7 (999) 999-99-99" });

$.mask.definitions["9"] = false;
$.mask.definitions["5"] = "[0-9]";
$.mask.definitions["3"] = "9";
$(".input-tel").mask("+7 (355) 555-5555");

// forms.forEach((form) => {
// form.addEventListener("input", (e) => {
// if (e.target.classList.contains("input-name")) {
//   e.target.value = e.target.value.replace(/[^a-zA-Zа-яёА-ЯЁ\ ]+/gi, "");
//   if (e.target.value[0] === " ") {
//     e.target.value = "";
//   }
//   if (e.target.value.length == 1) {
//     e.target.value = e.target.value.toUpperCase();
//   }
// }
// });
// });

$(".header__content-form").submit(function (event) {
  event.preventDefault();
  var str = $(this).serialize();
  if (true) {
    $.ajax({
      type: "POST",
      url: "submit.php",
      data: str,
      success: function () {
        console.log("send");
        downloadPDF(files.presentation);
        $(".modal__form")[0].reset();
      },
      error: function () {
        console.log("fail");
      },
    });
  }
  return false;
});

$(".modal-plan__form").submit(function (event) {
  event.preventDefault();
  var str = $(this).serialize();
  if (true) {
    $.ajax({
      type: "POST",
      url: "submit.php",
      data: str,
      success: function () {
        console.log("send");
        downloadPDF(files.plan);
        $(".modal__form")[0].reset();
      },
      error: function () {
        console.log("fail");
      },
    });
  }
  return false;
});

$(".modal-album__form").submit(function (event) {
  event.preventDefault();
  var str = $(this).serialize();
  if (true) {
    $.ajax({
      type: "POST",
      url: "submit.php",
      data: str,
      success: function () {
        console.log("send");
        locationToFiles(files.album);
        $(".modal__form")[0].reset();
      },
      error: function () {
        console.log("fail");
      },
    });
  }
  return false;
});

$(".modal-purchase__form").submit(function (event) {
  event.preventDefault();
  var str = $(this).serialize();
  if (true) {
    $.ajax({
      type: "POST",
      url: "submit.php",
      data: str,
      success: function () {
        console.log("send");
        location.href = "thank.html";
        $(".modal__form")[0].reset();
      },
      error: function () {
        console.log("fail");
      },
    });
  }
  return false;
});

$(".header-modal__form").submit(function (event) {
  event.preventDefault();
  var str = $(this).serialize();
  if (true) {
    $.ajax({
      type: "POST",
      url: "submit.php",
      data: str,
      success: function () {
        console.log("send");
        location.href = "thank.html";
        $(".modal__form")[0].reset();
      },
      error: function () {
        console.log("fail");
      },
    });
  }
  return false;
});

$(".modal-safety__form").submit(function (event) {
  event.preventDefault();
  var str = $(this).serialize();
  if (true) {
    $.ajax({
      type: "POST",
      url: "submit.php",
      data: str,
      success: function () {
        console.log("send");
        $(".modal__form")[0].reset();
        locationToFiles(files.docs);
      },
      error: function () {
        console.log("fail");
      },
    });
  }
  return false;
});

$(".modal-contacts__form").submit(function (event) {
  event.preventDefault();
  var str = $(this).serialize();
  if (true) {
    $.ajax({
      type: "POST",
      url: "submit.php",
      data: str,
      success: function () {
        console.log("send");
        downloadPDF(files.presentation);
        $(".modal__form")[0].reset();
      },
      error: function () {
        console.log("fail");
      },
    });
  }
  return false;
});

const animateMainScreen = () => {
  const images = [...document.querySelectorAll(".header__image--scaled")];
  const imageDark = document.querySelector(".header__image--dark");
  const imageLight = document.querySelector(".header__image--light");
  const inner = document.querySelector(".header__inner");
  const bodyTopHeight = document.documentElement.scrollTop;

  const activeClasses = (bool) => {
    if (bool) {
      $(".burger").removeClass("burger--active");
      $(".menu--sm").removeClass("menu--active");
      $("body").css("overflow", "visible");
    } else {
      $(".burger").addClass("burger--active");
      $(".menu--sm").addClass("menu--active");
      $("body").css("overflow", "hidden");
      window.removeEventListener("wheel", startMainScreenAnimation);
    }
  };

  const scrollMenuLink = (target) => {
    let href = $(target).attr("href");

    $("html, body").animate(
      {
        scrollTop: $(href).offset().top,
      },
      {
        duration: 1000, // по умолчанию «400»
        easing: "linear", // по умолчанию «swing»
      }
    );

    return false;
  };

  const startMainScreenAnimation = (e) => {
    const innerHeight = inner.offsetHeight;

    const returnMainScreen = (e) => {
      let top = document.documentElement.scrollTop;

      if (top === 0) {
        let promise = new Promise(function (resolve, reject) {
          body.style.overflow = "hidden";
          imageLight.classList.remove("image-show");
          images.forEach((image) => {
            image.classList.remove("no-transition");
          });
          imageDark.style.opacity = 1;
          inner.style.transform = `translate(0, 0px)`;
          imageDark.classList.remove("scaled-active");
          setTimeout(() => {
            resolve("result");
          }, 2000);
        });

        promise.then((data) => {
          window.addEventListener("wheel", startMainScreenAnimation);
        });
      }
    };

    const promiseFunction = () => {
      let promise = new Promise(function (resolve, reject) {
        inner.style.transform = `translate(0,-${innerHeight}px)`;
        imageDark.classList.add("scaled-active");
        setTimeout(() => {
          resolve("result");
        }, 1500);
      });

      promise.then((data) => {
        imageDark.style.opacity = 0;
        imageLight.classList.add("image-show");
        body.style.overflow = "visible";
        setTimeout(() => {
          images.forEach((image) => {
            image.classList.add("no-transition");
          });
        }, 2300);
      });
    };

    if (e.deltaY > 0) {
      window.removeEventListener("wheel", startMainScreenAnimation);
      window.addEventListener("scroll", returnMainScreen);
      promiseFunction();
    }
  };

  $(".header").on("click", (e) => {
    const target = $(e.target);
    if (target.hasClass("menu__list-link")) {
      e.preventDefault();
      body.style.overflow = "visible";
      window.removeEventListener("wheel", startMainScreenAnimation);
      activeClasses(true);
      scrollMenuLink(target);
    } else if (target.hasClass("burger") || target.hasClass("burger__span")) {
      if ($(".menu").hasClass("menu--active")) {
        activeClasses(true);
      } else {
        activeClasses(false);
      }
    } else if (target.hasClass("header__top-btn")) {
      window.removeEventListener("wheel", startMainScreenAnimation);
    }
  });

  if (bodyTopHeight === 0 && document.documentElement.offsetWidth >= 1440) {
    window.addEventListener("wheel", startMainScreenAnimation);
    body.style.overflow = "hidden";
  }
};

const modalLogic = (data) => {
  const modal = $(data.modal);
  const closeIcon = $(data.closeIcon);
  const openButton = $(data.openButton);
  const closeBackgroundModal = $(".modal-close-bg");

  const deleteActiveClassesModals = (modal) => {
    const closeAnyModal = (modal) => {
      modal.removeClass("active");
      $("body").css("overflow", "visible");
      closeBackgroundModal.removeClass("active");
    };

    closeBackgroundModal.on("click", (e) => {
      closeAnyModal(modal);
    });
  };

  const toggleActiveClassModalPlan = (bool, modal) => {
    if (bool) {
      modal.addClass("active");
      $("body").css("overflow", "hidden");
      closeBackgroundModal.addClass("active");
    } else {
      modal.removeClass("active");
      $("body").css("overflow", "visible");
      closeBackgroundModal.removeClass("active");
    }
  };

  openButton.on("click", (event) => {
    event.preventDefault();
    toggleActiveClassModalPlan(true, modal);
  });

  closeIcon.on("click", (event) => {
    event.preventDefault();
    toggleActiveClassModalPlan(false, modal);
  });

  deleteActiveClassesModals(modal);
};

const toggleModals = {
  modalPlan() {
    modalLogic({
      modal: ".modal-plan",
      closeIcon: ".modal-plan__close",
      openButton: ".download-plan-btn",
    });
  },
  modalAlbum() {
    modalLogic({
      modal: ".modal-album",
      closeIcon: ".modal-album__close",
      openButton: ".album__button",
    });
  },
  modalPurchase() {
    modalLogic({
      modal: ".modal-purchase",
      closeIcon: ".modal-purchase__close",
      openButton: ".purchase__btn",
    });
  },
  modalSafety() {
    modalLogic({
      modal: ".modal-safety",
      closeIcon: ".modal-safety__close",
      openButton: ".safety__btn",
    });
  },
  modalContacts() {
    modalLogic({
      modal: ".modal-contacts",
      closeIcon: ".modal-contacts__close",
      openButton: ".contacts__btn",
    });
  },
  modalHeader() {
    modalLogic({
      modal: ".header-modal",
      closeIcon: ".header-modal__close",
      openButton: ".header__top-btn",
    });
  },
};

animateMainScreen();
toggleModals.modalPlan();
toggleModals.modalAlbum();
toggleModals.modalPurchase();
toggleModals.modalSafety();
toggleModals.modalContacts();
toggleModals.modalHeader();

new WOW().init();
