import { useEffect } from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { getColor, getRandomColor } from "../helper/getColor";

function BarGraph({ transactions, categories }) {
  // Prepare data for the chart

  const data = transactions?.reduce((acc, transaction) => {
    const index = acc.findIndex((item) => item.date === transaction.date);
    if (index === -1) {
      acc.push({
        date: transaction.date,
        [transaction.category.name]: transaction.amount,
      });
    } else {
      acc[index][transaction.category.name] = (acc[index][transaction.category.name] || 0) + transaction.amount;
    }
    return acc;
  }, []);

  // Sort data by date
  data?.sort((a, b) => new Date(a.date) - new Date(b.date));

  console.log(data);
  useEffect(() => {}, [transactions]);
  return (
    <div className="flex flex-1  justify-center">
      <BarChart
        className="bg-gray-100 my-10 p-10 rounded-lg shadow-lg"
        width={500}
        height={500}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {categories?.map((category, index) => (
          <Bar key={category.id} dataKey={category.name} stackId="a" fill={getColor(index)} />
        ))}
      </BarChart>
    </div>
  );
}

export default BarGraph;
