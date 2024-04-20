import React from "react";
import BarGraph from "../../components/BarGraph";
import PieGraph from "../../components/PieGraph";

function Graphs({ categories, transactions }) {
  return (
    <div>
      {transactions?.length === 0 ? (
        <div className="text-center text-white font-sans font-bold text-lg mt-10">No transactions found</div>
      ) : (
        <div className="">
          <BarGraph transactions={transactions} categories={categories} />

          <PieGraph transactions={transactions} categories={categories} />
        </div>
      )}
    </div>
  );
}

export default Graphs;
