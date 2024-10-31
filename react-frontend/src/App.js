import React, { useEffect } from "react";
function App() {
  useEffect(() => {console.log('ssss')}, [])
  
  return (
    <div className="App">

    </div>
  );
}

export default React.memo(App);
