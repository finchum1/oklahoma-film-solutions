/* =========================================================
   Oklahoma Film Solutions — interactions
   Motion is scoped to: nav state, scroll reveal, timeline
   progress, mobile menu, and form validation feedback.
   No window scroll listeners — IntersectionObserver only.
   ========================================================= */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Nav: shrink + backdrop on scroll ---------- */
  var nav = document.getElementById("siteNav");
  if (nav) {
    var navObserverTarget = document.querySelector(".hero");
    if (navObserverTarget) {
      var navIO = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            nav.classList.toggle("is-scrolled", !entry.isIntersecting || entry.intersectionRatio < 0.92);
          });
        },
        { threshold: [0, 0.92, 1], rootMargin: "-1px 0px 0px 0px" }
      );
      navIO.observe(navObserverTarget);
    }
  }

  /* ---------- Mobile menu ---------- */
  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.innerHTML = isOpen
        ? '<i class="ph ph-x"></i>'
        : '<i class="ph ph-list"></i>';
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.innerHTML = '<i class="ph ph-list"></i>';
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (prefersReducedMotion) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else if (revealEls.length) {
    var revealIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = (Array.prototype.indexOf.call(revealEls, el) % 4) * 70;
            setTimeout(function () {
              el.classList.add("is-visible");
            }, delay);
            revealIO.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealIO.observe(el);
    });
  }

  /* ---------- Process timeline progress line ---------- */
  var timeline = document.querySelector(".timeline");
  var progress = document.getElementById("timelineProgress");
  if (timeline && progress && !prefersReducedMotion) {
    var timelineIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            requestAnimationFrame(function () {
              progress.style.width = "92%";
            });
            timelineIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    timelineIO.observe(timeline);
  } else if (progress) {
    progress.style.width = "92%";
  }

  /* ---------- Contact form: validate + open mailto ---------- */
  var form = document.getElementById("contactForm");
  var successBox = document.getElementById("formSuccess");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var required = ["name", "email", "phone", "service"];
      var valid = true;

      required.forEach(function (name) {
        var input = form.elements[name];
        var fieldEl = document.getElementById("field-" + name);
        var ok = input.value.trim().length > 0;

        if (name === "email" && ok) {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
        }

        if (fieldEl) {
          fieldEl.classList.toggle("has-error", !ok);
        }
        if (!ok) valid = false;
      });

      if (!valid) {
        var firstError = form.querySelector(".has-error");
        if (firstError) {
          firstError.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
        }
        return;
      }

      var data = {
        name: form.elements["name"].value.trim(),
        company: form.elements["company"].value.trim(),
        email: form.elements["email"].value.trim(),
        phone: form.elements["phone"].value.trim(),
        service: form.elements["service"].value,
        message: form.elements["message"].value.trim(),
      };

      var body =
        "Name: " + data.name + "\n" +
        "Company: " + (data.company || "-") + "\n" +
        "Email: " + data.email + "\n" +
        "Phone: " + data.phone + "\n" +
        "Service needed: " + data.service + "\n\n" +
        "Job details:\n" + (data.message || "-");

      var mailto =
        "mailto:dispatch@oklahomafilmsolutions.com" +
        "?subject=" + encodeURIComponent("Service request: " + data.service + " (" + data.name + ")") +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;

      if (successBox) {
        successBox.classList.add("is-visible");
        successBox.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
      }
      form.reset();
    });

    /* clear error state as the user fixes a field */
    form.querySelectorAll("input, select, textarea").forEach(function (el) {
      el.addEventListener("input", function () {
        var fieldEl = el.closest(".field");
        if (fieldEl) fieldEl.classList.remove("has-error");
      });
    });
  }
})();
