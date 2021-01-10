import React, { useState } from "react";

import Page from "../components/Page";
import LineChartWithRevenueDetail from "../components/LineChartWithRevenueDetail/LineChartWithRevenueDetail";
import { DateFilter, DateFilterHelpers, defaultDateFilterOptions } from "@gooddata/sdk-ui-filters";
import _ from "lodash";
import { DateDatasets } from "../ldm/full";



const Home = () => {

    const [state, setState] = useState({
        dateFilterOption: defaultDateFilterOptions.allTime,
        excludeCurrentPeriod: false,
    });

    const dateFilter = DateFilterHelpers.mapOptionToAfm(
        state.dateFilterOption,
        DateDatasets.Date.ref,
        state.excludeCurrentPeriod,
    );

    const onApply = (dateFilterOption, excludeCurrentPeriod) => {
        setState({
            dateFilterOption: dateFilterOption,
            excludeCurrentPeriod: excludeCurrentPeriod,
        });
    };

    const renderFilterName = () => {
        return _.startCase(state.dateFilterOption.localIdentifier);
    }

    return (
        <Page>
            <h3>My Dashboard {renderFilterName()}</h3>
            <div style={{ width: 348 }}>
                <DateFilter filterOptions={defaultDateFilterOptions}
                            selectedFilterOption={state.dateFilterOption}
                            excludeCurrentPeriod={state.excludeCurrentPeriod}
                            onApply={onApply}
                />
            </div>
            <LineChartWithRevenueDetail dateFilter={dateFilter}/>
        </Page>
    );
};

export default Home;
