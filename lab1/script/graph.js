export function checkHit(x,y,r){
  if (!r || r <=0){return false;};

  const inSector = (x <= 0 && y >= 0) && (x * x + y * y <= r * r);

  const inTriangle = (x >= 0 && y >= 0) && (y <= r - 2 * x);

  const inRectangle = (x <= 0 && x >= -r) && (y <= 0 && y >= -r);

  return inSector || inTriangle || inRectangle;
}

export function drawGraph(ctx, width, height, r = null, history = []) {
  const centerX = width / 2;
  const centerY = height / 2;
  const tickSize = 4;
  const scale = 45;
  const currentR = (r && r > 0) ? r : 3;

  ctx.clearRect(0, 0, width, height);
  if (currentR > 0) {
      ctx.fillStyle = '#6767ff';
      ctx.beginPath();

      ctx.moveTo(centerX, centerY);

      ctx.arc(centerX, centerY, currentR * scale, Math.PI, 1.5 * Math.PI, false);

      ctx.lineTo(centerX + (currentR/2) * scale, centerY);

      ctx.lineTo(centerX, centerY);

      ctx.lineTo(centerX, centerY + currentR * scale);
      ctx.lineTo(centerX - currentR* scale, centerY + currentR * scale);
      ctx.lineTo(centerX -currentR* scale, centerY);

      ctx.closePath();
      ctx.fill();
  }

  ctx.strokeStyle = '#000000';
  ctx.fillStyle = '#000000';
  ctx.lineWidth = 1.5;
  ctx.font = '14px Arial';

  ctx.beginPath();
  ctx.moveTo(20, centerY);
  ctx.lineTo(width-20, centerY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(width -20, centerY);
  ctx.lineTo(width -28, centerY + 4);
  ctx.lineTo(width -28, centerY - 4);
  ctx.closePath();
  ctx.fill();
  ctx.fillText('x', width-20,centerY+15);

  ctx.beginPath();
  ctx.moveTo(centerX, height-20);
  ctx.lineTo(centerX, 20)
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(centerX, 20);
  ctx.lineTo(centerX - 4, 28);
  ctx.lineTo(centerX + 4, 28)
  ctx.closePath();
  ctx.fill();
  ctx.fillText('y', centerX+8, 22);

  const xTicks = [
    {val: currentR, label: 'R'},
    {val: -currentR/2, label: '-R/2'},
    {val: currentR/2, label: 'R/2'},
    {val: -currentR, label: '-R'}
  ]

  xTicks.forEach(tick =>{
    const x = centerX + tick.val*scale;
    ctx.beginPath();
    ctx.moveTo(x, centerY - tickSize);
    ctx.lineTo(x, centerY + tickSize);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(tick.label, x, centerY -6);
  });

  const yTicks = [
  {val: currentR, label: 'R'},
  {val: -currentR/2, label: '-R/2'},
  {val: currentR/2, label: 'R/2'},
  {val: -currentR, label: '-R'}
  ]

  yTicks.forEach(tick => {
    const y = centerY - tick.val*scale;
    ctx.beginPath();
    ctx.moveTo(centerX - tickSize, y);
    ctx.lineTo(centerX + tickSize, y);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(tick.label, centerX + 8, y);
  })

  history.forEach(dot => {
    const canvasX = centerX + dot.x* scale;
    const canvasY = centerY - dot.y *scale;

    const isHitCurrent = checkHit(dot.x,dot.y,currentR);

    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 5,0,2*Math.PI);
    ctx.fillStyle = dot.hit ? '#44ff44' : '#ff4444';
    ctx.fill();
    ctx.strokeStyle = '#000000'
    ctx.stroke();
  })
}