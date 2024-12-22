<template>
  <div class="container">
    <section class="hero"><p>Scroll Down</p></section>
    <section class="sticky">
      <div class="col">
        <div class="services">
          <div class="indicator"></div>
          <div class="service active"><p>Deliverables</p></div>
          <div class="service"><p>Brand & Event Design</p></div>
          <div class="service"><p>Video & Fotographie</p></div>
          <div class="service"><p>Motion Design</p></div>
          <div class="service"><p>3D Graphics</p></div>
          <div class="service"><p>Print & Drukwork</p></div>
          <div class="service"><p>Digital Antwerp (UI/UX)</p></div>
          <div class="service"><p>Web Development</p></div>
        </div>
      </div>
      <div class="col">
        <div class="service-img-wrapper">
          <div class="service-img">
            <div class="img"><img src="/src/assets/images/sample1/img1.jpg" alt="" /></div>
            <div class="img"><img src="/src/assets/images/sample1/img2.jpg" alt="" /></div>
            <div class="img"><img src="/src/assets/images/sample1/img3.jpg" alt="" /></div>
            <div class="img"><img src="/src/assets/images/sample1/img4.jpg" alt="" /></div>
            <div class="img"><img src="/src/assets/images/sample1/img5.jpg" alt="" /></div>
            <div class="img"><img src="/src/assets/images/sample1/img6.jpg" alt="" /></div>
            <div class="img"><img src="/src/assets/images/sample1/img7.jpg" alt="" /></div>
            <div class="img"><img src="/src/assets/images/sample1/img8.jpg" alt="" /></div>
          </div>
        </div>
        <div class="service-copy">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            deserunt soluta, consequatur sit et tenetur facilis ex ab
            voluptatibus possimus voluptatem doloribus delectus id eveniet qui
            similique magnam quibusdam nostrum.
          </p>
        </div>
      </div>

      <div class="progress-bar">
        <div class="progress"></div>
      </div>
      <div class="index">
        <span id="current-count">1</span>
        <span class="separator"></span>
        <span class="total-count">8</span>
      </div>
    </section>
    <section class="outro"><p>Your next section goes here</p></section>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SplitType from "split-type";

const servicesCopy = [
  [
    "We transform your ideas into tangible results. Our deliverables are meticulously crafted to exceed expectations, ensuring every project milestone is met with precision and excellence. From concept to completion.",
  ],
  [
    "Our brand and event design services create compelling visual identities that leave lasting impressions. We craft cohesive brand experiences and design engaging event spaces that tell your story, connect with your audience, and elevate your brand.",
  ],
  [
    "Through expert videography and photography, we capture the essence of your brand. Our visual storytelling combines technical excellence with creative vision, delivering powerful imagery that resonates with your target audience.",
  ],
  [
    "Our motion design expertise brings static concepts to life. We create dynamic visual experiences through animation, kinetic typography, and fluid transitions, ensuring your message not only reaches but captivates your audience in today's fast-paced landscape.",
  ],
  [
    "We push creative boundaries with cutting-edge 3D graphics. Our team creates immersive visual experiences, from product visualization to architectural rendering, bringing depth and dimension to your projects with state-of-the-art modeling.",
  ],
  [
    "Our print and drukwerk solutions combine traditional craftsmanship with modern innovation. We deliver premium quality printed materials that make a tangible impact, from business collateral to large-format displays, using sustainable materials.",
  ],
  [
    "Through intuitive UI/UX design, we create digital experiences that delight users. Our approach combines aesthetic excellence with functional efficiency, ensuring every interaction is meaningful, accessible, and aligned with your business objectives.",
  ],
  [
    "Our web development solutions leverage cutting-edge technologies to build robust, scalable digital platforms. We create responsive, performance-optimized websites and applications that provide seamless user experiences across all devices.",
  ],
];


