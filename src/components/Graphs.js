/*eslint-disable*/
import React from "react";
import G6 from "@antv/g6";
import './Graphs.scss'

const Graphs = () => {
    const fontSize = 15;

    G6.registerNode("crect", {
        draw: (cfg, group) => {
            const width = cfg.id.length * 10;
            const rect = group.addShape("rect", {
                attrs: {
                    x: 0,
                    y: -10,
                    ...cfg.style,
                    width,
                    height: 20,
                    lineWidth: 0,
                    opacity: 0
                },
                name: "rect-shape",
                draggable: true
            });
            const label = group.addShape("text", {
                attrs: {
                    text: cfg.id,
                    fill: "#ccc",
                    fontSize,
                    x: 0,
                    y: 0
                },
                name: "label-shape",
                draggable: true
            });
            const labelBBox = label.getBBox();
            const icon = group.addShape("circle", {
                attrs: {
                    x: labelBBox.maxX + 10,
                    y: (labelBBox.minY + labelBBox.maxY) / 2,
                    r: 5,
                    stroke: "#000"
                },
                name: "circle-shape",
                draggable: true
            });
            const bboxWidth = label.getBBox().width + 20;
            rect.attr({ width: bboxWidth });

            group.addShape("path", {
                attrs: {
                    lineWidth: 1,
                    fill: "#ccc",
                    stroke: "#ccc",
                    path: [
                        ["M", 0, 0],
                        ["L", bboxWidth, 0]
                    ]
                },
                name: "path-shape",
                draggable: true
            });

            return rect;
        },
        getAnchorPoints: (type, cfg) => {
            return [
                [0, 0.5],
                [1, 0.5]
            ];
        }
    });

    fetch(
        "https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json"
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            const container = document.getElementById("container");
            const descriptionDiv = document.createElement("div");
            container.appendChild(descriptionDiv);

            const width = container.scrollWidth;
            const height = container.scrollHeight || 500;
            const graph = new G6.TreeGraph({
                container: "container",
                width,
                height,
                modes: {
                    default: ["collapse-expand", "drag-canvas", "zoom-canvas"]
                },
                defaultNode: {
                    type: "crect"
                },
                defaultEdge: {
                    type: "cubic-horizontal",
                    style: {
                        stroke: "#A3B1BF"
                    }
                },
                layout: {
                    type: "compactBox",
                    direction: "LR",
                    getId: function getId(d) {
                        return d.id;
                    },
                    getHeight: function getHeight() {
                        return 16;
                    },
                    getVGap: function getVGap() {
                        return 10;
                    },
                    getHGap: function getHGap() {
                        return 100;
                    },
                    getWidth: function getWidth(d) {
                        return G6.Util.getTextSize(d.id, fontSize)[0] + 20;
                    }
                },
                fitView: true
            });
            var test = 0;

            graph.data(data);
            graph.render();

            if (typeof window !== "undefined")
                window.onresize = () => {
                    if (!graph || graph.get("destroyed")) return;
                    if (!container || !container.scrollWidth || !container.scrollHeight)
                        return;
                    graph.changeSize(container.scrollWidth, container.scrollHeight);
                };
        });

    return (
        <div className="row">
            <h2 className="row__title">Some informations...</h2>
            <div id="container" />
        </div>
    )
};

export default Graphs;
