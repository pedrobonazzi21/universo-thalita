"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

const typeColors: Record<string, string> = {
  Livro: "from-coral/20 to-yellow/20 border-coral/20",
  Filme: "from-blue-deep/20 to-coral/20 border-blue-deep/20",
};

const typeIcons: Record<string, string> = {
  Livro: "📖",
  Filme: "🎬",
};

function ObraNode({ data }: NodeProps) {
  const { label, tipo, ano, rating } = data as {
    label: string;
    tipo: string;
    ano: number;
    rating: number;
  };

  return (
    <div
      className={`bg-card rounded-[18px] border bg-gradient-to-br ${
        typeColors[tipo] ?? "from-gray-light/50 to-gray-light/30 border-gray-light"
      } p-4 shadow-md hover:shadow-lg transition-shadow duration-300 min-w-[160px]`}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs">{typeIcons[tipo] ?? "📄"}</span>
        <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium">
          {tipo} • {ano}
        </span>
      </div>
      <p className="font-heading text-sm text-foreground leading-tight">
        {label}
      </p>
      {rating && (
        <div className="flex items-center gap-0.5 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              width="10"
              height="10"
              viewBox="0 0 14 14"
              fill={i < Math.floor(rating) ? "#FF6F61" : "none"}
              stroke="#FF6F61"
              strokeWidth="1.5"
            >
              <path d="M7 1l1.8 3.6 4 .6-2.9 2.8.7 4L7 10.5 3.4 12l.7-4L1 5.2l4-.6L7 1z" />
            </svg>
          ))}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
}

export default memo(ObraNode);