document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const stickySection = document.querySelector(".sticky");
  const stickyHeight = window.innerHeight * 8;
  const services = document.querySelectorAll(".service");
  const indicator = document.querySelector(".indicator");
  const currentCount = document.querySelector("#current-count");
  const serviceImg = document.querySelector(".service-img");
  const serviceCopy = document.querySelector(".service-copy p");
  const serviceHeight = 38;
  const imgHeight = 250;

  serviceCopy.textContent = servicesCopy[0][0];
  let currentSplitText = new SplitType(serviceCopy, { types: "lines" });

  const measureContainer = document.createElement("div");
  measureContainer.style.cssText = `
      position: absolute;
      visibility: hidden;
      height: auto;
      width: auto;
      white-space: nowrap;
      font-family: "PP NeueBit";
      font-size: 60px;
      font-weight: 600;
      text-transform: uppercase;
  `;
  document.body.appendChild(measureContainer);

  const serviceWidths = Array.from(services).map((service) => {
    measureContainer.textContent = service.querySelector("p").textContent;
    return measureContainer.offsetWidth + 8;
  });

  document.body.removeChild(measureContainer);

  gsap.set(indicator, {
    width: serviceWidths[0],
    xPercent: -50,
    left: "50%",
  });

  const scrollPerService = window.innerHeight;
  let currentIndex = 0;

  const animateTextChange = (index) => {
    return new Promise((resolve) => {
      gsap.to(currentSplitText.lines, {
        opacity: 0,
        y: -20,
        duration: 0.25,
        stagger: 0.025,
        ease: "power3.inOut",
        onComplete: () => {
          currentSplitText.revert();

          const newText = servicesCopy[index][0];
          serviceCopy.textContent = newText;

          currentSplitText = new SplitType(serviceCopy, {
            types: "lines",
          });

          gsap.set(currentSplitText.lines, {
            opacity: 0,
            y: 20,
          });

          gsap.to(currentSplitText.lines, {
            opacity: 1,
            y: 0,
            duration: 0.25,
            stagger: 0.025,
            ease: "power3.out",
            onComplete: resolve,
          });
        },
      });
    });
  };

  ScrollTrigger.create({
    trigger: stickySection,
    start: "top top",
    end: `${stickyHeight}px`,
    pin: true,
    onUpdate: async (self) => {
      const progress = self.progress;
      gsap.set(".progress", { scaleY: progress });

      const scrollPosition = Math.max(0, self.scroll() - window.innerHeight);
      const activeIndex = Math.floor(scrollPosition / scrollPerService);

      if (
        activeIndex >= 0 &&
        activeIndex < services.length &&
        currentIndex !== activeIndex
      ) {
        currentIndex = activeIndex;

        services.forEach((service) => service.classList.remove("active"));
        services[activeIndex].classList.add("active");

        await Promise.all([
          gsap.to(indicator, {
            y: activeIndex * serviceHeight,
            width: serviceWidths[activeIndex],
            duration: 0.3,
            ease: "power3.inOut",
            overwrite: true,
          }),

          gsap.to(serviceImg, {
            y: -(activeIndex * imgHeight),
            duration: 0.3,
            ease: "power3.inOut",
            overwrite: true,
          }),

          gsap.to(currentCount, {
            innerText: activeIndex + 1,
            snap: { innerText: 1 },
            duration: 0.3,
            ease: "power3.out",
          }),

          animateTextChange(activeIndex),
        ]);
      }
    },
  });
});

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 1100vh;
  font-family: "TT Hoves Pro Trial";
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

section {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.hero,
.outro {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #d5d5d5;
}

.hero {
  align-items: flex-end;
  background: url(./src/assets/images/sample1/hero.jpg) no-repeat 50% 50%;
  padding-bottom: 4em;
  background-size: cover;
  color: #fff;
}

.outro {
  background-color: #ff00ff;
}

.outro p {
  text-transform: uppercase;
  font-family: "PP NeueBit";
  font-size: 30px;
  font-weight: 600;
  line-height: 18px;
  padding: 4px 2px 0 2px;
  background-color: #000;
  color: #fff;
}

.sticky {
  display: flex;
}

.col {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2em;
}

.services {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 38px;
  transform: translateY(0px);
  background-color: #000;
  z-index: -1;
}

.service {
  width: max-content;
  height: 38px;
}

.service p {
  text-transform: uppercase;
  font-family: "PP NeueBit";
  font-size: 40px;
  font-weight: 600;
  line-height: 36px;
  color: #d5d5d5;
  transition: color 0.3s;
}

.service.active p {
  color: #fff;
}

.service-img-wrapper {
  position: relative;
  width: 60%;
  height: 250px;
  overflow: hidden;
  clip-path: polygon(50% 0%, 100% 0, 100% 85%, 90% 100%, 50% 100%, 0 100%, 0 0);
}

.service-img {
  width: 100%;
  height: 2000px;
  transform: translateY(0px);
  will-change: transform;
}

.img {
  width: 100%;
  height: 250px;
}

.service-copy {
  width: 60%;
}

.line {
  position: relative;
  will-change: transform;
}

.service-copy p {
  font-family: "TT Hoves Pro Trial";
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
}

.progress-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2.5px;
  height: 60%;
  background-color: #e0e0e0;
}

.progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  transform-origin: top;
  transform: scaleY(0);
  will-change: transform;
}

.index {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  padding: 4px 2px 2px 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  color: #fff;
}

.index span {
  font-family: "PP NeueBit";
  font-size: 20px;
  font-weight: 600;
  line-height: 12px;
  width: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.index span.separator {
  position: relative;
  top: -1px;
  width: 20px;
  height: 2px;
  background-color: #ff00ff;
}

@media (max-width: 900px) {
  .sticky {
    flex-direction: column;
  }

  .col:nth-child(1) {
    padding-top: 25%;
    justify-content: flex-start;
  }

  .col:nth-child(2) {
    flex-direction: row;
    gap: 1.5em;
  }

  .service-img-wrapper {
    width: 25%;
  }

  .service-copy p {
    font-size: 14px;
  }

  .progress-bar {
    top: -15%;
    height: 50%;
    transform: rotate(-90deg);
  }

  .index {
    top: 5%;
    bottom: unset;
  }
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-smooth iframe {
  pointer-events: none;
}

</style>
