ArrayList<Vertex> VertexList;
ArrayList<Edge> EdgeList;
String drawState = "unable";
int xAr, yAr;
void setup()
{
  
  ellipseMode(CENTER);
  size(1200, 600);
  stroke(255);
  frameRate(60);
  VertexList = new ArrayList();
  EdgeList = new ArrayList();
  background(0);
  VertexList.add (new Vertex(200,300));
  VertexList.add (new Vertex(1000,300));
  addEdge(0, 1);
}

void draw()
{  
   background(0);
  for(int i = 0; i < VertexList.size(); i++) {
    VertexList.get(i).show();
  }
  for(int i = 0; i < EdgeList.size(); i++) {
    EdgeList.get(i).show();
  }
   
}
void addEdge(int from, int to)
{
  EdgeList.add (new Edge(from, to));

}