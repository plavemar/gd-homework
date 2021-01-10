import React from "react";
import { LineChart } from "@gooddata/sdk-ui-charts";
import { LoadingComponent, useDataView, useExecution } from "@gooddata/sdk-ui";
import { DateDatasets, Product, Revenue } from "../../ldm/full";
import RevenueDetail from "../RevenueDetail/RevenueDetail";
import ErrorCardComponent from "../RevenueDetail/ErrorCardComponent";

const seriesBy = [
    Product.Default, Revenue,
];

const slicesBy = [
    DateDatasets.Date.Month.Short,
];

const LineChartWithRevenueDetail = ({ dateFilter }) => {

        const execution = useExecution({ seriesBy: seriesBy, slicesBy: slicesBy, filters: [dateFilter] });
        const { result, status } = useDataView({ execution }, [execution?.fingerprint()]);

        return (
            <>
                <div style={{ width: "70%", float: "left" }}>
                    <LineChart measures={seriesBy}
                               segmentBy={Product.Default}
                               trendBy={DateDatasets.Date.Month.Short}
                               filters={dateFilter ? [dateFilter] : []}
                    />
                </div>
                <div style={{ width: "30%", float: "left" }}>
                    {status === "loading" && <LoadingComponent/> }
                    {status === "error" && <ErrorCardComponent/> }
                    {status === "success" &&<RevenueDetail result={result} />}
                </div>
            </>
        );
    }
;

export default LineChartWithRevenueDetail;
