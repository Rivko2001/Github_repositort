const canvas = document.getElementById("stedenChart");
const ctx = canvas.getContext("2d");
const keuze = document.getElementById("grafiekKeuze");

function tekenGrafiek(eigenschap) {
  const steden = Object.keys(stedenData);
  const waarden = steden.map(stad => stedenData[stad][eigenschap]);

  const kleuren = ["#ce2b37", "#009246", "#f4a261"];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maxWaarde = Math.max(...waarden);

  // meer ruimte links voor cijfers
  const paddingLeft = 90;
  const paddingRight = 50;
  const paddingTop = 60;
  const paddingBottom = 60;

  const chartWidth = canvas.width - paddingLeft - paddingRight;
  const chartHeight = canvas.height - paddingTop - paddingBottom;

  const barWidth = 120;
  const gap = 40;
  const stappen = 5;

  // titel
  ctx.font = "20px Verdana";
  ctx.fillStyle = "black";
  ctx.fillText(`Vergelijking: ${eigenschap}`, 20, 30);

  // assen
  ctx.beginPath();
  ctx.moveTo(paddingLeft, paddingTop);
  ctx.lineTo(paddingLeft, canvas.height - paddingBottom);
  ctx.lineTo(canvas.width - paddingRight, canvas.height - paddingBottom);
  ctx.strokeStyle = "black";
  ctx.stroke();

  // y-as cijfers + hulplijnen
  ctx.font = "12px Verdana";
  ctx.fillStyle = "black";

  for (let i = 0; i <= stappen; i++) {
    const waarde = (maxWaarde / stappen) * i;
    const y = canvas.height - paddingBottom - (waarde / maxWaarde) * chartHeight;

    // cijfers iets meer naar links
    ctx.fillText(Math.round(waarde), 15, y + 4);

    ctx.strokeStyle = "#bbb";
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(canvas.width - paddingRight, y);
    ctx.stroke();
  }

  // balken + labels
  waarden.forEach((waarde, index) => {
    const x = paddingLeft + 30 + index * (barWidth + gap);
    const barHeight = (waarde / maxWaarde) * chartHeight;
    const y = canvas.height - paddingBottom - barHeight;

    ctx.fillStyle = kleuren[index];
    ctx.fillRect(x, y, barWidth, barHeight);

    // stadsnaam onder balk
    ctx.fillStyle = "black";
    ctx.font = "14px Verdana";
    ctx.fillText(steden[index], x, canvas.height - paddingBottom + 20);

    // waarde boven balk
    ctx.fillText(waarde, x, y - 10);
  });

  // legenda rechtsboven
  kleuren.forEach((kleur, index) => {
    const legendX = canvas.width - 160;
    const legendY = 60 + index * 25;

    ctx.fillStyle = kleur;
    ctx.fillRect(legendX, legendY, 15, 15);

    ctx.fillStyle = "black";
    ctx.font = "13px Verdana";
    ctx.fillText(steden[index], legendX + 25, legendY + 12);
  });
}

keuze.addEventListener("change", function () {
  tekenGrafiek(this.value);
});

tekenGrafiek(keuze.value);