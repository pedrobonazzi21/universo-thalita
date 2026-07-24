"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  type ReactFlowInstance,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ObraNode from "./obra-node";

type ObraData = {
  id: string;
  titulo: string;
  slug: string;
  tipo: string;
  ano: number;
  notaEquipe: number | null;
};

const edgeColors: Record<string, string> = {
  adaptacao: "#8B5CF6",
  personagem: "#10B981",
  colecao: "#3B82F6",
  tema: "#F59E0B",
};

const nodeTypes = {
  obra: ObraNode,
};

export function MentalMap({ obras, focusSlug }: { obras: ObraData[]; focusSlug?: string }) {
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const centerNode: Node = {
    id: "thalita",
    type: "obra",
    position: { x: 0, y: 0 },
    data: {
      label: "Thalita Rebouças",
      tipo: "Autora",
      ano: "",
      rating: 0,
    },
  };

  const orbitRadius = 250;
  const angleStep = (2 * Math.PI) / obras.length;

  const obraNodes: Node[] = obras.map((obra, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const x = Math.cos(angle) * orbitRadius;
    const y = Math.sin(angle) * orbitRadius;

    return {
      id: obra.id,
      type: "obra",
      position: { x, y },
      data: {
        label: obra.titulo,
        tipo: obra.tipo,
        ano: obra.ano,
        rating: obra.notaEquipe ?? 0,
      },
    };
  });

  const initialNodes: Node[] = [centerNode, ...obraNodes];

  const edges: Edge[] = obras.map((obra, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const ex = Math.cos(angle) * orbitRadius;
    const ey = Math.sin(angle) * orbitRadius;

    const midX = ex * 0.5;
    const midY = ey * 0.5 - 40;

    const typeList = ["adaptacao", "personagem", "colecao", "tema"];
    const relType = typeList[i % typeList.length];
    const color = edgeColors[relType];

    return {
      id: `thalita-${obra.id}`,
      source: "thalita",
      target: obra.id,
      type: "smoothstep",
      animated: true,
      style: {
        stroke: color,
        strokeWidth: 2,
        opacity: 0.6,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color,
      },
      label: relType,
      labelStyle: {
        fill: color,
        fontSize: 10,
        fontWeight: 600,
        textTransform: "uppercase" as const,
      },
      data: { relType },
    };
  });

  const secondaryEdges: Edge[] = [];
  for (let i = 0; i < obras.length; i++) {
    for (let j = i + 1; j < obras.length; j++) {
      if ((obras[i].tipo !== obras[j].tipo) || Math.random() > 0.5) continue;
      const color = edgeColors["tema"];
      secondaryEdges.push({
        id: `${obras[i].id}-${obras[j].id}`,
        source: obras[i].id,
        target: obras[j].id,
        type: "default",
        style: {
          stroke: color,
          strokeWidth: 1.5,
          opacity: 0.3,
          strokeDasharray: "4 4",
        },
        data: { relType: "tema" },
      });
    }
  }

  const allEdges = [...edges, ...secondaryEdges];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(allEdges);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  }, []);

  useEffect(() => {
    if (!reactFlowInstance || !focusSlug) return;
    const targetNode = obraNodes.find((n) => {
      const obra = obras.find((o) => o.id === n.id);
      return obra?.slug === focusSlug;
    });
    if (targetNode) {
      setTimeout(() => {
        reactFlowInstance.fitView({
          padding: 0.5,
          duration: 800,
          nodes: [targetNode],
        });
      }, 100);
    }
  }, [focusSlug, reactFlowInstance, obraNodes, obras]);

  const onEdgeMouseEnter = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      setHoveredEdge(edge.id);
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          style: {
            opacity:
              n.id === edge.source || n.id === edge.target ? 1 : 0.3,
            transition: "opacity 0.3s",
          },
        }))
      );
      setFlowEdges((eds) =>
        eds.map((e) => ({
          ...e,
          style: {
            ...e.style,
            opacity: e.id === edge.id ? 1 : 0.1,
            strokeWidth: e.id === edge.id ? 3 : 1,
            transition: "all 0.3s",
          },
        }))
      );
    },
    [setNodes, setFlowEdges]
  );

  const onEdgeMouseLeave = useCallback(() => {
    setHoveredEdge(null);
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        style: { opacity: 1, transition: "opacity 0.3s" },
      }))
    );
    setFlowEdges((eds) =>
      eds.map((e) => ({
        ...e,
        style: {
          ...e.style,
          opacity: e.data?.relType && e.id.startsWith("thalita-") ? 0.6 : 0.3,
          strokeWidth: 1.5,
          transition: "all 0.3s",
        },
      }))
    );
  }, [setNodes, setFlowEdges]);

  return (
    <div className="w-full h-[600px] bg-card rounded-[18px] border border-gray-light/50">
      <ReactFlow
        nodes={nodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeMouseEnter={onEdgeMouseEnter}
        onEdgeMouseLeave={onEdgeMouseLeave}
        onInit={onInit}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.3}
        maxZoom={2}
        panOnDrag
        zoomOnScroll
        selectNodesOnDrag={false}
        nodesDraggable
        className="rounded-[18px]"
      >
        <Background color="#EAEAEA" gap={20} size={1} />
        <Controls
          showInteractive={false}
          className="[&>button]:rounded-full [&>button]:border [&>button]:border-gray-light [&>button]:bg-card [&>button]:text-foreground/60 [&>button]:hover:bg-gray-light [&>button]:w-8 [&>button]:h-8"
        />
      </ReactFlow>
    </div>
  );
}
