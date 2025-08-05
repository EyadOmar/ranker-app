// libs/id.ts
import { customAlphabet, nanoid } from 'nanoid';

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const createPollId = customAlphabet(alphabet, 6);
export const createUserId = (): string => nanoid();
export const createNominationId = (): string => nanoid(8);
