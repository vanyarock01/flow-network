ArrayList<Vertex> VertexList;
ArrayList<Edge> EdgeList;
String drawState = "unable";
int xAr, yAr;
int space = 80;
String addState = "vertex";

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
  menu();
}
void addEdge(int from, int to)
{
  EdgeList.add (new Edge(from, to));

}

void menu()
{
 fill(255);
 rect(20, 20, 70, 50);
 fill(255);
 rect(120, 20, 70, 50);
}