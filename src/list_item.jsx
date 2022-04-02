export default function ListItem(props){
  return (
    <li className="list-item" key={props.id} data-id={props.id}>
      <span>Counter: {props.ctr}</span>
      <button data-id={props.id} onClick={props.onAdd} className="add button">
        <span>+</span>
      </button>
      <button data-id={props.id} onClick={props.onRemove} className="remove button">
        <span>x</span>
      </button>
    </li>
  )
}