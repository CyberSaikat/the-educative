// components/RightClickMenu.tsx
import { useState } from "react";
import styles from "./assets/css/RightClickMenu.module.css";

interface RightClickMenuProps {
  x: string;
  y: string;
  onClose: () => void;
}

const RightClickMenu: React.FC<RightClickMenuProps> = ({ x, y, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = (action: string) => {
    console.log("Clicked on:", action);
    setIsVisible(false);
    onClose();
  };

  return (
    <div className={styles.menu} style={{ top: y, left: x }}>
      <div className={styles.menuItem} onClick={() => handleClick("Copy")}>
        Copy
      </div>
      <div className={styles.menuItem} onClick={() => handleClick("Paste")}>
        Paste
      </div>
      <div className={styles.menuItem} onClick={() => handleClick("Delete")}>
        Delete
      </div>
    </div>
  );
};

export default RightClickMenu;
