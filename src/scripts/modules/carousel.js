const initCarousels = () => {
  [...document.querySelectorAll(".carousel")].forEach((carousel) => {
    const content = carousel.querySelector(".carousel-content");
    const container = carousel.querySelector(".container");
    const awards = carousel.querySelectorAll(".award");
    let isMoving = false;
    let speed = 0;
    let offset = 0;
    const contentWidth = awards[awards.length-1].getBoundingClientRect().right - awards[0].getBoundingClientRect().left;

    const updateOffset = () => {
      content.style.setProperty("--offset", `${-offset}px`);
    }

    const startAnimation = () => {
      isMoving = true;
      carousel.classList.add('animated');
      const update = () => {
        if (isMoving) {
          offset += speed;
          offset = Math.min(offset, contentWidth - container.offsetWidth);
          offset = Math.max(offset, 0);
          updateOffset();
          requestAnimationFrame(update)
        };
      }
      update();
    }

    const stopAnimation = () => {
      isMoving = false;
      offset = 0;
      updateOffset();
      carousel.classList.remove('animated');
    }

    carousel.addEventListener('mouseenter', startAnimation);
    carousel.addEventListener('mouseleave', stopAnimation);

    carousel.addEventListener('mousemove', (event) => {
      const { clientX } = event;
      const rect = container.getBoundingClientRect();
      const x = (clientX - rect.left - (rect.width / 2)) / (rect.width / 2);
      speed = Math.abs(x) > .15 ? x * 6 : 0;
    })
  });
}

export default initCarousels;