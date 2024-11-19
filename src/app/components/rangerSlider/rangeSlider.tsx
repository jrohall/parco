"use client";
import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';

interface RangeSliderProps {
  value: number;
  width: number;
  height?: number;
  isActive: boolean;
  showBorder?: boolean;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ value, width, height = width * 0.7, isActive = true, showBorder }) => {
  const red = "#FD5C70";
  const yellow = "#F8D07B";
  const green = "#60BE64";
  const textColor = "black";

  const inactiveRed = "#FA93A0";
  const inactiveYellow = "#F7DEA8";
  const inactiveGreen = "#7db57f";
  const inactiveTextColor = "#D2D6DA";

  const arc = 180;
  const arcWidth = (width / 2) - (0.1 * width);
  const arcCenter = width / 2;
  const arcHeight = (height / 2) + (0.2 * height);
  const strokeWidth = width / 15;
  const circleRadius = strokeWidth / 1.5;
  const circleStrokeWidth = strokeWidth / 2;
  const min = 0;
  const max = 100;
  const range = max - min;
  const margin = 10;
  const fontSize = width / 3;

  const [scoreColor, setScoreColor] = useState<string>(''); // declare scoreColor and setScoreColor

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const moveCircle = (x: number, y: number, radius: number, endAngle: number, color: string) => {
    const circleElement = document.getElementById(`circle-${value}`);
    const textStatusElement = document.getElementById(`status-${value}`);

    if (circleElement && textStatusElement) {
      const start = polarToCartesian(x, y, radius, endAngle);
      if (endAngle >= 0 || endAngle <= 180) {
        circleElement.setAttribute("cx", String(start.x));
        circleElement.setAttribute("cy", String(start.y));
        circleElement.setAttribute("r", String(circleRadius));
        if (value < 55) {
          circleElement.setAttribute("stroke", isActive ? red : inactiveRed);
        } else if (value < 80) {
          circleElement.setAttribute("stroke", isActive ? yellow : inactiveYellow);
        } else {
          circleElement.setAttribute("stroke", isActive ? green : inactiveGreen);
        }
        circleElement.setAttribute("stroke-width", String(circleStrokeWidth));
        textStatusElement.innerHTML = String(value);
      } else {
        circleElement.style.display = "none";
      }
    }
  };


  const filterRange = (r: number) => {
    r = r - min;
    return Math.round((r / range) * 180);
  };

  const alterArc = (arc: SVGPathElement | null, color: string, start: number, end: number) => {
    if (arc) {
      arc.setAttribute("d", describeArc(arcCenter, arcHeight, arcWidth, start, end));
      arc.setAttribute("stroke", color);
      arc.setAttribute("stroke-width", String(strokeWidth));
    }
  };

  const updateArcs = (value: number) => {
    const range1E = filterRange(55);
    const range2E = filterRange(80);
    const maxFiltered = filterRange(max);
    const scoreFiltered = filterRange(value);


    const range1S = margin;
    const range2S = range1E + margin;
    const range3S = range2E + margin;
    const range3E = maxFiltered - margin;
	

    const arc1 = document.getElementById(`arc1-${value}`) as unknown as SVGPathElement;
    const arc2 = document.getElementById(`arc2-${value}`) as unknown as SVGPathElement;
    const arc3 = document.getElementById(`arc3-${value}`) as unknown as SVGPathElement;

    alterArc(arc1, isActive ? red : inactiveRed, range1S, range1E);
    alterArc(arc2, isActive ? yellow : inactiveYellow, range2S, range2E);
    alterArc(arc3, isActive ? green : inactiveGreen, range3S, range3E);

    moveCircle(arcCenter, arcHeight, arcWidth, scoreFiltered, red);
  };

  useEffect(() => {
    if (value < 55) {
      setScoreColor(isActive ? red : inactiveRed);
    } else if (value < 80) {
      setScoreColor(isActive ? yellow : inactiveYellow);
    } else {
      setScoreColor(isActive ? green : inactiveGreen);
    }

    updateArcs(value);
  }, [value, isActive]);

  return (
    <Box component="section" sx={{ height: height, width: width, border: showBorder ? '1px dashed grey' : 'none' }}>
      <defs>
        <filter id={`circleShadow-${value}`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0, 0, 0, 0.3)" />
        </filter>
      </defs>
      <svg height="100%" width="100%">
        <path id={`arc1-${value}`} fill="none" strokeLinecap="round" />
        <path id={`arc2-${value}`} fill="none" strokeLinecap="round" />
        <path id={`arc3-${value}`} fill="none" strokeLinecap="round" />
        <circle id={`circle-${value}`} cx="150" cy="150" stroke="orange" fill="white" filter={`url(#circleShadow-${value})`}  />
        <text id={`status-${value}`} x="50%" y="60%" fill={isActive ? textColor : inactiveTextColor} dominantBaseline="middle" textAnchor="middle" fontSize={fontSize} fontWeight="bold"></text>

      </svg>
    </Box>

  );
};
export default RangeSlider;

