import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { EventData, EventTypes, MonthlyEventCount } from '../types';
import { COLORS } from '../constants';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  data?: EventData['eventsByMonth'];
}

export const EventsByMonth = ({ data }: Props) => {
  if (!data) return <></>;

  const labels = data.map(({ date }) => date);

  const eventTypes: Array<string> = [];
  for (const e in EventTypes) {
    eventTypes.push(EventTypes[e as keyof typeof EventTypes]);
  }

  console.log(eventTypes);

  const barChartData = {
    labels,
    datasets: eventTypes.map((e, i) => ({
      label: e,
      data: data.map((d) => d[e as keyof MonthlyEventCount]),
      backgroundColor: Object.values(COLORS)[i]
    }))
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Events by month'
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };

  return (
    <div>
      <Bar options={options} data={barChartData} width={800} height={400} />
    </div>
  );
};
