import React from 'react';
import ChartistGraph from 'react-chartist';
import Legend from "chartist-plugin-legend";

const chartOptions = {
    width: '100%', 
    height: '260px',
    axisX: {
        showGrid: false
    },
    plugins: [
        Legend({
            position: 'bottom'
        })
    ]
}

const listener = {
    draw: function (data) {
        if (data.type === "bar") {
            data.element.animate({
                opacity: {
                    begin: (data.index + 1) * 80,
                    dur: 500,
                    from: 0,
                    to: 1,
                    easing: "ease"
                }
            });
        }
    }
}

const BudgetVsActualGraph = (props) => {
    if (!props.reports) {
        return null;
    }

    return (
        <div className="cht">
            <ChartistGraph type="Bar"
                data={props.reports.chartData}
                options={chartOptions}
                // listener={listener}
            />
        </div>
    )
}

export default BudgetVsActualGraph;