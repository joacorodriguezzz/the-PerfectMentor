import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

const Chart = () => {
  const chartRef = useRef(null);
  const [userCountByDay, setUserCountByDay] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const storedCountByDay = localStorage.getItem("userCountByDay");
    if (storedCountByDay) {
      setUserCountByDay(JSON.parse(storedCountByDay));
    } else {
      setUserCountByDay([0, 0, 0, 0, 0, 0, 0]);
    }
  }, []);

  useEffect(() => {
    console.log("userCountByDay después de actualizar:", userCountByDay);
  }, [userCountByDay]);

  const updateUserCountByDay = () => {
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();

    setUserCountByDay((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[dayIndex] += 1; // Incrementar en 1 en lugar de establecer el valor en 1
      return newCounts;
    });
  };

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      xAxis: {
        type: "category",
        data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          type: "bar",
          data: userCountByDay,
        },
      ],
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [userCountByDay]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }}></div>;
};

export default Chart;
