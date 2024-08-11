// components/ServiceWidget.tsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "./ServiceWidget.module.scss";

interface ServiceWidgetProps {
  icon: string;
  title: string;
  description: { text: string; path?: string }[];
}

export const ServiceWidget: React.FC<ServiceWidgetProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className={styles.serviceWidget}>
      <img src={icon} alt={title} className={styles.icon} />
      <div>
        <h3 className={styles.title}>{title}</h3>
        <ul className={styles.descriptionList}>
          {description.map((item, index) => (
            <li key={index} className={styles.descriptionItem}>
              {item.path ? (
                <Link to={item.path}>{item.text}</Link>
              ) : (
                <span>{item.text}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
