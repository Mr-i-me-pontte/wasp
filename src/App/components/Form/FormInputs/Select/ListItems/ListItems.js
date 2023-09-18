import "./styles.scss";

const ListItems = ({ handleToogle, options, selection, multiSelect, setSelection }) => {
  const isOptionInSelection = (option) =>
    !!selection.find((current) => current.value === option.value);

  const handleOnClick = (event, option) => {
    event.preventDefault();

    const isItemSelected = selection.some(
      (current) => current.value === option.value
    );

    if (!isItemSelected) {
      if (!multiSelect) {
        setSelection([option]);
        handleToogle();
        return;
      }

      setSelection([...selection, option]);
    } else {
      const selectionAfterRemoval = selection.filter(
        (currant) => currant.value !== option.value
      );
      setSelection(selectionAfterRemoval);
    }
  };

  return (
    <ul className="select-list">
      {options.map((option, index) => (
        <li className="select-list-item" key={index}>
          <button
            className={"select-list-item-btn select-list-item-btn".concat(
              isOptionInSelection(option) ? "__selected" : "__unselected"
            )}
            type="button"
            onClick={(event) => handleOnClick(event, option)}
          >
            <span>
              {multiSelect && (
                <label className="btn-checkbox">
                  <input
                    type="checkbox"
                    checked={isOptionInSelection(option)}
                    onChange={(_) => _}
                  />
                  <span className="checkmark"></span>
                </label>
              )}
              {option.label}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ListItems;
