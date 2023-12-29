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

    const stimmungImages = [
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/0.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/1.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/2.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/3.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/4.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/5.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/6.png",
    ]

    function createGradient(ctx, area) {
        const colorStart = "crimson"
        const colorNearMid= "orange"
        const colorMid = "yellow"
        const colorNearEnd = "yellowgreen"
        const colorEnd = "lime"

        const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(0.25, colorNearMid);
        gradient.addColorStop(0.45, colorMid);
        gradient.addColorStop(0.7, colorNearEnd);
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
                lineTension: 0.4,
                pointHitRadius: 50
            },
        ],
    };

    const options = {

        layout: {
            padding: {
                left: 20, // Platz links von der Y-Achse
                right: 20, // Platz rechts von der Y-Achse
                top: 20, // Platz über der X-Achse
                bottom: 20, // Platz unter der X-Achse
            },
        },
        scales: {
            x: {
                grid: {
                    lineWidth: 3, // Dicke der Linien der X-Achse
                    display: false, // Raster für die y-Achse ausblenden
                },
                borderWidth: 6, // Dicke der X-Achse

            },
            y: {
                min: -1,
                max: 7,
                grid: {
                    display: false, // Raster für die y-Achse ausblenden
                },
                borderWidth: 10, // Dicke der X-Achse
            },

        },
        elements: {
            point: {
                pointStyle: function (context) {
                    if (context.parsed && typeof context.parsed.y !== 'undefined') {
                        console.log("y gefunden!")
                        const value = context.parsed.y;
                        const image = new Image(75, 75);  // Erstelle ein Image-Objekt mit der gewünschten Größe
                        image.src = stimmungImages[value];
                        return image
                    }
                },
                radius: 35,
            }
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
                        return 'Hier kommt irgendwie noch der Kommentar rein!';
                    },
                },
            },
            legend: {
                display: false, // Setze diese Eigenschaft auf false, um die Legende zu verstecken
            }
        },
    };

    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
        datasets: [],
    })

    useEffect(() => {
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
        <Chart className="chart" ref={chartRef} type='line' data={chartData} options={options}/>
    );
}

export default Diagramm;