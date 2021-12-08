import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { EventData } from '../types';
import { COLORS } from '../constants';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data?: EventData['yesNoPercentage'];
}

export const YesNoPercentage = ({ data }: Props) => {
  const doughnutChartData = {
    labels: ['Yes', 'No'],
    datasets: [
      {
        label: '# of Votes',
        data: [data?.yes, data?.no],
        backgroundColor: [COLORS.green, COLORS.red],
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <Doughnut data={doughnutChartData} />
    </div>
  );
};
