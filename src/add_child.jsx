export default function AddChild(props) {
  return (
    <li className="list-item add-link">
      <a href="#" onClick={props.onAdd}>Add Child</a>
    </li>
  );
}