import React, { useRef, useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);
function Diagramm(props) {

    function createGradient(ctx, area) {
        const colorStart = "crimson"
        const colorNearMid= "orangeasa"
        const colorMid = "yellow"
        const colorNearEnd = "lime"
        const colorEnd = "green"

        const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(0.25, colorStart);
        gradient.addColorStop(0.5, colorMid);
        gradient.addColorStop(0.75, colorMid);
        gradient.addColorStop(1, colorEnd);

        return gradient;
    }

    const xAxis = props.zeitstempel
    const yAxis = props.ratings

    const data = {
        labels: xAxis,
        datasets: [
            {
                label: 'Stimmungsdiagramm',
                data: yAxis,
                borderColor: props.color,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                min: 0,
                max: 6,
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.y;
                        let stimmung = "";
                        switch (value) {
                            case 0: stimmung = "Alles totaler Mist!"
                                break;
                            case 1: stimmung = "Weiß gerade nicht weiter..."
                                break;
                            case 2: stimmung = "Irgendwie blöd..."
                                break;
                            case 3: stimmung = "Normal"
                                break;
                            case 4: stimmung = "Läuft!"
                                break;
                            case 5: stimmung = "Einfach gut druff!"
                                break;
                            case 6: stimmung = "Glücklich!"
                                break;
                        }
                        // Hier kannst du die Logik für die Anzeige von benutzerdefinierten Nachrichten basierend auf dem Wert implementieren
                        return stimmung;
                    },
                    title: function () {
                        // Hier kannst du den Tooltip-Titel anpassen
                        return 'Benutzerdefinierter Tooltip-Titel';
                    },
                },
            },
        },
    };

    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
        datasets: [],
    })

    useEffect(() => {
        console.log("geladen")
        const chart = chartRef.current;

        if (!chart) {
            return;
        }

        const chartData = {
            ...data,
            datasets: data.datasets.map(dataset => ({
                ...dataset,
                borderColor: createGradient(chart.ctx, chart.chartArea),
            })),
        };

        setChartData(chartData);
    }, [chartRef.current]);



    return (
        <Chart ref={chartRef} type='line' data={chartData} options={options}/>
    );
}

export default Diagramm;