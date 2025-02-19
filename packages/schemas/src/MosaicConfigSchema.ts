import { z } from 'zod';
import { fileExtensionSchema } from './fileExtensionSchema.js';
import { modeSchema } from './modeSchema.js';
import { pluginModuleSchema } from './PluginModuleSchema.js';
import { serialiserModuleSchema } from './SerialiserModuleSchema.js';
import { sourceModuleSchema } from './SourceModuleSchema.js';
import { sourceScheduleSchema } from './SourceScheduleSchema.js';

export const mosaicConfigSchema = z.object({
  deployment: z.object({ mode: modeSchema, platform: z.string() }).optional(),
  /**
   * A collection of file extensions that can be served
   * e.g. [".mdx", ".json"]
   */
  pageExtensions: fileExtensionSchema.array().nonempty(),
  /**
   * A collection of filenames to ignore
   * These are typically generated by plugins.
   */
  ignorePages: z.string().array().optional().default([]),
  serialisers: z.array(serialiserModuleSchema),
  plugins: z.array(pluginModuleSchema),
  sources: z.array(sourceModuleSchema).nonempty(),
  schedule: sourceScheduleSchema.optional().default({
    checkIntervalMins: 30,
    initialDelayMs: 1000
  })
});

export type MosaicConfig = z.infer<typeof mosaicConfigSchema>;
