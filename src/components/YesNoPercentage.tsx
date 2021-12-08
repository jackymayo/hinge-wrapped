import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { EventData } from '../types';
import { COLORS, YEAR } from '../constants';
import { Header } from './Text';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data?: EventData['yesNoPercentage'];
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10% 5% 5%;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 15% 1% 5% 1%;
  }
`;

const TextStack = styled.div`
  display: flex;
  flex-direction: column;
`;

const DoughtnutDiv = styled.div`
  @media (max-width: 768px) {
    width: 50%;
  }
`;

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const copy = data!.yes > 0.5 ? 'The more the merrier.' : 'Nothing wrong with being picky.';

  return (
    <StyledDiv>
      <TextStack>
        <Header>
          In {YEAR}, you crossed paths with <b>{data?.total.toLocaleString()}</b> lucky suitors -
          <br />
          but only said yes to <b>{(data!.yes * 100).toFixed(1)}%</b>
        </Header>
        <Header>{copy}</Header>
      </TextStack>
      <DoughtnutDiv>
        <Doughnut data={doughnutChartData} options={options} />
      </DoughtnutDiv>
    </StyledDiv>
  );
};
