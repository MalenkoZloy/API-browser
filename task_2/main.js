const button = document.querySelector(".body__button");

button.addEventListener("click", () => {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const pageWidth = document.documentElement.scrollWidth;
  const pageHeight = document.documentElement.scrollHeight;
  alert(
    `Разрешение вашего монитора - Ширина:${screenWidth} Высота: ${screenHeight} `,
  );
  alert(`Размер веб-страницы: Ширина:${pageWidth} Высота: ${pageHeight} `);
});
