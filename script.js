document.getElementById("downloadPDF").addEventListener("click", () => {
  // Oculta el botón antes de tomar el screenshot
  const btn = document.getElementById("downloadPDF");
  btn.style.display = "none";

  setTimeout(() => {
    import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js').then(() => {
      const { jsPDF } = window.jspdf;
      const cvElement = document.getElementById('cv');
      html2canvas(cvElement, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: 'a4'
        });

        // Medidas de página A4
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        let imgWidth = pageWidth - 20;
        let imgHeight = canvas.height * imgWidth / canvas.width;

        // Si la imagen sobrepasa la hoja, ajusta proporcionalmente
        if (imgHeight > pageHeight - 20) {
          imgHeight = pageHeight - 20;
          imgWidth = canvas.width * imgHeight / canvas.height;
        }

        // Centrar la imagen si queda espacio extra
        const x = (pageWidth - imgWidth) / 2;
        const y = 10;

        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        pdf.save("CV_Brian_Herrera.pdf");
        // Muestra de nuevo el botón
        btn.style.display = "inline-block";
      });
    });
  }, 200);
});
