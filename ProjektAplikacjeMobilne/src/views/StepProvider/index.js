// export const StepProvider = ({ children }) => {
//     const [currentStepCount, setCurrentStepCount] = useState(0);
//     const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  
//     return (
//       <StepContext.Provider value={{ currentStepCount, setCurrentStepCount, isPedometerAvailable, setIsPedometerAvailable }}>
//         {children}
//       </StepContext.Provider>
//     );
//   };