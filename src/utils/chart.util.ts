import { createCanvas } from 'canvas';
import Chart from 'chart.js/auto';

import colorUtil from './color.util';

const createPieChart = (labels: string[], data: any[]) => {
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext('2d');

  const colors = colorUtil.getArrayOfColors(labels.length);

  const config = {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
        },
      ],
    },
  };

  // @ts-ignore-next-line
  const chart = new Chart(ctx, config);

  chart.render();

  return canvas.toBuffer('image/png');
}

export default {
  createPieChart,
}
