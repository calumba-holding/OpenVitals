interface MiniSparklineProps {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}

export function MiniSparkline({ data, color, width = 120, height = 32 }: MiniSparklineProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - 4 - ((v - min) / range) * (height - 8);
      return `${x},${y}`;
    })
    .join(' ');

  const lastPoint = points.split(' ').pop()!;
  const [cx, cy] = lastPoint.split(',');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={parseFloat(cx!)} cy={parseFloat(cy!)} r="3" fill={color} />
    </svg>
  );
}
