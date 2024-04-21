import React, { useState, useEffect } from 'react';

function ImageComponentFromBase64({ base64String }) {
  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    if (base64String) {
      setImageSource(`data:image/jpeg;base64,${base64String}`);
    }
  }, [base64String]);

  return (
    <div>
      {imageSource && (
        <img alt= "" src={imageSource} style={{width:"140px", height:"180px", margin:"0", padding:"0"}}/>
      )}
    </div>
  );
}

export default ImageComponentFromBase64;
