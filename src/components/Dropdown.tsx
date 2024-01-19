interface DropdownProps {
  indicatorValue?: any,
  indicatorIcon: any,
  indicatorClass?: string,
  dropdownClassName?: string,
  className?: string,
  children: any
}
const Dropdown = ({
  indicatorValue: indicatorValue,
  indicatorIcon: icon,
  indicatorClass: indicatorClass,
  dropdownClassName: dropdownClassName,
  className: className,
  children: children
}: DropdownProps) => {
  indicatorClass ??= '';

  return (
    <div className={`relative dropdown ${className || ''}`}>
      <label tabIndex={0} className={`btn btn-ghost btn-circle ${indicatorValue ? '' : indicatorClass}`}>
        {
          indicatorValue ?
            <div className={`indicator ${indicatorClass}`}>
              { icon } <span className="badge badge-xs badge-primary indicator-item">{indicatorValue}</span>
            </div>
          : icon
        }
      </label>
      <div tabIndex={0} className={`absolute z-[1] dropdown-content menu flex flex-col gap-y-2 ${dropdownClassName || ''}`}>
        { children }
      </div>
    </div>
  );
}

export default Dropdown;