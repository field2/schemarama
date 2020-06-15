// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 600, height: 300 });

function clone(val) {
  const type = typeof val
  if (val === null) {
    return null
  } else if (type === 'undefined' || type === 'number' ||
             type === 'string' || type === 'boolean') {
    return val
  } else if (type === 'object') {
    if (val instanceof Array) {
      return val.map(x => clone(x))
    } else if (val instanceof Uint8Array) {
      return new Uint8Array(val)
    } else {
      let o = {}
      for (const key in val) {
        o[key] = clone(val[key])
      }
      return o
    }
  }
  throw 'unknown'
}


figma.ui.onmessage = msg => {
// this is taken from the sampe test plugin Figma gives you for learning. It generates the squares.
  if (msg.type === 'create-swatches') {
    // const nodes: SceneNode[] = [];
    const newSelection = [];
    for (let i = 0; i < msg.count; i++) {

      const rect = figma.createRectangle();
      const fills = clone(rect.fills);

      rect.x = i * 100;
      rect.y = i * 100;
      // fills[i].color.r = i * 10;
rect.fills = fills;
      rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      figma.currentPage.appendChild(rect);
      newSelection.push(rect);
    }
    figma.currentPage.selection = newSelection;
    figma.viewport.scrollAndZoomIntoView(newSelection);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
