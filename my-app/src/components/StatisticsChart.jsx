import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import axios from "axios";

const Chart = () => {
  const chartRef = useRef(null);
  const [userCountByDay, setUserCountByDay] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const fetchUserCountByDay = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/users/registrations-by-day",
          {
            withCredentials: true,
          }
        );
        console.log("User registrations by day:", response.data);
        setUserCountByDay(response.data);
      } catch (error) {
        console.error("Error fetching user registrations by day:", error);
      }
    };

    fetchUserCountByDay();
  }, []);

  useEffect(() => {
    console.log("Updating chart with data:", userCountByDay);
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
