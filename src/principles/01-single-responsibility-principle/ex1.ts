/*
A seguir será aplicado o príncipio (SRP) na god classe abaixo: 

class Order
{
    public function calculateTotalSum(){}
    public function getItems(){}
    public function getItemCount(){}
    public function addItem($item){}
    public function updateItem($item){}
    public function deleteItem($item){}

    public function printOrder(){}
    public function showOrder(){}

    public function load(){}
    public function save(){}
    public function update(){}
    public function delete(){}
}

*/

/* 
A classe Order viola o SRP porque realiza 3 tipos distintos de tarefas. 
Além de lidar com as informações do pedido, ela também é responsável pela exibição e manipulação dos dados. 
Lembre-se, o princípio da responsabilidade única preza que uma classe deve ter um, e somente um, motivo para mudar. 
*/

/* eslint-disable @typescript-eslint/no-empty-function */

class Order {
  public calculateTotalSum(): void {}
  public getItems() {}
  public getItemCount() {}
  public addItem() {}
  public updateItem() {}
  public deleteItem() {}
}

class OrderRepository {
  public load() {}
  public save() {}
  public update() {}
  public delete() {}
}

class OrderViewer {
  public printOrder() {}
  public showOrder() {}
}
