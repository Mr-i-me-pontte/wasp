const triggerChangeHeaderText = ({
  selection,
  label,
  multiSelect,
  textInside,
  cb,
  placeholder
}) => {
  if (selection.length === 0) {
    if (textInside) cb(label);
    else cb(placeholder);
    return;
  }

  if (multiSelect) {
    if (textInside) {
      cb(label);
    } else {
      cb(
        selection
          .map((v) => v.label)
          .join(", ")
          .substring(0, 15)
          .concat("...")
      );
    }
  } else {
    cb(selection[0].label);
  }
};

const triggerGetValueForm = ({ selection, multiSelect, name, cb }) => {
  if (selection.length > 0) {
    if (multiSelect) {
      cb(
        name,
        selection.map(({ value }) => value)
      );
    } else {
      cb(name, selection[0].value);
    }
  } else {
    if(multiSelect){
      return cb(name, []);
    } 
    cb(name, '');
  }
};

export { 
  triggerChangeHeaderText, 
  triggerGetValueForm 
};
