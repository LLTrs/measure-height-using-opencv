
import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	BarSeries,
	AreaSeries,
	AlternatingFillAreaSeries,
	CandlestickSeries,
	StraightLine,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	EdgeIndicator,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
	OHLCTooltip,
	SingleValueTooltip,
} from "react-stockcharts/lib/tooltip";
import { ema, forceIndex } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class CandleStickChartWithForceIndexIndicator extends React.Component {
	render() {
		const fi = forceIndex()
			.merge((d, c) => {d.fi = c;})
			.accessor(d => d.fi);

		const fiEMA13 = ema()
			.id(1)
			.options({ windowSize: 13, sourcePath: "fi" })
			.merge((d, c) => {d.fiEMA13 = c;})
			.accessor(d => d.fiEMA13);

		const { type, data: initialData, width, ratio } = this.props;

		const calculatedData = fiEMA13(fi(initialData));
		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(calculatedData);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];

		return (
			<ChartCanvas height={550}
				width={width}
				ratio={ratio}