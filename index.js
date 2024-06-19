let jsdom = require("jsdom");
let { JSDOM } = jsdom;

let dom = new JSDOM("<html><head></head><body></body></html>");
window = dom.window;
Object.getOwnPropertyNames(window).forEach((prop) => {
  if (typeof global[prop] === "undefined") {
    if (prop === "undefined") {
      return;
    }

    Object.defineProperty(global, prop, {
      get: () => window[prop],
      set: (value) => {
        window[prop] = value;
      },
      configurable: true,
      enumerable: true,
    });
  }
});

mxIsElectron = false;
urlParams = {};
drawDevUrl = "./src/main/webapp/";
geBasePath = "./src/main/webapp/js/grapheditor";

mxmeta = function (...args) {
  console.log("mxmeta", ...args);
};

let isDependencyDenied = (depName) => {
  if (depName.includes("spin.min.js")) {
    return true;
  }

  return false;
};

mxscript = function (dep) {
  console.log("mxscript", dep);
  if (isDependencyDenied(dep)) {
    console.log("Dependency denied", dep);
    return;
  }

  require(dep);
};

navigator.userAgent = "Mozilla/5.0";
navigator.appVersion = "5.0";
navigator.appName = "Netscape";

let mxBasePath = "./src/main/webapp/mxgraph/src";

const fs = require("fs");

mxinc = (relSrc, deps) => {
  let src = mxBasePath + "/" + relSrc;

  console.log("mxinc", src);
  let fileContent = fs.readFileSync(src, "utf8");

  deps = deps && Array.isArray(deps) ? deps : [];
  deps.push(relSrc.split("/").pop().replace(".js", ""));

  if (deps && Array.isArray(deps)) {
    deps.forEach((dep) => {
      fileContent += `\nif (typeof ${dep} !== 'undefined') { global.${dep} = ${dep}; window.${dep} = ${dep}; }`;
    });
  }
  eval(fileContent);
};

// copied from `mxClient.js`

