function CheckboxControl(props) {
  return (
    <div className="form-check mb-3">
      <input
        className="form-check-input"
        type="checkbox"
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        checked={props.checked}
      />
      <label htmlFor={props.id} className="form-check-label">
        {props.label}
      </label>
    </div>
  );
}

export default CheckboxControl;
