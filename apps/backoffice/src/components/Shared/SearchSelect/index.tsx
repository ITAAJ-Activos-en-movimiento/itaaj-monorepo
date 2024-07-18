import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './SearchSelect.module.css';
import Input from '../Input';

export interface Option {
  value: string;
  label: string;
}

interface SearchSelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (selectedOption: Option | null) => void;
}

const SearchSelect: React.FC<SearchSelectProps> = ({ options, placeholder = 'Buscar...', onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const filtered = options?.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  }, []);

  const handleOptionClick = useCallback((option: Option) => {
    setSearchTerm(option.label);
    setIsOpen(false);
    onChange(option);
  }, [onChange]);

  return (
    <div className={styles.searchSelect} ref={wrapperRef}>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className={styles.input}
      />
      {isOpen && (
        <ul className={styles.optionList}>
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={styles.option}
            >
              {option.label}
            </li>
          ))}
          {filteredOptions.length === 0 && (
            <li className={styles.noOptions}>No se encontraron opciones</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchSelect;