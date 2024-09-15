import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { Button } from "../ui/button";

interface AnimatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  name: string;
  id: string;
  className?: string;
  onchange: (value: string) => void;
  value?: string;
  parentClass?: string;
  autoComplete?: string;
}

export function AnimatedInput({
  label,
  type,
  placeholder,
  required = false,
  name,
  id,
  className = "",
  onchange,
  value = "",
  onBlur,
  parentClass = "",
  autoComplete,
  ...rest
}: AnimatedInputProps) {
  return (
    <div className={`w-full ${parentClass}`}>
      <div className="relative">
        <input
          type={type}
          id={id}
          name={name}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ease-in-out peer focus:placeholder-slate-500 placeholder-transparent ${className}`}
          required={required}
          placeholder={placeholder}
          onChange={(e) => onchange(e.target.value)}
          spellCheck="false"
          value={value}
          autoComplete={autoComplete}
          {...rest} // Spread any additional input props here
        />
        <label
          htmlFor={id}
          className={`absolute left-[15px] -translate-y-1/2 -mt-px px-1 text-sm text-gray-400 flex items-center transition-all duration-300 ease-in-out  cursor-text ${
            type === "date"
              ? "top-0 text-xs text-primary left-[10px] w-auto h-auto bg-white"
              : "top-1/2 peer-focus:text-xs peer-focus:text-primary peer-focus:top-[0px] peer-focus:left-[10px] peer-focus:w-auto peer-focus:h-auto peer-focus:bg-white peer-valid:top-0 peer-valid:bg-white peer-valid:text-primary"
          }`}
        >
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
    </div>
  );
}

export function AnimatedFileInput({
  label,
  required,
  name,
  id,
  className,
  onchange,
}: {
  label: string;
  required: boolean;
  name: string;
  id: string;
  className: string;
  onchange: (e: any) => void;
}) {
  return (
    <div className="w-full">
      <div className="relative">
        <Input
          type="file"
          id={id}
          name={name}
          className={
            `w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ease-in-out peer focus:placeholder-slate-500 placeholder-transparent placeholder:hidden opacity-0 absolute z-[-1] ` +
            className
          }
          required={required}
          onChange={(e) => onchange(e.target.files)}
        />
        <label
          htmlFor={id}
          className="block w-full cursor-pointer text-center py-3 sm:py-2 px-1 sm:pax-4 border border-dashed border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 transition-all duration-300 "
        >
          Click to add {label}
        </label>
      </div>
    </div>
  );
}

type Option = {
  name: string;
  value: string;
};


export function AnimatedSelect({
  label,
  options,
  required,
  name,
  id,
  className,
  onChange,
  value,
}: {
  label: string;
  options: Option[];
  required: boolean;
  name: string;
  id: string;
  className?: string;
  onChange: (value: string) => void;
  value?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  if (value && !selectedOption) {
    const option = options.find((option) => option.value === value);
    if (option) {
      setSelectedOption(option.name);
    }
  }

  // Filter options based on the search query
  const filteredOptions = options.filter(
    (option) =>
      option.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option.name);
    setIsOpen(false);
    onChange(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none transition-all duration-300 ease-in-out h-[42px] text-nowrap overflow-hidden ${
          isOpen ? "ring-2 ring-primary" : ""
        } ${className}`}
      >
        {selectedOption || ""}
        <span className="absolute right-[1px] px-2 w-7 top-1/2 transform -translate-y-1/2 transition-transform bg-white duration-300 ease-in-out inline-flex justify-center items-center h-[100% - 2px]">
          <FaChevronDown
            className="transition-transform duration-300 ease-in-out"
            style={{
              transform: isOpen ? "rotate(180deg)" : "",
            }}
          />
        </span>
      </div>
      {isOpen && (
        <div
          ref={optionsRef}
          className="absolute z-50 w-auto mt-2 bg-white border border-gray-300 rounded-md shadow-lg pb-1 overflow-hidden transition-all duration-300"
          style={{ zIndex: 9999 }} // Added high z-index to ensure it's on top
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="max-h-60 overflow-y-auto px-1">
            {filteredOptions.length ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-150 ease-in-out text-nowrap border-b border-gray-300 last:border-b-0"
                >
                  {option.name}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No options</div>
            )}
          </div>
        </div>
      )}
      <label
        htmlFor={id}
        className={`absolute left-4 text-gray-400 transition-all duration-300 ease-in-out ${
          selectedOption
            ? "-top-2 bg-white px-1 text-xs"
            : "top-1/2 transform -translate-y-1/2"
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  );
}

export function AnimatedMultiSelect({
  label,
  options,
  required,
  name,
  id,
  className,
  onChange,
  value = [],
}: {
  label: string;
  options: Option[];
  required: boolean;
  name: string;
  id: string;
  className?: string;
  onChange: (values: string[]) => void;
  value?: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Memoize the filtered options
  const filteredOptions = useMemo(
    () =>
      options.filter(
        (option) =>
          option.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
          option.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [options, searchQuery]
  );

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prevState) => !prevState);

  // Handle option click
  const handleOptionClick = (option: Option) => {
    setSearchQuery("");
    const isSelected = selectedOptions.includes(option.value);
    const newSelectedOptions = isSelected
      ? selectedOptions.filter((value) => value !== option.value)
      : [...selectedOptions, option.value];

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className={`flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none transition-all duration-300 ease-in-out relative min-h-[42px] ${
          isOpen ? "ring-2 ring-primary" : ""
        }`}
      >
        <div className="flex flex-wrap gap-2">
          {selectedOptions.length > 0 || value.length > 0
            ? options
                .filter(
                  (option) =>
                    selectedOptions.includes(option.value) ||
                    value.includes(option.value)
                )
                .map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center px-2 py-1 bg-gray-200 rounded-md text-sm relative pr-[25px] overflow-hidden border border-primary"
                  >
                    <span>{option.name}</span>
                    <span
                      className="ml-2 cursor-pointer bg-primary text-white h-full absolute top-0 right-0 w-[20px] flex items-center justify-center"
                      onClick={() => handleOptionClick(option)}
                    >
                      <FaTimes />
                    </span>
                  </div>
                ))
            : null}
        </div>
        <span className="absolute right-[1px] px-2 w-7 top-1/2 transform -translate-y-1/2 transition-transform bg-white duration-300 ease-in-out inline-flex justify-center items-center h-[100% - 2px]">
          <FaChevronDown
            className="transition-transform duration-300 ease-in-out"
            style={{
              transform: isOpen ? "rotate(180deg)" : "",
            }}
          />
        </span>
      </div>
      {isOpen && (
        <div
          ref={optionsRef}
          className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg  transition-all duration-300 pb-2"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
            value={searchQuery}
            id="searchQuery"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length ? (
              filteredOptions.map((option) => {
                if (selectedOptions.includes(option.value)) {
                  return null;
                }
                return (
                  <div
                    key={option.value}
                    onClick={() => handleOptionClick(option)}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-150 ease-in-out text-nowrap border-b border-gray-300 last:border-b-0 ${
                      selectedOptions.includes(option.value)
                        ? "bg-gray-100"
                        : ""
                    }`}
                  >
                    {option.name}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-2 text-gray-500">No options</div>
            )}
          </div>
        </div>
      )}

      <label
        htmlFor={id}
        className={`absolute left-4 text-gray-400 pointer-events-none transition-all duration-300 ease-in-out ${
          selectedOptions.length > 0 || isOpen
            ? "-top-3 bg-white px-1 text-xs"
            : "top-1/2 transform -translate-y-1/2"
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  );
}
