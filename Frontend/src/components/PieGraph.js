import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getColor } from "../helper/getColor";

function PieGraph({ transactions, categories }) {
  // Prepare data for the chart
  const data = categories?.map((category) => ({
    id: category.id,
    name: category.name,
    value: transactions.filter((transaction) => transaction.category.id === category.id).reduce((sum, transaction) => sum + transaction.amount, 0),
  }));

  return (
    <div>
      <div className="flex flex-1 py-6  justify-center">
        <div className="bg-gray-100  rounded-lg shadow-lg">
          <PieChart className="mx-auto" width={500} height={500}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="50%"
              innerRadius="40%"
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(index)} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          <table className="mx-auto divide-y rounded-lg divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Number of Transactions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data
                ?.sort((a, b) => b.value - a.value)
                ?.map((entry, index) => {
                  const percentage = ((entry.value / data.reduce((sum, entry) => sum + entry.value, 0)) * 100).toFixed(2);
                  const num = transactions?.filter((transaction) => transaction.category.id === entry.id)?.length;
                  return (
                    <tr key={`category-${index}`}>
                      <td className="px-6 py-4 whitespace-nowrap">{entry.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{entry.value}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{num}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{percentage}%</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PieGraph;
