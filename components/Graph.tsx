import React, { PureComponent, useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { Box, Image, Text } from "@chakra-ui/core";



const Graph = ({ data, num }: any) => {
    /*  useEffect(() => {
      setTimeout(() => {
        let perc = percent;
        perc[0].percent = 23;
      }, 5000);
    }); */

    const [percent, setPercent] = useState([]);
    useEffect(() => {
        let percent = data.map((k: any) => {
            let { "Antall kandidater totalt": nStudents } = k;
            const perc = Math.round((nStudents / num) * 100);
            if (k["Karakter"] === "G") k["Karakter"] = "Bestått";
            if (k["Karakter"] === "H") k["Karakter"] = "Ikke bestått";
            return {
                percent: perc,
                grade: k["Karakter"]
            };
        });
        setPercent(percent);
    }, [num]);
    return (
        <Box h={["50vh", "70vh"]} w={["", "55vw"]} style={{ margin: "0 auto" }}>
            {isNaN(num) ? (
                <Image style={{ height: "50vh", margin: "0 auto" }} src="https://static.dribbble.com/users/2046015/screenshots/6015680/08_404.gif" />
            ) : (
                    <>
                        {/* <p style={{ marginTop: 10 }}>
                            Resultater for {data[0].Emnekode.slice(0, -2)} året{" "}
                            {data[0].Årstall}
            </p>*/}
                        <Box h={["50vh", "70vh"]} style={{ margin: "0 auto" }} w={[5 / 6, 4 / 5]}>
                            <ResponsiveContainer>
                                <BarChart
                                    data={percent}
                                    margin={{
                                        top: 20,
                                        bottom: 10,
                                        left: -25
                                    }}
                                >
                                    <XAxis name={"Karakter"} dataKey="grade" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar style={{ textAlign: "center", marginLeft: 5 }} dataKey="percent" name={`Prosent %  | ${num} kandidater`} fill="#6378fa" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </>
                )}


        </Box>
    );
};

export default Graph;