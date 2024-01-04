import React, {useRef, useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import {Chart} from 'react-chartjs-2';


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
        const colorNearMid = "orange"
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

    function konvertiereXWerte(xAchsenArray) {
        let konvertiereXAchse = []
        for (let i = 0; i < xAchsenArray.length; i++) {
            konvertiereXAchse.push(xAchsenArray[i].split(" ")[0])
        }
        return konvertiereXAchse;
    }

    function konvertiereYWerte(DatenArray, XAchse) {
        const konvertiertesDatenArray = []
        for (let datensatz of DatenArray) {
            const konvertiertesYArray = []
            for (let i = 0; i < XAchse.length; i++) {
                if (datensatz.taeglicheEintraeX?.includes(XAchse[i])) {
                    const index = datensatz.taeglicheEintraeX.findIndex(element => element === XAchse[i])
                    if (typeof datensatz.taeglicheEintraeY[index] === 'boolean') {
                        if (datensatz.taeglicheEintraeY[index] === true) konvertiertesYArray.push(4)
                        else konvertiertesYArray.push(-1)
                    } else {
                        konvertiertesYArray.push(datensatz.taeglicheEintraeY[index])
                    }
                } else {
                    konvertiertesYArray.push(-1);
                }

            }
            konvertiertesDatenArray.push(
                {
                    bezeichnung: datensatz.bezeichnung,
                    taeglicheEintraeX: XAchse,
                    taeglicheEintraeY: konvertiertesYArray
                }
            )
        }
        return konvertiertesDatenArray
    }

    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
        datasets: [],
    })
    const [datasets, setDataSets] = useState([{}]);

    useEffect(() => {
        const chart = chartRef.current;

        if (!chart) {
            return;
        }

        setDataSets(erstelleDataSet())

        const chartData = {
            ...data,
            datasets: data.datasets.map((dataset, index) => ({
                ...dataset,
                hidden: index !== 0,
            })),
        };

        setChartData(chartData);
    }, [chartRef.current]);

    function erstelleDataSet() {
        const datasets = []
        const xAchseKryptoBalsam = konvertiereXWerte(props.zeitstempel)
        const yWerteKryptos = konvertiereYWerte(props.kryptonitDaten, xAchseKryptoBalsam)
        const yWerteBalsame = konvertiereYWerte(props.balsamDaten, xAchseKryptoBalsam)

        datasets.push(
            {
                label: 'Stimmung',
                data: props.stimmungen,
                backgroundColor: 'rgba(255,226,45,0.7)',
                borderColor: "rgba(86,86,86,0.4)",
                lineTension: 0.4,
                pointHitRadius: 50
            }
        );

        if (yWerteKryptos.length !== 0) {
            for (const dataset of yWerteKryptos) {
                datasets.push(
                    {
                        label: dataset.bezeichnung,
                        data: dataset.taeglicheEintraeY,
                        borderColor: "#cf5f4f",
                        backgroundColor: '#cf5f4f',
                        lineTension: 0.1,
                        pointHitRadius: 10
                    }
                )
            }
        }
        if (yWerteBalsame.length !== 0) {
            for (const dataset of yWerteBalsame) {
                datasets.push(
                    {
                        label: dataset.bezeichnung,
                        data: dataset.taeglicheEintraeY,
                        borderColor: "#9fe265",
                        backgroundColor: '#9fe265',
                        lineTension: 0.1,
                        pointHitRadius: 10
                    }
                )
            }
        }

        return datasets;
    }

    const data = {
        labels: props.zeitstempel,
        datasets: datasets,
    };

    const options = {
        layout: {
            padding: {
                left: 0, // Platz links von der Y-Achse
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
                display: true,
                ticks: {
                    display: false
                },
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
                    if (context.datasetIndex === 0) {
                        if (context.parsed && typeof context.parsed.y !== 'undefined') {
                            const value = context.parsed.y;
                            const image = new Image(75, 75);  // Erstelle ein Image-Objekt mit der gewünschten Größe
                            image.src = stimmungImages[value];
                            return image
                        }
                    } else return 'circle';
                },
                radius: 1,
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.y;
                        let stimmung = "";
                        switch (value) {
                            case 0:
                                stimmung = "Alles Scheiße!"
                                break;
                            case 1:
                                stimmung = "Traurig..."
                                break;
                            case 2:
                                stimmung = "Irgendwie blöd..."
                                break;
                            case 3:
                                stimmung = "Normal"
                                break;
                            case 4:
                                stimmung = "Läuft!"
                                break;
                            case 5:
                                stimmung = "Einfach gut druff!"
                                break;
                            case 6:
                                stimmung = "Glücklich!"
                                break;
                        }
                        // Hier kannst du die Logik für die Anzeige von benutzerdefinierten Nachrichten basierend auf dem Wert implementieren
                        return stimmung;
                    },
                },
                displayColors: false,
            },
            legend: {
                display: true, // Setze diese Eigenschaft auf false, um die Legende zu verstecken
            }
        },
    };

    const style = {
        padding: 0,
        margin: 0
    }

    return (
        <div>
            <Chart className="chart" ref={chartRef} type='line' data={chartData} options={options}
                   color={"rgb(255, 99, 132)"} style={style}/>
        </div>
    )
}

export default Diagramm;