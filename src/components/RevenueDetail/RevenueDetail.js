import React, { useEffect, useState } from "react";
import { Card, CardContent, Select } from "@material-ui/core";
import _ from "lodash";

const RevenueDetail = (props) => {
    const {
        result,
    } = props;

    const [selectedCalculation, setSelectedCalculation] = useState("");
    const [calculationValues, setCalculationValues] = useState();

    useEffect(() => {
        setSelectedCalculation("Max Revenue across products");
    }, []);

    const slices = result?.data().slices().toArray();
    const series = result?.data().series().toArray();

    const products = series?.map(serie => {
        return serie.scopeTitles()[0];
    });

    const getTotalRevenuesAcrossProducts = (data) => {
        const minRevenues = [];
        products.forEach((product) => {
            minRevenues.push({ product: product, value: _.sum(getValuesFromDataByProduct(data, product)).toFixed(2) });
        });

        setCalculationValues(minRevenues);
    };

    const data = slices?.map((slice) => {
        return {
            ...slice.dataPoints().map(point => {
                return {
                    product: point.seriesDesc.scopeTitles()[0],
                    value: point.rawValue,
                };
            }),
        };
    });

    const getMinRevenuesAcrossProducts = (data) => {
        const minRevenues = [];
        products.forEach((product) => {
            minRevenues.push({ product: product, value: _.min(getValuesFromDataByProduct(data, product)) });
        });

        setCalculationValues(minRevenues);
    };

    const getMaxRevenuesAcrossProducts = (data) => {
        const minRevenues = [];
        products.forEach((product) => {
            minRevenues.push({ product: product, value: _.max(getValuesFromDataByProduct(data, product)) });
        });

        setCalculationValues(minRevenues);
    };

    const getValuesFromDataByProduct = (data, product) => {

        const values = [];
        data.map((dataEntry) => {
            return Object.values(dataEntry).filter(entry => {
                return entry.product === product;
            }).forEach((entry) => {
                values.push(Number(entry.value));
            });
        });
        return values;
    };

    useEffect(() => {
        if (!data) return;
        if (selectedCalculation === "Max Revenue across products") {
            getMaxRevenuesAcrossProducts(data);
        } else if (selectedCalculation === "Min Revenue across products") {
            getMinRevenuesAcrossProducts(data);
        } else if (selectedCalculation === "Total Revenue across products") {
            getTotalRevenuesAcrossProducts(data);
        }
    }, [selectedCalculation, result]);

    const onCalculationChange = (event) => {
        event.persist();
        setSelectedCalculation(event.target.value);
    };

    return (
        <Card style={{ maxWidth: 345 }}>
            <CardContent>
                <h4>{selectedCalculation}</h4>
                {calculationValues?.sort((calcA, calcB) => {
                    return calcB.value - calcA.value;
                }).map(calculationValue => {
                    return (
                        <h4 key={calculationValue.product}>{`${calculationValue.product}: $${calculationValue.value}`}</h4>
                    );
                })}
                <Select native
                        autoWidth
                        value={selectedCalculation}
                        onChange={onCalculationChange}>
                    <option value={"Max Revenue across products"}>Max Revenue across products</option>
                    <option value={"Min Revenue across products"}>Min Revenue across products</option>
                    <option value={"Total Revenue across products"}>Total Revenue across products</option>
                </Select>
            </CardContent>
        </Card>
    );
}

export default RevenueDetail;