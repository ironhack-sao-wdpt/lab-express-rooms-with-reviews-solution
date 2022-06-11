function SelectControl(props) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={props.id}>
        {props.label}
      </label>
      <select
        className="form-select"
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        multiple={props.multiple}
      >
        {props.children}
        {/* {props.items.map((currentOptionObj) => (
          <option value={currentOptionObj.value}>
            {currentOptionObj.label}
          </option>
        ))} */}
      </select>
    </div>
  );
}

export default SelectControl;
