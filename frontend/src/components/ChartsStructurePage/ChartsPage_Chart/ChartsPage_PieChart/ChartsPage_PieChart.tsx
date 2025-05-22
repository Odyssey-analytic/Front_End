// import { PieChart } from '@mui/x-charts/PieChart';
// import { pieArcLabelClasses } from '@mui/x-charts/PieChart';
// import ChartCardWrapper from '../ChartsPage_CardWrapper/ChartsPage_CardWrapper';

// const ChartsPage_PieChart = () => {
//   const data = [
//     { id: 0, value: 40, label: 'Windows' },
//     { id: 1, value: 30, label: 'macOS' },
//     { id: 2, value: 20, label: 'Linux' },
//     { id: 3, value: 10, label: 'Other' },
//   ];

//   return (
//     <ChartCardWrapper title="OS Usage (Pie Chart)">
//       <PieChart
//         series={[
//           {
//             data,
//             arcLabel: (item) => `${item.label} (${item.value}%)`,
//             arcLabelMinAngle: 35,
//             arcLabelRadius: '60%',
//           },
//         ]}
//         sx={{
//           [`& .${pieArcLabelClasses.root}`]: {
//             fontWeight: 'bold',
//           },
//         }}
//         width={300}
//         height={300}
//       />
//     </ChartCardWrapper>
//   );
// };

// export default ChartsPage_PieChart;


import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import ChartCardWrapper from '../ChartsPage_CardWrapper/ChartsPage_CardWrapper';
import React from 'react';

const ChartsPage_PieChart = () => {
  const data = [
    { id: 0, value: 40, label: 'Windows' },
    { id: 1, value: 30, label: 'macOS' },
    { id: 2, value: 20, label: 'Linux' },
    { id: 3, value: 10, label: 'Other' },
  ];

  return (
    // <ChartCardWrapper title="OS Usage (Pie Chart)" customHeight="500px">
    //   <div
    //     style={{
    //       width: '100%',
    //       display: 'flex',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <PieChart
    //       series={[
    //         {
    //           data,
    //           arcLabel: (item) => `${item.label} (${item.value}%)`,
    //           arcLabelMinAngle: 35,
    //           arcLabelRadius: '60%',
    //         },
    //       ]}
    //       sx={{
    //         [`& .${pieArcLabelClasses.root}`]: {
    //           fontWeight: 'bold',
    //         },
    //       }}
    //       width={400}
    //       height={400}
    //     />
    //   </div>
    // </ChartCardWrapper>

    <ChartCardWrapper title="OS Usage (Pie Chart)" customHeight="500px">
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PieChart
          series={[{
            data,
            arcLabel: (item) => `${item.label} (${item.value}%)`,
            arcLabelMinAngle: 35,
            arcLabelRadius: '60%',
          }]}
          width={400}
          height={400}
        />
      </div>
    </ChartCardWrapper>

  );
};

export default ChartsPage_PieChart;
