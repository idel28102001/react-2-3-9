import { formatDistanceToNow } from 'date-fns';

export const makeCreatedAtStr = (createdAtTime: Date): string => `created ${formatDistanceToNow(createdAtTime)} ago`;
