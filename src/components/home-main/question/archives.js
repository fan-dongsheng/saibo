import * as d3 from 'd3';
import axios from 'axios';

export function pltKg(datases) {
  const margin = {
    top: 30,
    right: 30,
    bottom: 5,
    left: 5
  };
  // var width = window.sessionStorage.getItem('w') || 800
  var width =  380;
  var height = 380;
  var colorScale = d3.scaleOrdinal() //=d3.scaleOrdinal(d3.schemeSet2)
    .domain(d3.range(datases.nodes.labels))
    .range(['#ff9e6d', '#86cbff', '#c2e5a0', '#fff686', '#9e79db'])

  window.simulation = d3.forceSimulation()
    .force("link", d3.forceLink() // This force provides links between nodes,链接力
      .id(d => d.id) // This sets the node id accessor to the specified function. If not specified, will default to the index of a node.
      .distance(50)
      .strength(1)
    )
    .force("charge", d3.forceManyBody().strength(-30)) // This adds repulsion (if it's negative) between nodes.万有引力
    .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area,用指定的x坐标和y坐标创建一个居中力。
    // 控制力学模拟衰减率，[0-1] ,设为0则不停止 ， 默认0.0228，直到0.001
    .alphaDecay(0.0228)
    //碰撞作用力，为节点指定一个radius区域来防止节点重叠，设置碰撞力的强度，范围[0,1], 默认为0.7。设置迭代次数，默认为1，迭代次数越多最终的布局效果越好，但是计算复杂度更高
    .force("collide", d3.forceCollide(60).strength(0.2).iterations(5));
  window.contain = d3.select("#contain")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  window.svg = contain
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  var defs = svg.append('defs');

  defs.append('marker')
    .attr("id", 'arrowhead')
    .attr('viewBox', '-0 -5 10 10') //the bound of the SVG viewport for the current SVG fragment. defines a coordinate system 10 wide and 10 high starting on (0,-5)
    .attr('refX', 33) // x coordinate for the reference point of the marker. If circle is bigger, this need to be bigger.
    .attr('refY', 0)
    .attr('orient', 'auto')
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    // .attr('xoverflow', 'visible')
    .append('svg:path')
    .attr("markerUnits", "userSpaceOnUse")
    .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
    .attr('fill', '#999')
    .style('stroke', 'none')
    .attr("fill", "steelblue");

  // 3.2 添加多个头像图片的 <pattern>
  var patterns = defs
    .selectAll("pattern.patternclass")
    .data(datases.nodes)
    .enter()
    .append("pattern")
    .attr("class", "patternclass")
    .attr("id", function (d, index) {
      return 'image' + d.id;
    })
    // 两个取值userSpaceOnUse  objectBoundingBox
    .attr('patternUnits', 'objectBoundingBox')
    // <pattern>，x、y值的改变决定图案的位置，宽度、高度默认为pattern图案占填充图形的百分比。
    .attr("x", "0")
    .attr("y", "0")
    .attr("width", "1")
    .attr("height", "1");

  // 3.3 向<defs> - <pattern>添加 头像
  patterns.append("image")
    .attr("class", "circle")
    .attr("xlink:href", function (d) {
      return require("@/images/"+92 + ".png"); // 修改节点头像
    })
    .attr("src", function (d) {
      console.log(d)
      return require("@/images/"+92 + ".png"); // 修改节点头像
    })
    // .attr("background-image", 'url(../)')
    .attr("height", 30*2)
    .attr("width", 30*2)
    .attr("preserveAspectRatio", "xMidYMin slice");

  contain.call(d3.zoom() // 自动创建事件侦听器
    .scaleExtent([0.1, 10]) // 缩放允许的级数
    .on("zoom", zoom)
  )
    .on("dblclick.zoom", null);

  function zoom() {
    svg.attr("transform", d3.event.transform);
    // translate变换矢量（使用二元组标识）scale当前尺度的数字
    // svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"); // 画布缩放与移动
    // svg.attr("transform", "scale(" + d3.event.scale + ")"); // 画布缩放
  }

  //create some data
  let dataset =datases;

  var adjlist = [];

  dataset.links.forEach(function (d) {
    console.log("++++++++++");
    console.log(d);
    adjlist[d.source + "-" + d.target] = true;
    adjlist[d.target + "-" + d.source] = true;
  });

  function neigh(a, b) {
    return a == b || adjlist[a + "-" + b];
  }

  // Initialize the links
  window.link = svg.selectAll(".links")
    .data(dataset.links)
    .enter()
    .append("line")
    .attr("class", "links")
    .attr("stroke", "#aaa")
    .style("stroke-width", 2)
    .attr('marker-end', 'url(#arrowhead)') //The marker-end attribute defines the arrowhead or polymarker that will be drawn at the final vertex of the given shape.
    .on('mouseover', function () {
      d3.select(this).selectAll('.links').style('stroke-width', 4);
    })
    .on('mouseout', function () {
      d3.select(this).selectAll('.links').style('stroke-width', 2);
    });


  //The <title> element provides an accessible, short-text description of any SVG container element or graphics element.
  //Text in a <title> element is not rendered as part of the graphic, but browsers usually display it as a tooltip.
  link.append("title")
    .text(d => d.type);

  window.edgepaths = svg.selectAll(".edgepath") //make path go along with the link provide position for link labels
    .data(dataset.links)
    .enter()
    .append('path')
    .attr('class', 'edgepath')
    .attr('fill-opacity', 0)
    .attr('stroke-opacity', 0)
    .attr('id', function (d, i) {
      return 'edgepath' + i
    })
    .style("pointer-events", "none");

  window.edgelabels = svg.selectAll(".edgelabel")
    .data(dataset.links)
    .enter()
    .append('text')
    .style("pointer-events", "none")
    .attr('class', 'edgelabel')
    .attr('id', function (d, i) {
      return 'edgelabel' + i
    })
    .attr('font-size', 12)
    .attr('fill', '#aaa');

  edgelabels.append('textPath') //To render text along the shape of a <path>, enclose the text in a <textPath> element that has an href attribute with a reference to the <path> element.
    .attr('xlink:href', function (d, i) {
      return '#edgepath' + i
    })
    .style("text-anchor", "middle")
    // .attr("x", function (d) {
    //   return (d.source.x + d.target.x) / 2
    // })
    // .attr("y", function (d) {
    //   return (d.source.y + d.target.y) / 2
    // })
    .style("pointer-events", "none")
    .attr("startOffset", "50%")
    .text(d => d.name);

  window.node = svg.selectAll(".nodes")
    .data(dataset.nodes)
    .enter()
    .append("g")
    .attr("class", "nodes")
    .call(d3.drag() //sets the event listener for the specified typenames and returns the drag behavior.
      .on("start", dragstarted) //start - after a new pointer becomes active (on mousedown or touchstart).
      .on("drag", dragged)      //drag - after an active pointer moves (on mousemove or touchmove).
      .on("end", dragended)     //end - after an active pointer becomes inactive (on mouseup, touchend or touchcancel).
    );
  //圆环边线颜色
  window.nodeCicles = node.append("circle")
    .attr("r", d => 30)//+ d.runtime/20 )
      //这居然这么关键？+++++++++++++++
    // .attr("cx", function (d) { return d.x; })
    // .attr("cy", function (d) { return d.y; })
    .style("stroke", d => colorScale(d.labels))
    // .style("stroke-opacity", 0.3)
    .style("stroke-width", d => 5)  //.style("stroke-width", d => d.runtime / 10)
    .style("fill", function (d) {
      return ("url(#image" + d.id+ ")");})
    .on("mouseover", function (d) {
      d3.select(this).style('stroke-width', 8);
    })
    .on("mouseout",function (d) {
      d3.select(this).style('stroke-width', 3);
    })
  //球悬浮title
  node.append("title")
    .text(d => d.name);

  window.nodeText = node.append('text')
    .attr("dy", 5)
    .attr("x", 35)
    // .text(d => d.name.length > 6 ? d.name.slice(0,5)+"..." : d.name)
  let strs = []
  dataset.nodes.forEach((val) => {
    strs.push(val.name)
  })
  nodeText.selectAll("tspan")
    .data(function(d){
      let nameStr = []
      if(d.name.length>11){
        nameStr[0] = d.name.slice(0,5).toString();
        nameStr[1] = d.name.slice(5,10).toString() + "...";
        return nameStr;
      }else {
        nameStr[0] = d.name.slice(0,5).toString();
        nameStr[1] = d.name.slice(5,).toString();
        return nameStr;
      }})
    .enter()
    .append("tspan")
    .attr("x",nodeText.attr('x'))
    .attr("dy","1.3em")
    .text(d => d);
  // node.append("text")
  //   .attr("dy", 12)
  //   .attr("dx", -8)
  //   .text(d => d.runtime);

  node.on("click", drawCircle)

  //Listen for tick events to render the nodes as they update in your Canvas or SVG.
  simulation
    .nodes(dataset.nodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(dataset.links)


  // This function is run at each iteration of the force algorithm, updating the nodes position (the nodes data array is directly manipulated).
  function ticked() {
    link.attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node.attr("transform", d => "translate(" + d.x + "," + d.y + ")")

    edgepaths.attr('d', d => 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y);
  }

  //When the drag gesture starts, the targeted node is fixed to the pointer
  //The simulation is temporarily “heated” during interaction by setting the target alpha to a non-zero value.
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();//sets the current target alpha to the specified number in the range [0,1].
    d.fy = d.y; //fx - the node’s fixed x-position. Original is null.
    d.fx = d.x; //fy - the node’s fixed y-position. Original is null.
    d3.select("#eee").remove(); // 删除节点扇形
  }

  //When the drag gesture starts, the targeted node is fixed to the pointer
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  //the targeted node is released when the gesture ends
    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

  function drawCircle(nd) {
    // Variables
    var width1 = 250;
    var height1 = 250;
    var radius = 150;
    // var color = d3.scaleOrdinal(d3.schemeCategory20b);

    // Create primary <g> element
    var g = svg.append('g')
      .attr("id", "eee")
      .attr('transform', 'translate(' + nd.x + ',' + nd.y + ')')

    // Data strucure
    var partition = d3.partition()
      .size([2 * Math.PI, radius]);

    // Find data root
    var root = d3.hierarchy(nodeData)
      .sum(function (d) { return d.size });

    g.append("circle")
      .attr("r", 100)
      .attr("cx", nd.x)
      .attr("cy", nd.y)
      .style("stroke","blue")

    g.append("circle")
      .attr("r", 150)
      .attr("cx", nd.x)
      .attr("cy", nd.y)
      .style("stroke","blue")

    // Size arcs
    partition(root);
    var arc = d3.arc()
      .startAngle(function (d) { return d.x0 })
      .endAngle(function (d) { return d.x1 })
      .innerRadius(function (d) { return d.y0 })
      .outerRadius(function (d) { return d.y1 });

    // Put it all together
    var path = g.selectAll('path')
      .data(root.descendants())
      .enter().append('path')
      .attr("display", function (d) {
        return d.depth == 1 ? null : "none";
      })
      .attr("d", arc)
      // .attr("fill-opacity", 0.8)
      .style("fill", function (d) {
        return d.depth == 1 ? "#F0F6FE" : "#45A5EF";
      })
      .attr("class", function (d) {
        return d.depth == 2 ? "hiddenUp" : null;
      })
      .style("opacity", function (d) {
        return d.depth == 2 ? 0.7 : 1;})
      .style("cursor", "pointer")
      .on("mouseenter", function (d) {
        d3.select(this).style("fill", function (d) {
          return d.depth == 1 ? "#F0F6F0" : "#45A5B0";
        })
        const dd = d.children
        path
          .filter(d => dd === undefined ? false : dd.indexOf(d) > -1)
          .attr("display", null)
          .attr("class", "showUp")

        iconsLab.filter(d => dd === undefined ? false : dd.indexOf(d) > -1)
          .attr("display", null)
          .attr("class", "visUp")
      })
      .on("mouseleave", function (d) {
        d3.select(this).style("fill", function (d) {
          return d.depth == 1 ? "#F0F6FE" : "#45A5EF";
        })
      })
      .on("mouseover", function (d) {
        let showed = d3.selectAll(".showUp")
        if (!showed.empty()) {
          if (showed.datum().parent.children.indexOf(d) == -1 && d.data.name !== showed.datum().parent.data.name) {
            d3.selectAll(".showUp")
              .attr("display", "none")
              .attr("class", "hiddenUp")
            d3.selectAll(".visUp")
              .attr("display", "none")
              .attr("class", "hidUp")
          }
        }
      })

    g.on("mouseleave", d => d3.select("#eee").remove())

  function unfocus(d) {
    node.style("opacity", 1);
    edgelabels.attr("display", "block");
    link.style("opacity", 1);
  }

  function focusLink(d) {
    var ind = d3.select(d3.event.target).datum().id;

    var childLinkList = []
    var childNodeList = []
    var parentLinkList = []
    var parentNodeList = []
    var PnameList = []
    var sourceList = []
    var targetList = []
    dataset.links.forEach((val) => {
      sourceList.push(val.source.id);
      targetList.push(val.target.id)
    })

    function findChild(data, id) {
      data.forEach((item) => {
        if (item.source.id == id) {
          childLinkList.push(item.index)
          childNodeList.push(item.target.id)
          id = item.target.id
          findChild(data, id);
        }
      })
    }
    findChild(dataset.links, ind)

    function findParent(data, id) {
      data.forEach((item) => {
        if (item.target.id == id) {
          PnameList.push(item.source.name)
          parentLinkList.push(item.index)
          parentNodeList.push(item.source.id)
          id = item.source.id
          findParent(data, id);
        }
      })
    }
    findParent(dataset.links, ind)
    const nodeList = parentNodeList.concat(childNodeList);
    const linkList = parentLinkList.concat(childLinkList)
    node.style("opacity", function (o) {
      return nodeList.indexOf(o.id) > -1 || o.id == ind ? 1 : 0.1;
    });
    edgelabels.attr("display", function (o) {
      return linkList.indexOf(o.index) > -1 ? "block" : "none";
    });
    link.style("opacity", function (o) {
      return linkList.indexOf(o.index) > -1 ? 1 : 0.1;
    });
  }

 
  }
}

