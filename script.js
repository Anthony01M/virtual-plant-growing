const canvas = document.getElementById('plantCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let growthStage = 0;
const stages = [
    { height: 10, color: 'brown', leaves: 0, flowers: 0 },
    { height: 30, color: 'green', leaves: 0, flowers: 0 },
    { height: 60, color: 'green', leaves: 0, flowers: 0 },
    { height: 100, color: 'green', leaves: 1, flowers: 0 },
    { height: 150, color: 'green', leaves: 1, flowers: 1 },
    { height: 200, color: 'green', leaves: 1, flowers: 1 }
];

function drawPlant() {
    const stage = stages[growthStage];
    const x = canvas.width / 2;
    const y = canvas.height - stage.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'saddlebrown';
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

    ctx.beginPath();
    ctx.moveTo(x, canvas.height - 20);
    ctx.lineTo(x, y);
    ctx.strokeStyle = stage.color;
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();

    for (let i = 0; i < stage.leaves; i++) {
        const leafX = x + (i % 2 === 0 ? -15 : 15);
        const leafY = y + (i * stage.height / stage.leaves);
        ctx.beginPath();
        ctx.ellipse(leafX, leafY, 10, 5, Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.closePath();
    }

    if (stage.flowers > 0) {
        const flowerX = x;
        const flowerY = y - 20;
        ctx.beginPath();
        ctx.arc(flowerX, flowerY, 15, 0, Math.PI * 2, false);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(flowerX, flowerY, 5, 0, Math.PI * 2, false);
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.closePath();
    }
}

function growPlant() {
    if (growthStage < stages.length - 1) {
        growthStage++;
        drawPlant();
    }
}

function animate() {
    requestAnimationFrame(animate);
    drawPlant();
}

setInterval(growPlant, 2000);
animate();