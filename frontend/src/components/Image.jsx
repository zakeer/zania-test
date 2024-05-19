import React, { useCallback, useState } from 'react'
import Spinner from './Spinner';

function Image({ alt, src, ...props }) {
  const [loaded, setloaded] = useState(false);


  const onLoad = useCallback(() => setloaded(true), [])

  return (<>
    {!loaded && <Spinner />}
    <img src={src} alt={alt} onLoad={onLoad} style={{ display: loaded ? 'block' : 'none' }} {...props} />
  </>
  )
}

export default React.memo(Image)