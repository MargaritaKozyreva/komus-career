import React, { useState } from "react";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  placeholder: string;
  buttonText: string;
  onSearch: (query: string) => void;
  color: string;
  widgetText?: string;
  value?: string; // Управляемое свойство value
  onChange?: (value: string) => void; // Функция для обработки изменений
}


export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  buttonText,
  onSearch,
  color,
  widgetText,
  value,
  onChange
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value !== undefined) {
      onSearch(value);
    }
  };

  return (
    <div className={styles.widget} style={{ backgroundColor: color }}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
        <button className={styles.button} type="submit">
          {buttonText}
        </button>
      </form>
      <div className={styles.widgetText}>
        <span>{widgetText}</span>
      </div>
    </div>
  );
};

