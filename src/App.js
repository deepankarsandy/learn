import { Component, Fragment } from 'react';
import AddChild from './add_child';
import './App.css';
import ListItem from './list_item';

class App extends Component {
  constructor(props){
    super(props);

    this.id = 1;
    this.state = {
      nodes: [{ ...this.generateNode(), children: [this.generateNode(), this.generateNode()] }, this.generateNode()],
    }

    this.renderNodes = this.renderNodes.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.generateNode = this.generateNode.bind(this);
  }

  generateNode() {
    const id = this.id;
    const node = { id, children: [] }
    this.id += 1;

    return node;
  }

  onAdd(e){
    console.log('Add: TODO');
  }

  onRemove(e){
    console.log('Remove: TODO');
  }

  renderNodes(nodes){
    return nodes.map((node, idx) => (
      <ul key={node.id}>
        <ListItem id={node.id} ctr={idx} onAdd={this.onAdd} onRemove={this.onRemove} />
        {this.renderNodes(node.children)}
        <ul><AddChild onAdd={this.onAdd} /></ul>
      </ul>
    ));
  }

  render(){
    const { nodes } = this.state;

    return (
      <div className="App">
        <ul>
          {this.renderNodes(nodes)}
        </ul>
      </div>
    );
  }
}

export default App;
