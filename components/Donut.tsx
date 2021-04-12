import { ReactNode } from 'react';
import styled from 'styled-components';

export interface AnimationProgressProps {
  radius: number;
  stroke: number;
  progress: number;
  text?: ReactNode;
  className?: string;
  roundedCorners?: boolean;
}

const FilledCircle = styled.circle`
  transition: stroke-dashoffset 300ms ease-in-out;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`;

const Donut = ({ radius, stroke, progress, text, roundedCorners }: AnimationProgressProps) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - ((Number.isNaN(progress) ? 0 : progress) / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} name="donut">
      <circle
        className="circle"
        stroke="#eee"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />

      <FilledCircle
        className="indicator"
        stroke="#47ae75"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap={roundedCorners ? 'round' : undefined}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />

      {text && (
        <text
          data-testid="donut-text"
          className="text"
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={radius / 4}
          fill="black"
        >
          {text}
        </text>
      )}
    </svg>
  );
};

export default Donut;
