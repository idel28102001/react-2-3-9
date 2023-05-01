import React, { FC, useEffect, useState } from 'react';
import './CreatedNAgo.css';
import { formatDistanceToNow } from 'date-fns';

interface CreatedNAgoPropsInterface {
  createdAt: Date;
}

const CreatedNAgo: FC<CreatedNAgoPropsInterface> = ({ createdAt: createdAtTime }) => {
  const createdAtFunc = (createdAtTime: Date): string => {
    return `created ${formatDistanceToNow(createdAtTime)} ago`;
  };

  const [createdAt, setCreatedAt] = useState(createdAtFunc(createdAtTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setCreatedAt(() => createdAtFunc(createdAtTime));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [createdAtTime]);
  return <span className="description">{createdAt}</span>;
};
export default CreatedNAgo;