mxinc("/mxClient.js");
mxinc("/util/mxLog.js");
mxinc("/util/mxObjectIdentity.js");
mxinc("/util/mxDictionary.js");
mxinc("/util/mxResources.js");
mxinc("/util/mxPoint.js");
mxinc("/util/mxRectangle.js");
mxinc("/util/mxEffects.js");
mxinc("/util/mxUtils.js");
mxinc("/util/mxConstants.js");
mxinc("/util/mxEventObject.js");
mxinc("/util/mxMouseEvent.js");
mxinc("/util/mxEventSource.js");
mxinc("/util/mxEvent.js");
mxinc("/util/mxXmlRequest.js");
mxinc("/util/mxClipboard.js");
mxinc("/util/mxWindow.js");
mxinc("/util/mxForm.js");
mxinc("/util/mxImage.js");
mxinc("/util/mxDivResizer.js");
mxinc("/util/mxDragSource.js");
mxinc("/util/mxToolbar.js");
mxinc("/util/mxUndoableEdit.js");
mxinc("/util/mxUndoManager.js");
mxinc("/util/mxUrlConverter.js");
mxinc("/util/mxPanningManager.js");
mxinc("/util/mxPopupMenu.js");
mxinc("/util/mxAutoSaveManager.js");
mxinc("/util/mxAnimation.js");
mxinc("/util/mxMorphing.js");
mxinc("/util/mxImageBundle.js");
mxinc("/util/mxImageExport.js");
mxinc("/util/mxAbstractCanvas2D.js");
mxinc("/util/mxXmlCanvas2D.js");
mxinc("/util/mxSvgCanvas2D.js");
mxinc("/util/mxGuide.js");
mxinc("/shape/mxShape.js");
mxinc("/shape/mxStencil.js");
mxinc("/shape/mxStencilRegistry.js");
mxinc("/shape/mxMarker.js");
mxinc("/shape/mxActor.js");
mxinc("/shape/mxCloud.js");
mxinc("/shape/mxRectangleShape.js");
mxinc("/shape/mxEllipse.js");
mxinc("/shape/mxDoubleEllipse.js");
mxinc("/shape/mxRhombus.js");
mxinc("/shape/mxPolyline.js");
mxinc("/shape/mxArrow.js");
mxinc("/shape/mxArrowConnector.js");
mxinc("/shape/mxText.js");
mxinc("/shape/mxTriangle.js");
mxinc("/shape/mxHexagon.js");
mxinc("/shape/mxLine.js");
mxinc("/shape/mxImageShape.js");
mxinc("/shape/mxLabel.js");
mxinc("/shape/mxCylinder.js");
mxinc("/shape/mxConnector.js");
mxinc("/shape/mxSwimlane.js");
mxinc("/layout/mxGraphLayout.js");
mxinc("/layout/mxStackLayout.js");
mxinc("/layout/mxPartitionLayout.js");
mxinc("/layout/mxCompactTreeLayout.js");
mxinc("/layout/mxRadialTreeLayout.js");
mxinc("/layout/mxFastOrganicLayout.js");
mxinc("/layout/mxCircleLayout.js");
mxinc("/layout/mxParallelEdgeLayout.js");
mxinc("/layout/mxCompositeLayout.js");
mxinc("/layout/mxEdgeLabelLayout.js");
mxinc("/layout/hierarchical/model/mxGraphAbstractHierarchyCell.js");
mxinc("/layout/hierarchical/model/mxGraphHierarchyNode.js");
mxinc("/layout/hierarchical/model/mxGraphHierarchyEdge.js");
mxinc("/layout/hierarchical/model/mxGraphHierarchyModel.js");
mxinc("/layout/hierarchical/model/mxSwimlaneModel.js");
mxinc("/layout/hierarchical/stage/mxHierarchicalLayoutStage.js");
mxinc("/layout/hierarchical/stage/mxMedianHybridCrossingReduction.js");
mxinc("/layout/hierarchical/stage/mxMinimumCycleRemover.js");
mxinc("/layout/hierarchical/stage/mxCoordinateAssignment.js");
mxinc("/layout/hierarchical/stage/mxSwimlaneOrdering.js");
mxinc("/layout/hierarchical/mxHierarchicalLayout.js", [
  "mxHierarchicalEdgeStyle",
]);
mxinc("/layout/hierarchical/mxSwimlaneLayout.js");
mxinc("/model/mxGraphModel.js", [
  "mxRootChange",
  "mxChildChange",
  "mxCollapseChange",
  "mxTerminalChange",
  "mxValueChange",
  "mxStyleChange",
  "mxGeometryChange",
  "mxVisibleChange",
  "mxCellAttributeChange",
]);
mxinc("/model/mxCell.js");
mxinc("/model/mxGeometry.js");
mxinc("/model/mxCellPath.js");
mxinc("/view/mxPerimeter.js");
mxinc("/view/mxPrintPreview.js");
mxinc("/view/mxStylesheet.js");
mxinc("/view/mxCellState.js");
mxinc("/view/mxGraphSelectionModel.js");
mxinc("/view/mxCellEditor.js");
mxinc("/view/mxCellRenderer.js");
mxinc("/view/mxEdgeStyle.js");
mxinc("/view/mxStyleRegistry.js");
mxinc("/view/mxGraphView.js");
mxinc("/view/mxGraph.js");
mxinc("/view/mxCellOverlay.js");
mxinc("/view/mxOutline.js");
mxinc("/view/mxMultiplicity.js");
mxinc("/view/mxLayoutManager.js");
mxinc("/view/mxSwimlaneManager.js");
mxinc("/view/mxTemporaryCellStates.js");
mxinc("/view/mxCellStatePreview.js");
mxinc("/view/mxConnectionConstraint.js");
mxinc("/handler/mxGraphHandler.js");
mxinc("/handler/mxPanningHandler.js");
mxinc("/handler/mxPopupMenuHandler.js");
mxinc("/handler/mxCellMarker.js");
mxinc("/handler/mxSelectionCellsHandler.js");
mxinc("/handler/mxConnectionHandler.js");
mxinc("/handler/mxConstraintHandler.js");
mxinc("/handler/mxRubberband.js");
mxinc("/handler/mxHandle.js");
mxinc("/handler/mxVertexHandler.js");
mxinc("/handler/mxEdgeHandler.js");
mxinc("/handler/mxElbowEdgeHandler.js");
mxinc("/handler/mxEdgeSegmentHandler.js");
mxinc("/handler/mxKeyHandler.js");
mxinc("/handler/mxTooltipHandler.js");
mxinc("/handler/mxCellTracker.js");
mxinc("/handler/mxCellHighlight.js");
mxinc("/io/mxCodecRegistry.js");
mxinc("/io/mxCodec.js");
mxinc("/io/mxObjectCodec.js");
mxinc("/io/mxCellCodec.js");
mxinc("/io/mxModelCodec.js");
mxinc("/io/mxRootChangeCodec.js");
mxinc("/io/mxChildChangeCodec.js");
mxinc("/io/mxTerminalChangeCodec.js");
mxinc("/io/mxGenericChangeCodec.js");
mxinc("/io/mxGraphCodec.js");
mxinc("/io/mxGraphViewCodec.js");
mxinc("/io/mxStylesheetCodec.js");

