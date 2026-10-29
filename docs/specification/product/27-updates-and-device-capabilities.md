# Updates and device capabilities

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Updates and device capabilities](../../../HB-TRACE-V1-PLAN.md#updates-and-device-capabilities)

<a id="prd-27-01"></a>
<!-- requirement:PRD-27-01 -->
- Version the application cache, IndexedDB schema and command protocol together. Notify staff when an update is
  ready and activate it only at a safe point. Do not unconditionally force a reload, activate an incompatible
  worker, clear the outbox or delete pending attachment bytes during installation, update or cache cleanup.
<!-- /requirement:PRD-27-01 -->

<a id="prd-27-02"></a>
<!-- requirement:PRD-27-02 -->
- Support the agreed N-1 compatibility window, interrupted migrations, rollback/forward repair and multiple open
  tabs. Prove that saved work survives upgrading before it has synced; reprinting labels retains the same IDs.
<!-- /requirement:PRD-27-02 -->

<a id="prd-27-03"></a>
<!-- requirement:PRD-27-03 -->
- Request camera and location access only for the relevant task, with manual code/location entry and optional
  photo fallbacks. Change the current `geolocation=()` permissions policy only for the authorized staff feature;
  keep exact coordinates and media private. Installation does not itself grant device permissions.
<!-- /requirement:PRD-27-03 -->

<a id="prd-27-04"></a>
<!-- requirement:PRD-27-04 -->
- Validate browser/PDF printing on the actual A4 and label printers. Do not assume direct Bluetooth or USB printer
  support is consistent across phones. Keep handwritten bucket labels and supported print/PDF paths usable.
<!-- /requirement:PRD-27-04 -->
