import './loading-spinner.css';

/**
 * Loading spinner component.
 * 
 * Inspiration: {@link https://loading.io/css/}
 * 
 * @param {boolean} isVisible Tells whether the spinner is visible or not.
 * @returns {JSX}
 */
const LoadingSpinner = ({ isVisible }) => isVisible ? (
  <div className="loading-spinner">
    <div className="loading-spinner__roller-spinner">
      <div className="loading-spinner__dot"></div>
      <div className="loading-spinner__dot"></div>
      <div className="loading-spinner__dot"></div>
      <div className="loading-spinner__dot"></div>
      <div className="loading-spinner__dot"></div>
      <div className="loading-spinner__dot"></div>
      <div className="loading-spinner__dot"></div>
      <div className="loading-spinner__dot"></div>
    </div>
  </div>
) : null;

export default LoadingSpinner;