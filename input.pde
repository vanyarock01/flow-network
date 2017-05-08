boolean testDistance(int x, int y)
{
  for(int i = 0; i < VertexList.size(); i++){
    int x_ver = VertexList.get(i).xPos;
    int y_ver = VertexList.get(i).yPos;
    if(pow(x - x_ver, 2) + pow(y - y_ver, 2) <= pow(space, 2)) return false;
  }
  return true;
}
int getIdVertex(int x, int y) {
  for(int i = 0; i < VertexList.size(); i++){
    int x_ver = VertexList.get(i).xPos;
    int y_ver = VertexList.get(i).yPos;
    if(pow(x - x_ver, 2) + pow(y - y_ver, 2) <= pow(40, 2)) return i;
  }
  return -1;
}

void mouseClicked()
{
  if(addState == "adge") {
  }else if (mouseX > 20 && mouseX < 70 && mouseY > 20 && mouseY < 50) {
    addState = "vertex";
  }else if (mouseX > 120 && mouseX < 190 && mouseY > 20 && mouseY < 50) {
    addState = "edge";
  } else if (addState == "vertex" && testDistance(mouseX, mouseY)) {
    VertexList.add (new Vertex(mouseX,mouseY));
  }  else if (addState == "vertex" && getIdVertex(mouseX, mouseY) != -1) {
    VertexList.add (new Vertex(mouseX,mouseY));
  }
}