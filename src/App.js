import { Component, Fragment } from 'react';
import AddChild from './add_child';
import './App.css';
import ListItem from './list_item';

class App extends Component {
  constructor(props){
    super(props);

    this.id = 1;
    this.state = {
      nodes: []
    }

    this.renderNodes = this.renderNodes.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.addNode = this.addNode.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.findNode = this.findNode.bind(this);
    this.generateNode = this.generateNode.bind(this);
  }

  generateNode() {
    const id = this.id;
    const node = { id, children: [] }
    this.id += 1;

    return node;
  }

  findNode(nodes, id){
    let node = null;

    for (let index = 0; index < nodes.length; index++) {
      const element = nodes[index];

      if (element.id === Number(id)){
        node = element;
        break;
      }

      node = this.findNode(element.children, id);
    }

    return node;
  }

  addNode(nodes, id){
    const baseId = this.id;

    if (!nodes.length){
      return [{ id: baseId, children: [] }];
    }

    return nodes.map((node) => {
      if (node.id === id){
        node.children.push({ id: baseId, children: [] })

        return node;
      } else {
        this.addNode(node.children, id);
        return node;
      }
    });
  }

  onAdd(e){
    const id = e.currentTarget.dataset.id;

    this.setState((state) => ({ nodes: this.addNode(state.nodes, Number(id)) }), () => {
      this.id += 1;
    });
  }

  deleteNode(nodes, id){
    return nodes.map((node) => {
      if (node.id === id){
        return false;
      } else {
        node.children = this.deleteNode(node.children, id);
        return node;
      }
    }).filter(Boolean);
  }

  onRemove(e){
    const id = e.currentTarget.dataset.id;

    this.setState((state) => ({ nodes: this.deleteNode(state.nodes, Number(id)) }));
  }

  renderNodes(nodes){
    return nodes.map((node, idx) => (
      <ul key={node.id}>
        <ListItem id={node.id} ctr={idx} onAdd={this.onAdd} onRemove={this.onRemove} />
        {this.renderNodes(node.children)}
        <ul><AddChild onAdd={this.onAdd} id={node.id} /></ul>
      </ul>
    ));
  }

  render(){
    const { nodes } = this.state;

    return (
      <div className="App">
        {this.renderNodes(nodes)}
        {!nodes.length && <ul><AddChild onAdd={this.onAdd} /></ul>}
      </div>
    );
  }
}

export default App;
