// imports the hook useSessionStorage
import { useEffect } from 'react';

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

// Import the styled components
import styled from 'styled-components';

// Import the custom hook
import useSessionStorage from '../../features/hooks/useSessionStorage'; // Import the custom hook

// Create the styled components
const Icon = styled.div`
  font-size: 1.5rem;
  margin: 0 0.5rem;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const Label = styled.label`
  transition: display 0.3s;
  cursor : pointer;
`;

// Create the DarkModeToggle component
const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useSessionStorage('darkMode', false);

  // Add the dark-mode class to the document element
  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  // Handle the toggle event
  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <Label htmlFor="darkMode">
        <Icon>{darkMode ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}</Icon>
      </Label>
      <Checkbox id="darkMode" checked={darkMode} onChange={handleToggle} />
    </div>
  );
};

export default DarkModeToggle;