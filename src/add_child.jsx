export default function AddChild(props) {
  return (
    <li className="list-item add-link">
      <a href="#" data-id={props.id} onClick={props.onAdd}>Add Child</a>
    </li>
  );
}