import { z } from 'zod';
export const InState = z.object({
  type: z.literal('state'),
  tick: z.number().int(),
  diff: z.any(), // később részletezve
});
export type InState = z.infer<typeof InState>;