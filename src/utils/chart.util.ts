import { createCanvas } from 'canvas';
import Chart, { ChartType } from 'chart.js/auto';

import colorUtil from './color.util';

const createChart = (labels: string[], data: any[], type: ChartType) => {
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext('2d');

  const colors = colorUtil.getArrayOfColors(labels.length);

  const config = {
    type,
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

const createPieChart = (labels: string[], data: any[]) => {
  return createChart(labels, data, 'doughnut');
}

const createColumnChart = (labels: string[], data: any[]) => {
  return createChart(labels, data, 'bar');
}

export default {
  createPieChart,
  createColumnChart,
}
