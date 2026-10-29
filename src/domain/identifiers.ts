import { ValidationError } from "./errors";

declare const applicationUuidBrand: unique symbol;
declare const entityIdBrand: unique symbol;

/** A canonical, lower-case UUIDv4 owned by the application. */
export type ApplicationUuid = string & {
  readonly [applicationUuidBrand]: "ApplicationUuid";
};

/** A UUIDv4 whose entity kind is carried by the TypeScript type system. */
export type EntityId<K extends string = string> = ApplicationUuid & {
  readonly [entityIdBrand]: K;
};

export type ActorId = EntityId<"actor">;
export type FarmerId = EntityId<"farmer">;
export type ApiaryId = EntityId<"apiary">;
export type FacilityId = EntityId<"facility">;
export type LocationId = EntityId<"location">;
export type PurchaseId = EntityId<"purchase">;
export type ReceiptId = EntityId<"receipt">;
export type DisputeId = EntityId<"dispute">;
export type HarvestId = EntityId<"harvest">;
export type AdjustmentId = EntityId<"adjustment">;
export type MaterialLotId = EntityId<"material_lot">;
export type TransformationId = EntityId<"transformation">;
export type AllocationId = EntityId<"allocation">;
export type BatchId = EntityId<"batch">;
export type PackagingRunId = EntityId<"packaging_run">;
export type QualityReviewId = EntityId<"quality_review">;

const UUID_V4_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isApplicationUuid(value: unknown): value is ApplicationUuid {
  return typeof value === "string" && UUID_V4_PATTERN.test(value);
}

export function asApplicationUuid(value: string): ApplicationUuid {
  if (!isApplicationUuid(value)) {
    throw new ValidationError("Expected a canonical UUIDv4 application identifier.", {
      value,
    });
  }

  return value.toLowerCase() as ApplicationUuid;
}

export type RandomByteSource = (bytes: Uint8Array) => void;

function secureRandomBytes(bytes: Uint8Array): void {
  const cryptoObject = (
    globalThis as unknown as {
      crypto?: { getRandomValues: (target: Uint8Array) => Uint8Array };
    }
  ).crypto;

  if (!cryptoObject?.getRandomValues) {
    throw new ValidationError(
      "A Web Crypto getRandomValues implementation is required to create an application UUID.",
    );
  }

  cryptoObject.getRandomValues(bytes);
}

export function newApplicationUuid(randomBytes: RandomByteSource = secureRandomBytes): ApplicationUuid {
  const bytes = new Uint8Array(16);
  randomBytes(bytes);

  // UUIDv4 version and RFC 4122 variant bits are set after obtaining entropy.
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return asApplicationUuid(
    `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`,
  );
}

export const createApplicationUuid = newApplicationUuid;

export function asEntityId<K extends string>(kind: K, value: string): EntityId<K> {
  // `kind` is intentionally a type-level discriminator. All entity IDs share
  // the same runtime UUIDv4 representation.
  void kind;
  return asApplicationUuid(value) as EntityId<K>;
}

export function newEntityId<K extends string>(
  kind: K,
  randomBytes?: RandomByteSource,
): EntityId<K> {
  return newApplicationUuid(randomBytes) as EntityId<K>;
}

export function isEntityId<K extends string>(value: unknown, _kind?: K): value is EntityId<K> {
  return isApplicationUuid(value);
}