uiTheme = {};
Sidebar = {};
Sidebar.prototype = {};
STENCIL_PATH = {};
GRAPH_IMAGE_PATH = "";
IMAGE_PATH = "";
STYLE_PATH = "";
SHAPES_PATH = "";
PrintDialog = {};
PrintDialog.prototype = {};
ChangePageSetup = {};
ChangePageSetup.prototype = {};

global.DOMPurify = require("dompurify");
window.DOM_PURIFY_CONFIG = {};
DOMPurify.setConfig({
  IN_PLACE: true,
});

// require("./src/main/webapp/js/diagramly/Devel.js");

evalAndExport = (filePath, exportNames) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const globalAssignments = exportNames
    .map((name) => `global.${name} = ${name};`)
    .join("\n");
  eval(fileContent + `\n${globalAssignments}\n`);
};

evalAndExport("./src/main/webapp/js/grapheditor/Graph.js", ["Graph"]);
evalAndExport("./src/main/webapp/js/grapheditor/Editor.js", ["Editor"]);

// Load the example.drawio file
const exampleFilePath = "./example.drawio";
const exampleFileContent = fs.readFileSync(exampleFilePath, "utf8");

// Parse the XML content
let parser = new DOMParser();
let xmlDoc = parser.parseFromString(exampleFileContent, "text/xml");

// Find a 'diagram' node
let diagramNode = xmlDoc.querySelector("diagram");
let compressed = atob(diagramNode.textContent);
let pako = require("pako");
let diagram = pako.inflateRaw(Graph.stringToArrayBuffer(compressed), {
  to: "string",
});
diagram = decodeURIComponent(diagram);

console.log("==== diagram ====");
console.log(diagram);
console.log("==== diagram end ====");

// Now parse XML again from the diagram content
// xmlDoc = parser.parseFromString(diagram, "text/xml");
xmlDoc = mxUtils.parseXml(diagram);

// Show off the xmlDoc now
console.log("==== xmlDoc ====");
function printChildNodes(node, indent = 0) {
  console.log(" ".repeat(indent) + node.nodeName);
  node.childNodes.forEach((child) => printChildNodes(child, indent + 2));
}

printChildNodes(xmlDoc.documentElement);
console.log("==== xmlDoc end ====");

// Make a new Editor
let editor = new Editor(true, null, null, null, null);
editor.graph.container = document.createElement("svg");

editor.graph.view.createHtml();

editor.setGraphXml(xmlDoc.documentElement);
