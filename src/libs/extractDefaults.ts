// https://stackoverflow.com/a/78322386/319375
import type { ZodRawShape, ZodTypeAny } from 'zod';
import { z } from 'zod';

function getTodayPlusTime(hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
  const today = new Date();
  today.setHours(hours);
  today.setMinutes(minutes);
  today.setSeconds(seconds);
  today.setMilliseconds(milliseconds);
  return today;
}

function getTodayPlusTimeDateString(hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
  const today = new Date();
  today.setHours(hours);
  today.setMinutes(minutes);
  today.setSeconds(seconds);
  today.setMilliseconds(milliseconds);
  return today.toISOString().split('T')[0]; // Get the date part only
}

export const BASE_DEFAULTS = {
  STRING: '',
  NUMBER: 0,
  BOOLEAN: false,
  DATE: getTodayPlusTime(), // today date object
  OBJECT: {}, // consider if this is best...
  ARRAY: [],
  NULL: null,
  UNDEFINED: undefined,
};

const BASE_DEFAULTS_FORM = {
  STRING: '',
  NUMBER: null,
  BOOLEAN: false,
  DATE: getTodayPlusTimeDateString(), // today string (specific format)
  OBJECT: {}, // consider if this is best...
  ARRAY: [],
  NULL: null,
  UNDEFINED: null, // consider if this is best...
};

type ExtractedDefaults<T> = {
  [P in keyof T]?: T[P] extends ZodTypeAny ? ReturnType<T[P]['parse']> : never;
};

export function extractDefaults<TSchema extends ZodRawShape>(schema: z.ZodObject<TSchema>): ExtractedDefaults<TSchema> {
  const schemaShape = schema.shape;
  const result = {} as ExtractedDefaults<TSchema>;

  for (const [key, fieldSchema] of Object.entries(schemaShape)) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    result[key as keyof TSchema] = extractValueFromSchema(fieldSchema!) as ExtractedDefaults<TSchema>[keyof TSchema];
  }

  return result;
}

function extractValueFromSchema<T extends ZodTypeAny>(fieldSchema: T): unknown {
  if (fieldSchema instanceof z.ZodDefault) {
    return (fieldSchema._def as { defaultValue: () => unknown }).defaultValue() as ReturnType<T['parse']>;
  }
  if (fieldSchema instanceof z.ZodObject) {
    return extractDefaults(fieldSchema);
  }
  if (fieldSchema instanceof z.ZodArray) {
    return BASE_DEFAULTS.ARRAY.slice();
  }
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return handleBaseTypes(fieldSchema);
}

function handleBaseTypes<T extends ZodTypeAny>(fieldSchema: T): unknown {
  switch (fieldSchema.constructor) {
    case z.ZodString:
      return BASE_DEFAULTS.STRING;
    case z.ZodDate:
      return BASE_DEFAULTS.STRING;
    case z.ZodNumber:
      return BASE_DEFAULTS.NUMBER;
    case z.ZodBoolean:
      return BASE_DEFAULTS.BOOLEAN;
    case z.ZodNull:
      return BASE_DEFAULTS.NULL;
    case z.ZodNullable:
      return BASE_DEFAULTS.NULL;
    case z.ZodOptional:
      return BASE_DEFAULTS.UNDEFINED; // Choose appropriately between UNDEFINED or NULL
    default:
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return handleTransformedTypes(fieldSchema);
  }
}

function handleTransformedTypes<T extends ZodTypeAny>(fieldSchema: T): unknown {
  if (
    fieldSchema instanceof z.ZodTransformer &&
    // eslint-disable-next-line no-underscore-dangle
    (fieldSchema._def as { innerType: ZodTypeAny }).innerType
  ) {
    return extractValueFromSchema(
      // eslint-disable-next-line no-underscore-dangle
      (fieldSchema._def as { innerType: ZodTypeAny }).innerType,
    );
  }
  return BASE_DEFAULTS.UNDEFINED;
}
