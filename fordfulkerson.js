function fordFulkerson(vs, es, cb) {
        console.debug("Edge sets:", es);
  "use strict";
  // Make a copy of the edges.


  // Initialize a residual graph structure.
  // returns a map of vetex id's to an array of their outgoing edges.
  function initResidual(vs,es) {
    var g = d3.map(),
        outgoing,
        incoming;

    vs.forEach(function(v) {
      g.set(v.id, []);
    });

    es.forEach(function(e) {
      var bEdge = {target: e.target.id, flow: e.capacity};
      var fEdge = {target: e.source.id, flow: 0};

      outgoing = g.get(e.source.id) || [];
      outgoing.push(bEdge);

      incoming = g.get(e.target.id) || [];
      incoming.push(fEdge);

      g.set(e.source.id, outgoing);
      g.set(e.target.id, incoming);
    });

    return g;
  }
  function findAugmentingP(rG) {
    // run dfs to find s-t path, return the path seq.
    var explored = d3.map();

    function dfs(path) {
      var u = path[path.length-1];
      explored.set(u, true);

      if (u === 1) { return path; }

      // Consider edges which have nonzero residual flow.
      var es1 = rG.get(u).filter(function(e){return e.flow>0;});

      if (!es1 || es1.length === 0) { return false; }

      for (var i=0; i<es1.length; i++) {
        var tgt = es1[i].target;
        if (! explored.get(tgt)) {
          var newpath = path.slice(0);
          newpath.push(tgt);
          var p = dfs(newpath);
          
          if (p) { return p; }
        }
      }
    }
    return dfs([0]);
  }
  function augment(path, rG) {
    function bottleneck(path, rG) {
      // return the min residual capacity of any edge on the path.
      path = path.reverse();
      var u = path.pop(),
          max = 0;
      console.debug("Path: ", path);
      for (var v; v = path.pop();) {
        var edge = rG.get(u).filter(function(e) {return e.target === v})[0];
        if (edge.flow > max) {max = edge.flow;}

        u = v;
      }
      console.debug("Path: ", rG);
      console.debug("Max in thise: ", max);
      return max;
    }

    var b = bottleneck(path.slice(0), rG);
    var u = 0;
    path.forEach(function(v) {
      if (u === v) {return;}

      var bEdge = rG.get(u).filter(function(e) {return e.target === v})[0];
      var fEdge = rG.get(v).filter(function(e) {return e.target === u})[0];

      fEdge.flow += b;
      bEdge.flow -= b;

      u = v;
    });
  }
  // Returns [maxflow, edges]
  function makeFlow(rG, vs, es) {
    // Display the result flow
    es.forEach(function(l) {
      var edge = rG.get(l.target.id).filter(function(e) { return e.target === l.source.id})[0];
      l.flow = edge.flow;
    });

    // Display the max flow
    var sinkIncedent = rG.get(1);
  
    var total = 0;
    sinkIncedent.forEach(function (e) {
      total += e.flow;
    });

    return {
      maxflow: total,
      vertices: vs,
      edges: es
    };
  }
  function logState(rG, path) {
    var newRG = JSON.parse(JSON.stringify(rG));
    var newGraph = new Graph(vs, es);
    newGraph = Graph.fromJSON( newGraph.toJSON() );
    var newVs = newGraph.nodes(),
        newEs = newGraph.links();

    log.push({
      flow: makeFlow(rG, newVs, newEs),
      residual: newRG,
      path: path
    });
  }


    function findEdge(rN) {
      var ret=-1;
      var max = -1000000;
      var newMax=0;
      for(var i = 0;i < es.length; i++) {

        if(rN === es[i].source.index) {
          newMax = es[i].capacity - es[i].flow;  
         console.debug("find", es[i].flow ,'/',es[i].capacity,'|',es[i].source.id,'->',es[i].target.id);       
          if(max < newMax){          
             max = newMax;
             ret = i;
        }
      }
    }
    return ret;//index of edge

  }
  function ifCanAddMore() {

    for(var i = 0; i < es.length;i++) {
      if(es[i].capacity - es[i].flow > 0) {

        console.debug("add More", es[i].flow ,'/',es[i].capacity,'|',es[i].source.id,'->',es[i].target.id);
        return true;
      }
    }
    return false;
  }
  
  // === Main Loop ===     

  var recentNode;
  var recentEdge= {};
  var arrEdgesIndex = [];
  console.debug("start array",arrEdgesIndex);
  var maxNotFull=0,newMaxNotFull;
  var esNew = [];
  var recentEdgeIndex=0;
  es.forEach(function(e) {
    e.flow = 0;
  });


  var tmp019=0;
  while(ifCanAddMore()) {
      maxNotFull = 0;
      recentNode = 0;
      //console.debug("es ", es);
      while(recentNode != 1) {
        console.debug("Node ",recentNode);
        recentEdgeIndex=findEdge(recentNode);
        recentEdge = es[recentEdgeIndex];
        recentNode = recentEdge.target.index;
        newMaxNotFull=recentEdge.capacity-recentEdge.flow;
        console.debug("newMaxNotFull", newMaxNotFull);
        maxNotFull=(newMaxNotFull > maxNotFull) ? newMaxNotFull : maxNotFull;       
        arrEdgesIndex.push(recentEdgeIndex);
      }
      if(maxNotFull==0)
        maxNotFull=1;
      console.debug("recentMaxNotFull", maxNotFull);
      arrEdgesIndex.forEach(function(d) {
        es[d].flow = es[d].flow+maxNotFull;
        console.debug("Flow:", es[d].source.index,"-",es[d].target.index,"-", es[d].flow);

      });
     

     //tmp019++;
     //if(tmp019>10)
    // break; 
    //console.debug("array undo clear",arrEdgesIndex);
      //arrEdgesIndex=[];
    arrEdgesIndex.length=0;
    //while(arrEdgesIndex.length > 0) arrEdgesIndex.pop();
    //for(var i = 0; i < arrEdgesIndex.length; ++i) console.debug("arrEdgesIndex:", arrEdgesIndex[i]);

    //console.debug("array latest clear",arrEdgesIndex);
   
  }

  //console.debug("pre", es[1].flow);
  //return [{
  //    maxflow: 0,
  //    vertices: vs,
  //    edges: es
  //  },''];
  for(var i = 0; i < es.length; i++) {
    esNew[i] = {};
    for(var key in es[i]) {
      esNew[i][key] = es[i][key];
    }
  }

  //console.debug("es", es[1].flow);
 // console.debug("New", esNew[1].flow);

   esNew.forEach(function(e) {
      e.capacity = e.flow - e.capacity;
      e.flow = 0; 
      //console.debug("capacity:", e.source.index,"-",e.target.index,":", e.flow,"/",e.capacity);
   });
 // console.debug("es", es);
 // console.debug("esNew", esNew);

function calcMinFlow(){
  var sum=0;
  es.forEach(function(e) {
    if(e.source.index==0)
      sum+=e.flow;

   });
  return sum;

}

 

  es.forEach(function(e) {
    console.debug("es capacity:", e.source.index,"-",e.target.index,":", e.flow,'/',e.capacity);
  });

  var result = findMaxFlow(vs,esNew)[0];
  console.debug("result makeFlow:", result);  
  
  for (var i = 0; i < result.edges.length; i++) {
    console.debug("res Flow:", es[i].flow,"-",result.edges[i].flow,"=", es[i].flow - result.edges[i].flow);
    es[i].flow = es[i].flow - result.edges[i].flow;
    es[i].capacity = es[i].capacity;
  }
  console.debug("es:", es);
  console.debug("res:", result);
  var minFlow=calcMinFlow();
  //console.debug("Residual Graph flow: ", rG);
  return [{
      maxflow: minFlow,
      vertices: vs,
      edges: es
    }, ""];
}