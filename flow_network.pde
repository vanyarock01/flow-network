//Класс вершины
class Vertex
{
  // Координаты центра вершины
  int xPos, yPos;
  int radius = 40;
  Vertex (int x, int y) {
    xPos = x;
    yPos = y;
  }
  
  void show()
  {
      fill(255);
      ellipse(xPos, yPos, radius, radius);
  }
 


}
class Edge
{
  int fromId, toId;
  int flow;
  
  Edge(int from, int to) {
    fromId = from;
    toId = to;

  }

  void show()
  {
    fill(255);
    line(VertexList.get(toId).xPos,VertexList.get(toId).yPos,VertexList.get(fromId).xPos,VertexList.get(fromId).yPos);
  }


}