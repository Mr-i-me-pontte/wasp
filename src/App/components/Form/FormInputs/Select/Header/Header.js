import arrow from "../../../../../../images/arrow-down-2.svg";
import "./styles.scss";

const Header = ({ handleToogle, header, multiSelect, selection, open }) => {
  const boxQty = "+".concat(selection.length.toString().padStart(2, 0));

  return (
    <div
      className="input select-header"
      tabIndex={0}
      role="button"
      onClick={() => handleToogle()}
      onKeyPress={() => handleToogle()}
    >
      <div className="select-header__title">
        <span>{header}</span>
        {multiSelect && selection.length > 0 && (
          <span className="box-qty">{boxQty}</span>
        )}
      </div>
      <div className="select-header__arrow">
        {open ? (
          <img
            src={arrow}
            style={{ transform: "rotate(180deg)" }}
            alt="arrow-up"
          />
        ) : (
          <img src={arrow} alt="arrow-down" />
        )}
      </div>
    </div>
  );
};

export default Header;
