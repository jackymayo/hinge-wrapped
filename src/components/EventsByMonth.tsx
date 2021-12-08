import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LayoutPosition
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { sum } from 'lodash';
import { format } from 'date-fns';

import { EventData, EventTypes, MonthlyEventCount } from '../types';
import { COLORS } from '../constants';
import { Header } from './Text';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  data?: EventData['eventsByMonth'];
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0% 5%;
  justify-content: space-evenly;
  align-items: center;
  height: 700px;
`;

const ChartWrapper = styled.div`
  width: 90%;
`;

const getLabel = (key: string): string => {
  const lookup: { [k: string]: string } = {
    block: 'Rejected',
    like: 'Liked',
    match: 'Matched',
    chats: 'Chatted',
    we_met: 'Met up'
  };

  return lookup[key];
};

export const EventsByMonth = ({ data }: Props) => {
  if (!data) return <></>;

  const labels = data.map(({ date }) => date);

  const eventTypes: Array<string> = [];
  for (const e in EventTypes) {
    eventTypes.push(EventTypes[e as keyof typeof EventTypes]);
  }

  const barChartData = {
    labels,
    datasets: eventTypes.map((e, i) => ({
      label: getLabel(e),
      data: data.map((d) => d[e as keyof MonthlyEventCount]),
      backgroundColor: Object.values(COLORS)[i]
    }))
  };

  const options = {
    plugins: {
      title: {
        display: false
      },
      legend: {
        position: 'right' as LayoutPosition
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        }
      },
      y: {
        stacked: true
      }
    }
  };

  // TODO: move this to `utils/data.ts`
  const topMonthNumber = data.reduce(
    (acc, curr, i) => {
      const sumEvents = sum(Object.values({ ...curr, date: undefined }));
      if (sumEvents > acc.value) {
        return {
          index: i,
          value: sumEvents
        };
      }

      return acc;
    },
    { index: 0, value: 0 }
  );
  const topMonthName = format(new Date(2000, topMonthNumber.index, 1), 'MMMM');

  return (
    <StyledDiv>
      <ChartWrapper>
        <Bar options={options} data={barChartData} />
      </ChartWrapper>

      <Header>
        This is what your year looked like. You were most active in <b>{topMonthName}</b>
      </Header>
    </StyledDiv>
  );
};
