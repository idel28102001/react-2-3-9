import React, { FC, useEffect, useState } from 'react';

import './CreatedNAgo.css';
import { makeCreatedAtStr } from '../../common/utils';

interface CreatedNAgoPropsInterface {
  createdAt: Date;
}

const CreatedNAgo: FC<CreatedNAgoPropsInterface> = ({ createdAt: createdAtTime }) => {
  const [createdAt, setCreatedAt] = useState(makeCreatedAtStr(createdAtTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setCreatedAt(() => makeCreatedAtStr(createdAtTime));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [createdAtTime]);
  return <span className="description">{createdAt}</span>;
};
export default CreatedNAgo;
